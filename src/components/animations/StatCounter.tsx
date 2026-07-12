"use client";

import { useRef, useEffect, useState } from "react";

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(999);
  const lastCountRef = useRef(999);

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
        console.log(`Counter[${to}] updated to ${newCount}, progress=${progress.toFixed(2)}, rect.top=${rect.top}, vh=${vh}`);
      }
    };

    console.log(`Counter[${to}] mounted, registering listener`);
    updateCount();
    window.addEventListener("scroll", updateCount, { passive: true });

    return () => {
      console.log(`Counter[${to}] unmounting`);
      window.removeEventListener("scroll", updateCount);
    };
  }, [to]);

  return (
    <span ref={ref} data-counter-version="v7-debug">
      {count}
      {suffix}
    </span>
  );
}
