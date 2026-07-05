/**
 * Structured content for the legal pages (Impressum / Datenschutzerklärung),
 * rendered by {@link LegalModal}. The content is provided per UI language.
 *
 * The privacy policy is adapted to the actual architecture of this project:
 * the contact form is handled by the site's **own Node.js backend** (which
 * sends mail via SMTP), protected by **Google reCAPTCHA** and rate limiting; the
 * frontend is hosted on **Cloudflare Pages** and the backend is self-hosted and
 * exposed via a **Cloudflare Tunnel**. There is no third-party mail processor
 * (e.g. EmailJS).
 */

import type { Language } from '../i18n/translations';

/** A single rendered block inside a legal section. */
export type LegalBlock =
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'links'; items: { label: string; href: string }[] }
  | { type: 'address'; lines: string[] };

/** A titled section of a legal document. */
export interface LegalSection {
  heading?: string;
  blocks: LegalBlock[];
}

/** A full legal document (Impressum or Datenschutzerklärung). */
export interface LegalDoc {
  title: string;
  /** Optional "last updated" label shown below the title. */
  updated?: string;
  sections: LegalSection[];
}

/** Shared postal address (Impressum + responsible party). */
const ADDRESS_LINES = [
  'denis-kim.dev – Denis Kim',
  'c/o Online-Impressum.de #4784',
  'Europaring 90',
  '53757 Sankt Augustin',
];

const CONTACT_EMAIL = 'denis-kim.dev@mail.online-impressum.de';

const de: { impressum: LegalDoc; datenschutz: LegalDoc } = {
  impressum: {
    title: 'Impressum',
    sections: [
      {
        heading: 'Angaben gemäß § 5 TMG',
        blocks: [{ type: 'address', lines: ADDRESS_LINES }],
      },
      {
        heading: 'Kontakt',
        blocks: [
          { type: 'p', text: `E-Mail: ${CONTACT_EMAIL}` },
          { type: 'p', text: 'Alternative Kontaktmethode: das Kontaktformular dieser Webseite.' },
        ],
      },
      {
        heading: 'Haftung für Inhalte',
        blocks: [
          {
            type: 'p',
            text: 'Als Diensteanbieter bin ich gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG bin ich als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen.',
          },
        ],
      },
    ],
  },
  datenschutz: {
    title: 'Datenschutzerklärung',
    updated: 'Stand: 05.07.2026',
    sections: [
      {
        heading: '1. Allgemeine Hinweise',
        blocks: [
          {
            type: 'p',
            text: 'Ich lege großen Wert auf den Schutz Ihrer persönlichen Daten. In dieser Datenschutzerklärung informiere ich Sie darüber, welche personenbezogenen Daten erhoben werden, wie diese verarbeitet werden und welche Rechte Sie in Bezug auf Ihre Daten haben.',
          },
        ],
      },
      {
        heading: '2. Verantwortlicher',
        blocks: [
          {
            type: 'p',
            text: 'Verantwortlich für die Verarbeitung Ihrer personenbezogenen Daten im Rahmen dieser Webseite bin ich:',
          },
          { type: 'address', lines: ADDRESS_LINES },
        ],
      },
      {
        heading: '3. Erhebung und Verarbeitung personenbezogener Daten',
        blocks: [
          {
            type: 'p',
            text: 'Wenn Sie das Kontaktformular auf dieser Webseite nutzen, erhebe und verarbeite ich folgende personenbezogene Daten:',
          },
          { type: 'list', items: ['Ihren Namen', 'Ihre E-Mail-Adresse', 'den Inhalt Ihrer Nachricht'] },
          {
            type: 'p',
            text: 'Die Verarbeitung dieser Daten ist für die Bearbeitung Ihrer Anfrage über das Kontaktformular erforderlich. Die Übertragung erfolgt ausschließlich verschlüsselt (HTTPS/TLS).',
          },
        ],
      },
      {
        heading: '4. Rechtsgrundlage der Verarbeitung',
        blocks: [
          {
            type: 'p',
            text: 'Die Verarbeitung Ihrer Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Durchführung vorvertraglicher Maßnahmen) sowie Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse, die Kommunikation mit Ihnen zu ermöglichen und die Webseite vor Missbrauch zu schützen).',
          },
        ],
      },
      {
        heading: '5. Speicherdauer',
        blocks: [
          {
            type: 'p',
            text: 'Ihre Daten werden nur so lange gespeichert, wie es zur Bearbeitung Ihrer Anfrage notwendig ist. Sobald der Zweck erfüllt ist, werden die Daten gelöscht, sofern keine gesetzlichen Aufbewahrungsfristen entgegenstehen.',
          },
        ],
      },
      {
        heading: '6. Weitergabe von Daten',
        blocks: [
          {
            type: 'p',
            text: 'Ihre Daten werden nicht zu Werbezwecken an Dritte weitergegeben. Eine Übermittlung an technische Dienstleister (Hosting, Bot-Schutz) erfolgt ausschließlich im nachfolgend beschriebenen Umfang und auf Grundlage entsprechender Verträge zur Auftragsverarbeitung.',
          },
        ],
      },
      {
        heading: '7. E-Mail-Versand über einen eigenen Server',
        blocks: [
          {
            type: 'p',
            text: 'Die über das Kontaktformular eingegebenen Daten werden an das von mir selbst betriebene Backend (Node.js) übertragen und von dort über den E-Mail-Anbieter GMX (1&1 Mail & Media GmbH) per SMTP an meine persönliche E-Mail-Adresse zugestellt. Es kommt kein zusätzlicher Drittanbieter zur Verarbeitung der Formularinhalte (z. B. EmailJS) zum Einsatz.',
          },
        ],
      },
      {
        heading: '8. Schutz vor Missbrauch (Google reCAPTCHA)',
        blocks: [
          {
            type: 'p',
            text: 'Zum Schutz des Kontaktformulars vor automatisierten Anfragen (Bots) setze ich Google reCAPTCHA ein, einen Dienst der Google Ireland Limited. reCAPTCHA analysiert das Nutzerverhalten und verarbeitet dabei u. a. Ihre IP-Adresse sowie Informationen zu Ihrem Browser. Zusätzlich begrenze ich die Anzahl der Anfragen pro Zeitraum (Rate-Limiting).',
          },
          {
            type: 'p',
            text: 'Die Verarbeitung erfolgt auf Grundlage meines berechtigten Interesses (Art. 6 Abs. 1 lit. f DSGVO) an der Abwehr von Missbrauch. Dabei können Daten in Drittländer (insbesondere die USA) übermittelt werden; hierfür wurden geeignete Garantien i. S. d. Art. 46 DSGVO (EU-Standardvertragsklauseln) getroffen.',
          },
          {
            type: 'links',
            items: [
              { label: 'Datenschutzerklärung von Google', href: 'https://policies.google.com/privacy' },
            ],
          },
        ],
      },
      {
        heading: '9. Hosting (Cloudflare)',
        blocks: [
          {
            type: 'p',
            text: 'Das Frontend dieser Webseite wird auf Cloudflare Pages gehostet; das selbst betriebene Backend ist über einen Cloudflare-Tunnel erreichbar. Anbieter ist die Cloudflare, Inc. Dabei können technisch notwendige Daten (insbesondere Ihre IP-Adresse) verarbeitet werden, um die Auslieferung, Sicherheit und Verfügbarkeit der Webseite zu gewährleisten (u. a. Schutz vor DDoS-Angriffen).',
          },
          {
            type: 'p',
            text: 'Auch hierbei können Daten in Drittländer (insbesondere die USA) übermittelt werden; es wurden geeignete Garantien i. S. d. Art. 46 DSGVO getroffen.',
          },
          {
            type: 'links',
            items: [
              { label: 'Datenschutzerklärung von Cloudflare', href: 'https://www.cloudflare.com/de-de/privacypolicy/' },
            ],
          },
        ],
      },
      {
        heading: '10. Ihre Rechte',
        blocks: [
          { type: 'p', text: 'Sie haben das Recht:' },
          {
            type: 'list',
            items: [
              'Auskunft über die von mir verarbeiteten personenbezogenen Daten zu verlangen (Art. 15 DSGVO),',
              'die Berichtigung unrichtiger oder die Vervollständigung unvollständiger Daten zu verlangen (Art. 16 DSGVO),',
              'die Löschung Ihrer Daten zu verlangen (Art. 17 DSGVO),',
              'die Einschränkung der Verarbeitung Ihrer Daten zu verlangen (Art. 18 DSGVO),',
              'Ihre Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten (Art. 20 DSGVO),',
              'Widerspruch gegen die Verarbeitung Ihrer Daten einzulegen (Art. 21 DSGVO),',
              'sich bei einer Aufsichtsbehörde zu beschweren (Art. 77 DSGVO).',
            ],
          },
          {
            type: 'links',
            items: [
              {
                label: 'Bundesbeauftragter für den Datenschutz und die Informationsfreiheit (BfDI)',
                href: 'https://www.bfdi.bund.de/DE/Home/home_node.html',
              },
            ],
          },
        ],
      },
      {
        heading: '11. Sicherheitsmaßnahmen',
        blocks: [
          {
            type: 'p',
            text: 'Ich treffe technische und organisatorische Maßnahmen, um Ihre Daten vor Verlust, Missbrauch und unbefugtem Zugriff zu schützen. Die gesamte Datenübertragung erfolgt verschlüsselt über HTTPS/TLS.',
          },
        ],
      },
      {
        heading: '12. Änderungen dieser Datenschutzerklärung',
        blocks: [
          {
            type: 'p',
            text: 'Diese Datenschutzerklärung kann bei Bedarf aktualisiert werden, um gesetzlichen Anforderungen zu entsprechen. Die jeweils aktuelle Version finden Sie auf dieser Webseite.',
          },
        ],
      },
    ],
  },
};

const en: { impressum: LegalDoc; datenschutz: LegalDoc } = {
  impressum: {
    title: 'Legal Notice',
    sections: [
      {
        heading: 'Information pursuant to § 5 TMG',
        blocks: [{ type: 'address', lines: ADDRESS_LINES }],
      },
      {
        heading: 'Contact',
        blocks: [
          { type: 'p', text: `E-mail: ${CONTACT_EMAIL}` },
          { type: 'p', text: 'Alternative contact method: the contact form on this website.' },
        ],
      },
      {
        heading: 'Liability for content',
        blocks: [
          {
            type: 'p',
            text: 'As a service provider, I am responsible for my own content on these pages in accordance with § 7 (1) TMG and general law. Under §§ 8 to 10 TMG, however, I am not obliged to monitor transmitted or stored third-party information.',
          },
        ],
      },
    ],
  },
  datenschutz: {
    title: 'Privacy Policy',
    updated: 'Last updated: 2026-07-05',
    sections: [
      {
        heading: '1. General information',
        blocks: [
          {
            type: 'p',
            text: 'I attach great importance to the protection of your personal data. This privacy policy informs you about which personal data is collected, how it is processed and what rights you have with regard to your data.',
          },
        ],
      },
      {
        heading: '2. Controller',
        blocks: [
          {
            type: 'p',
            text: 'The controller responsible for processing your personal data within this website is:',
          },
          { type: 'address', lines: ADDRESS_LINES },
        ],
      },
      {
        heading: '3. Collection and processing of personal data',
        blocks: [
          {
            type: 'p',
            text: 'When you use the contact form on this website, I collect and process the following personal data:',
          },
          { type: 'list', items: ['your name', 'your e-mail address', 'the content of your message'] },
          {
            type: 'p',
            text: 'Processing this data is necessary to handle your request submitted via the contact form. The transmission is always encrypted (HTTPS/TLS).',
          },
        ],
      },
      {
        heading: '4. Legal basis for processing',
        blocks: [
          {
            type: 'p',
            text: 'Your data is processed on the basis of Art. 6 (1) (b) GDPR (performance of pre-contractual measures) and Art. 6 (1) (f) GDPR (legitimate interest in enabling communication with you and protecting the website from misuse).',
          },
        ],
      },
      {
        heading: '5. Storage period',
        blocks: [
          {
            type: 'p',
            text: 'Your data is stored only for as long as necessary to process your request. Once the purpose has been fulfilled, the data is deleted, unless statutory retention periods apply.',
          },
        ],
      },
      {
        heading: '6. Disclosure of data',
        blocks: [
          {
            type: 'p',
            text: 'Your data is not passed on to third parties for advertising purposes. Any transfer to technical service providers (hosting, bot protection) takes place only to the extent described below and on the basis of corresponding data processing agreements.',
          },
        ],
      },
      {
        heading: '7. E-mail delivery via my own server',
        blocks: [
          {
            type: 'p',
            text: 'The data entered in the contact form is transmitted to the backend (Node.js) that I operate myself and delivered from there via the e-mail provider GMX (1&1 Mail & Media GmbH) by SMTP to my personal e-mail address. No additional third-party service (e.g. EmailJS) is used to process the form content.',
          },
        ],
      },
      {
        heading: '8. Protection against misuse (Google reCAPTCHA)',
        blocks: [
          {
            type: 'p',
            text: 'To protect the contact form against automated requests (bots) I use Google reCAPTCHA, a service provided by Google Ireland Limited. reCAPTCHA analyses user behaviour and processes, among other things, your IP address and information about your browser. In addition, I limit the number of requests per time period (rate limiting).',
          },
          {
            type: 'p',
            text: 'Processing is based on my legitimate interest (Art. 6 (1) (f) GDPR) in preventing misuse. Data may be transferred to third countries (in particular the USA); appropriate safeguards within the meaning of Art. 46 GDPR (EU standard contractual clauses) are in place.',
          },
          {
            type: 'links',
            items: [{ label: "Google's privacy policy", href: 'https://policies.google.com/privacy' }],
          },
        ],
      },
      {
        heading: '9. Hosting (Cloudflare)',
        blocks: [
          {
            type: 'p',
            text: 'The frontend of this website is hosted on Cloudflare Pages; the self-operated backend is reachable via a Cloudflare Tunnel. The provider is Cloudflare, Inc. In this context, technically necessary data (in particular your IP address) may be processed to ensure the delivery, security and availability of the website (including protection against DDoS attacks).',
          },
          {
            type: 'p',
            text: 'Here, too, data may be transferred to third countries (in particular the USA); appropriate safeguards within the meaning of Art. 46 GDPR are in place.',
          },
          {
            type: 'links',
            items: [
              { label: "Cloudflare's privacy policy", href: 'https://www.cloudflare.com/privacypolicy/' },
            ],
          },
        ],
      },
      {
        heading: '10. Your rights',
        blocks: [
          { type: 'p', text: 'You have the right:' },
          {
            type: 'list',
            items: [
              'to request information about the personal data I process (Art. 15 GDPR),',
              'to request the correction of inaccurate or completion of incomplete data (Art. 16 GDPR),',
              'to request the erasure of your data (Art. 17 GDPR),',
              'to request the restriction of processing of your data (Art. 18 GDPR),',
              'to receive your data in a structured, commonly used and machine-readable format (Art. 20 GDPR),',
              'to object to the processing of your data (Art. 21 GDPR),',
              'to lodge a complaint with a supervisory authority (Art. 77 GDPR).',
            ],
          },
          {
            type: 'links',
            items: [
              {
                label: 'German Federal Commissioner for Data Protection (BfDI)',
                href: 'https://www.bfdi.bund.de/EN/Home/home_node.html',
              },
            ],
          },
        ],
      },
      {
        heading: '11. Security measures',
        blocks: [
          {
            type: 'p',
            text: 'I take technical and organisational measures to protect your data against loss, misuse and unauthorised access. All data transmission is encrypted via HTTPS/TLS.',
          },
        ],
      },
      {
        heading: '12. Changes to this privacy policy',
        blocks: [
          {
            type: 'p',
            text: 'This privacy policy may be updated as necessary to comply with legal requirements. You will always find the current version on this website.',
          },
        ],
      },
    ],
  },
};

/** Legal documents keyed by UI language. */
export const LEGAL_CONTENT: Record<Language, { impressum: LegalDoc; datenschutz: LegalDoc }> = {
  de,
  en,
};

/** The kinds of legal document that can be shown. */
export type LegalKind = 'impressum' | 'datenschutz';
