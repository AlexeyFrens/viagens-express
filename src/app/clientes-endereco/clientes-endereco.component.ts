import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-clientes-endereco',
  imports: [
    RouterLink,
    FormsModule,
    NgIf
  ],
  templateUrl: './clientes-endereco.component.html',
  styleUrl: './clientes-endereco.component.css'
})
export class ClientesEnderecoComponent {
  listaEndereco: any[] = [];

  paginaAtual = 1;
  itensPorPagina = 8;

  get custosPaginados() {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    return this.listaEnderecoFiltrados.slice(inicio, fim);
  }

  get totalPaginas(): number {
    return Math.ceil(this.listaEnderecoFiltrados.length / this.itensPorPagina);
  }

  mudarPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaAtual = pagina;
    }
  }

  listaEnderecoFiltrados: any[] = [];
  
  filtro: string = "";

  incrementarId = 0;

  id = 0;
  rua = "";
  bairro = "";
  numero = 0;
  cidade = "";
  estado = "";

  clienteEditando: any = null;

  classeAdicionar = "modal-fechado";
  classeEditar = "modal-fechado";

  constructor() {
    this.listaEnderecoFiltrados = this.listaEndereco
  }


  resetarValores(){
    this.id = 0;
    this.rua = "";
    this.bairro = "";
    this.numero = 0;
    this.cidade = "";
    this.estado = "";
  }

  adicionar(){
    if(this.id !== null && this.rua !== "" && this.bairro !== "" && this.numero !== null && this.cidade !== "" && this.estado !== "") {
      const newCliente = {
        id: this.incrementarId,
        rua: this.rua,
        bairro: this.bairro,
        numero: this.numero,
        cidade: this.cidade,
        estado: this.estado
      }

      this.listaEndereco.push(newCliente);
      this.aplicarFiltro();

      this.resetarValores();
      this.classeAdicionar = "modal-fechado";
      this.incrementarId++;
    }else{
      this.classeAdicionar = "modal-fechado";
    }
  }

  abrirModalEditar(id: number) {
    const cliente = this.listaEndereco.find(c => c.id === id);
    if (cliente) {
      this.clienteEditando = { ...cliente };
      this.classeEditar = "modal";
    }
  }

  salvarEdicao() {
    const index = this.listaEndereco.findIndex(c => c.id === this.clienteEditando.id);
    if (index !== -1) {
      this.listaEndereco[index] = { ...this.clienteEditando };
      this.aplicarFiltro();
    }
    this.classeEditar = "modal-fechado";
    this.clienteEditando = null;
  }

  excluirCliente(id: number) {
    this.listaEndereco = this.listaEndereco.filter((item) => item.id !== id);
    this.aplicarFiltro();
  }

  aplicarFiltro() {
    const termo = this.filtro.trim().toLowerCase();
    if (termo === '') {
      this.listaEnderecoFiltrados = [...this.listaEndereco];
      this.paginaAtual = 1;
    } else {
      this.listaEnderecoFiltrados = this.listaEndereco.filter(endereco =>
        endereco.rua.toLowerCase().includes(termo) ||
        endereco.bairro.toLowerCase().includes(termo) ||
        endereco.numero.toString().includes(termo) ||
        endereco.cidade.toLowerCase().includes(termo) ||
        endereco.estado.toLowerCase().includes(termo) ||
        endereco.id.toString().includes(termo)
      );
    }
  }
}
