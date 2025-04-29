import {Routes} from '@angular/router';
import {LoginAdminComponent} from './login-admin/login-admin.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {ClientesComponent} from './clientes/clientes.component';
import {ClientesEnderecoComponent} from './clientes-endereco/clientes-endereco.component';
import {ClientesViagemComponent} from './clientes-viagem/clientes-viagem.component';
import {CustosComponent} from './custos/custos.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'admin',
    component: LoginAdminComponent
  },
  {
    path: 'clientes',
    component: ClientesComponent
  },
  {
    path: 'enderecos',
    component: ClientesEnderecoComponent
  },
  {
    path: 'viagens',
    component: ClientesViagemComponent
  },
  {
    path: 'custos',
    component: CustosComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
