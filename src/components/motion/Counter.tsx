"use client";

import { useRef, useEffect, useState } from "react";

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const hasStarted = useRef(false);
  // Animates on scroll without Framer Motion

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let unsubscribe: (() => void) | null = null;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasStarted.current) {
        hasStarted.current = true;

        const handleScroll = () => {
          const rect = ref.current?.getBoundingClientRect();
          if (!rect) return;

          // Progress based on element position: 0 when entering from bottom, 1 when fully past top
          const progress = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight));
          setCount(Math.round(progress * to));
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        unsubscribe = () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }
    });

    observer.observe(el);

    return () => {
      observer.disconnect();
      unsubscribe?.();
    };
  }, [to]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}
