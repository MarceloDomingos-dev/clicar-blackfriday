import { useEffect, useRef, useState } from 'react';
import { Clock, Infinity as InfinityIcon, RotateCcw, TrendingUp, Users } from 'lucide-react';
import { featureGroups, SDR_LEVEL } from '../../data/plans.js';
import { planByLevel } from '../../lib/plans.js';
import symbol from '../../assets/brand/clicar-simbolo-positivo.svg';
import qrAgendamento from '../../assets/ia/qr-agendamento.svg';
import phoneFrame from '../../assets/ia/phone-frame.png';

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
/** Benefícios em selos flutuando ao redor do celular. */
const BENEFITS = [
  { icon: Clock, label: 'Disponível 24/7' },
  { icon: Users, label: 'Sem aumentar equipe' },
  { icon: InfinityIcon, label: 'Atendimento sem interrupções' },
  { icon: TrendingUp, label: 'Mais clientes, menos custos' },
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
      <div className="container sdr__top">
        <div className="sdr__intro">
          <h2 id="sdr-title" className="sdr__title" data-split>
            IA que atende e <span className="hl">agenda sozinha.</span>
          </h2>
          <p className="sdr__lead">
            A IA SDR conversa com o cliente, segue as regras da oficina e agenda o serviço — sem intervenção
            humana.
          </p>
          <div className="sdr__actions">
            <a className="btn btn--primary btn--md" href={`#${sdrPlan.id}`}>
              Ver o {sdrPlan.name}
            </a>
          </div>
        </div>

        <div className="sdr-stage">
          <figure className="sdr-phone" ref={ref}>
            <div className="phone-device">
              <img className="phone-device__frame" src={phoneFrame} alt="" aria-hidden="true" />
              <div className="phone-screen">
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
          {RESULTS.map((r, i) => (
            <div key={r.label} className={`sdr-float sdr-float--${i + 1}`}>
              <strong data-count>{r.value}</strong>
              <span>{r.label}</span>
            </div>
          ))}
          {BENEFITS.map(({ icon: Icon, label }, i) => (
            <span key={label} className={`sdr-chip-float sdr-chip-float--${i + 1}`}>
              <Icon size={14} aria-hidden="true" /> {label}
            </span>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="sdr-compare" data-reveal="stagger">
          <div className="sdr-compare__col">
            <p className="label">Todos os planos</p>
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
