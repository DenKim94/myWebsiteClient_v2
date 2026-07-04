import { useEffect, useState } from 'react';

/**
 * Tracks which section is currently active based on scroll position. A probe
 * line 30% below the top of the viewport determines the active section; when the
 * page bottom is reached the last section wins.
 * @param sectionIds Ordered list of section element ids.
 * @returns The id of the currently active section.
 */
export function useScrollSpy(sectionIds: string[]): string {
  const [active, setActive] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    const onScroll = () => {
      const probe = window.innerHeight * 0.3;
      let current = sectionIds[0] ?? '';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - probe <= 1) current = id;
      }
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
        current = sectionIds[sectionIds.length - 1] ?? current;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [sectionIds]);

  return active;
}
