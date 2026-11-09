import { useEffect, useRef, useState } from 'react';
import { CalendarCheck, ListChecks, MessageCircle, RotateCcw, UserRoundCheck } from 'lucide-react';
import { featureGroups, SDR_LEVEL } from '../../data/plans.js';
import { planByLevel } from '../../lib/plans.js';
import ana640 from '../../assets/ia/ana-robo-640.webp';
import ana320 from '../../assets/ia/ana-robo-320.webp';
import symbol from '../../assets/brand/clicar-simbolo-positivo.svg';
import qrAgendamento from '../../assets/ia/qr-agendamento.svg';

const whatsapp = featureGroups.find((g) => g.id === 'whatsapp');
const integrated = whatsapp.subgroups.find((s) => s.id === 'whatsapp-integrado');
const sdr = whatsapp.subgroups.find((s) => s.id === 'ia-sdr');

/** Conversa ilustrativa (fictícia) para mostrar a IA agendando sozinha. */
const SCRIPT = [
  { from: 'in', text: 'Boa tarde! Preciso fazer a revisão do meu carro. Tem horário essa semana?' },
  { from: 'out', text: 'Boa tarde! Tenho sim. Qual é o modelo e o ano do carro?' },
  { from: 'in', text: 'Gol 2018' },
  {
    from: 'out',
    text: 'Perfeito. Para a revisão do Gol 2018 tenho quinta às 8h30 ou sexta às 14h. Qual fica melhor?',
  },
  { from: 'in', text: 'Sexta às 14h' },
  { from: 'card' },
];

/** Próxima sexta-feira (dd/mm/aaaa), para a data do exemplo nunca ficar no passado. */
function nextFriday() {
  const d = new Date();
  d.setDate(d.getDate() + ((5 - d.getDay() + 7) % 7 || 7));
  return d.toLocaleDateString('pt-BR');
}

/** Mensagem de confirmação no mesmo formato que o sistema envia pelo WhatsApp (dados fictícios). */
function ConfirmationMessage() {
  const fields = [
    ['👤', 'Cliente', 'Carlos Souza'],
    ['🔧', 'Serviço', 'Revisão completa'],
    ['💰', 'Valor', 'R$ 350,00'],
    ['📅', 'Data', nextFriday()],
    ['🕐', 'Horário', '14:00'],
    ['🚙', 'Veículo', 'VW Gol 2018'],
    ['🎨', 'Cor', 'Prata'],
    ['🏷️', 'Placa', 'ABC1D23'],
  ];
  return (
    <div className="wa-confirm pop">
      <img
        className="wa-confirm__qr"
        src={qrAgendamento}
        alt="QR Code do agendamento"
        width="132"
        height="132"
      />
      <p className="wa-confirm__title">✅ Agendamento Confirmado</p>
      <ul className="wa-confirm__fields">
        {fields.map(([icon, label, value]) => (
          <li key={label}>
            <span aria-hidden="true">{icon}</span> <b>{label}:</b> {value}
          </li>
        ))}
      </ul>
      <p className="wa-confirm__note">
        <span aria-hidden="true">📲</span> Apresente o QR Code abaixo na recepção da oficina no dia do
        atendimento.
      </p>
      <span className="wa-confirm__time" aria-hidden="true">
        14:02 <span className="wa-confirm__ticks">✓✓</span>
      </span>
    </div>
  );
}

/** Resultados e benefícios do agente, publicados em www.megapcrm.com.br. */
const RESULTS = [
  { value: '200%', label: 'mais agendamentos' },
  { value: '10+', label: 'atendimentos simultâneos' },
  { value: '−78%', label: 'de clientes perdidos' },
];
const BENEFITS = [
  'Disponível 24/7',
  'Sem aumentar equipe',
  'Atendimento sem interrupções',
  'Mais clientes, menos custos',
];

const STEPS = [
  {
    icon: MessageCircle,
    title: 'Responde na hora',
    text: 'Com as instruções e a base de conhecimento que você configurou.',
  },
  {
    icon: ListChecks,
    title: 'Entende e qualifica',
    text: 'Coleta as informações do cliente e qualifica o contato.',
  },
  {
    icon: UserRoundCheck,
    title: 'Segue suas regras',
    text: 'Respeita as regras comerciais e de agendamento.',
  },
  { icon: CalendarCheck, title: 'Agenda o serviço', text: 'Confirma o horário sem intervenção humana.' },
];

function useChat(length) {
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);
  const [run, setRun] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setShown(length);
      return undefined;
    }
    const el = ref.current;
    let timers = [];
    const play = () => {
      setShown(0);
      let t = 300;
      for (let i = 0; i < length; i += 1) {
        timers.push(setTimeout(() => setTyping(true), t));
        t += i % 2 === 0 ? 700 : 1100;
        timers.push(
          setTimeout(() => {
            setTyping(false);
            setShown(i + 1);
          }, t),
        );
        t += 350;
      }
    };
    if (run > 0) {
      play();
      return () => timers.forEach(clearTimeout);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          play();
        }
      },
      { threshold: 0.35 },
    );
    if (el) io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [length, run]);

  return { ref, shown, typing, replay: () => setRun((r) => r + 1) };
}

export function SdrShowcase() {
  const sdrPlan = planByLevel(SDR_LEVEL);
  const { ref, shown, typing, replay } = useChat(SCRIPT.length);
  const done = shown >= SCRIPT.length;

  return (
    <section id="ia-sdr" className="section sdr on-dark" aria-labelledby="sdr-title">
      <div className="container sdr__grid">
        <div className="sdr__copy">
          <img
            className="sdr__robot"
            src={ana640}
            srcSet={`${ana320} 320w, ${ana640} 640w`}
            sizes="(max-width: 999px) 160px, 200px"
            alt="Ana, a assistente de IA do CliCar app: robô com fone de ouvido e um tablet com ícone de conversa"
            width="640"
            height="640"
            loading="lazy"
          />
          <p className="eyebrow label">
            <span className="eyebrow__dot" aria-hidden="true" />
            IA no WhatsApp · {sdrPlan.name}
          </p>
          <h2 id="sdr-title" className="sdr__title" data-split>
            IA que atende e <span className="hl">agenda sozinha.</span>
          </h2>
          <p className="sdr__lead">
            Para quem quer automatizar o atendimento: a IA SDR conversa com o cliente, entende o que ele
            precisa, segue as regras da oficina e agenda o serviço sem intervenção humana.
          </p>
          <ul className="tick-list sdr__ticks">
            {STEPS.map(({ title, text }) => (
              <li key={title}>
                <strong>{title}.</strong> {text}
              </li>
            ))}
          </ul>
          <div className="sdr__actions">
            <a className="btn btn--ghost btn--md" href={`#${sdrPlan.id}`}>
              Ver o {sdrPlan.name}
            </a>
          </div>
        </div>

        <figure className="sdr-phone" ref={ref}>
          <div className="phone">
            <div className="phone__head">
              <span className="phone__avatar">
                <img src={symbol} alt="" width="16" height="18" />
              </span>
              <div>
                <strong>Carlos Souza</strong>
                <small>{typing ? 'digitando…' : 'online'}</small>
              </div>
              <span className="phone__badge">IA ativa</span>
            </div>
            <div className="phone__chat" aria-live="polite">
              {SCRIPT.slice(0, shown).map((m, i) =>
                m.from === 'card' ? (
                  <ConfirmationMessage key={i} />
                ) : (
                  <p key={i} className={`bubble bubble--${m.from} pop`}>
                    <span className="sr-only">{m.from === 'in' ? 'Cliente: ' : 'IA: '}</span>
                    {m.text}
                  </p>
                ),
              )}
              {typing && (
                <p className="typing" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </p>
              )}
            </div>
          </div>
          <figcaption className="sdr-phone__caption">
            <span>Conversa ilustrativa</span>
            {done && (
              <button type="button" className="text-btn" onClick={replay}>
                <RotateCcw size={14} aria-hidden="true" /> Ver de novo
              </button>
            )}
          </figcaption>
        </figure>
      </div>

      <div className="container">
        <div className="sdr-results">
          <ul className="sdr-results__stats" aria-label="Resultados do agente">
            {RESULTS.map((r) => (
              <li key={r.label}>
                <strong data-count>{r.value}</strong>
                <span>{r.label}</span>
              </li>
            ))}
          </ul>
          <ul className="sdr-results__benefits" aria-label="Benefícios">
            {BENEFITS.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
        <div className="sdr-compare" data-reveal="stagger">
          <div className="sdr-compare__col">
            <p className="label">Planos 1, 2, 3 e 4</p>
            <h3>{integrated.label}</h3>
            <p className="sdr-compare__who">Sua equipe atende as conversas</p>
            <ul className="tick-list">
              {integrated.features.map((f) => (
                <li key={f.name}>{f.name}</li>
              ))}
            </ul>
          </div>
          <div className="sdr-compare__col sdr-compare__col--sdr">
            <p className="label">Somente {sdrPlan.name}</p>
            <h3>{sdr.label}</h3>
            <p className="sdr-compare__who">A IA atende e agenda</p>
            <ul className="tick-list">
              {sdr.features.map((f) => (
                <li key={f.name}>{f.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
