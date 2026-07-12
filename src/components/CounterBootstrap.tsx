'use client';

export function CounterBootstrap() {
  if (typeof window === 'undefined') return null;

  // Auto-boot counter animation on all pages
  if (typeof window !== 'undefined') {
    const setupCounters = () => {
      const counterSpans = Array.from(
        document.querySelectorAll('p.font-serif.text-5xl.text-oxblood span')
      ) as HTMLSpanElement[];

      if (counterSpans.length === 0) return;

      const targetValues = [2004, 19, 1];
      const lastValues = [NaN, NaN, NaN];

      const updateCounters = () => {
        counterSpans.forEach((span, i) => {
          const rect = span.getBoundingClientRect();
          const vh = window.innerHeight;
          const progress = Math.max(0, Math.min(1, (vh - rect.top) / vh));
          const newCount = Math.round(progress * targetValues[i]);

          if (newCount !== lastValues[i]) {
            lastValues[i] = newCount;
            span.textContent = String(newCount);
          }
        });
      };

      // Initial update
      updateCounters();

      // Listen to scroll
      window.addEventListener('scroll', updateCounters, { passive: true });

      // Cleanup
      return () => {
        window.removeEventListener('scroll', updateCounters);
      };
    };

    // Setup after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupCounters);
    } else {
      setupCounters();
    }
  }

  return null;
}
