import { CLIENTS } from '../../config/site.js';
import symbol from '../../assets/brand/clicar-simbolo-positivo.svg';
import { Brand } from '../ui/Brand.jsx';

/** Faixa com as oficinas que já usam o CliCar app. */
export function ClientsStrip() {
  return (
    <section className="clients on-light" aria-labelledby="clientes-title">
      <div className="container clients__inner">
        <h2 id="clientes-title" className="clients__title label">
          Oficinas que já usam o <Brand /> app
        </h2>
        <ul className="clients__list" data-reveal="stagger">
          {CLIENTS.map((name) => (
            <li key={name} className="clients__item">
              <img src={symbol} alt="" width="18" height="20" aria-hidden="true" />
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
