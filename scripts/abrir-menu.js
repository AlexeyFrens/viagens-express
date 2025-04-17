// Abrir modal de adicionar
const botaoAdicionar = document.querySelector(".adicionar");
const modalAdicionar = document.getElementById("modalAdicionar");

botaoAdicionar.addEventListener("click", () => {
  modalAdicionar.style.display = "flex";
});

// Abrir modal de editar (pega todos os botões de editar)
const botoesEditar = document.querySelectorAll(".editar");
const modalEditar = document.getElementById("modalEditar");

botoesEditar.forEach(botao => {
  botao.addEventListener("click", () => {
    modalEditar.style.display = "flex";
  });
});

// Fechar modais ao clicar em "Cancelar"
const botoesCancelar = document.querySelectorAll(".cancelar");
botoesCancelar.forEach(botao => {
  botao.addEventListener("click", (e) => {
    e.preventDefault(); // evita submit do formulário
    modalAdicionar.style.display = "none";
    modalEditar.style.display = "none";
  });
});

// Fechar ao clicar fora do conteúdo do modal
window.addEventListener("click", function (e) {
  if (e.target === modalAdicionar) {
    modalAdicionar.style.display = "none";
  }
  if (e.target === modalEditar) {
    modalEditar.style.display = "none";
  }
});