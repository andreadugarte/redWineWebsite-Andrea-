"use client";

import { useRef, useEffect, useState } from "react";

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate distance from bottom of viewport to element
      // When element is below viewport: distance is positive
      // When element is in viewport: distance decreases
      // When element is above viewport: distance is negative
      const elementCenter = rect.top + rect.height / 2;
      const distanceFromCenter = viewportHeight / 2 - elementCenter;
      const maxDistance = viewportHeight;

      // Progress: 0 when far below, 1 when centered, 0 when far above
      const progress = Math.max(0, Math.min(1, (distanceFromCenter + maxDistance) / (maxDistance * 2)));

      setCount(Math.round(progress * to));
    };

    // Update on scroll
    window.addEventListener("scroll", updateCount, { passive: true });
    // Initial update
    updateCount();

    return () => window.removeEventListener("scroll", updateCount);
  }, [to]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}
