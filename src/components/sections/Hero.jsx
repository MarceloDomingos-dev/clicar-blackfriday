import { ArrowRight, CheckCircle2, CreditCard, Landmark, Route } from 'lucide-react';
import { PROMO } from '../../config/promo.js';
import { Brand } from '../ui/Brand.jsx';
import { TrialButton } from '../ui/TrialButton.jsx';
import { PromoButton } from '../promo/PromoButton.jsx';
import { Countdown } from '../promo/Countdown.jsx';
import { PromoTerms } from '../promo/PromoTerms.jsx';
import { PhoneApproval } from '../illustrations/Mocks.jsx';
import { shot } from '../../assets/prints/index.js';

const painel = shot('07-painel-graficos');

const FLOATS = [
  { pos: 'a', icon: CheckCircle2, label: 'Aprovação', text: 'Orçamento aprovado no WhatsApp' },
  { pos: 'b', icon: CreditCard, label: 'Cartões', text: 'Taxas conferidas automaticamente' },
  { pos: 'c', icon: Landmark, label: 'Open Finance', text: 'Saldo atualizado agora' },
  { pos: 'd', icon: Route, label: 'Cliente', text: 'Acompanha cada etapa do carro' },
];

export function Hero() {
  return (
    <section className="hero2 hero2--bf on-dark" aria-label="Black Friday CliCar app">
      <div className="rays" aria-hidden="true" />
      <div className="container hero2__inner">
        <p className="hero2__badge label">{PROMO.name} CliCar</p>
        <h1 className="hero2__title" data-split>
          <span className="hero2__line1">
            Black Friday <Brand />.
          </span>
          <span className="hero2__line2">
            <span className="hl">{PROMO.discountPercent}% off</span> em todos os planos.
          </span>
        </h1>
        <p className="hero2__lead">
          Desconto válido <strong>somente no {PROMO.billing}</strong>, até {PROMO.endsLabel}. Orçamento com
          checklist aprovado no WhatsApp do cliente, ordem de serviço, estoque e financeiro com Open Finance.
          Tudo no mesmo sistema.
        </p>
        <div className="hero2__countdown">
          <p className="hero2__countdown-label">A oferta termina em</p>
          <Countdown />
        </div>
        <div className="hero2__actions">
          <PromoButton size="lg" icon={ArrowRight} />
          <TrialButton size="lg" variant="ghost" className="btn--on-dark" />
        </div>
        <PromoTerms className="hero2__terms" />

        <div className="hero2__stage">
          <p className="sr-only">
            Tela do painel do CliCar app com faturamento, carros atendidos, ticket médio, OS em aberto e
            valores a receber; ao lado, ilustração do WhatsApp do cliente aprovando o orçamento.
          </p>
          <div className="laptop" aria-hidden="true">
            <div className="laptop__screen">
              <img
                className="laptop__img"
                src={painel.src}
                srcSet={painel.srcSet}
                sizes="(max-width: 640px) 460px, (max-width: 1000px) 90vw, 860px"
                alt=""
                width="2400"
                height="1350"
                fetchpriority="high"
              />
            </div>
            <div className="laptop__base" />
          </div>
          <div className="hero2__phone">
            <PhoneApproval />
          </div>
          {FLOATS.map(({ pos, icon: Icon, label, text }) => (
            <div key={pos} className={`glass-card glass-card--${pos}`} aria-hidden="true">
              <p className="glass-card__label">
                <Icon size={14} /> {label}
              </p>
              <p className="glass-card__text">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
