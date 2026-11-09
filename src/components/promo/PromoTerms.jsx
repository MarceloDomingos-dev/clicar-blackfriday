import { CalendarClock, Layers, Repeat } from 'lucide-react';
import { PROMO } from '../../config/promo.js';

/** As três regras da promoção, usadas na abertura e nos planos. */
export function PromoTerms({ className = '' }) {
  const items = [
    {
      icon: Layers,
      title: 'Todos os planos',
      text: `${PROMO.discountPercent}% off do Essencial ao Avançado`,
    },
    {
      icon: Repeat,
      title: 'Somente no anual',
      text: `Desconto válido apenas na contratação do ${PROMO.billing}`,
    },
    {
      icon: CalendarClock,
      title: `Até ${PROMO.endsLabel}`,
      text: 'Depois disso, os preços voltam ao normal',
    },
  ];
  return (
    <ul className={`bf-terms ${className}`}>
      {items.map(({ icon: Icon, title, text }) => (
        <li key={title} className="bf-terms__item">
          <Icon size={20} aria-hidden="true" className="bf-terms__icon" />
          <span>
            <strong>{title}</strong>
            <span>{text}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
