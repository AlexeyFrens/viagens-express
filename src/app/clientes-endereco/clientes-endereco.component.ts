import { Component, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { EnderecoService } from './clientes-endereco.service';
import {AuthService} from '../login-admin/login-admin.service';

@Component({
  selector: 'app-clientes-endereco',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    NgIf,
  ],
  templateUrl: './clientes-endereco.component.html',
  styleUrls: ['./clientes-endereco.component.css']
})
export class ClientesEnderecoComponent implements OnInit {

  listaEndereco: any[] = [];
  listaEnderecoFiltrados: any[] = [];

  paginaAtual = 1;
  itensPorPagina = 8;
  filtro = '';

  rua = '';
  bairro = '';
  numero = '';
  cidade = '';
  estado = '';

  clienteEditando: any = null;
  classeAdicionar = 'modal-fechado';
  classeEditar = 'modal-fechado';

  constructor(private enderecoService: EnderecoService, private authService: AuthService) { }

  ngOnInit() {
    this.carregarEnderecos();
  }

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

  carregarEnderecos() {
    this.enderecoService.getEnderecos().subscribe(data => {
      this.listaEndereco = data;
      this.aplicarFiltro();
    });
  }

  adicionar() {
    const novoEndereco = {
      rua: this.rua,
      bairro: this.bairro,
      numero: this.numero,
      cidade: this.cidade,
      estado: this.estado
    };

    this.enderecoService.adicionar(novoEndereco).subscribe(() => {
      this.carregarEnderecos();
      this.resetarValores();
      this.classeAdicionar = 'modal-fechado';
    });
  }

  abrirModalEditar(id: string) {
    const endereco = this.listaEndereco.find(e => e._id === id);
    this.clienteEditando = { ...endereco };
    this.classeEditar = 'modal';
  }

  salvarEdicao() {
    this.enderecoService.atualizar(this.clienteEditando._id, this.clienteEditando).subscribe(() => {
      this.carregarEnderecos();
      this.classeEditar = 'modal-fechado';
      this.clienteEditando = null;
    });
  }

  excluirCliente(id: string) {
    this.enderecoService.deletar(id).subscribe(() => {
      this.carregarEnderecos();
    });
  }

  aplicarFiltro() {
    const termo = this.filtro.trim().toLowerCase();
    if (termo === '') {
      this.listaEnderecoFiltrados = [...this.listaEndereco];
    } else {
      this.listaEnderecoFiltrados = this.listaEndereco.filter(endereco =>
        endereco.rua?.toLowerCase().includes(termo) ||
        endereco.bairro?.toLowerCase().includes(termo) ||
        endereco.numero?.toString().includes(termo) ||
        endereco.cidade?.toLowerCase().includes(termo) ||
        endereco.estado?.toLowerCase().includes(termo) ||
        endereco._id?.toString().includes(termo)
      );
    }
  }

  resetarValores() {
    this.rua = '';
    this.bairro = '';
    this.numero = '';
    this.cidade = '';
    this.estado = '';
  }

  logout() {
    this.authService.logout();
  }
}
