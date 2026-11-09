import { ArrowRight, BadgePercent, CircleCheck, Landmark, MessageCircle, TrendingUp } from 'lucide-react';
import { PROMO } from '../../config/promo.js';
import { Brand } from '../ui/Brand.jsx';
import { PromoButton } from '../promo/PromoButton.jsx';
import { Countdown } from '../promo/Countdown.jsx';
import { PhoneApproval } from '../illustrations/Mocks.jsx';
import { shot } from '../../assets/prints/index.js';

const painel = shot('07-painel-graficos');

/**
 * Abertura igual à do site no ar (cartão branco com cartões flutuantes, notebook e celular),
 * com o título, a contagem regressiva e o botão da Black Friday.
 */
export function Hero() {
  return (
    <section className="hero4 hero4--bf on-dark" aria-label="Black Friday CliCar app">
      <div className="hero4__card">
        <span className="hero4__dots" aria-hidden="true" />

        <div className="hcard hcard--note" aria-hidden="true">
          <p className="hcard__note">Checklist do carro conferido e aprovado pelo cliente, sem retrabalho.</p>
        </div>
        <div className="hcard hcard--check" aria-hidden="true">
          <CircleCheck size={24} />
        </div>
        <div className="hcard hcard--remind" aria-hidden="true">
          <p className="hcard__eyebrow">Acompanhamento</p>
          <p className="hcard__title">Carro na etapa</p>
          <ul className="hcard__steps">
            <li className="is-done">Recebido</li>
            <li className="is-active">Em serviço</li>
            <li>Pronto</li>
          </ul>
        </div>
        <div className="hcard hcard--tasks" aria-hidden="true">
          <p className="hcard__eyebrow">OS de hoje</p>
          <ul className="hcard__list">
            <li>
              <span className="dot dot--orange" />
              <b>Troca de óleo — Civic</b>
              <i>Aprovada</i>
            </li>
            <li>
              <span className="dot dot--green" />
              <b>Revisão — Onix</b>
              <em className="bar">
                <span style={{ width: '72%' }} />
              </em>
            </li>
          </ul>
        </div>
        <div className="hcard hcard--integ" aria-hidden="true">
          <p className="hcard__eyebrow">Conectado</p>
          <div className="hcard__apps">
            <span className="app app--wa">
              <MessageCircle size={18} />
            </span>
            <span className="app app--bank">
              <Landmark size={18} />
            </span>
            <span className="app app--chart">
              <TrendingUp size={18} />
            </span>
          </div>
        </div>

        <div className="hero4__center">
          <p className="hero4__badge">
            <span className="hero4__badge-tag">{PROMO.name}</span>
            <span>
              <BadgePercent size={14} aria-hidden="true" /> Somente no {PROMO.billing}
            </span>
          </p>
          <h1 className="hero4__title" data-split>
            <span className="hero4__line1">
              Black Friday <Brand />
            </span>
            <span className="hero4__line2">
              <span className="hl">{PROMO.discountPercent}% off</span> em todos os planos
            </span>
          </h1>
          <p className="hero4__lead">
            Desconto válido <strong>somente no {PROMO.billing}</strong>, até {PROMO.endsLabel}.
            <br className="hero4__break" /> Do orçamento ao recebimento, a sua oficina inteira em um só
            sistema.
          </p>
          <div className="hero4__countdown">
            <p className="hero4__countdown-label">A oferta termina em</p>
            <Countdown />
          </div>
          <div className="hero4__actions">
            <PromoButton size="lg" icon={ArrowRight} />
          </div>
        </div>

        <div className="hero4__stage">
          <p className="sr-only">
            Tela do painel do CliCar app com faturamento, carros atendidos, ticket médio, OS em aberto e
            valores a receber; ao lado, o WhatsApp do cliente aprovando o orçamento.
          </p>
          <div className="laptop" aria-hidden="true">
            <div className="laptop__screen">
              <img
                className="laptop__img"
                src={painel.src}
                srcSet={painel.srcSet}
                sizes="(max-width: 1000px) 94vw, 860px"
                alt=""
                width="2400"
                height="1350"
                fetchpriority="high"
              />
            </div>
            <div className="laptop__base" />
          </div>
          <div className="hero4__phone" aria-hidden="true">
            <PhoneApproval />
          </div>
        </div>
      </div>
    </section>
  );
}
