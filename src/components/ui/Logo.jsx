import positivo from '../../assets/brand/clicar-horizontal-positivo.svg';
import negativo from '../../assets/brand/clicar-horizontal-negativo.svg';
import { SITE } from '../../config/site.js';

/**
 * Assinatura horizontal oficial (arquivos extraídos do Manual da Marca).
 * variant: 'positivo' (fundos claros) | 'negativo' (fundos escuros).
 */
export function Logo({ variant = 'positivo', href = '#topo', className = '' }) {
  const src = variant === 'negativo' ? negativo : positivo;
  return (
    <a className={`logo ${className}`} href={href} aria-label={`${SITE.productName} — início`}>
      <img src={src} alt="" width="148" height="32" />
    </a>
  );
}
