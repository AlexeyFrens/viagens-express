import {Routes} from '@angular/router';
import {LoginAdminComponent} from './components/login-admin/login-admin.component';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {ClientesComponent} from './components/clientes/clientes.component';
import {ClientesEnderecoComponent} from './components/clientes-endereco/clientes-endereco.component';
import {ClientesViagemComponent} from './components/clientes-viagem/clientes-viagem.component';
import {CustosComponent} from './components/custos/custos.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'admin',
    component: LoginAdminComponent
  },
  {
    path: 'clientes',
    component: ClientesComponent,
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
  }
];
