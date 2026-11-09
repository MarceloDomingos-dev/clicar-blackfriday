// Verifica a consistência dos dados dos planos: níveis, herança e nomes duplicados.
// Uso: npm run check:plans
import { plans, featureGroups } from '../src/data/plans.js';
import { comparisonGroups } from '../src/data/comparison.js';

const errors = [];
const levels = plans.map((p) => p.level);
if (levels.join() !== [...levels].sort((a, b) => a - b).join()) errors.push('Planos fora de ordem.');

const seen = new Map();
for (const g of featureGroups) {
  for (const s of g.subgroups) {
    for (const f of s.features) {
      if (!levels.includes(f.from)) errors.push(`"${f.name}" usa nível inexistente ${f.from}.`);
      const key = `${g.id}::${f.name}`;
      if (seen.has(key)) errors.push(`Recurso duplicado em ${g.label}: "${f.name}".`);
      seen.set(key, f);
    }
  }
}

// Herança: o conjunto de recursos de cada plano contém o do plano anterior.
const features = [...seen.values()];
const setFor = (lvl) => new Set(features.filter((f) => lvl >= f.from));
for (let i = 1; i < plans.length; i++) {
  const prev = setFor(plans[i - 1].level);
  const cur = setFor(plans[i].level);
  for (const f of prev) if (!cur.has(f)) errors.push(`"${f.name}" some no ${plans[i].name}.`);
}

for (const g of comparisonGroups)
  for (const r of g.rows)
    if (!levels.includes(r.from)) errors.push(`Linha do comparativo com nível inválido: "${r.name}".`);

const summary = plans.map((p) => `${p.name}: ${setFor(p.level).size} recursos (${p.price})`).join('\n');
if (errors.length) {
  console.error('✗ Problemas encontrados:\n- ' + errors.join('\n- '));
  process.exit(1);
}
console.log('✓ Dados consistentes\n' + summary);
