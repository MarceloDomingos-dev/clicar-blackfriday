/**
 * Black Friday CliCar — TODA a condição da promoção fica aqui.
 * ------------------------------------------------------------
 * Troque os valores abaixo e rode `npm run build`. Nenhum componente precisa ser editado.
 *
 * Confirmado pelo Marcelo em 09/11/2026:
 *   - discountPercent: 50 (somente plano anual)
 *   - endsAt: 30/11/2026 às 23h59 (horário de Brasília)
 */
export const PROMO = {
  name: 'Black Friday',
  /** Percentual de desconto aplicado em todos os planos (somente no plano anual). */
  discountPercent: 50,
  /** Fim da promoção, com fuso de Brasília. Depois disso a contagem mostra "Promoção encerrada". */
  endsAt: '2026-11-30T23:59:59-03:00',
  /** Data por extenso usada nos textos. */
  endsLabel: '30 de novembro',
  /** A promoção vale somente nesta modalidade. */
  billing: 'plano anual',
  /** Mensagem já preenchida no WhatsApp dos botões da promoção. */
  whatsappMessage: (planName) =>
    planName
      ? `Olá! Quero garantir o desconto da Black Friday no plano anual ${planName} do CliCar app.`
      : 'Olá! Quero garantir o desconto da Black Friday no plano anual do CliCar app.',
};

/** Converte "R$ 97,00" em 97. */
export function parsePrice(text) {
  return Number(
    String(text)
      .replace(/[^\d,]/g, '')
      .replace(',', '.'),
  );
}

export function formatPrice(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace(/\s/g, ' ');
}

/** Preço com desconto, arredondado para centavos. */
export function promoPrice(price) {
  const base = parsePrice(price);
  const value = Math.round(base * (100 - PROMO.discountPercent)) / 100;
  return {
    base,
    value,
    label: formatPrice(value),
    yearLabel: formatPrice(Math.round(value * 1200) / 100),
    savingYearLabel: formatPrice(Math.round((base - value) * 1200) / 100),
  };
}

export function isPromoActive(now = Date.now()) {
  return now < new Date(PROMO.endsAt).getTime();
}
