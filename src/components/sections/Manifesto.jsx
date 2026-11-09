/** Frase grande que "acende" palavra por palavra conforme a rolagem. */
export function Manifesto() {
  return (
    <section className="manifesto on-light" aria-label="Manifesto">
      <div className="container">
        <p className="manifesto__text" data-scrub-words>
          Da entrada do carro ao dinheiro no caixa, cada etapa da sua oficina fica registrada, basta{' '}
          <span className="manifesto__brand" aria-label="clicar">
            <span className="manifesto__brand-cli">Cli</span>
            <span className="manifesto__brand-car">Car</span>
          </span>
          .
        </p>
      </div>
    </section>
  );
}
