import { ArrowRight } from 'lucide-react';
import { TrialButton } from '../ui/TrialButton.jsx';
import { ApprovalVisual, BankVisual, ChecklistVisual } from '../illustrations/Mocks.jsx';
import { Hl, SectionHeading } from '../ui/SectionHeading.jsx';
import { Brand } from '../ui/Brand.jsx';

const STEPS = [
  {
    tag: 'Orçar',
    title: 'Orçamento com checklist',
    text: 'A vistoria do veículo entra junto com o orçamento. O que foi visto fica registrado e protege a oficina.',
    Visual: ChecklistVisual,
  },
  {
    tag: 'Aprovar',
    title: 'Aprovação no WhatsApp',
    text: 'O orçamento chega no WhatsApp do cliente, que aprova com um toque. Depois ele acompanha cada etapa do carro.',
    Visual: ApprovalVisual,
  },
  {
    tag: 'Receber',
    title: 'Dinheiro conferido',
    text: 'Contas conectadas com Open Finance e cartões conciliados com as taxas aplicadas. O resultado sai a cada lançamento.',
    Visual: BankVisual,
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="section how on-light" aria-labelledby="como-title">
      <div className="glow" aria-hidden="true" />
      <div className="container">
        <SectionHeading
          id="como-title"
          layout="split"
          eyebrow="Como funciona"
          title={
            <>
              Orçar, aprovar <span className="soft">e</span> <Hl>receber.</Hl>
            </>
          }
          description={
            <>
              Três etapas que o <Brand /> app conduz do começo ao fim. Cada passo fica registrado, com data e
              responsável.
            </>
          }
        />
        <ol className="how__grid" data-reveal="stagger">
          {STEPS.map(({ tag, title, text, Visual }, i) => (
            <li key={tag} className="how-card" data-tilt>
              <div className="how-card__top">
                <span className="how-card__n">{String(i + 1).padStart(2, '0')}.</span>
                <span className="how-card__tag">{tag}</span>
              </div>
              <p className="how-card__big" aria-hidden="true">
                {tag}
              </p>
              <h3 className="how-card__title">{title}</h3>
              <p className="how-card__text">{text}</p>
              <div className="how-card__visual">
                <Visual />
              </div>
            </li>
          ))}
        </ol>
        <div className="center-cta">
          <TrialButton size="lg" icon={ArrowRight} />
        </div>
      </div>
    </section>
  );
}
