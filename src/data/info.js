/**
 * Conteúdo do informativo exibido antes dos planos.
 * Estrutura inspirada em sites de sistemas para oficinas (funcionalidades + "para cada momento").
 * Todos os textos descrevem apenas recursos que existem em src/data/plans.js.
 * `from` = primeiro plano em que o recurso aparece (mesma regra de herança da tabela).
 */

export const features = [
  {
    icon: 'ClipboardList',
    title: 'Orçamentos e ordens de serviço',
    text: 'Monte orçamentos com checklist do veículo, abra ordens de serviço e mantenha o cadastro de clientes e veículos ligado a cada atendimento.',
    from: 1,
  },
  {
    icon: 'MessageCircle',
    title: 'WhatsApp integrado',
    text: 'Conecte os dispositivos da oficina e atenda as conversas dentro do sistema, com mensagens rápidas para agilizar as respostas.',
    from: 1,
  },
  {
    icon: 'Package',
    title: 'Estoque e compras',
    text: 'Cadastre produtos, serviços e fornecedores, registre entradas e movimentações e, nos planos avançados, faça inventário, cotações e pedidos de compra.',
    from: 1,
  },
  {
    icon: 'Users',
    title: 'CRM e relacionamento',
    text: 'Acompanhe clientes e leads no funil, organize agenda e metas e, a partir do Avançado, use automações, campanhas, NPS e pós-venda.',
    from: 2,
  },
  {
    icon: 'Wallet',
    title: 'Financeiro',
    text: 'Contas a pagar e a receber, caixa e relatórios. No Avançado, conciliação bancária e de cartões, DRE, DRF e fluxo de caixa.',
    from: 2,
  },
  {
    icon: 'BarChart3',
    title: 'Gestão e relatórios',
    text: 'Produtividade de colaboradores e relatórios de vendas e ordens de serviço. No Avançado, relatórios avançados de pátio, estoque e financeiro.',
    from: 2,
  },
  {
    icon: 'Landmark',
    title: 'Fiscal e contábil',
    text: 'Notas fiscais, documentos fiscais, apuração, livros, lançamentos e imobilizado no mesmo sistema da oficina.',
    from: 3,
  },
  {
    icon: 'Building2',
    title: 'Administração e acessos',
    text: 'Dados da empresa, horários, colaboradores e permissões. No Avançado, permissões avançadas, histórico de alterações e portal de agendamento.',
    from: 1,
  },
];

/** "Para cada momento da sua oficina": necessidade → plano indicado. */
export const profiles = [
  {
    level: 1,
    title: 'Quer organizar o dia a dia',
    text: 'Orçamentos, ordens de serviço, catálogo e atendimento pelo WhatsApp em um só lugar.',
  },
  {
    level: 2,
    title: 'Precisa controlar vendas e dinheiro',
    text: 'Financeiro, comissões, PDV, pedidos de venda e CRM para acompanhar clientes e metas.',
  },
  {
    level: 3,
    title: 'Busca gestão completa e automação',
    text: 'Fiscal e contábil, conciliações, DRE, compras e automações de relacionamento.',
  },
  {
    level: 4,
    title: 'Quer automatizar o atendimento',
    text: 'Tudo do Avançado, mais IA SDR no WhatsApp e integrações por API e webhooks.',
  },
];
