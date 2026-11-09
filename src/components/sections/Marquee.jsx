/** Faixas em movimento contínuo (decorativas). Param com "reduzir movimento". */
const TOPICS = [
  'Orçamento com checklist',
  'Aprovação no WhatsApp',
  'Cliente acompanha em tempo real',
  'Open Finance',
  'Conciliação de cartões',
  'DRE, DRF e fluxo de caixa',
  'Manifestação do destinatário',
  'CRM integrado',
  'Multiempresas',
  'Estoque da rede',
];
const WORDS = ['Orçar', 'Aprovar', 'Acompanhar', 'Receber'];

function Track({ items, className, sep }) {
  const row = (key) => (
    <ul className="marquee__row" key={key} aria-hidden={key === 'b' ? 'true' : undefined}>
      {items.map((t, i) => (
        <li key={i}>
          {t}
          {sep}
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`marquee ${className}`}>
      <div className="marquee__track">
        {row('a')}
        {row('b')}
      </div>
    </div>
  );
}

export function Marquee() {
  return (
    <div className="marquee-wrap" aria-hidden="true">
      <Track className="marquee--dark marquee--reverse" items={[...WORDS, ...WORDS]} sep={<i>·</i>} />
      <Track className="marquee--orange" items={TOPICS} sep={<i>◆</i>} />
    </div>
  );
}
