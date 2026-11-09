import { comparisonGroups } from '../../data/comparison.js';
import { plans } from '../../data/plans.js';
import { ContactButton } from '../ui/ContactButton.jsx';
import { GroupIcon } from './GroupIcon.jsx';
import { InclusionMark, markState } from './InclusionMark.jsx';

/** Quadro comparativo enxuto (telas médias e grandes). */
export function ComparisonTable() {
  const colSpan = plans.length + 1;
  return (
    <table className="compare-table">
      <caption className="sr-only">
        Comparação resumida das funcionalidades dos quatro planos. Cada plano inclui tudo do plano anterior.
      </caption>
      <colgroup>
        <col className="compare-table__col-feature" />
        {plans.map((p) => (
          <col key={p.id} />
        ))}
      </colgroup>
      <thead>
        <tr>
          <th scope="col" className="compare-table__corner">
            <span className="label-caps">Funcionalidades</span>
          </th>
          {plans.map((p) => (
            <th key={p.id} scope="col" className={`compare-table__plan${p.featured ? ' is-featured' : ''}`}>
              <span className="compare-table__plan-name">{p.name}</span>
              <span className="compare-table__plan-price">{p.price}</span>
            </th>
          ))}
        </tr>
      </thead>
      {comparisonGroups.map((g) => (
        <tbody key={g.id} className="compare-table__rows">
          <tr className="compare-table__group">
            <th scope="colgroup" colSpan={colSpan}>
              <span className="compare-table__group-label">
                <span className="group-toggle__icon">
                  <GroupIcon name={g.icon} size={16} />
                </span>
                {g.label}
              </span>
            </th>
          </tr>
          {g.rows.map((r) => (
            <tr key={r.name} className="compare-table__row">
              <th scope="row">{r.name}</th>
              {plans.map((p) => (
                <td key={p.id} className={p.featured ? 'is-featured' : undefined}>
                  <InclusionMark state={markState(r, p)} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      ))}
      <tfoot>
        <tr>
          <td />
          {plans.map((p) => (
            <td key={p.id} className={p.featured ? 'is-featured' : undefined}>
              <ContactButton plan={p} variant={p.featured ? 'primary' : 'dark'} block>
                Escolher<span className="sr-only"> o {p.name}</span>
              </ContactButton>
            </td>
          ))}
        </tr>
      </tfoot>
    </table>
  );
}
