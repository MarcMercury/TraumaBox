"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="min-h-[60vh] flex items-center justify-center p-8">
          <div className="max-w-md text-center space-y-4">
            <div className="text-4xl font-bold text-red-500 font-mono">
              CONTAINMENT BREACH
            </div>
            <p className="font-mono text-sm text-[#888]">
              Something broke. It probably wasn&apos;t your fault.
            </p>
            <pre className="text-left bg-black border border-[#333] p-4 font-mono text-[10px] text-red-400 overflow-auto max-h-32">
              {this.state.error?.message ?? "UNKNOWN_ERROR"}
            </pre>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-6 py-2 border border-[var(--accent)] text-[var(--accent)] font-mono text-sm hover:bg-[var(--accent)] hover:text-black transition-all"
              aria-label="Attempt system recovery"
            >
              ATTEMPT SYSTEM RECOVERY
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
