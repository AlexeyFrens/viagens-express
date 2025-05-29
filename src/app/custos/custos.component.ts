import { Component, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CustosService } from './custos.service';
import {AuthService} from '../login-admin/login-admin.service';

@Component({
  selector: 'app-custos',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    NgIf,
  ],
  templateUrl: './custos.component.html',
  styleUrls: ['./custos.component.css']
})
export class CustosComponent implements OnInit {

  listaCustos: any[] = [];
  listaCustosFiltrados: any[] = [];

  paginaAtual = 1;
  itensPorPagina = 8;
  filtro = '';

  descricao = '';
  valorGasto = 0;
  qtdParcelas = 0;
  data = '';

  clienteEditando: any = null;
  classeAdicionar = 'modal-fechado';
  classeEditar = 'modal-fechado';

  constructor(private custosService: CustosService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.carregarCustos();
  }

  get custosPaginados() {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    return this.listaCustosFiltrados.slice(inicio, fim);
  }

  get totalPaginas(): number {
    return Math.ceil(this.listaCustosFiltrados.length / this.itensPorPagina);
  }

  mudarPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaAtual = pagina;
    }
  }

  carregarCustos() {
    this.custosService.getCustos().subscribe(data => {
      this.listaCustos = data;
      this.aplicarFiltro();
    });
  }

  adicionar() {
    const novoCusto = {
      descricao: this.descricao,
      valorGasto: this.valorGasto,
      qtdParcelas: this.qtdParcelas,
      data: this.data
    };

    this.custosService.adicionar(novoCusto).subscribe(() => {
      this.carregarCustos();
      this.resetarValores();
      this.classeAdicionar = 'modal-fechado';
    });
  }

  abrirModalEditar(id: string) {
    const custo = this.listaCustos.find(c => c._id === id);
    this.clienteEditando = { ...custo };
    this.classeEditar = 'modal';
  }

  salvarEdicao() {
    this.custosService.atualizar(this.clienteEditando._id, this.clienteEditando).subscribe(() => {
      this.carregarCustos();
      this.classeEditar = 'modal-fechado';
      this.clienteEditando = null;
    });
  }

  excluirCliente(id: string) {
    this.custosService.deletar(id).subscribe(() => {
      this.carregarCustos();
    });
  }

  aplicarFiltro() {
    const termo = this.filtro.trim().toLowerCase();
    if (termo === '') {
      this.listaCustosFiltrados = [...this.listaCustos];
      this.paginaAtual = 1;
    } else {
      this.listaCustosFiltrados = this.listaCustos.filter(custo =>
        custo.descricao?.toLowerCase().includes(termo) ||
        custo.valorGasto?.toString().includes(termo) ||
        custo.qtdParcelas?.toString().includes(termo) ||
        custo.data?.toLowerCase().includes(termo) ||
        custo._id?.toString().includes(termo)
      );
    }
  }

  resetarValores() {
    this.descricao = '';
    this.valorGasto = 0;
    this.qtdParcelas = 0;
    this.data = '';
  }

  logout() {
    this.authService.logout();
  }
}
