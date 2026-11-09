import { getSignupLink } from '../../config/site.js';
import { Button } from './Button.jsx';

/**
 * Botão "Teste 7 dias grátis". O destino vem de src/config/site.js (SIGNUP.url).
 * Enquanto a tela de cadastro não existir, leva ao formulário no fim da página
 * e marca no pedido que a pessoa quer o teste grátis.
 */
export function TrialButton({ children = 'Teste 7 dias grátis', ...rest }) {
  const { href, ready } = getSignupLink();
  return (
    <Button href={href} data-trial={ready ? undefined : 'true'} {...rest}>
      {children}
    </Button>
  );
}
