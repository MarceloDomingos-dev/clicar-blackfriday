import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';
import '@fontsource/inter/latin-700.css';
import '@fontsource/sora/latin-500.css';
import '@fontsource/sora/latin-600.css';
import '@fontsource/sora/latin-700.css';
import './styles/site.css';
import './styles/promo.css';
import App from './App.jsx';
import { isContactConfigured } from './config/site.js';
import { initPixel } from './lib/pixel.js';

// Marca cedo que haverá animação, para os títulos não piscarem antes de animar.
if (window.matchMedia?.('(prefers-reduced-motion: no-preference)').matches) {
  document.documentElement.classList.add('has-motion');
}

// Aviso só no ambiente de desenvolvimento: lembra de configurar o destino dos botões de contato.
if (import.meta.env.DEV && !isContactConfigured()) {
  console.warn(
    '[CliCar app] CONTACT.url não configurado em src/config/site.js: botões de contato apontam para #demonstracao.',
  );
}

initPixel();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
