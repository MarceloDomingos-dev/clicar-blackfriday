import { PROMO } from '../config/promo.js';

/**
 * Perguntas frequentes. As da Black Friday leem percentual e prazo de src/config/promo.js.
 */
export const faq = [
  {
    q: 'Como funciona a Black Friday do CliCar app?',
    a: `Todos os planos ficam com ${PROMO.discountPercent}% de desconto na contratação do ${PROMO.billing}. A condição vale para quem contratar até ${PROMO.endsLabel}.`,
  },
  {
    q: 'O desconto vale para qualquer plano?',
    a: `Sim. Essencial, Gestão, Avançado e Recepcionista Inteligente: todos têm ${PROMO.discountPercent}% de desconto, desde que a contratação seja no ${PROMO.billing}.`,
  },
  {
    q: 'E se eu contratar no plano mensal?',
    a: `A condição da Black Friday vale somente no ${PROMO.billing}. Nas outras modalidades, os preços são os de tabela.`,
  },
  {
    q: 'Posso testar antes de contratar?',
    a: `Pode. O teste grátis de 7 dias continua valendo. Para ficar com o desconto, a contratação do ${PROMO.billing} precisa acontecer até ${PROMO.endsLabel}.`,
  },
  {
    q: 'Os planos são cumulativos?',
    a: 'Sim. Cada plano inclui tudo do plano anterior e acrescenta novos recursos: o Gestão traz tudo do Essencial, o Avançado traz tudo do Gestão e o Recepcionista Inteligente traz tudo do Avançado, mais a IA SDR e as integrações avançadas.',
  },
  {
    q: 'O cliente consegue aprovar o orçamento pelo celular?',
    a: 'Sim. O orçamento, com o checklist do veículo, chega no WhatsApp do cliente e ele aprova digitalmente. Depois disso, ele acompanha cada etapa do serviço em tempo real até a entrega.',
  },
  {
    q: 'Como funciona o financeiro com Open Finance?',
    a: 'Com Open Finance, as contas bancárias ficam conectadas ao CliCar app e você acompanha saldos e movimentações em tempo real, junto com DRE, DRF e fluxo de caixa. A conciliação de cartões é automática: o sistema aplica as taxas e mostra se a operadora descontou certo, a mais ou a menos.',
  },
  {
    q: 'O CliCar app atende redes com mais de uma unidade?',
    a: 'Sim. O controle multiempresas reúne as empresas da rede no mesmo sistema, com estoque integrado entre elas.',
  },
  {
    q: 'Qual é a diferença entre “WhatsApp integrado” e “IA SDR no WhatsApp”?',
    a: 'O WhatsApp integrado está presente desde o Essencial: sua equipe conecta e gerencia dispositivos, visualiza e atende conversas e usa mensagens rápidas. A IA SDR no WhatsApp é exclusiva do Recepcionista Inteligente: um agente configurável que atende o cliente, qualifica o contato, coleta as informações e faz o agendamento 100% automático, sem intervenção humana, seguindo as suas regras comerciais e de agendamento.',
  },
  {
    q: 'Em qual plano estão o financeiro e o módulo fiscal e contábil?',
    a: 'O financeiro começa no Gestão, com contas a pagar e a receber, caixa, contas financeiras e relatórios básicos. A partir do Avançado entram conciliação bancária e de cartões, DRE, DRF, fluxo de caixa e demais recursos avançados, além de todas as funções disponíveis do módulo Fiscal e contábil.',
  },
  {
    q: 'A emissão fiscal, a conciliação e o WhatsApp funcionam assim que o plano é contratado?',
    a: 'Esses recursos fazem parte do produto, mas o uso operacional depende das configurações e integrações necessárias, como a conexão do WhatsApp e os serviços fiscais, bancários e de cartão envolvidos. A equipe pode explicar o que é preciso configurar na sua operação durante a demonstração.',
  },
  {
    q: 'Como saber qual plano é o certo para a minha oficina?',
    a: 'Se você precisa organizar orçamentos, ordens de serviço, catálogo e atendimento pelo WhatsApp, o Essencial cobre o básico. Para controlar financeiro, comissões e relacionamento com clientes, veja o Gestão. Para fiscal e contábil, conciliações e automações, o Avançado. Para contar com a IA SDR no WhatsApp e integrações via API e webhooks, o Recepcionista Inteligente. Use a tabela comparativa para conferir cada recurso.',
  },
];
