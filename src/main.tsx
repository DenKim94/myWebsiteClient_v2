import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { LanguageProvider } from './i18n/LanguageContext';
import { PortfolioProvider } from './context/PortfolioContext';
import { LegalProvider } from './context/LegalContext';
import './styles/index.css';

const container = document.getElementById('root');
if (!container) throw new Error('Root element #root not found');

createRoot(container).render(
  <StrictMode>
    <LanguageProvider>
      <PortfolioProvider>
        <LegalProvider>
          <App />
        </LegalProvider>
      </PortfolioProvider>
    </LanguageProvider>
  </StrictMode>,
);
