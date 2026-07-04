import { useEffect } from 'react';

/**
 * Adds the `in` class to every `.reveal` element once it scrolls into view,
 * triggering the slide-up entrance animation. Re-runs whenever `deps` change so
 * newly rendered elements (e.g. after data loads) are observed too.
 * @param deps Dependency list that indicates the DOM may have changed.
 */
export function useReveal(deps: unknown[] = []): void {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal:not(.in)');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
