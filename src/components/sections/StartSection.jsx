import { ArrowRight } from 'lucide-react';
import { profiles } from '../../data/info.js';
import { planByLevel } from '../../lib/plans.js';
import { Hl, SectionHeading } from '../ui/SectionHeading.jsx';

/** "Por onde eu começo?" — necessidade da oficina → plano indicado. */
export function StartSection() {
  return (
    <section id="comeco" className="section start on-light" aria-labelledby="comeco-title">
      <div className="container">
        <SectionHeading
          id="comeco-title"
          layout="split"
          eyebrow="Na prática"
          title={
            <>
              “E por onde <span className="soft">eu</span> <Hl>começo?”</Hl>
            </>
          }
          description="Não existe um único ponto de partida. Depende do que a sua oficina precisa hoje — e cada plano inclui tudo do anterior."
        />
        <ul className="start__list" data-reveal="stagger">
          {profiles.map((p) => {
            const plan = planByLevel(p.level);
            const featured = plan.featured;
            return (
              <li key={p.level} className="start__row">
                <div>
                  <h3 className="start__title">{p.title}</h3>
                  <p className="start__text">{p.text}</p>
                </div>
                <a className={`pill-btn${featured ? ' pill-btn--solid' : ''}`} href={`#${plan.id}`}>
                  Começar pelo {plan.name} <ArrowRight size={16} aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
