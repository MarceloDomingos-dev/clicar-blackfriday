/**
 * Dados dos planos e da tabela comparativa.
 *
 * REGRA DE HERANÇA: cada recurso declara apenas `from` — o primeiro plano em que aparece.
 * Ele é considerado incluído em todos os planos com `level >= from`. Assim, um recurso
 * do Plano 2 aparece automaticamente nos Planos 3 e 4, e não é possível marcar um recurso
 * em um plano e esquecê-lo em um plano superior.
 *
 * Para alterar preços, textos dos cartões ou a distribuição de recursos, edite apenas
 * este arquivo. Os preços são exibidos exatamente como escritos aqui.
 */

export const plans = [
  {
    id: 'plano-1',
    level: 1,
    name: 'Essencial',
    title: 'Essencial',
    price: 'R$ 97,00',
    summary:
      'Orçamentos, ordens de serviço, catálogo e WhatsApp integrado para organizar o dia a dia da oficina.',
    accent: 'var(--orange)',
    highlights: [
      {
        label: 'Vendas',
        text: 'orçamentos com checklist integrado e ordens de serviço, com cadastro básico de clientes e veículos',
      },
      { label: 'Estoque', text: 'fornecedores, produtos, serviços, grupos e categorias do catálogo' },
      { label: 'WhatsApp integrado', text: 'dispositivos, atendimento de conversas e mensagens rápidas' },
      {
        label: 'Administração básica',
        text: 'empresa, horários, perfil, colaboradores e permissões essenciais',
      },
    ],
  },
  {
    id: 'plano-2',
    level: 2,
    name: 'Gestão',
    title: 'Gestão',
    price: 'R$ 197,00',
    summary: 'Acrescenta financeiro, CRM e mais\ncontrole de vendas e estoque.',
    accent: 'var(--orange)',
    highlights: [
      { label: 'Vendas', text: 'comissões, PDV/venda de balcão, pedidos de venda e transportadoras' },
      { label: 'Financeiro', text: 'contas a pagar e a receber, caixa e relatórios básicos' },
      { label: 'CRM', text: 'clientes/leads, funil, agenda, metas e relatórios comerciais' },
      { label: 'Estoque', text: 'entradas, separação, movimentações, kits e notas de fornecedores' },
      { label: 'Gestão', text: 'produtividade de colaboradores e relatórios gerais básicos' },
    ],
  },
  {
    id: 'plano-3',
    level: 3,
    name: 'Avançado',
    title: 'Avançado',
    price: 'R$ 497,00',
    summary: 'Acrescenta fiscal e contábil, financeiro avançado, automações do CRM e compras.',
    accent: 'var(--orange)',
    featured: true,
    badge: 'Recomendado',
    highlights: [
      { label: 'Financeiro', text: 'conciliação bancária e de cartões, DRE, DRF e fluxo de caixa' },
      {
        label: 'Fiscal e contábil',
        text: 'documentos fiscais, controle, apuração, livros, lançamentos e imobilizado',
      },
      { label: 'CRM', text: 'tarefas, automações, chatbot, NPS, campanhas e pós-venda' },
      { label: 'Vendas', text: 'notas fiscais, garantia e acompanhamento de revisões' },
      { label: 'Estoque', text: 'inventário, cotações, pedidos de compra e de peças' },
      {
        label: 'Administração',
        text: 'permissões avançadas, histórico de alterações e portal de agendamento',
      },
    ],
  },
];

/**
 * Grupos da tabela comparativa. `icon` é o nome de um ícone do lucide-react
 * mapeado em src/components/GroupIcon.jsx.
 */
export const featureGroups = [
  {
    id: 'vendas',
    label: 'Vendas',
    icon: 'ShoppingCart',
    subgroups: [
      {
        features: [
          { name: 'Orçamentos', from: 1 },
          { name: 'Checklist integrado em todo orçamento', from: 1 },
          { name: 'Ordens de serviço', from: 1 },
          { name: 'Cadastro básico de clientes e veículos para orçamentos e ordens de serviço', from: 1 },
          { name: 'Comissões', from: 2 },
          { name: 'PDV / venda de balcão', from: 2 },
          { name: 'Pedidos de venda', from: 2 },
          { name: 'Cadastro de transportadoras', from: 2 },
          { name: 'Notas fiscais', from: 3 },
          { name: 'Garantia', from: 3 },
          { name: 'Acompanhamento de revisões', from: 3 },
        ],
      },
    ],
  },
  {
    id: 'estoque',
    label: 'Estoque',
    icon: 'Package',
    subgroups: [
      {
        features: [
          { name: 'Cadastro de fornecedores', from: 1 },
          { name: 'Cadastro de produtos e serviços', from: 1 },
          { name: 'Grupos e categorias do catálogo', from: 1 },
          { name: 'Entradas', from: 2 },
          { name: 'Separação', from: 2 },
          { name: 'Movimentações', from: 2 },
          { name: 'Kits', from: 2 },
          { name: 'Notas pendentes de fornecedores', from: 2 },
          { name: 'Vínculos entre produtos do fornecedor e do catálogo', from: 2 },
          { name: 'Inventário', from: 3 },
          { name: 'Manifestação de notas', from: 3 },
          { name: 'Cotações', from: 3 },
          { name: 'Pedidos de compra', from: 3 },
          { name: 'Pedidos de peças', from: 3 },
          { name: 'Devoluções e garantias', from: 3 },
          { name: 'Promoções do catálogo', from: 3 },
        ],
      },
    ],
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    icon: 'MessageCircle',
    subgroups: [
      {
        id: 'whatsapp-integrado',
        label: 'WhatsApp integrado',
        note: 'Presente desde o Essencial',
        tone: 'whatsapp',
        features: [
          { name: 'Conexão e gestão de dispositivos', from: 1 },
          { name: 'Visualização e atendimento de conversas', from: 1 },
          { name: 'Mensagens rápidas', from: 1 },
        ],
      },
    ],
  },
  {
    id: 'crm',
    label: 'CRM',
    icon: 'Users',
    subgroups: [
      {
        features: [
          { name: 'Gráficos', from: 2 },
          { name: 'Cadastro e gestão de clientes/leads', from: 2 },
          { name: 'Linha do tempo do funil', from: 2 },
          { name: 'Agenda', from: 2 },
          { name: 'Relatórios comerciais', from: 2 },
          { name: 'Metas', from: 2 },
          { name: 'Catálogo de produtos e serviços do CRM', from: 2 },
          { name: 'Minhas tarefas', from: 3 },
          { name: 'Automações', from: 3 },
          { name: 'Chatbot', from: 3 },
          { name: 'Avaliações/NPS', from: 3 },
          { name: 'Campanhas', from: 3 },
          { name: 'Relatórios', from: 3 },
          { name: 'Investimento/ROI', from: 3 },
          { name: 'Pós-venda', from: 3 },
          { name: 'Mensagens programadas', from: 3 },
        ],
      },
    ],
  },
  {
    id: 'financeiro',
    label: 'Financeiro',
    icon: 'Wallet',
    subgroups: [
      {
        features: [
          { name: 'Contas a pagar', from: 2 },
          { name: 'Contas a receber', from: 2 },
          { name: 'Caixa', from: 2 },
          { name: 'Cadastro de contas financeiras', from: 2 },
          { name: 'Relatórios básicos de recebimentos e pagamentos', from: 2 },
          { name: 'Conciliação bancária', from: 3 },
          { name: 'Conciliação de cartões', from: 3 },
          { name: 'DRE', from: 3 },
          { name: 'DRF', from: 3 },
          { name: 'Fluxo de caixa', from: 3 },
          { name: 'Calendário financeiro', from: 3 },
          { name: 'Cheques', from: 3 },
          { name: 'Lotes de pagamento', from: 3 },
          { name: 'Faturamento de ordens de serviço em lote', from: 3 },
          { name: 'Acompanhamento de contestações de cartão', from: 3 },
        ],
      },
    ],
  },
  {
    id: 'fiscal',
    label: 'Fiscal e contábil',
    icon: 'Landmark',
    subgroups: [
      {
        note: 'Todas as funções disponíveis do módulo, incluindo:',
        features: [
          { name: 'Telas de documentos fiscais', from: 3 },
          { name: 'Controle', from: 3 },
          { name: 'Apuração', from: 3 },
          { name: 'Livros', from: 3 },
          { name: 'Lançamentos', from: 3 },
          { name: 'Imobilizado', from: 3 },
        ],
      },
    ],
  },
  {
    id: 'administracao',
    label: 'Administração',
    icon: 'Building2',
    subgroups: [
      {
        label: 'Empresa e acessos',
        features: [
          { name: 'Dados da empresa', from: 1 },
          { name: 'Horários de funcionamento', from: 1 },
          { name: 'Perfil', from: 1 },
          { name: 'Colaboradores', from: 1 },
          { name: 'Permissões essenciais para usar os módulos contratados', from: 1 },
          { name: 'Permissões avançadas', from: 3 },
          { name: 'Histórico de alterações', from: 3 },
          { name: 'Segurança', from: 3 },
          { name: 'Campos personalizados', from: 3 },
        ],
      },
      {
        label: 'Gestão e relatórios',
        features: [
          { name: 'Produtividade de colaboradores', from: 2 },
          { name: 'Relatórios gerais básicos de vendas e ordens de serviço', from: 2 },
          { name: 'Relatórios avançados de pátio', from: 3 },
          { name: 'Relatórios avançados de estoque', from: 3 },
          { name: 'Relatórios avançados financeiros', from: 3 },
        ],
      },
      {
        label: 'Canais',
        features: [
          { name: 'Portal de agendamento', from: 3 },
          { name: 'Configuração de e-mail', from: 3 },
        ],
      },
    ],
  },
];

export const AVAILABILITY_NOTE =
  'A disponibilidade operacional de emissão fiscal, conciliação e canais conectados depende das configurações e integrações necessárias.';
