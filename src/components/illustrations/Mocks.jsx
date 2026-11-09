import { Check, CheckCheck, ClipboardCheck, Route } from 'lucide-react';
import symbol from '../../assets/brand/clicar-simbolo-positivo.svg';

/*
 * Ilustrações do produto (decorativas, dados fictícios).
 * Todas são aria-hidden: o texto ao redor descreve o que mostram.
 */

export function ApprovalVisual() {
  return (
    <div className="dv dv-approval" aria-hidden="true">
      <div className="dv-approval__msg">
        <p className="dv-approval__title">Orçamento · HB20 2018</p>
        <ul>
          <li>Troca de pastilhas</li>
          <li>Alinhamento e balanceamento</li>
          <li className="is-check">
            <Check size={12} strokeWidth={3} /> Checklist com 14 itens
          </li>
        </ul>
        <span className="dv-approval__btn">
          <span className="a">Aprovar orçamento</span>
          <span className="b">
            <CheckCheck size={14} /> Aprovado pelo cliente
          </span>
        </span>
      </div>
    </div>
  );
}

const STEPS = ['Recebido', 'Diagnóstico', 'Em serviço', 'Pronto'];
export function TrackingVisual() {
  return (
    <div className="dv dv-tracking" aria-hidden="true">
      <div className="dv-tracking__car">Onix 2019 · Revisão</div>
      <ol className="dv-tracking__steps">
        {STEPS.map((s, i) => (
          <li key={s} style={{ '--i': i }}>
            <i />
            <span>{s}</span>
          </li>
        ))}
      </ol>
      <div className="dv-tracking__bar">
        <span />
      </div>
    </div>
  );
}

export function BankVisual() {
  const rows = [
    ['Banco A · conta corrente', 'Conciliado'],
    ['Banco B · recebíveis', 'Conciliado'],
    ['Cartões · vendas do dia', 'Conferido'],
  ];
  return (
    <div className="dv dv-bank" aria-hidden="true">
      {rows.map(([a, b], i) => (
        <div key={a} className="dv-bank__row" style={{ '--i': i }}>
          <span className="dv-bank__dot" />
          <span>{a}</span>
          <b>
            <Check size={12} strokeWidth={3} /> {b}
          </b>
        </div>
      ))}
      <p className="dv-bank__live">
        <span /> atualizado agora
      </p>
    </div>
  );
}

export function ChartVisual() {
  const bars = [42, 58, 50, 66, 61, 78, 72, 88];
  return (
    <div className="dv dv-chart" aria-hidden="true">
      <div className="dv-chart__legend">
        <span>DRE</span>
        <span>DRF</span>
        <span>Fluxo de caixa</span>
      </div>
      <div className="dv-chart__bars">
        {bars.map((h, i) => (
          <span key={i} style={{ '--h': `${h}%`, '--i': i }} />
        ))}
      </div>
    </div>
  );
}

const CHECK_ITEMS = ['Pneus e rodas', 'Lataria e pintura', 'Nível de combustível', 'Objetos no veículo'];
export function ChecklistVisual() {
  return (
    <div className="dv dv-checklist" aria-hidden="true">
      <p className="dv-checklist__head">
        <ClipboardCheck size={14} /> Checklist de entrada · Gol 2018
      </p>
      <ul>
        {CHECK_ITEMS.map((c, i) => (
          <li key={c} style={{ '--i': i }}>
            <i>
              <Check size={11} strokeWidth={3.5} />
            </i>
            {c}
          </li>
        ))}
      </ul>
      <p className="dv-checklist__foot">Anexado ao orçamento</p>
    </div>
  );
}

/** Celular com o orçamento aprovado no WhatsApp (abertura). */

export function PhoneApproval() {
  return (
    <div className="mock-phone" aria-hidden="true">
      <div className="mock-phone__head">
        <span className="mock-phone__avatar">
          <img src={symbol} alt="" width="14" height="16" />
        </span>
        <div>
          <strong>Sua oficina</strong>
          <small>online</small>
        </div>
      </div>
      <div className="mock-phone__chat">
        <div className="quote">
          <strong>Orçamento · HB20 2018</strong>
          <span>Troca de óleo e filtros</span>
          <span className="quote__check">
            <ClipboardCheck size={12} /> Checklist com 14 itens
          </span>
          <span className="quote__btn">Aprovar orçamento</span>
        </div>
        <p className="bubble bubble--in">Aprovado!</p>
        <div className="bubble-card">
          <Route size={16} />
          <div>
            <strong>Em serviço</strong>
            <span>Você acompanha cada etapa por aqui</span>
          </div>
        </div>
      </div>
    </div>
  );
}
