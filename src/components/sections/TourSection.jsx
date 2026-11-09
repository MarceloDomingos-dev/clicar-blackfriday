import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { Hl, SectionHeading } from '../ui/SectionHeading.jsx';
import { shot } from '../../assets/prints/index.js';
import { Brand } from '../ui/Brand.jsx';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;

const SIZES = '(max-width: 760px) 440px, (max-width: 1280px) 100vw, 1200px';
/** Telas do CliCar app (interface real, com dados de demonstração). */
const TABS = [
  {
    id: 'patio',
    label: 'Pátio',
    title: 'Todos os carros, por etapa',
    text: 'Ordens de serviço em quadro, da abertura à entrega: o que está aguardando peça, em serviço, em testes ou pronto.',
    img: shot('01-os-kanban'),
    alt: 'Quadro de ordens de serviço do CliCar app, com colunas Aberta, Aguardando peça, Em serviço, Em testes, Finalizado e Entregue.',
  },
  {
    id: 'etapas',
    label: 'Etapas da OS',
    title: 'Cada OS com etapa, tempo e aprovação',
    text: 'Na mesma tela: a etapa atual, o próximo passo, o tempo de serviço e o registro de quem aprovou o orçamento.',
    img: shot('02-os-detalhe'),
    alt: 'Tela de ordem de serviço do CliCar app mostrando veículo, total, aprovação registrada e a linha de etapas Aberta, Aguardando peça, Em serviço, Em testes, Finalizado e Entregue.',
  },
  {
    id: 'itens',
    label: 'Orçamento aprovado',
    title: 'Aprovação item a item',
    text: 'Peças e serviços do orçamento com custo, venda, margem e a aprovação do cliente em cada item.',
    img: shot('03-os-itens-aprovados'),
    h: 1250,
    alt: 'Itens da ordem de serviço no CliCar app com custo, venda total, margem e status Aprovado em cada item.',
  },
  {
    id: 'checklist',
    label: 'Checklist',
    title: 'Checklist de entrada do veículo',
    text: 'Vistoria item a item, com avarias no desenho do carro, pneus, fotos e checklist de entrega, ligada à OS.',
    img: shot('04-checklist'),
    alt: 'Checklist de entrada do CliCar app com 33 itens, marcações OK, Avaria e Ausente e área de fotos.',
  },
  {
    id: 'cartoes',
    label: 'Taxas de cartão',
    title: 'Auditoria das taxas de cartão',
    text: 'A taxa esperada pelo contrato contra a taxa cobrada pela adquirente: você vê quanto foi cobrado a mais ou a menos.',
    img: shot('05-cartoes-auditoria'),
    alt: 'Tela de auditoria das taxas de cartão do CliCar app com passou no cartão, taxa esperada, taxa cobrada, cobrado a mais e cobrado a menos.',
  },
  {
    id: 'fluxo',
    label: 'Fluxo de caixa',
    title: 'Fluxo de caixa projetado',
    text: 'Entradas e saídas previstas e o saldo no fim do período, com alerta quando o caixa vai ficar negativo.',
    img: shot('06-fluxo-caixa'),
    alt: 'Fluxo de caixa do CliCar app com saldo hoje, entradas previstas, saídas previstas, saldo no fim do período e alerta de saldo negativo.',
  },
  {
    id: 'estoque',
    label: 'Estoque',
    title: 'Estoque de peças e serviços',
    text: 'Produtos, serviços, kits e promoções com saldo, custo e preço, filtrados por categoria, marca e estoque.',
    img: shot('08-estoque'),
    alt: 'Lista de produtos e serviços do CliCar app com estoque, qualificação, categoria, preço e custo.',
  },
  {
    id: 'crm',
    label: 'CRM',
    title: 'Funil de clientes',
    text: 'Cada cliente numa etapa do funil, do primeiro contato ao comparecimento, com o WhatsApp a um clique.',
    img: shot('09-crm-funil'),
    alt: 'Funil de acompanhamento de clientes do CliCar app com as etapas Novo cliente, Em atendimento, Agendado, Compareceu e Perdido.',
  },
];

const DURATION = 6; // segundos por tela no modo automático

export function TourSection() {
  const [current, setCurrent] = useState(0);
  // Com "reduzir movimento" ligado no sistema, o passeio já começa parado.
  const [playing, setPlaying] = useState(() => !prefersReducedMotion());
  const [inView, setInView] = useState(false);
  const [hover, setHover] = useState(false);
  const refs = useRef([]);
  const sectionRef = useRef(null);
  const [loaded, setLoaded] = useState({});

  // Pré-carrega todas as telas quando a seção se aproxima, para a troca de aba ser instantânea.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        TABS.forEach((t) => {
          const im = new Image();
          im.sizes = SIZES;
          im.srcset = t.img.srcSet;
          im.src = t.img.src;
        });
      },
      { rootMargin: '1200px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  const select = (i, { stop = true, focus = false } = {}) => {
    setCurrent(i);
    if (stop) setPlaying(false);
    if (focus) refs.current[i]?.focus();
  };

  const onKey = (e) => {
    const last = TABS.length - 1;
    let next = null;
    if (e.key === 'ArrowRight') next = current === last ? 0 : current + 1;
    if (e.key === 'ArrowLeft') next = current === 0 ? last : current - 1;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = last;
    if (next !== null) {
      e.preventDefault();
      select(next, { focus: true });
    }
  };

  // Mantém a aba atual visível quando a lista rola na horizontal (celular).
  useEffect(() => {
    const el = refs.current[current];
    const list = el?.parentElement;
    if (!list || list.scrollWidth <= list.clientWidth) return;
    const left = list.scrollLeft + (el.getBoundingClientRect().left - list.getBoundingClientRect().left) - 24;
    list.scrollTo({ left: Math.max(0, left), behavior: current === 0 ? 'auto' : 'smooth' });
  }, [current]);

  const running = playing && inView && !hover;
  const tab = TABS[current];

  return (
    <section id="por-dentro" ref={sectionRef} className="section tour on-light" aria-labelledby="tour-title">
      <div className="glow glow--center" aria-hidden="true" />
      <div className="container">
        <SectionHeading
          id="tour-title"
          align="center"
          eyebrow="Por dentro"
          title={
            <>
              Veja o <Brand /> <Hl>funcionando.</Hl>
            </>
          }
          description="Um passeio pelas telas do sistema."
        />
        <div className="tour__bar">
          <button
            type="button"
            className="tour__play"
            onClick={() => setPlaying((v) => !v)}
            aria-pressed={!playing}
          >
            {playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
            <span className="sr-only">
              {playing ? 'Pausar passeio automático' : 'Retomar passeio automático'}
            </span>
          </button>
          {/* As setas do teclado são tratadas no grupo; o foco fica nas abas (botões). */}
          {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
          <div className="tour__tabs" role="tablist" aria-label="Telas do CliCar app" onKeyDown={onKey}>
            {TABS.map((t, i) => (
              <button
                key={t.id}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={i === current}
                aria-controls={`painel-${t.id}`}
                tabIndex={i === current ? 0 : -1}
                className="tour__tab"
                onClick={() => select(i)}
              >
                {t.label}
                {i === current && playing && (
                  <span
                    key={`p-${current}`}
                    className="tour__progress"
                    aria-hidden="true"
                    style={{
                      animationDuration: `${DURATION}s`,
                      animationPlayState: running ? 'running' : 'paused',
                    }}
                    onAnimationEnd={() => {
                      if (running) select((current + 1) % TABS.length, { stop: false });
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="tour__stage">
          <div
            className="tour__panel"
            role="tabpanel"
            id={`painel-${tab.id}`}
            aria-labelledby={`tab-${tab.id}`}
            key={tab.id}
            onPointerEnter={() => setHover(true)}
            onPointerLeave={() => setHover(false)}
          >
            <div className="tour__copy">
              <p className="tour__count" aria-hidden="true">
                {String(current + 1).padStart(2, '0')} / {String(TABS.length).padStart(2, '0')}
              </p>
              <h3 className="tour__title">{tab.title}</h3>
              <p className="tour__text">{tab.text}</p>
            </div>
            <figure className="shot tour__window">
              <div className="shot__bar" aria-hidden="true">
                <span />
                <span />
                <span />
                <em>
                  <Brand /> app · {tab.label}
                </em>
              </div>
              <div
                className="shot__viewport"
                role="region"
                tabIndex={0}
                aria-label={`Tela: ${tab.label} (role para o lado para ver a tela inteira)`}
              >
                <img
                  key={tab.id}
                  src={tab.img.src}
                  srcSet={tab.img.srcSet}
                  sizes={SIZES}
                  alt={tab.alt}
                  width="2400"
                  height={tab.h || 1350}
                  loading="lazy"
                  decoding="async"
                  className={loaded[tab.id] ? 'is-loaded' : ''}
                  onLoad={() => setLoaded((l) => ({ ...l, [tab.id]: true }))}
                />
              </div>
              <p className="shot__hint" aria-hidden="true">
                Arraste para o lado para ver a tela inteira
              </p>
            </figure>
          </div>
        </div>
        <p className="tour__note">
          Telas do <Brand /> app com dados de demonstração. O passeio avança sozinho; use o botão de pausa ou
          escolha uma aba.
        </p>
      </div>
    </section>
  );
}
