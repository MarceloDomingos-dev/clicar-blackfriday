import { COMPANY } from '../../config/site.js';
import { PROMO } from '../../config/promo.js';
import { Button } from '../ui/Button.jsx';

export function promoWhatsAppHref(planName = null) {
  return `${COMPANY.whatsapp}?text=${encodeURIComponent(PROMO.whatsappMessage(planName))}`;
}

/** Botão da promoção: abre o WhatsApp com a mensagem da Black Friday já escrita. */
export function PromoButton({ plan = null, children = 'Quero meu desconto', ...rest }) {
  return (
    <Button href={promoWhatsAppHref(plan?.name)} external data-promo="true" {...rest}>
      {children}
    </Button>
  );
}
