/**
 * Configuração geral da landing page.
 * Altere aqui marca e destino dos botões de contato — nenhum componente precisa ser editado.
 */

export const SITE = {
  productName: 'CliCar app',
  slogan: 'Tudo a um clique.',
  category: 'ERP automotivo',
  /** Segmentos atendidos. */
  segments: ['Oficinas mecânicas', 'Centros automotivos'],
};

/**
 * Dados reais da empresa usados no rodapé (fonte: appclicar.com.br).
 */
export const COMPANY = {
  legalName: 'Megap Tecnologia e Serviços',
  cnpj: '31.436.759/0001-18',
  address: 'Avenida Presidente Antônio Carlos, 3267 — Cachoeirinha, Belo Horizonte/MG',
  email: 'contato@appclicar.com.br',
  phone: '(31) 9003-3581',
  phoneHref: 'tel:+553190033581',
  whatsapp: 'https://wa.me/553190033581',
};

/**
 * ⚠️ CONFIGURAÇÃO PENDENTE — destino dos botões de contato
 * ---------------------------------------------------------
 * Enquanto `url` estiver vazio, os botões de contato levam à seção final (#demonstracao).
 * Exemplos: 'https://wa.me/55XXXXXXXXXXX' · 'mailto:comercial@seudominio.com.br'
 */
export const CONTACT = {
  url: '',
  /** Abre o destino em nova aba (ignorado para links internos e mailto:). */
  openInNewTab: true,
  /** Opcional: personalize o link por plano. */
  buildHref: (url, _plan) => url,
};

const CONTACT_FALLBACK_HREF = '#demonstracao';

/**
 * ⚠️ CONFIGURAÇÃO PENDENTE — destino do formulário de demonstração
 * ------------------------------------------------------------------
 * `endpoint`: URL que recebe um POST em JSON com os campos do formulário
 * (ex.: um webhook do CRM). Enquanto estiver vazio, nada é enviado: depois de
 * validar os campos, a página oferece ao visitante enviar os dados por
 * e-mail ou WhatsApp (contatos de COMPANY), com a mensagem já preenchida.
 */
export const FORM = {
  endpoint: '',
};

/**
 * ⚠️ CONFIGURAÇÃO PENDENTE — botão "Entrar" do cabeçalho
 * -------------------------------------------------------
 * `url`: endereço da tela de login do sistema (ex.: 'https://app.clicar.com.br/login').
 * Enquanto estiver vazio, o botão aparece, mas só avisa que o acesso estará disponível em breve.
 */
export const LOGIN = {
  url: '',
};

/**
 * ⚠️ CONFIGURAÇÃO PENDENTE — botão "Teste 7 dias grátis"
 * --------------------------------------------------------
 * `url`: endereço da tela de cadastro do teste grátis.
 * Enquanto estiver vazio, o botão leva ao formulário no fim da página (#demonstracao).
 */
export const SIGNUP = {
  url: '',
};

export function getSignupLink() {
  const url = typeof SIGNUP.url === 'string' ? SIGNUP.url.trim() : '';
  return url
    ? { href: url, external: false, ready: true }
    : { href: CONTACT_FALLBACK_HREF, external: false, ready: false };
}

/** Oficinas que já usam o CliCar app (exibidas na faixa de clientes). */
export const CLIENTS = [
  'Alcateia Centro Automotivo',
  'Nascar Auto Center',
  '7 Services Centro Automotivo',
  'MEGAP LUB',
];

export function isLoginConfigured() {
  return typeof LOGIN.url === 'string' && LOGIN.url.trim().length > 0;
}

export function isFormConfigured() {
  return typeof FORM.endpoint === 'string' && FORM.endpoint.trim().length > 0;
}

export function isContactConfigured() {
  return typeof CONTACT.url === 'string' && CONTACT.url.trim().length > 0;
}

export function getContactLink(plan = null) {
  if (!isContactConfigured()) {
    return { href: CONTACT_FALLBACK_HREF, external: false };
  }
  const href = CONTACT.buildHref(CONTACT.url.trim(), plan);
  const external = /^https?:\/\//i.test(href) && CONTACT.openInNewTab;
  return { href, external };
}
