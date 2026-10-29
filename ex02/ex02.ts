type TipoCliente = 'residencial' | 'rural' | 'comercial' | 'industrial';
type Bandeira = 'verde' | 'amarela' | 'vermelha1' | 'vermelha2';

function tarifaPorKwh(tipo: TipoCliente): number {
  switch (tipo) {
    case 'residencial':
    case 'rural':
      return 0.80;
    case 'comercial':
    case 'industrial':
      return 0.95;
  }
}

function adicionalBandeira(consumo: number, bandeira: Bandeira = 'verde'): number {
  switch (bandeira) {
    case 'verde':
      return 0.00;
    case 'amarela':
      return consumo * 0.02;
    case 'vermelha1':
      return consumo * 0.04;
    case 'vermelha2':
      return consumo * 0.08;
  }
}

console.log("Resultado do teste adicionalBandeira(100):", adicionalBandeira(100));

function mensagemBandeira(bandeira: Bandeira): string {
  switch (bandeira) {
    case 'verde':
      return 'Condições favoráveis de geração de energia.';
    case 'amarela':
      return 'Condições de geração menos favoráveis.';
    case 'vermelha1':
    case 'vermelha2':
      return 'Condições mais caras de geração. Economize!';
    default:
      return '';
  }
}

const campoConsumo = document.getElementById('consumo') as HTMLInputElement;
const campoTipo = document.getElementById('tipo') as HTMLSelectElement;
const campoBandeira = document.getElementById('bandeira') as HTMLSelectElement;
const botaoCalcular = document.getElementById('calcular') as HTMLButtonElement;
const caixaResultado = document.getElementById('resultado') as HTMLElement;

botaoCalcular.addEventListener('click', () => {
  const consumo = Number(campoConsumo.value);

  if (consumo <= 0) {
    caixaResultado.textContent = 'Informe um consumo válido';
    caixaResultado.className = 'erro';
    return;
  }

  const tipo = campoTipo.value as TipoCliente;
  const bandeira = campoBandeira.value as Bandeira;

  const energia = consumo * tarifaPorKwh(tipo);
  const adicional = adicionalBandeira(consumo, bandeira);
  const total = energia + adicional;
  const mensagem = mensagemBandeira(bandeira);

  const textoBandeira = bandeira === 'vermelha1' ? 'vermelha patamar 1' :
                        bandeira === 'vermelha2' ? 'vermelha patamar 2' : bandeira;

  caixaResultado.innerHTML = 
    `Energia: R$ ${energia.toFixed(2)}<br>` +
    `Bandeira ${textoBandeira}: R$ ${adicional.toFixed(2)}<br>` +
    `<strong>Total: R$ ${total.toFixed(2)}</strong><br><br>` +
    `${mensagem}`;

  caixaResultado.className = bandeira !== 'verde' ? 'alerta' : '';
});
