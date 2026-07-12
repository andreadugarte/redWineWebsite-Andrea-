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
      const vh = window.innerHeight;

      // Progress formula: animates from 0→1 as element scrolls from viewport bottom to top
      // When rect.top = vh (element below viewport): progress = 0
      // When rect.top = 0 (element at viewport top): progress = 1
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / vh));
      const newCount = Math.round(progress * to);

      if (newCount !== count) {
        setCount(newCount);
      }
    };

    updateCount();
    window.addEventListener("scroll", updateCount, { passive: true });

    return () => window.removeEventListener("scroll", updateCount);
  }, [to]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}
