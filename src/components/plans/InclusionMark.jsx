import { Check, Minus, Plus } from 'lucide-react';

/**
 * Indicador de inclusão de um recurso em um plano.
 * state: 'new' (introduzido neste plano) | 'included' (herdado) | 'off' (não incluído)
 */
export function InclusionMark({ state, compact = false }) {
  if (state === 'off') {
    return (
      <span className="mark mark--off">
        <Minus size={16} aria-hidden="true" />
        <span className="sr-only">Não incluído</span>
      </span>
    );
  }
  if (state === 'new') {
    return (
      <span className="mark mark--new">
        <span className="mark__dot">
          <Plus size={13} strokeWidth={3} aria-hidden="true" />
        </span>
        {!compact && (
          <span className="mark__label" aria-hidden="true">
            Novo
          </span>
        )}
        <span className="sr-only">Incluído — novo neste plano</span>
      </span>
    );
  }
  return (
    <span className="mark mark--included">
      <Check size={18} strokeWidth={2.5} aria-hidden="true" />
      <span className="sr-only">Incluído</span>
    </span>
  );
}

/** Incluído (check) ou não incluído (traço). */
export const markState = (feature, plan) => (plan.level < feature.from ? 'off' : 'included');
