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
    text: 'Orçamentos com checklist, ordens de serviço e cadastro de clientes e veículos a cada atendimento.',
    from: 1,
  },
  {
    icon: 'MessageCircle',
    title: 'WhatsApp integrado',
    text: 'Atenda as conversas da oficina dentro do sistema, com respostas rápidas.',
    from: 1,
  },
  {
    icon: 'Package',
    title: 'Estoque e compras',
    text: 'Produtos, serviços e fornecedores, com entradas e, nos planos avançados, inventário e compras.',
    from: 1,
  },
  {
    icon: 'Users',
    title: 'CRM e relacionamento',
    text: 'Clientes e leads no funil, agenda e metas — com automações, campanhas e NPS no Avançado.',
    from: 2,
  },
  {
    icon: 'Wallet',
    title: 'Financeiro',
    text: 'Contas a pagar e a receber e caixa — conciliação, DRE e fluxo de caixa no Avançado.',
    from: 2,
  },
  {
    icon: 'BarChart3',
    title: 'Gestão e relatórios',
    text: 'Produtividade da equipe e relatórios de vendas e OS, mais completos no Avançado.',
    from: 2,
  },
  {
    icon: 'Landmark',
    title: 'Fiscal e contábil',
    text: 'Notas e documentos fiscais, apuração, livros e lançamentos no mesmo sistema.',
    from: 3,
  },
  {
    icon: 'Building2',
    title: 'Administração e acessos',
    text: 'Empresa, horários, colaboradores e permissões — mais controle no Avançado.',
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
];
