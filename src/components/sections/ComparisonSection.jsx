import { Info } from 'lucide-react';
import { AVAILABILITY_NOTE } from '../../data/plans.js';
import { ComparisonMobile } from '../plans/ComparisonMobile.jsx';
import { ComparisonTable } from '../plans/ComparisonTable.jsx';
import { Hl, SectionHeading } from '../ui/SectionHeading.jsx';

export function ComparisonSection() {
  return (
    <section id="comparar" className="section compare on-light" aria-labelledby="comparar-title">
      <div className="container">
        <SectionHeading
          id="comparar-title"
          layout="split"
          title={
            <>
              Compare os <Hl>planos.</Hl>
            </>
          }
          description="As principais funcionalidades lado a lado. Cada plano inclui tudo do anterior."
        />

        <div className="compare-desktop">
          <ComparisonTable />
        </div>
        <ComparisonMobile />

        <p className="availability-note">
          <Info size={16} aria-hidden="true" />
          <span>{AVAILABILITY_NOTE}</span>
        </p>
      </div>
    </section>
  );
}
