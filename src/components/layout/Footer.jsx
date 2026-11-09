import { COMPANY } from '../../config/site.js';
import { Logo } from '../ui/Logo.jsx';
import { WhatsAppFloat } from './WhatsAppFloat.jsx';
import { Brand } from '../ui/Brand.jsx';

const ext = { target: '_blank', rel: 'noopener noreferrer' };

export function Footer() {
  return (
    <footer className="site-footer on-dark">
      <div className="container">
        <p className="footer-giant" aria-hidden="true" data-chars>
          Tudo a um clique.
        </p>
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Logo variant="negativo" />
            <p className="site-footer__slogan">
              Tudo a <span className="text-orange">um clique.</span>
            </p>
          </div>
          <nav aria-labelledby="rodape-produto">
            <h2 id="rodape-produto" className="site-footer__title">
              Produto
            </h2>
            <ul className="site-footer__list">
              <li>
                <a href="#como-funciona">Como funciona</a>
              </li>
              <li>
                <a href="#diferenciais">Diferenciais</a>
              </li>
              <li>
                <a href="#por-dentro">Por dentro</a>
              </li>
              <li>
                <a href="#planos">Planos</a>
              </li>
              <li>
                <a href="#duvidas">Dúvidas</a>
              </li>
              <li>
                <a href="#demonstracao">Demonstração</a>
              </li>
            </ul>
          </nav>
          <div>
            <h2 className="site-footer__title">Contato</h2>
            <ul className="site-footer__list">
              <li>
                <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
              </li>
              <li>
                <a href={COMPANY.phoneHref}>{COMPANY.phone}</a>
              </li>
              <li>
                <a href={COMPANY.whatsapp} {...ext}>
                  WhatsApp<span className="sr-only"> (abre em nova aba)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="site-footer__legal">
          <p>
            {COMPANY.legalName} · CNPJ {COMPANY.cnpj}
          </p>
          <p>Sede: {COMPANY.address}</p>
          <p>
            Empresa brasileira · © {new Date().getFullYear()} <Brand /> app. Todos os direitos reservados.
          </p>
        </div>
      </div>
      <WhatsAppFloat />
    </footer>
  );
}
