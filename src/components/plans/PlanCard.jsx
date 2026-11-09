import { Bot, Check, CornerDownRight, MessageCircle, Star } from 'lucide-react';
import { SDR_LEVEL } from '../../data/plans.js';
import { previousPlan } from '../../lib/plans.js';
import { PROMO, promoPrice } from '../../config/promo.js';
import { PromoButton } from '../promo/PromoButton.jsx';
import { LevelMeter } from './LevelMeter.jsx';

export function PlanCard({ plan }) {
  const prev = previousPlan(plan);
  const hasSdr = plan.level >= SDR_LEVEL;
  const titleId = `${plan.id}-titulo`;
  const promo = promoPrice(plan.price);

  return (
    <article
      id={plan.id}
      className={`plan-card${plan.featured ? ' plan-card--featured on-dark' : ''}`}
      aria-labelledby={titleId}
    >
      <p className={`plan-card__badge${plan.badge ? '' : ' plan-card__badge--bf'}`}>
        <Star size={13} fill="currentColor" aria-hidden="true" /> {plan.badge ?? PROMO.name}
      </p>

      <header className="plan-card__head">
        <div className="plan-card__top">
          <h3 id={titleId} className="plan-card__name">
            <span className="label">{plan.name}</span>
            <span className="plan-card__title">{plan.title}</span>
          </h3>
          <LevelMeter level={plan.level} />
        </div>
        <div className="plan-card__promo">
          <p className="plan-card__was">
            <span className="sr-only">Preço normal: </span>
            <s>{plan.price}</s>
            <span className="plan-card__off">−{PROMO.discountPercent}%</span>
          </p>
          <p className="plan-card__price">
            <span className="sr-only">Preço na Black Friday, no plano anual: </span>
            <span data-count>{promo.label}</span>
          </p>
          <p className="plan-card__annual">
            no {PROMO.billing} · <strong>{promo.yearLabel}</strong> no ano
          </p>
        </div>
        <p className="plan-card__summary">{plan.summary}</p>
      </header>

      <div className="plan-card__channels" role="group" aria-label="Atendimento pelo WhatsApp neste plano">
        <span className="chip">
          <MessageCircle size={14} aria-hidden="true" /> WhatsApp integrado
        </span>
        {hasSdr ? (
          <span className="chip chip--sdr">
            <Bot size={14} aria-hidden="true" /> IA SDR no WhatsApp
          </span>
        ) : (
          <span className="chip chip--muted">Sem IA SDR</span>
        )}
      </div>

      <div className="plan-card__body">
        {prev ? (
          <p className="plan-card__inherit">
            <CornerDownRight size={16} aria-hidden="true" />
            <span>
              Inclui <strong>tudo do {prev.name}</strong>, mais:
            </span>
          </p>
        ) : (
          <p className="plan-card__inherit label">Inclui</p>
        )}
        <ul className="plan-card__list">
          {plan.highlights.map((h) => (
            <li key={h.label}>
              <Check size={16} strokeWidth={3} className="plan-card__check" aria-hidden="true" />
              <span>
                <strong>{h.label}:</strong> {h.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <footer className="plan-card__foot">
        <PromoButton plan={plan} size="lg" block variant={plan.featured ? 'primary' : 'dark'}>
          Garantir {PROMO.discountPercent}% off<span className="sr-only"> no {plan.name}</span>
        </PromoButton>
        <a className="plan-card__more" href="#comparar">
          Ver todos os recursos
        </a>
      </footer>
    </article>
  );
}
