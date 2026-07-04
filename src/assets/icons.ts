/**
 * UI-chrome icons bundled as static client assets (part of the design system,
 * not database-driven content). Vite resolves each import to an asset URL.
 */
import workIcon from './icons/Work_Icon.svg';
import educationIcon from './icons/Education_Icon.svg';
import personIcon from './icons/Person_Icon.svg';
import arrowRightIcon from './icons/arrowRight_Icon.svg';
import sendIcon from './icons/Send_Icon.svg';
import githubIcon from './icons/GitHub_Icon.svg';
import linkedinIcon from './icons/LinkedIn_Icon.svg';

export const icons = {
  work: workIcon,
  education: educationIcon,
  person: personIcon,
  arrowRight: arrowRightIcon,
  send: sendIcon,
  github: githubIcon,
  linkedin: linkedinIcon,
} as const;
