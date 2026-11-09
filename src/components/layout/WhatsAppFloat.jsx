import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { promoWhatsAppHref } from '../promo/PromoButton.jsx';

/** Botão flutuante de WhatsApp. Aparece depois da abertura, para não cobrir a tela do sistema. */
export function WhatsAppFloat() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <a
      className={`wa-float${show ? ' is-visible' : ''}`}
      href={promoWhatsAppHref()}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={show ? 0 : -1}
      aria-hidden={show ? undefined : 'true'}
    >
      <MessageCircle size={26} aria-hidden="true" />
      <span className="sr-only">Falar no WhatsApp (abre em nova aba)</span>
    </a>
  );
}
