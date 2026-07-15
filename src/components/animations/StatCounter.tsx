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
      // 0 when the element enters at the bottom of the viewport; reaches 1
      // (and settles on the real value) once the element is ~55% up the
      // screen, so visitors see the true numbers without scrolling to the top.
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh * 0.45)));
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
