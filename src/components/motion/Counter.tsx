"use client";

import { useRef, useEffect, useState } from "react";

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const listenerRef = useRef<((e: Event) => void) | null>(null);
  const hasRegistered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRegistered.current) {
          hasRegistered.current = true;

          const handleScroll = () => {
            const rect = ref.current?.getBoundingClientRect();
            if (!rect) return;

            // Element top position relative to viewport
            // When entering from below: rect.top goes from window.innerHeight to 0
            // Progress should go from 0 to 1 as element scrolls into view
            const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
            const newCount = Math.floor(progress * to);
            setCount(newCount);
          };

          listenerRef.current = handleScroll;
          window.addEventListener("scroll", handleScroll, { passive: true });
          // Trigger immediately
          handleScroll();
        }
      },
      { threshold: 0.05 }
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
