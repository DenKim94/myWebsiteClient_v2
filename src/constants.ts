import type { NavItem } from './ds';

/** Ordered section ids used for scroll-spy and in-page navigation. */
export const SECTIONS = ['start', 'portfolio', 'about', 'contact'] as const;

/** Navigation items shown in the header and mobile drawer. */
export const NAV_ITEMS: NavItem[] = [
  { id: 'start', label: 'Start' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'about', label: 'Über mich' },
  { id: 'contact', label: 'Kontakt', cta: true },
];

/** Words cycled by the hero typewriter animation. */
export const HERO_WORDS = ['Denis', 'Softwareentwickler'];

/**
 * File name of the hero portrait image in the backend data directory. Kept as a
 * client-side config constant; the image bytes are still served (and cached)
 * from the backend.
 */
export const PORTRAIT_IMAGE_NAME = 'IMG_TITLE.jpeg';
