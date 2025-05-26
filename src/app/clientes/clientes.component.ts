import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-clientes',
  imports: [
    RouterLink,
    FormsModule,
    NgIf
  ],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
})
export class ClientesComponent {

  listaClientes: any[] = [];

  paginaAtual = 1;
  itensPorPagina = 8;

  get custosPaginados() {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    return this.listaClientesFiltrados.slice(inicio, fim);
  }

  get totalPaginas(): number {
    return Math.ceil(this.listaClientesFiltrados.length / this.itensPorPagina);
  }

  mudarPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaAtual = pagina;
    }
  }

  listaClientesFiltrados: any[] = [];
  
  filtro: string = "";

  incrementarId = 0;

  id = 0;
  nome = "";
  sobrenome = "";
  id_endereco = "";
  telefone = "";
  telefone2 = "";

  clienteEditando: any = null;

  classeAdicionar = "modal-fechado";
  classeEditar = "modal-fechado";

  constructor() {
    this.listaClientesFiltrados = this.listaClientes;
  }

  resetarValores(){
    this.id = 0;
    this.nome = "";
    this.sobrenome = "";
    this.id_endereco = "";
    this.telefone = "";
    this.telefone2 = "";
  }

  adicionar(){
    if(this.id !== null && this.nome !== "" && this.sobrenome !== "" && this.id_endereco !== "" && this.telefone !== "") {
      const newCliente = {
        id: this.incrementarId,
        nome: this.nome,
        sobrenome: this.sobrenome,
        id_endereco: this.id_endereco,
        telefone: this.telefone,
        telefone2: this.telefone2
      }

      this.listaClientes.push(newCliente);
      this.aplicarFiltro();

      this.resetarValores();
      this.classeAdicionar = "modal-fechado";
      this.incrementarId++;
    }else{
      this.classeAdicionar = "modal-fechado";
    }
  }

  abrirModalEditar(id: number) {
    const cliente = this.listaClientes.find(c => c.id === id);
    if (cliente) {
      this.clienteEditando = { ...cliente };
      this.classeEditar = "modal";
    }
  }

  salvarEdicao() {
    const index = this.listaClientes.findIndex(c => c.id === this.clienteEditando.id);
    if (index !== -1) {
      this.listaClientes[index] = { ...this.clienteEditando };
      this.aplicarFiltro();
    }
    this.classeEditar = "modal-fechado";
    this.clienteEditando = null;
  }

  excluirCliente(id: number) {
    this.listaClientes = this.listaClientes.filter((item) => item.id !== id);
    this.aplicarFiltro();
  }

  aplicarFiltro() {
    const termo = this.filtro.trim().toLowerCase();
    if (termo === '') {
      this.listaClientesFiltrados = [...this.listaClientes];
      this.paginaAtual = 1;
    } else {
      this.listaClientesFiltrados = this.listaClientes.filter(cliente =>
        cliente.nome.toLowerCase().includes(termo) ||
        cliente.sobrenome.toLowerCase().includes(termo) ||
        cliente.telefone.toLowerCase().includes(termo) ||
        (cliente.telefone2 && cliente.telefone2.toLowerCase().includes(termo)) ||
        cliente.id.toString().includes(termo) ||
        cliente.id_endereco.toString().includes(termo)
      );
    }
  }
}
