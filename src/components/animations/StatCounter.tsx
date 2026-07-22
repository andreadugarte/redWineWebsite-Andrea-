"use client";

import { useRef, useEffect, useState } from "react";

/**
 * Counts up to `to` once the element is sufficiently visible, then holds at
 * the final value. Uses a 'scroll' listener (not IntersectionObserver — some
 * embedded/automated browser contexts never fire IO callbacks at all) purely
 * as the visibility trigger; once fired, a self-contained rAF tween runs to
 * completion regardless of further scrolling. Previously the displayed value
 * was recomputed on every scroll proportional to scroll position, so it
 * could get stuck at whatever fraction of `to` was showing when the user
 * stopped scrolling — including 0 if the page never scrolled that far.
 */
export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const runAnimation = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      const duration = 1200;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        setCount(Math.round(progress * to));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const isVisible = () => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight * 0.85 && rect.bottom > 0;
    };

    const checkVisibility = () => {
      if (isVisible()) {
        runAnimation();
        window.removeEventListener("scroll", checkVisibility);
      }
    };

    checkVisibility();
    window.addEventListener("scroll", checkVisibility, { passive: true });
    window.addEventListener("resize", checkVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", checkVisibility);
      window.removeEventListener("resize", checkVisibility);
    };
  }, [to]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}
