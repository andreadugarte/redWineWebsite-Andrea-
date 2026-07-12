"use client";

// Temporarily disabled: useScroll causes scroll freeze.
// Will be re-enabled with optimized scroll listeners.
// Stubs still accept className/distance so layout classes are preserved
// and callers type-check.

export function Parallax({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
}) {
  return <div className={className}>{children}</div>;
}

export function KenBurns({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
