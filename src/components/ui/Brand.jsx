import { Fragment } from 'react';

/** "CliCar" escrito como na logo: "Cli" na cor do texto (preto no claro, branco no escuro) e "Car" em laranja. */
export function Brand() {
  return (
    <span className="brand-word">
      <span className="brand-word__cli">Cli</span>
      <span className="brand-word__car">Car</span>
    </span>
  );
}

/** Troca cada "CliCar" de um texto pela grafia da logo. */
export function brandify(text) {
  if (typeof text !== 'string' || !text.includes('CliCar')) return text;
  return text.split('CliCar').map((part, i) => (
    <Fragment key={i}>
      {i > 0 && <Brand />}
      {part}
    </Fragment>
  ));
}
