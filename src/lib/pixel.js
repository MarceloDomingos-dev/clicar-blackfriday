import { PROMO } from '../config/promo.js';
import { plans } from '../data/plans.js';

/**
 * Eventos do Meta Pixel (o código base e o PageView ficam no index.html).
 * - Lead: clique em qualquer botão que abre o WhatsApp (desconto da Black Friday, botão flutuante, contato).
 * - InitiateCheckout: clique em "Quero este plano" no plano mensal (vai para a assinatura no sistema).
 */
export function initPixel() {
  document.addEventListener('click', (e) => {
    const a = e.target.closest?.('a[href]');
    if (!a || typeof window.fbq !== 'function') return;
    const href = a.getAttribute('href');
    const card = a.closest('.plan-card');
    const plan = card ? plans.find((p) => p.id === card.id) : null;
    const params = {
      content_name: plan ? plan.name : PROMO.name,
      content_category: PROMO.name,
    };
    if (/wa\.me|whatsapp/i.test(href)) {
      window.fbq('track', 'Lead', params);
    } else if (href.includes('/assinar')) {
      window.fbq('track', 'InitiateCheckout', params);
    }
  });
}
