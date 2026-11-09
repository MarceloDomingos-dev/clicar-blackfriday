import {
  Building2,
  ClipboardCheck,
  CreditCard,
  FileCheck2,
  Landmark,
  Network,
  Route,
  Smartphone,
  TrendingUp,
  Users,
} from 'lucide-react';
import { differentialGroups } from '../../data/differentials.js';
import { ApprovalVisual, BankVisual, ChartVisual, TrackingVisual } from '../illustrations/Mocks.jsx';
import { Hl, SectionHeading } from '../ui/SectionHeading.jsx';
import { Brand } from '../ui/Brand.jsx';

const ICONS = {
  Building2,
  ClipboardCheck,
  CreditCard,
  FileCheck2,
  Landmark,
  Network,
  Route,
  Smartphone,
  TrendingUp,
  Users,
};
const VISUALS = { approval: ApprovalVisual, tracking: TrackingVisual, bank: BankVisual, chart: ChartVisual };

/** Diferenciais do CliCar app em grade, com mini-ilustrações animadas nos cartões largos. */
export function DifferentialsSection() {
  return (
    <section id="diferenciais" className="section diff on-light" aria-labelledby="diferenciais-title">
      <div className="container">
        <SectionHeading
          id="diferenciais-title"
          layout="split"
          eyebrow="Diferenciais"
          title={
            <>
              Nossos diferenciais. <Hl>Um clique cada.</Hl>
            </>
          }
          description={
            <>
              Do orçamento aprovado no WhatsApp ao financeiro conectado ao banco: o que a sua oficina ganha
              com o <Brand /> app.
            </>
          }
        />
        {differentialGroups.map((g) => (
          <div key={g.id} className="diff-group" role="group" aria-labelledby={`dif-${g.id}`}>
            <h3 id={`dif-${g.id}`} className="diff-group__title">
              {g.label}
            </h3>
            <ul className={`diff-grid diff-grid--${g.items.length}`} data-reveal="stagger">
              {g.items.map((item) => {
                const Icon = ICONS[item.icon];
                const Visual = VISUALS[item.visual];
                return (
                  <li
                    key={item.title}
                    className={`diff-card${item.size === 'wide' ? ' diff-card--wide' : ''}`}
                  >
                    <div className="diff-card__copy">
                      <span className="diff-card__icon">{Icon && <Icon size={22} aria-hidden="true" />}</span>
                      <h4 className="diff-card__title">{item.title}</h4>
                      <p className="diff-card__text">{item.text}</p>
                    </div>
                    {Visual && <Visual />}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
