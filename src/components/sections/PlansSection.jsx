import { plans } from '../../data/plans.js';
import { PROMO } from '../../config/promo.js';
import { PlanCard } from '../plans/PlanCard.jsx';
import { Hl, SectionHeading } from '../ui/SectionHeading.jsx';
import { Countdown } from '../promo/Countdown.jsx';
import { PromoTerms } from '../promo/PromoTerms.jsx';

export function PlansSection() {
  return (
    <section id="planos" className="section plans on-light" aria-labelledby="planos-title">
      <div className="container">
        <SectionHeading
          id="planos-title"
          eyebrow={`${PROMO.name} · somente no ${PROMO.billing}`}
          align="center"
          title={
            <>
              Todos os planos com <Hl>{PROMO.discountPercent}% off.</Hl>
            </>
          }
          description={`Escolha o plano, contrate no ${PROMO.billing} até ${PROMO.endsLabel} e pague metade. Cada plano inclui tudo do anterior.`}
        />
        <div className="plans__bf">
          <div className="plans__bf-time">
            <span className="plans__bf-label">A oferta termina em</span>
            <Countdown />
          </div>
          <PromoTerms className="plans__bf-terms" />
        </div>
        <div className="plans-grid" data-reveal="flip">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
        <p className="plans__bf-note">
          Preços com {PROMO.discountPercent}% de desconto, válidos somente na contratação do {PROMO.billing}{' '}
          até {PROMO.endsLabel}. Fora do {PROMO.billing}, valem os preços de tabela.
        </p>
      </div>
    </section>
  );
}
