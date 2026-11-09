/**
 * Botão-link reutilizável. Variantes: primary (laranja) | dark (preto) | ghost (contorno) | light (branco).
 * Tamanhos: md | lg.
 */
export function Button({
  href,
  variant = 'primary',
  size = 'md',
  block = false,
  external = false,
  icon: Icon,
  iconPosition = 'end',
  children,
  className = '',
  ...rest
}) {
  const cls = ['btn', `btn--${variant}`, `btn--${size}`, block && 'btn--block', className]
    .filter(Boolean)
    .join(' ');
  const ext = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  const icon = Icon ? <Icon className="btn__icon" aria-hidden="true" size={20} strokeWidth={2.25} /> : null;
  return (
    <a href={href} className={cls} {...ext} {...rest}>
      {iconPosition === 'start' && icon}
      <span>{children}</span>
      {iconPosition === 'end' && icon}
      {external && <span className="sr-only"> (abre em nova aba)</span>}
    </a>
  );
}
