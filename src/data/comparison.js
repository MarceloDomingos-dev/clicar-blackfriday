/**
 * Quadro comparativo enxuto: cada linha resume um conjunto de funcionalidades de src/data/plans.js.
 * `from` = primeiro plano em que a linha entra (herança: aparece em todos os planos acima).
 * A lista detalhada de cada recurso continua em plans.js (usada pelos cartões).
 */
export const comparisonGroups = [
  {
    id: 'vendas',
    label: 'Vendas',
    icon: 'ShoppingCart',
    rows: [
      { name: 'Orçamentos e ordens de serviço', from: 1 },
      { name: 'Checklist integrado em todo orçamento', from: 1 },
      { name: 'Comissões, PDV/venda de balcão e pedidos de venda', from: 2 },
      { name: 'Notas fiscais, garantia e acompanhamento de revisões', from: 3 },
    ],
  },
  {
    id: 'estoque',
    label: 'Estoque',
    icon: 'Package',
    rows: [
      { name: 'Cadastro de produtos, serviços e fornecedores', from: 1 },
      { name: 'Entradas, separação, movimentações e kits', from: 2 },
      { name: 'Inventário, cotações, compras e manifestação de notas', from: 3 },
    ],
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    icon: 'MessageCircle',
    rows: [{ name: 'WhatsApp integrado (atendimento pela equipe)', from: 1 }],
  },
  {
    id: 'crm',
    label: 'CRM',
    icon: 'Users',
    rows: [
      { name: 'Clientes/leads, funil, agenda, metas e relatórios', from: 2 },
      { name: 'Automações, chatbot, campanhas, NPS e pós-venda', from: 3 },
    ],
  },
  {
    id: 'financeiro',
    label: 'Financeiro',
    icon: 'Wallet',
    rows: [
      { name: 'Contas a pagar e a receber, caixa e relatórios básicos', from: 2 },
      { name: 'Conciliação bancária e de cartões', from: 3 },
      { name: 'DRE, DRF, fluxo de caixa e calendário financeiro', from: 3 },
    ],
  },
  {
    id: 'fiscal',
    label: 'Fiscal e contábil',
    icon: 'Landmark',
    rows: [
      { name: 'Documentos fiscais, controle e apuração', from: 3 },
      { name: 'Livros, lançamentos e imobilizado', from: 3 },
    ],
  },
  {
    id: 'gestao',
    label: 'Gestão e administração',
    icon: 'Building2',
    rows: [
      { name: 'Empresa, colaboradores e permissões essenciais', from: 1 },
      { name: 'Produtividade e relatórios gerais', from: 2 },
      { name: 'Relatórios avançados, permissões avançadas e histórico', from: 3 },
      { name: 'Portal de agendamento e configuração de e-mail', from: 3 },
    ],
  },
];
