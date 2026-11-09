import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import { COMPANY } from '../../config/site.js';
import { faq } from '../../data/faq.js';
import { DisclosureButton, useOpenSet } from '../ui/Disclosure.jsx';
import { Hl, SectionHeading } from '../ui/SectionHeading.jsx';
import { Brand, brandify } from '../ui/Brand.jsx';

export function FaqSection() {
  const { isOpen, toggle } = useOpenSet();
  return (
    <section id="duvidas" className="section faq-section on-light" aria-labelledby="duvidas-title">
      <div className="container faq-layout">
        <div className="faq-layout__side">
          <SectionHeading
            id="duvidas-title"
            eyebrow="Dúvidas"
            title={
              <>
                Perguntas <Hl>frequentes.</Hl>
              </>
            }
          />
          <div className="contact-card" data-reveal data-spotlight>
            <h3 className="contact-card__title">Ainda com dúvida?</h3>
            <p className="contact-card__text">
              Fale com a equipe <Brand />. A gente explica o que cada plano faz na sua operação.
            </p>
            <ul className="contact-card__list">
              <li>
                <a href={`mailto:${COMPANY.email}`}>
                  <Mail size={18} aria-hidden="true" /> {COMPANY.email}
                </a>
              </li>
              <li>
                <a href={COMPANY.phoneHref}>
                  <Phone size={18} aria-hidden="true" /> {COMPANY.phone}
                </a>
              </li>
              <li>
                <a href={COMPANY.whatsapp} target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={18} aria-hidden="true" /> WhatsApp
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="faq" data-reveal="stagger">
          {faq.map((item, i) => (
            <FaqItem
              key={i}
              id={`faq-${i}`}
              item={item}
              open={isOpen(`faq-${i}`)}
              onToggle={() => toggle(`faq-${i}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/** Pergunta com abertura animada (sem animação quando o sistema pede menos movimento). */
function FaqItem({ id, item, open, onToggle }) {
  const panel = useRef(null);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (open && panel.current && !reduce) {
      gsap.fromTo(
        panel.current,
        { height: 0, autoAlpha: 0 },
        { height: 'auto', autoAlpha: 1, duration: 0.45, ease: 'power3.out', clearProps: 'height' },
      );
    }
  }, [open]);
  return (
    <div className={`faq__item${open ? ' is-open' : ''}`}>
      <h3 className="faq__q">
        <DisclosureButton open={open} controls={`${id}-a`} onClick={onToggle} className="faq__toggle">
          <span>{brandify(item.q)}</span>
        </DisclosureButton>
      </h3>
      <div id={`${id}-a`} ref={panel} className="faq__a" hidden={!open}>
        <p>{brandify(item.a)}</p>
      </div>
    </div>
  );
}
