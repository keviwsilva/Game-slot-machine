import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'auth_token';
  
  private usersKey = 'users';

  login(email: string, senha: string): boolean {
    const users: any[] = JSON.parse(localStorage.getItem('contas') || '[]');
    const user = users.find((u) => u.email === email && u.senha === senha);
    if (user) {
      const token = 'fake_token';
      localStorage.setItem(this.tokenKey, token);
      return true;
    }

    return false;
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }
}
