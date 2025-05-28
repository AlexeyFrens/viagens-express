import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ClientesService } from './clientes.service';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    NgIf,
  ],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  listaClientes: any[] = [];
  listaClientesFiltrados: any[] = [];

  paginaAtual = 1;
  itensPorPagina = 8;
  filtro = '';

  nome = '';
  sobrenome = '';
  id_endereco = '';
  telefone = '';
  telefone2 = '';

  clienteEditando: any = null;
  classeAdicionar = 'modal-fechado';
  classeEditar = 'modal-fechado';

  constructor(private clienteService: ClientesService) {}

  ngOnInit() {
    this.carregarClientes();
  }

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

  carregarClientes() {
    this.clienteService.getClientes().subscribe(data => {
      this.listaClientes = data;
      this.aplicarFiltro();
    });
  }

  adicionar() {
    const novoCliente = {
      nome: this.nome,
      sobrenome: this.sobrenome,
      id_endereco: this.id_endereco,
      telefone: this.telefone,
      telefone2: this.telefone2
    };

    this.clienteService.adicionar(novoCliente).subscribe(() => {
      this.carregarClientes();
      this.resetarValores();
      this.classeAdicionar = 'modal-fechado';
    });
  }

  abrirModalEditar(id: string) {
    const cliente = this.listaClientes.find(c => c._id === id);
    this.clienteEditando = { ...cliente };
    this.classeEditar = 'modal';
  }

  salvarEdicao() {
    this.clienteService.atualizar(this.clienteEditando._id, this.clienteEditando).subscribe(() => {
      this.carregarClientes();
      this.classeEditar = 'modal-fechado';
      this.clienteEditando = null;
    });
  }

  excluirCliente(id: string) {
    this.clienteService.deletar(id).subscribe(() => {
      this.carregarClientes();
    });
  }

  aplicarFiltro() {
    const termo = this.filtro.trim().toLowerCase();
    if (termo === '') {
      this.listaClientesFiltrados = [...this.listaClientes];
      this.paginaAtual = 1;
    } else {
      this.listaClientesFiltrados = this.listaClientes.filter(cliente =>
        cliente.nome?.toLowerCase().includes(termo) ||
        cliente.sobrenome?.toLowerCase().includes(termo) ||
        cliente.telefone?.toLowerCase().includes(termo) ||
        cliente.telefone2?.toLowerCase().includes(termo) ||
        cliente._id?.toString().includes(termo) ||
        cliente.id_endereco?.toString().includes(termo)
      );
    }
  }

  resetarValores() {
    this.nome = '';
    this.sobrenome = '';
    this.id_endereco = '';
    this.telefone = '';
    this.telefone2 = '';
  }
}
