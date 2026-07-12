"use client";

import { useRef, useEffect, useState } from "react";

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const listenerRef = useRef<((e: Event) => void) | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || listenerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !listenerRef.current) {
          const handleScroll = () => {
            const rect = ref.current?.getBoundingClientRect();
            if (!rect) return;
            const progress = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight));
            setCount(Math.floor(progress * to));
          };

          listenerRef.current = handleScroll;
          window.addEventListener("scroll", handleScroll, { passive: true });
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (listenerRef.current) {
        window.removeEventListener("scroll", listenerRef.current);
      }
    };
  }, [to]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}
