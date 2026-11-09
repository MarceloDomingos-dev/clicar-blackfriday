import { PROMO } from '../../config/promo.js';
import { pad, useCountdown } from './useCountdown.js';

/** Contagem regressiva da Black Friday. `compact` = versão em linha para a faixa do topo. */
export function Countdown({ compact = false }) {
  const t = useCountdown();
  if (t.ended) return <span className="bf-countdown__ended">Promoção encerrada</span>;

  if (compact) {
    return (
      <span className="bf-countdown-inline" aria-label={`Faltam ${t.days} dias e ${t.hours} horas`}>
        {t.days}d {pad(t.hours)}h {pad(t.minutes)}m {pad(t.seconds)}s
      </span>
    );
  }

  const units = [
    [t.days, t.days === 1 ? 'dia' : 'dias'],
    [pad(t.hours), 'horas'],
    [pad(t.minutes), 'min'],
    [pad(t.seconds), 'seg'],
  ];
  return (
    <div className="bf-countdown" role="timer" aria-label={`Promoção termina em ${PROMO.endsLabel}`}>
      {units.map(([value, label]) => (
        <div key={label} className="bf-countdown__unit">
          <span className="bf-countdown__value">{value}</span>
          <span className="bf-countdown__label">{label}</span>
        </div>
      ))}
    </div>
  );
}
