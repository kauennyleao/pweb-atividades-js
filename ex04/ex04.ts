type Formatador = (valor: number) => string;
const formatarReal: Formatador = (v) => `R$ ${v.toFixed(2)}`;

const formatarMeses = (meses: number): string => {
  const anos = Math.floor(meses / 12);
  const resto = meses % 12;
  const tAnos = anos > 0 ? `${anos} ${anos === 1 ? 'ano' : 'anos'}` : '';
  const tMeses = resto > 0 ? `${resto} ${resto === 1 ? 'mês' : 'meses'}` : '';
  return anos > 0 && resto > 0 ? `${tAnos} e ${tMeses}` : tAnos || tMeses || '0 meses';
};

interface ResultadoMeta { meses: number; saldo: number; depositado: number; rendimento: number; atingiu: boolean; }

function calcularMeses(meta: number, deposito: number, taxa: number = 0.5): ResultadoMeta {
  let saldo = 0, totalDepositado = 0, meses = 0;
  while (saldo < meta && meses < 600) {
    meses++;
    saldo *= (1 + taxa / 100);
    const dep = (meses % 12 === 0) ? deposito * 2 : deposito;
    saldo += dep;
    totalDepositado += dep;
  }
  return { meses, saldo, depositado: totalDepositado, rendimento: saldo - totalDepositado, atingiu: saldo >= meta };
}

const campoMeta = document.getElementById('meta') as HTMLInputElement;
const campoDep = document.getElementById('deposito') as HTMLInputElement;
const campoTaxa = document.getElementById('taxa') as HTMLInputElement;
const botaoCalc4 = document.getElementById('calcular') as HTMLButtonElement;
const caixaResultado4 = document.getElementById('resultado') as HTMLElement;

botaoCalc4.addEventListener('click', () => {
  const meta = Number(campoMeta.value), deposito = Number(campoDep.value), taxaTxt = campoTaxa.value.trim();
  if (meta <= 0 || deposito <= 0) {
    caixaResultado4.textContent = 'Informe valores positivos';
    caixaResultado4.className = 'erro';
    return;
  }
  const res = taxaTxt !== '' ? calcularMeses(meta, deposito, Number(taxaTxt)) : calcularMeses(meta, deposito);

  if (res.atingiu) {
    caixaResultado4.innerHTML = `Você atinge a meta em ${res.meses} meses (${formatarMeses(res.meses)}).<br>Saldo final: ${formatarReal(res.saldo)}<br>Total depositado: ${formatarReal(res.depositado)}<br>Rendimento: ${formatarReal(res.rendimento)}`;
    caixaResultado4.className = 'sucesso';
  } else {
    caixaResultado4.innerHTML = `Meta inalcançável em 50 anos.<br>Saldo após 600 meses: ${formatarReal(res.saldo)}`;
    caixaResultado4.className = 'erro';
  }
});
