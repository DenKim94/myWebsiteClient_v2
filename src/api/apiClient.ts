import type { Portfolio } from '../types/portfolio';
import type { Language } from '../i18n/translations';

/**
 * Base URL of the backend API. Empty in development so requests hit `/api` and
 * are proxied by Vite to the backend (see vite.config.ts). Set to the deployed
 * backend origin in production via `VITE_API_BASE_URL`.
 */
export const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? '';

/**
 * Builds the absolute URL for a backend image/icon served by the API.
 * @param name File name of the image (as referenced by the database).
 */
export function imageUrl(name: string): string {
  return `${API_BASE_URL}/api/images/${encodeURIComponent(name)}`;
}

/** Payload sent to the contact endpoint. */
export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  captchaToken: string;
  /** UI language, so the backend can localize its response message. */
  lang: Language;
}

/** Response returned by the contact endpoint. */
export interface ContactResponse {
  success: boolean;
  dryRun: boolean;
  message: string;
}

/**
 * Fetches the aggregated portfolio from the backend in the given language.
 * @param lang Content language requested from the backend.
 * @param signal Optional abort signal.
 * @throws Error when the request fails.
 */
export async function fetchPortfolio(lang: Language, signal?: AbortSignal): Promise<Portfolio> {
  const response = await fetch(`${API_BASE_URL}/api/portfolio?lang=${encodeURIComponent(lang)}`, {
    signal,
  });
  if (!response.ok) {
    throw new Error(`Failed to load portfolio (HTTP ${response.status})`);
  }
  return (await response.json()) as Portfolio;
}

/**
 * Submits the contact form to the backend e-mail service.
 * @param payload Contact form data including the captcha token.
 */
export async function postContact(payload: ContactPayload): Promise<ContactResponse> {
  const response = await fetch(`${API_BASE_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = (await response.json().catch(() => ({}))) as Partial<ContactResponse> & {
    error?: string;
  };
  if (!response.ok) {
    throw new Error(data.error ?? `Request failed (HTTP ${response.status})`);
  }
  return {
    success: data.success ?? true,
    dryRun: data.dryRun ?? false,
    message: data.message ?? 'Gesendet.',
  };
}
