"use client";

import { useRef, useEffect, useState } from "react";

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const lastCountRef = useRef(0);

  useEffect(() => {
    const updateCount = () => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / vh));
      const newCount = Math.round(progress * to);

      if (newCount !== lastCountRef.current) {
        lastCountRef.current = newCount;
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
