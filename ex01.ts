// 1. Funções pedidas pelas regras de negócio
function calcularMedia(n1: number, n2: number): number {
  return (n1 + n2) / 2;
}

function dadosValidos(n1: number, n2: number, frequencia: number): boolean {
  // Uma única condição usando && para verificar as notas e frequência válidas
  return n1 >= 0 && n1 <= 10 && n2 >= 0 && n2 <= 10 && frequencia >= 0 && frequencia <= 100;
}

function situacao(media: number, frequencia: number): string {
  // A regra de falta deve ser testada primeiro!
  if (frequencia < 75) {
    return 'Reprovado por falta';
  } else if (media >= 7) {
    return 'Aprovado';
  } else if (media >= 4) {
    const precisa = 10 - media;
    return `Exame final (precisa tirar ${precisa.toFixed(1)})`;
  } else {
    return 'Reprovado por nota';
  }
}

// 2. Mapeamento dos elementos da página HTML (Asserções de tipo)
const campoNome = document.getElementById('nome') as HTMLInputElement;
const campoN1 = document.getElementById('n1') as HTMLInputElement;
const campoN2 = document.getElementById('n2') as HTMLInputElement;
const campoFrequencia = document.getElementById('frequencia') as HTMLInputElement;
const botaoCalcular = document.getElementById('calcular') as HTMLButtonElement;
const caixaResultado = document.getElementById('resultado') as HTMLElement;

// 3. Evento de clique do botão
botaoCalcular.addEventListener('click', () => {
  const nome = campoNome.value;
  const n1 = Number(campoN1.value);
  const n2 = Number(campoN2.value);
  const freq = Number(campoFrequencia.value);

  // Retorno antecipado caso os dados sejam inválidos ou o nome esteja em branco
  if (!dadosValidos(n1, n2, freq) || nome.trim() === "") {
    caixaResultado.textContent = 'Dados inválidos';
    caixaResultado.className = 'erro';
    return;
  }

  const media = calcularMedia(n1, n2);
  const status = situacao(media, freq);

  // Mostra o resultado final com a média usando uma casa decimal
  caixaResultado.textContent = `${nome}: média ${media.toFixed(1)}. ${status}`;
  
  // Operador ternário para definir a classe CSS ('sucesso' se aprovado, 'erro' para os outros casos)
  caixaResultado.className = status === 'Aprovado' ? 'sucesso' : 'erro';
});