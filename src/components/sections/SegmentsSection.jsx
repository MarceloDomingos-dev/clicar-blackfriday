import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Building2, CarFront, Wrench } from 'lucide-react';
import { Hl, SectionHeading } from '../ui/SectionHeading.jsx';

const SEGMENTS = [
  {
    icon: Wrench,
    title: 'Oficinas mecânicas',
    text: 'Orçamento com checklist, aprovação no WhatsApp e ordem de serviço do pátio até a entrega.',
  },
  {
    icon: CarFront,
    title: 'Centros automotivos',
    text: 'Vários serviços ao mesmo tempo, estoque de peças, venda de balcão e financeiro conciliado.',
  },
  {
    icon: Building2,
    title: 'Redes e várias unidades',
    text: 'Controle multiempresas e estoque integrado entre as unidades da rede, no mesmo sistema.',
  },
];

/** Carrossel de segmentos: rola com arrasto/touch, setas e indicadores. */
export function SegmentsSection() {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    const onScroll = () => {
      const cards = [...track.children];
      const left = track.scrollLeft;
      let best = 0;
      const base = cards[0].offsetLeft;
      const dist = (c) => Math.abs(c.offsetLeft - base - left);
      cards.forEach((c, i) => {
        if (dist(c) < dist(cards[best])) best = i;
      });
      // No fim da rolagem, o último cartão conta como ativo.
      if (left + track.clientWidth >= track.scrollWidth - 4) best = cards.length - 1;
      setActive(best);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, []);

  const go = (i) => {
    const track = trackRef.current;
    const card = track?.children[i];
    if (!card) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    track.scrollTo({
      left: card.offsetLeft - track.children[0].offsetLeft,
      behavior: reduce ? 'auto' : 'smooth',
    });
  };

  return (
    <section id="para-quem" className="section segments on-light" aria-labelledby="segmentos-title">
      <div className="container">
        <SectionHeading
          id="segmentos-title"
          layout="split"
          title={
            <>
              Feito para quem <Hl>vive de carro.</Hl>
            </>
          }
          description="Da oficina de bairro à rede com várias unidades: o mesmo sistema, ajustado à rotina de cada negócio."
        />
      </div>
      <div className="segments__viewport">
        {/* Lista rolável na horizontal: precisa receber foco para rolar pelo teclado (WCAG 2.1.1). */}
        <ul
          ref={trackRef}
          className="segments__track"
          aria-label="Segmentos atendidos (role para o lado)"
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
        >
          {SEGMENTS.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="seg-card" data-tilt>
              <span className="seg-card__n" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="seg-card__icon" aria-hidden="true">
                <Icon size={84} strokeWidth={1.25} />
              </span>
              <div className="seg-card__copy">
                <h3 className="seg-card__title">{title}</h3>
                <p className="seg-card__text">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="container segments__controls">
        <div className="segments__dots" aria-hidden="true">
          {SEGMENTS.map((s, i) => (
            <span key={s.title} className={i === active ? 'is-active' : ''} />
          ))}
        </div>
        <div className="segments__arrows">
          <button
            type="button"
            className="round-btn"
            onClick={() => go(Math.max(0, active - 1))}
            disabled={active === 0}
          >
            <ArrowLeft size={20} aria-hidden="true" />
            <span className="sr-only">Segmento anterior</span>
          </button>
          <button
            type="button"
            className="round-btn"
            onClick={() => go(Math.min(SEGMENTS.length - 1, active + 1))}
            disabled={active === SEGMENTS.length - 1}
          >
            <ArrowRight size={20} aria-hidden="true" />
            <span className="sr-only">Próximo segmento</span>
          </button>
        </div>
      </div>
    </section>
  );
}
