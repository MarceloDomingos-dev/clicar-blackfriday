import { plans } from '../data/plans.js';

/** Plano pelo nível (1 a 4). */
export const planByLevel = (level) => plans.find((p) => p.level === level);

/** Plano anterior (para o texto "Inclui tudo do Plano N"). */
export const previousPlan = (plan) => planByLevel(plan.level - 1) ?? null;
