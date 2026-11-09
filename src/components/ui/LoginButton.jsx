import { useEffect, useRef, useState } from 'react';
import { LogIn } from 'lucide-react';
import { LOGIN, isLoginConfigured } from '../../config/site.js';

/**
 * Botão "Entrar" do cabeçalho. O destino vem de src/config/site.js (LOGIN.url).
 * Sem endereço configurado, o clique mostra um aviso curto em vez de levar a um link vazio.
 */
export function LoginButton({ className = '', onNavigate }) {
  const ready = isLoginConfigured();
  const [notice, setNotice] = useState(false);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  const onClick = (e) => {
    if (ready) {
      onNavigate?.();
      return;
    }
    e.preventDefault();
    setNotice(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setNotice(false), 2600);
  };

  return (
    <span className={`login-btn-wrap ${className}`.trim()}>
      <a
        className="btn btn--ghost login-btn"
        href={ready ? LOGIN.url.trim() : '#entrar'}
        onClick={onClick}
        aria-describedby={notice ? 'login-aviso' : undefined}
      >
        <LogIn className="btn__icon" aria-hidden="true" size={18} strokeWidth={2.25} />
        <span>Entrar</span>
      </a>
      <span id="login-aviso" className={`login-notice${notice ? ' is-visible' : ''}`} role="status">
        {notice ? 'O acesso ao sistema estará disponível em breve.' : ''}
      </span>
    </span>
  );
}
