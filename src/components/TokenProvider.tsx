// ─── Token Provider ─────────────────────────────────
// Global context for wallet state across the app
// Tokens are freely assigned — no purchases, no money

"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

interface UserState {
  id: string;
  email: string;
  displayName: string;
  tokenBalance: number;
  unlockedCaseFileIds: string[];
}

interface TokenContextType {
  user: UserState | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  unlockContent: (caseFileId: string) => Promise<{ success: boolean; message: string }>;
  burnArcadeTokens: (gameId: string, gameTitle: string) => Promise<{ success: boolean; message: string }>;
  hasUnlocked: (caseFileId: string) => boolean;
}

const TokenContext = createContext<TokenContextType | null>(null);

const SESSION_CACHE_KEY = "tb_user_cache";

function getCachedUser(): UserState | null {
  try {
    const raw = sessionStorage.getItem(SESSION_CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as UserState;
  } catch {
    return null;
  }
}

function setCachedUser(user: UserState | null) {
  try {
    if (user) {
      sessionStorage.setItem(SESSION_CACHE_KEY, JSON.stringify(user));
    } else {
      sessionStorage.removeItem(SESSION_CACHE_KEY);
    }
  } catch {
    // sessionStorage unavailable (SSR, private mode) — silent fail
  }
}

export function TokenProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<UserState | null>(null);
  const [loading, setLoading] = useState(true);

  // Wrap setUser to keep sessionStorage in sync
  const setUser = useCallback((update: UserState | null | ((prev: UserState | null) => UserState | null)) => {
    setUserState((prev) => {
      const next = typeof update === "function" ? update(prev) : update;
      setCachedUser(next);
      return next;
    });
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    } catch (err) {
      console.error("[TokenProvider] Failed to fetch user:", err);
    } finally {
      setLoading(false);
    }
  }, [setUser]);

  useEffect(() => {
    // Use cached data if available — skip the API call entirely
    const cached = getCachedUser();
    if (cached) {
      setUser(cached);
      setLoading(false);
      return;
    }
    refreshUser();
  }, [refreshUser, setUser]);

  const unlockContent = useCallback(
    async (caseFileId: string): Promise<{ success: boolean; message: string }> => {
      try {
        const res = await fetch("/api/content/unlock", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ caseFileId }),
        });
        const data = await res.json();

        if (data.success) {
          // Update local state immediately for snappy UI
          setUser((prev) =>
            prev
              ? {
                  ...prev,
                  tokenBalance: data.balance,
                  unlockedCaseFileIds: [...prev.unlockedCaseFileIds, caseFileId],
                }
              : null
          );
        }

        return { success: data.success ?? false, message: data.message ?? data.error };
      } catch {
        return { success: false, message: "Network error. The void swallowed your request." };
      }
    },
    []
  );

  const hasUnlocked = useCallback(
    (caseFileId: string) => {
      return user?.unlockedCaseFileIds.includes(caseFileId) ?? false;
    },
    [user?.unlockedCaseFileIds]
  );

  const burnArcadeTokens = useCallback(
    async (gameId: string, gameTitle: string): Promise<{ success: boolean; message: string }> => {
      try {
        const res = await fetch("/api/arcade/burn", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ gameId, gameTitle }),
        });
        const data = await res.json();

        if (data.success) {
          setUser((prev) =>
            prev ? { ...prev, tokenBalance: data.balance } : null
          );
        }

        return { success: data.success ?? false, message: data.message ?? data.error };
      } catch {
        return { success: false, message: "Network error. The arcade is offline." };
      }
    },
    []
  );

  return (
    <TokenContext.Provider
      value={{ user, loading, refreshUser, unlockContent, burnArcadeTokens, hasUnlocked }}
    >
      {children}
    </TokenContext.Provider>
  );
}

export function useTokens() {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useTokens must be used within a TokenProvider");
  }
  return context;
}
