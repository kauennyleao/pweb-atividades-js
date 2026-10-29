function calcularTotal(valor: number, parcelas: number): number {
  if (parcelas <= 3) return valor;
  return valor * (1.02 ** parcelas);
}

function simularParcelamento(preco: number, entrada?: number): string {
  let financiado = preco;
  if (typeof entrada !== 'undefined') financiado = preco - entrada;
  let linhasHtml = '';

  for (let p = 1; p <= 12; p++) {
    if (p === 7 || p === 8 || p === 9 || p === 11) continue;
    const total = calcularTotal(financiado, p);
    const valorParcela = total / p;
    if (valorParcela < 50.00) break;
    const jurosTexto = p <= 3 ? 'sem juros' : '2% a.m.';
    
    linhasHtml += `<tr><td>${p}x</td><td>R$ ${valorParcela.toFixed(2)}</td><td>R$ ${total.toFixed(2)}</td><td>${jurosTexto}</td></tr>`;
  }
  return linhasHtml;
}

const campoPreco = document.getElementById('preco') as HTMLInputElement;
const campoEntrada = document.getElementById('entrada') as HTMLInputElement;
const botaoSimular = document.getElementById('simular') as HTMLButtonElement;
const caixaResultado3 = document.getElementById('resultado') as HTMLElement;
const tabelaParcelas = document.getElementById('parcelas') as HTMLElement;

botaoSimular.addEventListener('click', () => {
  const preco = Number(campoPreco.value);
  const entradaTexto = campoEntrada.value.trim();
  tabelaParcelas.innerHTML = '';
  caixaResultado3.textContent = '';

  if (preco <= 0) {
    caixaResultado3.textContent = 'Informe um preço válido';
    caixaResultado3.className = 'erro';
    return;
  }

  if (entradaTexto !== '') {
    const entrada = Number(entradaTexto);
    if (entrada >= preco) {
      caixaResultado3.textContent = 'A entrada cobre o valor total. Não há parcelas.';
      caixaResultado3.className = 'alerta';
      return;
    }
    caixaResultado3.textContent = `Valor financiado: R$ ${(preco - entrada).toFixed(2)}`;
    tabelaParcelas.innerHTML = simularParcelamento(preco, entrada);
  } else {
    caixaResultado3.textContent = `Valor financiado: R$ ${preco.toFixed(2)}`;
    tabelaParcelas.innerHTML = simularParcelamento(preco);
  }
});
