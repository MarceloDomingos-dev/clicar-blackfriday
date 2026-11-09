import { SIGNUP, TRACKING } from '../config/site.js';

const REDIRECT_TIMEOUT = 800;

/**
 * Conversão do Google Ads no clique de "Teste 7 dias grátis" (mesma regra do site no ar).
 * Espera a tag confirmar o envio (até 800 ms) e só então abre o cadastro.
 */
export function initTracking() {
  const signup = SIGNUP.url.trim();
  if (!signup) return;
  document.addEventListener('click', (e) => {
    const a = e.target.closest?.(`a[href^="${signup}"]`);
    if (!a || typeof window.gtag !== 'function') return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) {
      window.gtag('event', 'conversion', { send_to: TRACKING.signupConversion });
      return;
    }
    e.preventDefault();
    let done = false;
    const go = () => {
      if (done) return;
      done = true;
      window.location.href = a.href;
    };
    window.gtag('event', 'conversion', { send_to: TRACKING.signupConversion, event_callback: go });
    setTimeout(go, REDIRECT_TIMEOUT);
  });
}
