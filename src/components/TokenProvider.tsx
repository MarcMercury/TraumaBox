// ─── Token Provider ─────────────────────────────────
// Global context for wallet state across the app

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
  devCredit: (amount: number) => Promise<void>;
  hasUnlocked: (caseFileId: string) => boolean;
}

const TokenContext = createContext<TokenContextType | null>(null);

export function TokenProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserState | null>(null);
  const [loading, setLoading] = useState(true);

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
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

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

  const devCredit = useCallback(
    async (amount: number) => {
      try {
        const res = await fetch("/api/tokens/dev-credit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount }),
        });
        const data = await res.json();
        if (data.success) {
          setUser((prev) =>
            prev ? { ...prev, tokenBalance: data.balance } : null
          );
        }
      } catch (err) {
        console.error("[DevCredit]", err);
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

  return (
    <TokenContext.Provider
      value={{ user, loading, refreshUser, unlockContent, devCredit, hasUnlocked }}
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
