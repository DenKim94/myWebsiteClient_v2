/**
 * API model types. Mirror the normalized types exposed by the backend
 * (`server/src/types/portfolio.ts`). Kept in sync manually; a shared package
 * can be introduced later if desired.
 */

export interface JobExperience {
  jobTitle: string;
  company: string;
  url: string;
  location: string;
  timePeriod: string;
  duties: string[];
}

export interface Education {
  institution: string;
  description: string;
  timePeriod: string;
  duties: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  effort: string;
  techStack: string[];
  url: string;
  logo: string;
  notes: string[];
}

export interface About {
  text: string;
  images: string[];
}

export interface SocialLink {
  url: string;
  logo: string;
}

export interface Portfolio {
  about: About;
  experience: JobExperience[];
  education: Education[];
  projects: Project[];
  social: SocialLink[];
}
