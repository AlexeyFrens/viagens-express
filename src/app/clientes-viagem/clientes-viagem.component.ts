import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-clientes-viagem',
  imports: [
    RouterLink
  ],
  templateUrl: './clientes-viagem.component.html',
  styleUrl: './clientes-viagem.component.css'
})
export class ClientesViagemComponent {
  actionsButton(){
    // Abrir modal de adicionar
    const botaoAdicionar = document.querySelector<HTMLButtonElement>(".adicionar");
    const modalAdicionar = document.getElementById("modalAdicionar") as HTMLElement | null;

    if (botaoAdicionar && modalAdicionar) {
      botaoAdicionar.addEventListener("click", () => {
        modalAdicionar.style.display = "flex";
      });
    }

    // Abrir modal de editar (pega todos os botões de editar)
    const botoesEditar = document.querySelectorAll<HTMLButtonElement>(".editar");
    const modalEditar = document.getElementById("modalEditar") as HTMLElement | null;

    botoesEditar.forEach(botao => {
      botao.addEventListener("click", () => {
        if (modalEditar) {
          modalEditar.style.display = "flex";
        }
      });
    });

    // Fechar modais ao clicar em "Cancelar"
    const botoesCancelar = document.querySelectorAll<HTMLButtonElement>(".cancelar");

    botoesCancelar.forEach(botao => {
      botao.addEventListener("click", (e: MouseEvent) => {
        e.preventDefault(); // evita submit do formulário
        if (modalAdicionar) {
          modalAdicionar.style.display = "none";
        }
        if (modalEditar) {
          modalEditar.style.display = "none";
        }
      });
    });

    // Fechar ao clicar fora do conteúdo do modal
    window.addEventListener("click", function (e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target === modalAdicionar) {
        modalAdicionar.style.display = "none";
      }
      if (target === modalEditar) {
        modalEditar.style.display = "none";
      }
    });
  }
}
