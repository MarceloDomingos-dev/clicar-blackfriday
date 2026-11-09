# CliCar app — Black Friday

Cópia da landing page do CliCar app com ênfase na Black Friday: **50% de desconto em todos os planos, somente no plano anual, até 30/11/2026**.

## Onde trocar a promoção

Tudo fica em `src/config/promo.js`: percentual (`discountPercent`), fim (`endsAt`, com fuso de Brasília), data por extenso (`endsLabel`) e a mensagem do WhatsApp. Os preços com desconto são calculados a partir de `src/data/plans.js`.

## O que muda em relação à landing principal

- Faixa preta no topo com a oferta e contagem regressiva.
- Abertura em preto: "Black Friday CliCar. 50% off em todos os planos.", contagem regressiva e as três regras (todos os planos, somente no anual, até 30 de novembro).
- Planos com preço de tabela riscado, preço com desconto, total no ano e botão "Garantir 50% off" que abre o WhatsApp com a mensagem pronta.
- Planos com os nomes oficiais: Essencial, Gestão, Avançado (recomendado) e Recepcionista Inteligente.
- Dúvidas com as perguntas da promoção; botão flutuante e formulário mencionam a Black Friday.

---

# CliCar app — Landing page

Site institucional do **CliCar app**, ERP automotivo para oficinas mecânicas e centros automotivos.
Apresenta o sistema, os diferenciais, a IA de atendimento no WhatsApp e os quatro planos, com captação
de interessados pelo formulário de demonstração.

- **Produção:** https://marcelodomingos-dev.github.io/clicar-planos/
- **Versão:** 1.0.0

## Tecnologias

| Item         | Uso                                                                  |
| ------------ | -------------------------------------------------------------------- |
| React 18     | Interface em componentes                                             |
| Vite 6       | Servidor local e build de produção                                   |
| GSAP + Lenis | Animações de rolagem e rolagem suave (respeitam "reduzir movimento") |
| lucide-react | Ícones                                                               |
| Inter e Sora | Fontes da marca, servidas localmente (@fontsource)                   |
| ESLint       | Análise estática (React, Hooks e acessibilidade)                     |
| Prettier     | Formatação de código                                                 |

## Requisitos

- Node.js **18.18 ou superior** (recomendado: versão LTS)
- npm 9 ou superior

## Como rodar

```bash
npm install      # instala as dependências
npm run dev      # servidor local em http://localhost:5173
```

No Windows, também é possível dar dois cliques em **`iniciar.bat`**: ele instala as dependências e abre o site no navegador.

## Scripts

| Comando                | O que faz                                                         |
| ---------------------- | ----------------------------------------------------------------- |
| `npm run dev`          | Servidor local com recarga automática                             |
| `npm run build`        | Gera o site de produção em `dist/`                                |
| `npm run preview`      | Serve a pasta `dist/` localmente para conferência                 |
| `npm run lint`         | Verifica o código com ESLint                                      |
| `npm run lint:fix`     | Corrige automaticamente o que o ESLint consegue                   |
| `npm run format`       | Formata todo o projeto com Prettier                               |
| `npm run format:check` | Confere se a formatação está correta (útil antes de publicar)     |
| `npm run check:plans`  | Confere a consistência dos planos (níveis, herança e duplicidade) |

## Estrutura

```
clicar-app-site/
├── index.html                  # HTML base, metadados e ícones
├── public/                     # Arquivos copiados sem alteração (favicons, imagem de compartilhamento)
├── scripts/
│   └── check-plans.mjs         # Validação dos dados dos planos
├── src/
│   ├── main.jsx                # Ponto de entrada (fontes, estilos e montagem do React)
│   ├── App.jsx                 # Ordem das seções da página
│   ├── config/
│   │   └── site.js             # Contatos, links e configurações editáveis
│   ├── data/                   # Conteúdo: planos, comparativo, diferenciais, FAQ
│   ├── lib/
│   │   ├── motion.js           # Animações (GSAP, ScrollTrigger, SplitText, Lenis)
│   │   └── plans.js            # Funções auxiliares dos planos
│   ├── components/
│   │   ├── layout/             # Cabeçalho, rodapé e botão flutuante do WhatsApp
│   │   ├── sections/           # Uma seção da página por arquivo
│   │   ├── plans/              # Cartões, tabela e comparativo dos planos
│   │   ├── ui/                 # Peças reutilizáveis (botões, logo, títulos)
│   │   └── illustrations/      # Ilustrações animadas em código
│   ├── assets/
│   │   ├── brand/              # Logos e símbolo da marca
│   │   ├── ia/                 # Imagens da seção de IA
│   │   └── prints/             # Telas do sistema em WebP (800, 1400 e 2400 px)
│   └── styles/
│       ├── site.css            # Estilos do site no ar (appclicar.com.br/lp/, 09/11/2026)
│       └── promo.css           # Black Friday: faixa, contagem, preços
├── eslint.config.js
├── .prettierrc.json
├── .editorconfig
└── vite.config.js
```

## Configuração

Tudo o que muda com frequência fica em **`src/config/site.js`**. Nenhum componente precisa ser editado.

| Configuração    | Para que serve                                                 | Situação atual                                               |
| --------------- | -------------------------------------------------------------- | ------------------------------------------------------------ |
| `COMPANY`       | Razão social, CNPJ, endereço, e-mail, telefone e WhatsApp      | Preenchido                                                   |
| `SIGNUP.url`    | Tela de cadastro do botão **Teste 7 dias grátis**              | Vazio: o botão leva ao formulário de demonstração            |
| `LOGIN.url`     | Tela de login do botão **Entrar**                              | Vazio: o botão avisa que o acesso estará disponível em breve |
| `FORM.endpoint` | Endereço que recebe o formulário em JSON (ex.: webhook do CRM) | Vazio: o pedido é enviado pelo WhatsApp ou e-mail            |
| `CONTACT.url`   | Destino dos botões dos planos ("Quero este plano")             | Vazio: os botões levam ao formulário                         |
| `CLIENTS`       | Oficinas exibidas na faixa "Oficinas que já usam o CliCar app" | Preenchido                                                   |

### Conteúdo

| Conteúdo                            | Arquivo                     |
| ----------------------------------- | --------------------------- |
| Planos, preços e recursos           | `src/data/plans.js`         |
| Tabela comparativa                  | `src/data/comparison.js`    |
| Diferenciais                        | `src/data/differentials.js` |
| Perguntas frequentes                | `src/data/faq.js`           |
| Telas do sistema (seção Por dentro) | `src/assets/prints/`        |

Os planos seguem herança: cada plano inclui tudo do anterior. Depois de alterar `plans.js`, rode
`npm run check:plans`.

### Formulário

Enquanto `FORM.endpoint` estiver vazio, nada é enviado para servidor: ao confirmar, o site abre o
WhatsApp da empresa com a mensagem já preenchida e oferece o envio por e-mail. Com um endpoint
configurado, o formulário envia um `POST` em JSON com os campos:

```json
{
  "nome": "",
  "empresa": "",
  "email": "",
  "whatsapp": "",
  "plano": "plano-1 | plano-2 | plano-3 | plano-4 | (vazio)",
  "teste": false,
  "origem": "landing-clicar"
}
```

## Publicação (GitHub Pages)

1. Rode `npm run build`.
2. Envie o conteúdo da pasta `dist/` para a raiz da branch `main` do repositório
   `MarceloDomingos-dev/clicar-planos` (pelo Git ou em _Add file → Upload files_).
3. O GitHub Pages atualiza o site em cerca de um minuto.

O build usa caminhos relativos (`base: './'`), então funciona em qualquer pasta ou domínio.

## Padrões do projeto

- **Formatação:** Prettier (`.prettierrc.json`), com 2 espaços, aspas simples e quebra em 110 colunas.
- **Editor:** `.editorconfig` define UTF-8, LF e indentação; o VS Code sugere as extensões em `.vscode/`.
- **Código:** ESLint com regras de React, Hooks e acessibilidade (`jsx-a11y`). Antes de publicar:
  `npm run lint && npm run format:check && npm run build`.
- **Nomes:** componentes em PascalCase (`PlanCard.jsx`), dados e utilitários em camelCase, classes CSS no
  padrão BEM (`bloco__elemento--variação`).
- **Acessibilidade:** navegação completa por teclado, foco visível, textos alternativos, contraste mínimo
  de 4,5:1 e animações desligadas quando o sistema pede "reduzir movimento". Verificado com axe-core
  (sem violações).
- **Desempenho:** imagens em WebP com `srcset` por largura, fontes locais e carregamento sob demanda das
  telas do sistema.

---

© CliCar app. Todos os direitos reservados.

## Base no site no ar (09/11/2026)

O código-fonte mais recente do site não estava disponível, então esta versão foi
reconstruída a partir do build publicado em appclicar.com.br/lp/: abertura em cartão
branco com cartões flutuantes, IA SDR com celular e números ao redor, cartões de planos
com ícone e preço no rodapé, faixa de clientes rolando, textos mais curtos nos recursos
e os estilos (src/styles/site.css). Botões "Entrar" e "Teste 7 dias grátis" levam ao
sistema em appclicar.com.br, com a mesma tag de conversão do Google Ads.
Na Black Friday, os planos aparecem logo depois do manifesto.
