let contador: number = 0;

const pContador = document.getElementById(
  "contador"
) as HTMLParagraphElement;
const botaoSomar = document.getElementById("somar") as HTMLButtonElement;
const botaoResetar = document.getElementById(
  "resetar"
) as HTMLButtonElement;

function atualizarTela() {
  pContador.textContent = contador.toString();
}

botaoSomar.addEventListener("click", () => {
  contador++;
  atualizarTela();
});

botaoResetar.addEventListener("click", () => {
  contador = 0;
  atualizarTela();\
});
