import { Component, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ViagemService } from './clientes-viagem.service';
import {AuthService} from '../login-admin/login-admin.service';

@Component({
  selector: 'app-clientes-viagem',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    NgIf,
  ],
  templateUrl: './clientes-viagem.component.html',
  styleUrls: ['./clientes-viagem.component.css']
})
export class ClientesViagemComponent implements OnInit {

  listaViagem: any[] = [];
  listaViagemFiltrados: any[] = [];

  paginaAtual = 1;
  itensPorPagina = 8;
  filtro = '';

  id_cliente = '';
  date = '';
  time = '';

  clienteEditando: any = null;
  classeAdicionar = 'modal-fechado';
  classeEditar = 'modal-fechado';

  constructor(private viagemService: ViagemService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.carregarViagens();
  }

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

  carregarViagens() {
    this.viagemService.getViagens().subscribe(data => {
      this.listaViagem = data;
      this.aplicarFiltro();
    });
  }

  adicionar() {
    const novaViagem = {
      id_cliente: this.id_cliente,
      date: this.date,
      time: this.time,
    };

    this.viagemService.adicionar(novaViagem).subscribe(() => {
      this.carregarViagens();
      this.resetarValores();
      this.classeAdicionar = 'modal-fechado';
    });
  }

  abrirModalEditar(id: string) {
    const viagem = this.listaViagem.find(v => v._id === id);
    this.clienteEditando = { ...viagem };
    this.classeEditar = 'modal';
  }

  salvarEdicao() {
    this.viagemService.atualizar(this.clienteEditando._id, this.clienteEditando).subscribe(() => {
      this.carregarViagens();
      this.classeEditar = 'modal-fechado';
      this.clienteEditando = null;
    });
  }

  excluirCliente(id: string) {
    this.viagemService.deletar(id).subscribe(() => {
      this.carregarViagens();
    });
  }

  aplicarFiltro() {
    const termo = this.filtro.trim().toLowerCase();
    if (termo === '') {
      this.listaViagemFiltrados = [...this.listaViagem];
      this.paginaAtual = 1;
    } else {
      this.listaViagemFiltrados = this.listaViagem.filter(viagem =>
        viagem.id_cliente?.toString().includes(termo) ||
        viagem.date?.toLowerCase().includes(termo) ||
        viagem.time?.toLowerCase().includes(termo) ||
        viagem._id?.toString().includes(termo)
      );
    }
  }

  resetarValores() {
    this.id_cliente = '';
    this.date = '';
    this.time = '';
  }

  logout() {
    this.authService.logout();
  }
}
