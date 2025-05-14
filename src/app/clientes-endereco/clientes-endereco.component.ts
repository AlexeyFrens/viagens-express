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
    }
    this.classeEditar = "modal-fechado";
    this.clienteEditando = null;
  }

  excluirCliente(id: number) {
    this.listaEndereco = this.listaEndereco.filter((item) => item.id !== id);
  }
}
