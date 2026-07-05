# Portfolio Client (Frontend)

React 19 + TypeScript + Vite frontend for the personal portfolio website of
Denis Kim. The app presents the personal/professional journey and the projects,
and provides a contact form (with captcha + e-mail service).

> **Note on how this project was built:** This client was implemented by an
> **AI agent**. The developer (Denis Kim) **orchestrated** the work — defining
> the goals, requirements and design, reviewing each step and steering the
> individual implementation increments. The agent produced the code, the
> developer directed and validated it.

## Backend-driven by design

The frontend is **backend-driven**: all content (career, education, projects,
the "about me" text) and all photos/logos are loaded at runtime from the backend
(`server/`, a separate repo/dev branch). Nothing content-related is hardcoded.
Only small UI-chrome icons are bundled in the client. Backend images are fetched
once per session and cached client-side for performance.

## Architecture (layers)

```
UI-Layer                -> src/components/*, src/ds/* (design system)
Context / API-Layer     -> src/context/PortfolioContext.tsx, src/context/LegalContext.tsx
                           src/i18n/LanguageContext.tsx
                           src/api/apiClient.ts, src/api/imageCache.ts
```

- **`PortfolioContext`** loads the portfolio for the active language from the
  backend and caches already-loaded languages in memory.
- **`imageCache` + `CachedImage`** fetch each backend image once (deduplicated
  via an in-flight promise cache) and reuse the object URL across renders.
- **`LanguageContext`** provides the DE/EN UI catalogue and persists the choice
  in `localStorage`; the backend content is requested per language via `?lang=`.
- **`LegalContext` + `LegalModal`** render the Impressum / Datenschutzerklärung
  as an accessible modal in the active language.

## Project structure

```
src/
├─ api/            # apiClient (fetch portfolio / contact), image cache
├─ assets/         # bundled UI icons (SVG) + icon barrel
├─ components/     # page sections: Hero, Projects, About, Contact, Footer,
│                  # NavBar helpers, CachedImage, Captcha, LegalModal, ...
├─ content/        # structured legal content (Impressum / Datenschutz, DE/EN)
├─ context/        # PortfolioContext, LegalContext
├─ ds/             # design-system components (Button, Card, Tabs, Input, ...)
├─ hooks/          # useTypewriter, useScrollSpy, useReveal
├─ i18n/           # LanguageContext + static UI translations (DE/EN)
├─ styles/         # design tokens (styles/tokens/*) + landing.css
└─ types/          # shared TypeScript types (Portfolio model)
```

## Requirements

- Node.js >= 20 (recommended: 22, see repo root `.nvmrc`)
- The backend (`server/`) running on `http://localhost:3001` (see its README).

## Setup & scripts

```bash
cd client
cp .env.example .env      # adjust if needed
npm install

npm run dev        # start Vite dev server on http://localhost:5173
npm run build      # type-check (tsc -b) + production build to dist/
npm run preview    # preview the production build
npm run typecheck  # type-check without emitting
```

During development, all `/api` requests are proxied by Vite to the backend
(`:5173 → :3001`, see `vite.config.ts`), so the client can run against a local
server without CORS issues.

## Environment variables

| Variable                | Purpose                                                                 |
| ----------------------- | ----------------------------------------------------------------------- |
| `VITE_API_BASE_URL`     | Backend origin in production. **Empty in dev** (requests go to `/api`).  |
| `VITE_DEV_API_TARGET`   | Dev proxy target (defaults to `http://localhost:3001`).                  |
| `VITE_CAPTCHA_SITE_KEY` | Public Google reCAPTCHA v2 site key. Empty → local placeholder captcha.  |

## Features

- **Internationalization (DE/EN):** language switcher in the header/drawer;
  translates both the UI and the backend content; persisted in `localStorage`.
- **Backend image caching:** `CachedImage` + `imageCache` load each image once.
- **Contact form:** validation, consent, **Google reCAPTCHA v2** widget
  (dark theme). The token is verified server-side before an e-mail is sent.
  When no site key is configured, a lightweight development placeholder is used.
- **Photo slider ("Lebensweg"):** driven by `about.images` from the backend; it
  is **hidden entirely** when the backend provides no images.
- **Legal pages:** Impressum (footer) and Datenschutzerklärung (contact consent
  link) as an accessible modal, in DE/EN, matching the design.
- **Responsive & accessible:** mobile drawer navigation, reduced-motion support,
  keyboard-dismissable modal, semantic roles/labels.

## Design system

The look & feel is reproduced from the provided design export via design tokens
(`src/styles/tokens/*`: colors, typography, spacing, effects) and a small set of
composable DS components in `src/ds/` (`Button`, `Tag`, `Card`, `Tabs`, `Input`,
`Textarea`, `Checkbox`, `NavBar`). Page-level styles live in
`src/styles/landing.css`.

## Deployment

The client is built to static assets (`npm run build` → `dist/`) and is intended
to be hosted on **Cloudflare Pages** under the domain `denis-kim.dev`. Set
`VITE_API_BASE_URL` to the public backend URL (reachable via the Raspberry Pi 5
Cloudflared tunnel) for the production build.
