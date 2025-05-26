import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-clientes-viagem',
  imports: [
    RouterLink,
    FormsModule,
    NgIf
  ],
  templateUrl: './clientes-viagem.component.html',
  styleUrl: './clientes-viagem.component.css'
})
export class ClientesViagemComponent {
  listaViagem: any[] = [];

  paginaAtual = 1;
  itensPorPagina = 8;

  get custosPaginados() {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    return this.listaViagemFiltrados.slice(inicio, fim);
  }

  get totalPaginas(): number {
    return Math.ceil(this.listaViagemFiltrados.length / this.itensPorPagina);
  }

  mudarPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaAtual = pagina;
    }
  }

  listaViagemFiltrados: any[] = [];
  
  filtro: string = "";

  incrementarId = 0;

  id = 0;
  id_cliente = 0;
  date = "";
  time = "";


  clienteEditando: any = null;

  classeAdicionar = "modal-fechado";
  classeEditar = "modal-fechado";

  constructor() {
    this.listaViagemFiltrados = this.listaViagem
  }


  resetarValores(){
    this.id = 0;
    this.id_cliente = 0;
    this.date = "";
    this.time = "";
  }

  adicionar(){
    if(this.id !== null && this.date !== "" && this.time !== "") {
      const newCliente = {
        id: this.incrementarId,
        id_cliente: this.id_cliente,
        date: this.date,
        time: this.time,
      }

      this.listaViagem.push(newCliente);
      this.aplicarFiltro();

      this.resetarValores();
      this.classeAdicionar = "modal-fechado";
      this.incrementarId++;
    }else{
      this.classeAdicionar = "modal-fechado";
    }
  }

  abrirModalEditar(id: number) {
    const cliente = this.listaViagem.find(c => c.id === id);
    if (cliente) {
      this.clienteEditando = { ...cliente };
      this.classeEditar = "modal";
    }
  }

  salvarEdicao() {
    const index = this.listaViagem.findIndex(c => c.id === this.clienteEditando.id);
    if (index !== -1) {
      this.listaViagem[index] = { ...this.clienteEditando };
      this.aplicarFiltro();
    }
    this.classeEditar = "modal-fechado";
    this.clienteEditando = null;
  }

  excluirCliente(id: number) {
    this.listaViagem = this.listaViagem.filter((item) => item.id !== id);
    this.aplicarFiltro();
  }

  aplicarFiltro() {
    const termo = this.filtro.trim().toLowerCase();
    
    if (termo === '') {
      this.listaViagemFiltrados = [...this.listaViagem];
      this.paginaAtual = 1;
    } else {
      this.listaViagemFiltrados = this.listaViagem.filter(viagem =>
        viagem.id_cliente.toString().includes(termo) ||
        viagem.date.includes(termo) ||
        viagem.time.includes(termo) ||
        viagem.id.toString().includes(termo)
      );
    }
  }
}
