import { CLIENTS } from '../../config/site.js';
import { Brand } from '../ui/Brand.jsx';

/** Lista repetida para a faixa rolar sem emendas visíveis. */
const LOOP = [...CLIENTS, ...CLIENTS, ...CLIENTS];

/** Faixa com as oficinas que já usam o CliCar app, rolando sem parar. */
export function ClientsStrip() {
  return (
    <section className="clients on-light" aria-labelledby="clientes-title">
      <div className="container clients__inner">
        <h2 id="clientes-title" className="clients__title label">
          Oficinas que já usam o <Brand /> app
        </h2>
      </div>
      <div className="clients__marquee" aria-hidden="true">
        <ul className="clients__track">
          {LOOP.map((name, i) => (
            <li key={`a-${i}`} className="clients__item">
              {name}
            </li>
          ))}
          {LOOP.map((name, i) => (
            <li key={`b-${i}`} className="clients__item">
              {name}
            </li>
          ))}
        </ul>
      </div>
      <ul className="sr-only">
        {CLIENTS.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </section>
  );
}
