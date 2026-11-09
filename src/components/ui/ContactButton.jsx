import { getContactLink } from '../../config/site.js';
import { Button } from './Button.jsx';

/** Botão de contato/demonstração. O destino vem de src/config/site.js (CONTACT). */
export function ContactButton({ plan = null, children = 'Solicitar demonstração', ...rest }) {
  const { href, external } = getContactLink(plan);
  return (
    <Button href={href} external={external} data-plan={plan?.id} {...rest}>
      {children}
    </Button>
  );
}
