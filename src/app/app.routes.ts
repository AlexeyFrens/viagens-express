import {Routes} from '@angular/router';
import {LoginAdminComponent} from './login-admin/login-admin.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {ClientesComponent} from './clientes/clientes.component';
import {ClientesEnderecoComponent} from './clientes-endereco/clientes-endereco.component';
import {ClientesViagemComponent} from './clientes-viagem/clientes-viagem.component';
import {CustosComponent} from './custos/custos.component';
import {authGuard} from './login-admin/auth.guard';

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
    component: ClientesComponent,
    canActivate: [authGuard]
  },
  {
    path: 'enderecos',
    component: ClientesEnderecoComponent,
    canActivate: [authGuard]
  },
  {
    path: 'viagens',
    component: ClientesViagemComponent,
    canActivate: [authGuard]
  },
  {
    path: 'custos',
    component: CustosComponent,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
