import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuhtenticated: boolean = false;

  login(userName: string, password: string) {
    if (userName === 'admin' && password === 'admin') {
      this.isAuhtenticated = true;
      return true;
    }
    return false;
  }
  isLoggedIn(): boolean {
    const user = localStorage.getItem('user');
    if (user) {
      this.isAuhtenticated = true;
      return this.isAuhtenticated;
    } else {
      this.isAuhtenticated = false;
      return this.isAuhtenticated;
    }
  }
  logout(): void {
    this.isAuhtenticated = false;
  }
}
