import { useEffect, useRef, useState } from 'react';

/**
 * Tracks the scroll progress of a target element through the viewport.
 * Returns a value from 0 to 1:
 *   0 = the element's top has just entered the bottom of the viewport
 *   1 = the element's bottom has just left the top of the viewport
 *
 * Uses a single scroll listener with rAF throttling for performance.
 */
export function useScrollProgress<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const total = rect.height + vh;
      const scrolled = vh - rect.top;
      const raw = total === 0 ? 0 : scrolled / total;
      setProgress(Math.max(0, Math.min(1, raw)));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return { ref, progress };
}
