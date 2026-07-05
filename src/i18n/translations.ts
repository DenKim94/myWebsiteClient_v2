/**
 * Static UI translations for the client.
 *
 * Only the *static* interface text lives here. Content that originates from the
 * backend database (career, education, projects, the "about me" text …) is
 * translated on the server and requested per language via `?lang=`.
 */

/** Supported UI languages. `de` is the default / fallback language. */
export type Language = 'de' | 'en';

/** All supported languages (used e.g. to build the language switcher). */
export const SUPPORTED_LANGUAGES: readonly Language[] = ['de', 'en'] as const;

/** Default language used before a user preference is known. */
export const DEFAULT_LANGUAGE: Language = 'de';

/** Strongly typed shape of a full message catalogue. */
export interface Messages {
  nav: { start: string; portfolio: string; about: string; contact: string };
  hero: {
    eyebrow: string;
    greeting: string;
    /** Words cycled by the typewriter animation after the greeting. */
    words: string[];
    welcome: string;
    ctaProjects: string;
    ctaContact: string;
  };
  projects: {
    title: string;
    intro: string;
    live: string;
    liveTitle: string;
    repo: string;
    repoTitle: string;
    openLive: string;
    viewSource: string;
    loading: string;
    error: (detail: string) => string;
  };
  about: {
    title: string;
    tabs: { job: string; edu: string; life: string };
    noPhoto: string;
    prevPhoto: string;
    nextPhoto: string;
    selectPhoto: string;
    photoAlt: (index: number) => string;
    showPhoto: (index: number) => string;
  };
  contact: {
    title: string;
    intro: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    consent: string;
    send: string;
    sending: string;
    successToast: string;
    errorFallback: string;
  };
  captcha: { label: string; devHint: string };
  footer: { imprint: string };
  a11y: { openMenu: string; closeMenu: string };
  language: { label: string; names: Record<Language, string> };
}

/** German (default) message catalogue. */
const de: Messages = {
  nav: { start: 'Start', portfolio: 'Portfolio', about: 'Über mich', contact: 'Kontakt' },
  hero: {
    eyebrow: 'Build · Reflect · Improve',
    greeting: 'Hallo, ich bin',
    words: ['Denis', 'Softwareentwickler'],
    welcome:
      'Willkommen auf meiner Webseite! Hier lernst du meinen persönlichen Werdegang und meine Leidenschaft für die Softwareentwicklung kennen.',
    ctaProjects: 'Projekte ansehen',
    ctaContact: 'Kontakt aufnehmen',
  },
  projects: {
    title: 'Meine Projekte',
    intro:
      'Im Rahmen meiner kontinuierlichen fachlichen Weiterbildung setze ich auch in meiner Freizeit diverse Entwicklungsprojekte von der Konzeption über die Implementierung bis zum Deployment eigenständig um.',
    live: 'Live',
    liveTitle: 'Eine Live-Version ist verfügbar',
    repo: 'GitHub-Repo',
    repoTitle: 'Quellcode auf GitHub verfügbar',
    openLive: 'Live-Version öffnen',
    viewSource: 'Quellcode ansehen',
    loading: 'Projekte werden geladen …',
    error: (detail) => `Projekte konnten nicht geladen werden: ${detail}`,
  },
  about: {
    title: 'Über mich',
    tabs: { job: 'Berufsweg', edu: 'Bildungsweg', life: 'Lebensweg' },
    noPhoto: 'Kein Foto',
    prevPhoto: 'Vorheriges Foto',
    nextPhoto: 'Nächstes Foto',
    selectPhoto: 'Foto auswählen',
    photoAlt: (index) => `Lebensweg-Foto ${index}`,
    showPhoto: (index) => `Foto ${index} anzeigen`,
  },
  contact: {
    title: 'Kontakt',
    intro:
      'Schreibe mir gerne eine Nachricht bei Fragen oder Feedback. Ich freue mich auf den Austausch und vielen Dank für deinen Besuch!',
    name: 'Name',
    namePlaceholder: 'Dein Name',
    email: 'E-Mail',
    emailPlaceholder: 'name@example.com',
    message: 'Nachricht',
    messagePlaceholder: 'Deine Nachricht …',
    consent: 'Ich stimme der Datenschutzerklärung zu.',
    send: 'Senden',
    sending: 'Senden …',
    successToast: 'Nachricht erfolgreich gesendet — danke!',
    errorFallback: 'Senden fehlgeschlagen.',
  },
  captcha: {
    label: 'Ich bin kein Roboter.',
    devHint:
      'Entwicklungsmodus: Platzhalter-Captcha. Für die Produktion einen Anbieter (reCAPTCHA/hCaptcha) via VITE_CAPTCHA_SITE_KEY einbinden.',
  },
  footer: { imprint: 'Impressum' },
  a11y: { openMenu: 'Menü öffnen', closeMenu: 'Menü schließen' },
  language: { label: 'Sprache', names: { de: 'Deutsch', en: 'English' } },
};

/** English message catalogue. */
const en: Messages = {
  nav: { start: 'Start', portfolio: 'Portfolio', about: 'About me', contact: 'Contact' },
  hero: {
    eyebrow: 'Build · Reflect · Improve',
    greeting: "Hi, I'm",
    words: ['Denis', 'a Software Developer'],
    welcome:
      'Welcome to my website! Here you can get to know my personal career path and my passion for software development.',
    ctaProjects: 'View projects',
    ctaContact: 'Get in touch',
  },
  projects: {
    title: 'My Projects',
    intro:
      'As part of my continuous professional development, I independently realize various development projects in my free time — from conception through implementation to deployment.',
    live: 'Live',
    liveTitle: 'A live version is available',
    repo: 'GitHub repo',
    repoTitle: 'Source code available on GitHub',
    openLive: 'Open live version',
    viewSource: 'View source code',
    loading: 'Loading projects …',
    error: (detail) => `Projects could not be loaded: ${detail}`,
  },
  about: {
    title: 'About me',
    tabs: { job: 'Career', edu: 'Education', life: 'My journey' },
    noPhoto: 'No photo',
    prevPhoto: 'Previous photo',
    nextPhoto: 'Next photo',
    selectPhoto: 'Select photo',
    photoAlt: (index) => `Journey photo ${index}`,
    showPhoto: (index) => `Show photo ${index}`,
  },
  contact: {
    title: 'Contact',
    intro:
      'Feel free to send me a message if you have any questions or feedback. I look forward to hearing from you — and thank you for visiting!',
    name: 'Name',
    namePlaceholder: 'Your name',
    email: 'Email',
    emailPlaceholder: 'name@example.com',
    message: 'Message',
    messagePlaceholder: 'Your message …',
    consent: 'I agree to the privacy policy.',
    send: 'Send',
    sending: 'Sending …',
    successToast: 'Message sent successfully — thank you!',
    errorFallback: 'Sending failed.',
  },
  captcha: {
    label: "I'm not a robot.",
    devHint:
      'Development mode: placeholder captcha. For production, integrate a provider (reCAPTCHA/hCaptcha) via VITE_CAPTCHA_SITE_KEY.',
  },
  footer: { imprint: 'Legal notice' },
  a11y: { openMenu: 'Open menu', closeMenu: 'Close menu' },
  language: { label: 'Language', names: { de: 'Deutsch', en: 'English' } },
};

/** All message catalogues keyed by language. */
export const TRANSLATIONS: Record<Language, Messages> = { de, en };
