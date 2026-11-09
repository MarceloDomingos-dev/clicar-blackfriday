/** Indicador de progressão (1 a 4) — mostra a herança entre planos sem depender de cores. */
export function LevelMeter({ level, max = 4 }) {
  return (
    <span className="level-meter" aria-hidden="true">
      {Array.from({ length: max }, (_, i) => (
        <i key={i} className={i < level ? 'is-on' : undefined} />
      ))}
    </span>
  );
}
