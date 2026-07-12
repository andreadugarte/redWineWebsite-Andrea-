"use client";

import { ReactNode } from "react";

// Temporarily disabled: useScroll causes scroll freeze.
// Will be re-enabled with optimized scroll listeners.

export function Parallax({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function KenBurns({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}
