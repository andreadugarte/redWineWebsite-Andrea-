"use client";

import { useRef, useEffect, useState } from "react";

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const el = ref.current;
      if (!el) return;

      const viewportHeight = window.innerHeight;
      const rect = el.getBoundingClientRect();
      const elTop = rect.top;

      let value = 0;
      if (elTop < viewportHeight && elTop > -rect.height) {
        // Element is in viewport
        const distanceFromTop = viewportHeight - elTop;
        const percentOfViewport = distanceFromTop / viewportHeight;
        value = Math.round(percentOfViewport * to);
      }

      setCount(Math.max(0, Math.min(value, to)));
    };

    // Update immediately
    updateCount();

    // Update on scroll
    const handleScroll = () => {
      updateCount();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [to]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}
