import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {AuthService} from './login-admin.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login-admin',
  imports: [
    RouterOutlet,
    RouterLink,
    FormsModule,
    NgIf
  ],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})
export class LoginAdminComponent {
  email = '';
  senha = '';
  erro = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const sucesso = this.authService.login(this.email, this.senha);
    if (sucesso) {
      this.router.navigate(['/clientes']);
    } else {
      this.erro = 'Email ou senha incorretos!';
    }
  }
}
