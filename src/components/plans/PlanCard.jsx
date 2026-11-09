import { Bot, Building, Building2, Check, Landmark, MessageCircle, Star, Store } from 'lucide-react';
import { SDR_LEVEL } from '../../data/plans.js';
import { previousPlan } from '../../lib/plans.js';
import { PROMO, promoPrice } from '../../config/promo.js';
import { PromoButton } from '../promo/PromoButton.jsx';
import { Button } from '../ui/Button.jsx';
import { getSubscribeLink } from '../../config/site.js';

/** Ícone de cada plano, do menor para o maior (igual ao site no ar). */
const PLAN_ICONS = { 1: Store, 2: Building, 3: Building2, 4: Landmark };

/** `billing`: 'anual' (Black Friday, 50% off) ou 'mensal' (preço normal). */
export function PlanCard({ plan, billing = 'anual' }) {
  const annual = billing === 'anual';
  const prev = previousPlan(plan);
  const hasSdr = plan.level >= SDR_LEVEL;
  const titleId = `${plan.id}-titulo`;
  const Icon = PLAN_ICONS[plan.level] ?? Store;
  const promo = promoPrice(plan.price);

  return (
    <article
      id={plan.id}
      className={`plan-card${plan.featured ? ' plan-card--featured on-dark' : ''}`}
      aria-labelledby={titleId}
    >
      {(plan.badge || annual) && (
        <p className={`plan-card__badge${plan.badge ? '' : ' plan-card__badge--bf'}`}>
          <Star size={13} fill="currentColor" aria-hidden="true" /> {plan.badge ?? PROMO.name}
        </p>
      )}

      <header className="plan-card__head">
        <div className="plan-card__top">
          <span className="plan-card__icon" aria-hidden="true">
            <Icon size={26} strokeWidth={2.25} />
          </span>
          <h3 id={titleId} className="plan-card__name">
            <span className="plan-card__title">{plan.title}</span>
          </h3>
        </div>
        <p className="plan-card__summary">{plan.summary}</p>
      </header>

      <div className="plan-card__channels" role="group" aria-label="Atendimento pelo WhatsApp neste plano">
        <span className="chip">
          <MessageCircle size={14} aria-hidden="true" /> WhatsApp integrado
        </span>
        {hasSdr ? (
          <span className="chip chip--sdr">
            <Bot size={14} aria-hidden="true" /> IA SDR
          </span>
        ) : (
          <span className="chip chip--muted">Sem IA SDR</span>
        )}
      </div>

      <div className="plan-card__body">
        <ul className="plan-card__list">
          {prev && (
            <li>
              <span className="plan-card__check" aria-hidden="true">
                <Check size={12} strokeWidth={3.5} />
              </span>
              <span>
                <strong>Tudo do {prev.name}</strong>
              </span>
            </li>
          )}
          {plan.highlights.map((h) => (
            <li key={h.label}>
              <span className="plan-card__check" aria-hidden="true">
                <Check size={12} strokeWidth={3.5} />
              </span>
              <span>
                <strong>{h.label}:</strong> {h.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <footer className="plan-card__foot">
        {annual ? (
          <>
            <div className="plan-card__promo">
              <p className="plan-card__was">
                <span className="sr-only">Preço normal: </span>
                <s>{plan.price}</s>
                <span className="plan-card__off">−{PROMO.discountPercent}%</span>
              </p>
              <p className="plan-card__price">
                <span className="sr-only">Preço na Black Friday, no plano anual: </span>
                <span>{promo.label}</span>
                <span className="plan-card__per">/mês</span>
              </p>
              <p className="plan-card__annual">
                no {PROMO.billing} · <strong>{promo.yearLabel}</strong> no ano
              </p>
            </div>
            <PromoButton plan={plan} size="lg" block variant={plan.featured ? 'primary' : 'dark'}>
              Garantir {PROMO.discountPercent}% off<span className="sr-only"> no {plan.name}</span>
            </PromoButton>
          </>
        ) : (
          <>
            <div className="plan-card__promo">
              <p className="plan-card__price plan-card__price--full">
                <span className="sr-only">Preço no plano mensal: </span>
                <span>{plan.price}</span>
                <span className="plan-card__per">/mês</span>
              </p>
              <p className="plan-card__annual">no plano mensal</p>
            </div>
            <Button
              href={getSubscribeLink(plan)}
              size="lg"
              block
              variant={plan.featured ? 'primary' : 'dark'}
            >
              Quero este plano<span className="sr-only">: {plan.name}</span>
            </Button>
          </>
        )}
        <a className="plan-card__more" href="#comparar">
          Ver todos os recursos
        </a>
      </footer>
    </article>
  );
}
