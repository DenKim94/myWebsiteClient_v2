/** Ordered section ids used for scroll-spy and in-page navigation. */
export const SECTIONS = ['start', 'portfolio', 'about', 'contact'] as const;

/**
 * Navigation structure: section id + whether the item is the contact CTA.
 * The visible labels are resolved per language from the i18n catalogue.
 */
export const NAV_STRUCTURE: { id: (typeof SECTIONS)[number]; cta?: boolean }[] = [
  { id: 'start' },
  { id: 'portfolio' },
  { id: 'about' },
  { id: 'contact', cta: true },
];

/**
 * File name of the hero portrait image in the backend data directory. Kept as a
 * client-side config constant; the image bytes are still served (and cached)
 * from the backend.
 */
export const PORTRAIT_IMAGE_NAME = 'IMG_TITLE.jpeg';
