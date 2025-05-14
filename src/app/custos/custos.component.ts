import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-custos',
  imports: [
    RouterLink,
    FormsModule,
    NgIf
  ],
  templateUrl: './custos.component.html',
  styleUrl: './custos.component.css'
})
export class CustosComponent {
  listaCustos: any[] = [];

  incrementarId = 0;

  id = 0;
  descricao = ""
  valorGasto = 0
  qtdParcelas = 0
  data = ""


  clienteEditando: any = null;

  classeAdicionar = "modal-fechado";
  classeEditar = "modal-fechado";

  resetarValores(){
    this.id = 0;
    this.descricao = ""
    this.valorGasto = 0
    this.qtdParcelas = 0
    this.data = ""
  }

  adicionar(){
    if(this.id !== null && this.descricao !== "" && this.valorGasto !== null && this.qtdParcelas !== null && this.data !== "") {
      const newCliente = {
        id: this.incrementarId,
        descricao: this.descricao,
        valorGasto: this.valorGasto,
        qtdParcelas: this.qtdParcelas,
        data: this.data
      }

      this.listaCustos.push(newCliente);

      this.resetarValores();
      this.classeAdicionar = "modal-fechado";
      this.incrementarId++;
    }else{
      this.classeAdicionar = "modal-fechado";
    }
  }

  abrirModalEditar(id: number) {
    const cliente = this.listaCustos.find(c => c.id === id);
    if (cliente) {
      this.clienteEditando = { ...cliente };
      this.classeEditar = "modal";
    }
  }

  salvarEdicao() {
    const index = this.listaCustos.findIndex(c => c.id === this.clienteEditando.id);
    if (index !== -1) {
      this.listaCustos[index] = { ...this.clienteEditando };
    }
    this.classeEditar = "modal-fechado";
    this.clienteEditando = null;
  }

  excluirCliente(id: number) {
    this.listaCustos = this.listaCustos.filter((item) => item.id !== id);
  }
}
