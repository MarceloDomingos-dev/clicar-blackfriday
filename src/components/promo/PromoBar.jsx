import { PROMO } from '../../config/promo.js';
import { Countdown } from './Countdown.jsx';

/** Faixa fixa no topo: condição da Black Friday + contagem regressiva. */
export function PromoBar() {
  return (
    <a className="bf-bar" href="#planos">
      <span className="bf-bar__tag">{PROMO.name}</span>
      <span className="bf-bar__text">
        <strong>{PROMO.discountPercent}% off</strong> em todos os planos no {PROMO.billing}
      </span>
      <span className="bf-bar__time">
        Termina em <Countdown compact />
      </span>
    </a>
  );
}
