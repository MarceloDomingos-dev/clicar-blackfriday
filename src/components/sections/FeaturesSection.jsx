import { ArrowRight } from 'lucide-react';
import { features } from '../../data/info.js';
import { GroupIcon } from '../plans/GroupIcon.jsx';
import { Hl, SectionHeading } from '../ui/SectionHeading.jsx';
import { planByLevel } from '../../lib/plans.js';

const availability = (from) => (from === 1 ? 'Em todos os planos' : `A partir do ${planByLevel(from).name}`);

/** Recursos do sistema, antes dos planos. */
export function FeaturesSection() {
  return (
    <section id="recursos" className="section features on-light" aria-labelledby="recursos-title">
      <div className="container">
        <SectionHeading
          id="recursos-title"
          layout="split"
          title={
            <>
              Da entrada do carro ao <Hl>dinheiro no caixa.</Hl>
            </>
          }
          description="Atendimento, vendas, estoque, financeiro e fiscal conectados. Cada parte da rotina a um clique de distância."
        />
        <ul className="features-grid" data-reveal>
          {features.map((f) => (
            <li key={f.title} className="feature-card">
              <div className="feature-card__top">
                <span className="feature-card__icon">
                  <GroupIcon name={f.icon} size={22} />
                </span>
              </div>
              <h3 className="feature-card__title">{f.title}</h3>
              <p className="feature-card__text">{f.text}</p>
              <div className="feature-card__foot">
                <span className={`tag${f.from === 1 ? ' tag--all' : ''}`}>{availability(f.from)}</span>
                <a className="feature-card__link" href={f.from === 4 ? '#ia-sdr' : '#comparar'}>
                  {f.from === 4 ? 'Ver como funciona' : 'Ver no comparativo'}
                  <span className="sr-only">: {f.title}</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
