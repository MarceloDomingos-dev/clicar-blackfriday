import { Check, Minus } from 'lucide-react';
import { Eyebrow } from '../ui/SectionHeading.jsx';
import { Brand } from '../ui/Brand.jsx';

const ROWS = [
  ['Orçamento', 'No papel ou no bloco de notas', 'Com checklist do veículo integrado'],
  ['Aprovação', '“Pode fazer” por telefone', 'Aprovação digital no WhatsApp'],
  ['Acompanhamento', 'Cliente liga para perguntar', 'Cliente vê cada etapa em tempo real'],
  ['Cartões', 'Taxa conferida na mão, quando dá', 'Conciliação automática com as taxas'],
  ['Banco', 'Extrato baixado no fim do mês', 'Open Finance em tempo real'],
  ['Resultado', 'Só no fechamento', 'DRE, DRF e fluxo a cada lançamento'],
  ['Rede', 'Uma planilha por unidade', 'Multiempresas com estoque integrado'],
];

export function VersusSection() {
  return (
    <section className="section versus on-light" aria-labelledby="versus-title">
      <div className="container">
        <div className="versus__box on-dark" data-spotlight>
          <div className="versus__top">
            <div>
              <Eyebrow>Comparativo</Eyebrow>
              <h2 id="versus-title" className="versus__title" data-split>
                Planilha e papel ou gestão de verdade?
              </h2>
            </div>
            <p className="versus__col-old" aria-hidden="true">
              Planilha e papel
            </p>
            <p className="versus__col-new" aria-hidden="true">
              <Brand /> app
            </p>
          </div>
          <table className="versus__table">
            <thead className="sr-only">
              <tr>
                <th scope="col">Tema</th>
                <th scope="col">Planilha e papel</th>
                <th scope="col">
                  <Brand /> app
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([topic, old, next]) => (
                <tr key={topic}>
                  <th scope="row">{topic}</th>
                  <td className="versus__old">
                    <Minus size={14} aria-hidden="true" /> <span>{old}</span>
                  </td>
                  <td className="versus__new">
                    <Check size={16} strokeWidth={3} aria-hidden="true" /> <span>{next}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
