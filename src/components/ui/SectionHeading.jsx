/** Etiqueta em caixa alta (Inter SemiBold +12%), como no manual, com ponto laranja. */
export function Eyebrow({ children, className = '' }) {
  return (
    <p className={`eyebrow label ${className}`}>
      <span className="eyebrow__dot" aria-hidden="true" />
      {children}
    </p>
  );
}

/** Trecho destacado do título: caixa laranja, texto preto. */
export function Hl({ children }) {
  return <span className="hl">{children}</span>;
}

/**
 * Título de seção.
 * layout: 'stack' (título e texto empilhados) | 'split' (título à esquerda, texto à direita).
 */
export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = 'left',
  layout = 'stack',
  className = '',
}) {
  return (
    <header className={`section-heading section-heading--${align} section-heading--${layout} ${className}`}>
      <div className="section-heading__main">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 id={id} className="section-heading__title" data-split>
          {title}
        </h2>
      </div>
      {description && (
        <p className="section-heading__desc" data-reveal>
          {description}
        </p>
      )}
    </header>
  );
}
