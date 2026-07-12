"use client";

import { useRef, useEffect, useState } from "react";

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let animationFrameId: number | null = null;

    const updateCount = () => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (typeof window !== 'undefined' && count === 0 && to === 2004) {
        console.log('[Counter] Animating 2004, rect.top:', rect.top, 'progress:', ((vh - rect.top) / (2 * vh)).toFixed(2));
      }

      // Element is at rect.top relative to viewport
      // When rect.top = vh: element is below viewport (scroll up to see)
      // When rect.top = 0: element is at top of viewport
      // When rect.top = -vh: element is above viewport (scrolled past)

      // Progress should go from 0 to 1 as rect.top goes from vh to -vh
      // That's a total range of 2*vh
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / (2 * vh)));
      const newCount = Math.round(progress * to);

      if (newCount !== count) {
        setCount(newCount);
      }
    };

    const handleScroll = () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      animationFrameId = requestAnimationFrame(updateCount);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateCount();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
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
