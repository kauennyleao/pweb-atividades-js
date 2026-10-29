function lerPrecos(texto: string): { precos: number[]; ignorados: number } {
  const linhas = texto.split('\n');
  const precos: number[] = [];
  let ignorados = 0;
  for (let l of linhas) {
    const limpa = l.trim().replace(',', '.');
    if (limpa === '') continue;
    const val = Number(limpa);
    if (isNaN(val) || val <= 0) { ignorados++; continue; }
    if (precos.length >= 20) break;
    precos.push(val);
  }
  return { precos, ignorados };
}

function somarItens(...precos: number[]): number { return precos.reduce((a, c) => a + c, 0); }

function calcularDesconto(total: number, percentual: number): number;
function calcularDesconto(total: number, cupom: string): number;
function calcularDesconto(total: number, param: number | string): number {
  if (typeof param === 'number') return (total * param) / 100;
  const cupom = param.toUpperCase();
  switch (cupom) {
    case 'BEMVINDO': return total * 0.10;
    case 'PROMO20': return total * 0.20;
    case 'MENOS15': return total >= 100 ? 15 : 0;
    default: return 0;
  }
}

const campoItens = document.getElementById('itens') as HTMLTextAreaElement;
const campoCupom = document.getElementById('cupom') as HTMLInputElement;
const chkFidelidade = document.getElementById('fidelidade') as HTMLInputElement;
const bFechar = document.getElementById('fechar') as HTMLButtonElement;
const caixaResultado5 = document.getElementById('resultado') as HTMLElement;

bFechar.addEventListener('click', () => {
  const { precos, ignorados } = lerPrecos(campoItens.value);
  if (precos.length === 0) {
    caixaResultado5.textContent = 'Nenhum item válido';
    caixaResultado5.className = 'erro';
    return;
  }
  const sub = somarItens(...precos);
  const descCupom = calcularDesconto(sub, campoCupom.value.trim());
  const descFid = chkFidelidade.checked ? calcularDesconto(sub - descCupom, 5) : 0;
  const tot = sub - descCupom - descFid;

  caixaResultado5.innerHTML = `Itens: ${precos.length} ${ignorados > 0 ? `(${ignorados} linha(s) ignorada(s))` : ''}<br>Subtotal: R$ ${sub.toFixed(2)}<br>Cupom: - R$ ${descCupom.toFixed(2)}<br>Fidelidade: - R$ ${descFid.toFixed(2)}<br><strong>Total: R$ ${tot.toFixed(2)}</strong>`;
  caixaResultado5.className = 'sucesso';
});
