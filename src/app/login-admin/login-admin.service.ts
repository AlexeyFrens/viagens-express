import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly adminEmail = 'admin@gmail.com';
  private readonly adminSenha = 'admin123456';

  login(email: string, senha: string): boolean {
    if (email === this.adminEmail && senha === this.adminSenha) {
      localStorage.setItem('auth', 'true');
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('auth');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('auth') === 'true';
  }
}
