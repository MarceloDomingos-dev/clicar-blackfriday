/**
 * Diferenciais do CliCar app — informados pela equipe CliCar.
 * `visual` ativa uma mini-ilustração no cartão (veja DifferentialsSection.jsx).
 * `size: 'wide'` ocupa duas colunas na grade do computador.
 */
export const differentialGroups = [
  {
    id: 'oficina-cliente',
    label: 'Oficina e cliente',
    items: [
      {
        icon: 'Smartphone',
        title: 'Orçamento aprovado no WhatsApp do cliente',
        text: 'O orçamento chega no WhatsApp do cliente e ele aprova com um toque. Aprovação digital, registrada, sem “pode fazer” de boca.',
        visual: 'approval',
        size: 'wide',
      },
      {
        icon: 'ClipboardCheck',
        title: 'Checklist integrado em todo orçamento',
        text: 'Vistoria do veículo junto com o orçamento: o que foi visto fica registrado e protege a oficina.',
      },
      {
        icon: 'Route',
        title: 'Cliente acompanha o veículo em tempo real',
        text: 'Cada etapa do carro, da entrada à entrega, visível para o cliente. Menos ligação perguntando “já ficou pronto?”.',
        visual: 'tracking',
        size: 'wide',
      },
      {
        icon: 'Users',
        title: 'CRM completo e integrado',
        text: 'Funil, agenda, metas, campanhas, NPS e pós-venda ligados às ordens de serviço — sem planilha paralela.',
      },
    ],
  },
  {
    id: 'financeiro',
    label: 'Financeiro em tempo real',
    items: [
      {
        icon: 'Landmark',
        title: 'Open Finance',
        text: 'Contas bancárias conectadas ao sistema, com saldos e movimentações em tempo real.',
        visual: 'bank',
        size: 'wide',
      },
      {
        icon: 'CreditCard',
        title: 'Conciliação automática de cartões',
        text: 'Cada venda no cartão conferida automaticamente com o que caiu na conta, já com as taxas aplicadas. Você vê na hora se a operadora descontou certo, a mais ou a menos.',
      },
      {
        icon: 'TrendingUp',
        title: 'DRE, DRF, fluxo de caixa e contas em tempo real',
        text: 'O resultado da oficina atualizado a cada lançamento — não só no fechamento do mês.',
        visual: 'chart',
        size: 'wide',
      },
      {
        icon: 'FileCheck2',
        title: 'Manifestação do destinatário',
        text: 'Notas emitidas contra o seu CNPJ manifestadas direto no sistema, com as notas de fornecedores sob controle.',
      },
    ],
  },
  {
    id: 'rede',
    label: 'Gestão de onde estiver',
    items: [
      {
        icon: 'Smartphone',
        title: 'Sua oficina na palma da mão',
        text: 'Aplicativo para acompanhar cada agendamento e o desempenho da oficina pelo celular.',
      },
      {
        icon: 'Building2',
        title: 'Controle multiempresas',
        text: 'Várias empresas ou unidades geridas no mesmo lugar, cada uma com seus números.',
      },
      {
        icon: 'Network',
        title: 'Estoque integrado entre empresas da rede',
        text: 'Veja a peça disponível em outra unidade antes de comprar de novo.',
      },
    ],
  },
];
