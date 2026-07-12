"use client";

import { useRef, useEffect, useState } from "react";

/**
 * Animates a counter from 0 to `to` using a native scroll listener.
 * When the element enters the viewport, the number increments as you scroll down.
 */
export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Intersection Observer: detect when element enters viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) {
      setCount(0);
      return;
    }

    // Scroll listener: increment count as user scrolls
    const handleScroll = () => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;

      // Progress: 0 (top of viewport) to 1 (bottom of viewport)
      const progress = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight));
      setCount(Math.floor(progress * to));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible, to]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}
