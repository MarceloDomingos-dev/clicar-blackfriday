import { useEffect, useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, Mail, MessageCircle } from 'lucide-react';
import { COMPANY, FORM, SITE, isFormConfigured } from '../../config/site.js';
import { plans } from '../../data/plans.js';
import { PROMO } from '../../config/promo.js';
import { Hl } from '../ui/SectionHeading.jsx';
import { Brand } from '../ui/Brand.jsx';

const POINTS = [
  'O caminho completo do orçamento ao caixa, com dados de exemplo',
  'Como o cliente aprova o orçamento e acompanha o carro pelo celular',
  'Qual plano faz sentido para a sua operação hoje',
];

const EMPTY = { nome: '', empresa: '', email: '', whatsapp: '', plano: '', teste: false };

function validate(v) {
  const e = {};
  if (!v.nome.trim()) e.nome = 'Informe seu nome.';
  if (!v.empresa.trim()) e.empresa = 'Informe o nome da oficina ou empresa.';
  if (!v.email.trim()) e.email = 'Informe seu e-mail.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim()))
    e.email = 'Confira o e-mail: use o formato nome@empresa.com.br.';
  if (v.whatsapp.replace(/\D/g, '').length < 10) e.whatsapp = 'Informe o WhatsApp com DDD.';
  return e;
}

function buildMessage(v) {
  const plan = plans.find((p) => p.id === v.plano);
  return [
    v.teste
      ? `Olá! Quero começar o teste grátis de 7 dias do ${SITE.productName}.`
      : `Olá! Quero agendar uma demonstração do ${SITE.productName}.`,
    `Nome: ${v.nome}`,
    `Empresa: ${v.empresa}`,
    `E-mail: ${v.email}`,
    `WhatsApp: ${v.whatsapp}`,
    `Plano de interesse: ${plan ? plan.name : 'Ainda não sei'}`,
    `Quero a condição da ${PROMO.name} (${PROMO.discountPercent}% off no ${PROMO.billing}).`,
  ].join('\n');
}

function waLink(v) {
  return `${COMPANY.whatsapp}?text=${encodeURIComponent(buildMessage(v))}`;
}

function Field({ id, label, error, children }) {
  return (
    <div className={`field${error ? ' has-error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error && (
        <p id={`${id}-erro`} className="field__error">
          {error}
        </p>
      )}
    </div>
  );
}

export function DemoSection() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | handoff | error
  const formRef = useRef(null);
  const resultRef = useRef(null);

  // Botões "Quero este plano" (data-plan) já deixam o plano escolhido no formulário.
  useEffect(() => {
    const onClick = (e) => {
      const link = e.target.closest?.('a[data-plan], a[data-trial]');
      if (!link) return;
      const id = link.dataset.plan;
      if (id && plans.some((p) => p.id === id)) setValues((v) => ({ ...v, plano: id }));
      if (link.dataset.trial) setValues((v) => ({ ...v, teste: true }));
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));
  const aria = (k) => ({
    'aria-invalid': errors[k] ? 'true' : undefined,
    'aria-describedby': errors[k] ? `demo-${k}-erro` : undefined,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      formRef.current?.querySelector(`#demo-${first}`)?.focus();
      return;
    }
    if (!isFormConfigured()) {
      // Sem CRM ligado: o pedido vai direto para o WhatsApp da CliCar, com a mensagem pronta.
      window.open(waLink(values), '_blank', 'noopener');
      setStatus('handoff');
      requestAnimationFrame(() => resultRef.current?.focus());
      return;
    }
    try {
      setStatus('sending');
      const res = await fetch(FORM.endpoint.trim(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, origem: 'landing-clicar' }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
    } catch {
      setStatus('error');
    }
    requestAnimationFrame(() => resultRef.current?.focus());
  };

  const message = buildMessage(values);
  const mailto = `mailto:${COMPANY.email}?subject=${encodeURIComponent(`Demonstração ${SITE.productName} — ${values.empresa}`)}&body=${encodeURIComponent(message)}`;
  const wa = waLink(values);

  return (
    <section id="demonstracao" className="section demo on-light" aria-labelledby="demo-title" tabIndex={-1}>
      <div className="glow glow--left" aria-hidden="true" />
      <div className="container demo__grid">
        <div className="demo__copy">
          <h2 id="demo-title" className="demo__title" data-split>
            Veja a sua oficina <Hl>a um clique</Hl> de tudo.
          </h2>
          <p className="demo__lead">
            Numa conversa online, mostramos o <Brand /> app com dados de exemplo e respondemos às dúvidas da
            sua equipe.
          </p>
          <ol className="demo__points" data-reveal="stagger">
            {POINTS.map((p, i) => (
              <li key={p}>
                <b>{String(i + 1).padStart(2, '0')}</b>
                <span>{p}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="demo-card" data-reveal>
          {status === 'sent' || status === 'handoff' ? (
            <div className="demo-card__done" ref={resultRef} tabIndex={-1} role="status">
              <CheckCircle2 size={36} aria-hidden="true" />
              {status === 'sent' ? (
                <>
                  <h3>Pedido recebido!</h3>
                  <p>
                    Obrigado, {values.nome.split(' ')[0]}. A equipe <Brand /> vai entrar em contato para
                    combinar o melhor horário.
                  </p>
                </>
              ) : (
                <>
                  <h3>Falta só tocar em enviar.</h3>
                  <p>
                    Abrimos o WhatsApp da <Brand /> com o seu pedido já escrito. Se ele não abriu, use o botão
                    abaixo ou mande por e-mail.
                  </p>
                  <div className="demo-card__handoff">
                    <a
                      className="btn btn--primary btn--lg btn--block"
                      href={wa}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle size={20} aria-hidden="true" /> <span>Abrir o WhatsApp</span>
                      <span className="sr-only"> (abre em nova aba)</span>
                    </a>
                    <a className="btn btn--ghost btn--lg btn--block" href={mailto}>
                      <Mail size={20} aria-hidden="true" /> <span>Enviar por e-mail</span>
                    </a>
                  </div>
                </>
              )}
              <button type="button" className="text-btn" onClick={() => setStatus('idle')}>
                Editar meus dados
              </button>
            </div>
          ) : (
            <form
              ref={formRef}
              className="demo-form"
              noValidate
              onSubmit={onSubmit}
              aria-labelledby="demo-form-title"
            >
              <h3 id="demo-form-title" className="demo-form__title">
                Agende sua demonstração
              </h3>
              <Field id="demo-nome" label="Nome" error={errors.nome}>
                <input
                  id="demo-nome"
                  name="nome"
                  autoComplete="name"
                  value={values.nome}
                  onChange={set('nome')}
                  {...aria('nome')}
                />
              </Field>
              <Field id="demo-empresa" label="Oficina ou empresa" error={errors.empresa}>
                <input
                  id="demo-empresa"
                  name="empresa"
                  autoComplete="organization"
                  value={values.empresa}
                  onChange={set('empresa')}
                  {...aria('empresa')}
                />
              </Field>
              <Field id="demo-email" label="E-mail" error={errors.email}>
                <input
                  id="demo-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={set('email')}
                  {...aria('email')}
                />
              </Field>
              <Field id="demo-whatsapp" label="WhatsApp" error={errors.whatsapp}>
                <input
                  id="demo-whatsapp"
                  name="whatsapp"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="(00) 00000-0000"
                  value={values.whatsapp}
                  onChange={set('whatsapp')}
                  {...aria('whatsapp')}
                />
              </Field>
              <Field id="demo-plano" label="Plano de interesse (opcional)">
                <select id="demo-plano" name="plano" value={values.plano} onChange={set('plano')}>
                  <option value="">Ainda não sei</option>
                  {plans.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} · {p.title}
                    </option>
                  ))}
                </select>
              </Field>
              {status === 'error' && (
                <p className="demo-form__alert" role="alert" ref={resultRef} tabIndex={-1}>
                  Não conseguimos enviar agora. Tente de novo ou fale pelo{' '}
                  <a href={COMPANY.whatsapp} target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                  .
                </p>
              )}
              <button
                type="submit"
                className="btn btn--primary btn--lg btn--block"
                disabled={status === 'sending'}
              >
                <span>{status === 'sending' ? 'Enviando…' : 'Agendar demonstração'}</span>
                <ArrowRight className="btn__icon" size={20} aria-hidden="true" />
              </button>
              <p className="demo-form__legal">Usamos seus dados só para falar sobre a demonstração.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
