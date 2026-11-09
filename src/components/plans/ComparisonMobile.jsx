import { useState } from 'react';
import { comparisonGroups } from '../../data/comparison.js';
import { plans } from '../../data/plans.js';
import { planByLevel } from '../../lib/plans.js';
import { ContactButton } from '../ui/ContactButton.jsx';
import { GroupIcon } from './GroupIcon.jsx';
import { InclusionMark, markState } from './InclusionMark.jsx';

/** Comparação para celular: escolha um plano e veja a lista resumida de funcionalidades. */
export function ComparisonMobile() {
  const defaultPlan = plans.find((p) => p.featured) ?? plans[0];
  const [selectedId, setSelectedId] = useState(defaultPlan.id);
  const plan = plans.find((p) => p.id === selectedId);

  return (
    <div className="compare-mobile">
      <fieldset className="plan-picker">
        <legend className="plan-picker__legend">Ver funcionalidades do plano</legend>
        <div className="plan-picker__options">
          {plans.map((p) => (
            <label key={p.id} className="plan-picker__option">
              <input
                type="radio"
                name="plano-comparacao"
                value={p.id}
                checked={p.id === selectedId}
                onChange={() => setSelectedId(p.id)}
                className="sr-only"
              />
              <span className="plan-picker__pill">
                <span className="plan-picker__name">{p.name}</span>
                <span className="plan-picker__price">{p.price}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="compare-mobile__summary" aria-live="polite">
        <p className="compare-mobile__plan">
          <strong>{plan.name}</strong> · {plan.title}
        </p>
        <p className="compare-mobile__inherit">
          {plan.level > 1
            ? `Inclui tudo do ${planByLevel(plan.level - 1).name}.`
            : 'Plano de entrada. Os planos seguintes acrescentam recursos a este.'}
        </p>
      </div>

      <div className="m-groups">
        {comparisonGroups.map((g) => (
          <section key={g.id} className="m-group" aria-labelledby={`m-${g.id}`}>
            <h3 id={`m-${g.id}`} className="m-group__title">
              <span className="group-toggle__icon">
                <GroupIcon name={g.icon} size={16} />
              </span>
              {g.label}
            </h3>
            <ul className="m-list">
              {g.rows.map((r) => {
                const state = markState(r, plan);
                return (
                  <li key={r.name} className={`m-list__item m-list__item--${state}`}>
                    <InclusionMark state={state} compact />
                    <span className="m-list__name">
                      {r.name}
                      {state === 'off' && <span className="tag tag--off">a partir do Plano {r.from}</span>}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      <ContactButton plan={plan} size="lg" block>
        Quero o {plan.name}
      </ContactButton>
    </div>
  );
}
