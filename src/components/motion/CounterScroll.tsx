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

      // Progress: 0 when element is at bottom of viewport (rect.top = vh)
      //          1 when element is at top of viewport (rect.top = 0)
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / vh));
      const newCount = Math.round(progress * to);

      if (newCount !== count) {
        setCount(newCount);
      }
    };

    updateCount();
    window.addEventListener("scroll", updateCount, { passive: true });

    return () => window.removeEventListener("scroll", updateCount);
  }, [to, count]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}
