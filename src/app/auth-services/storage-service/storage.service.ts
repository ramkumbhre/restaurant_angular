import { Injectable } from '@angular/core';

const TOKEN = 'token';
const USER = 'user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  private static isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  static saveToken(token: string): void {
    if (this.isBrowser()) {
      window.localStorage.removeItem(TOKEN);
      window.localStorage.setItem(TOKEN, token);
    }
  }

  static saveUser(user: any): void {
    if (this.isBrowser()) {
      window.localStorage.removeItem(USER);
      window.localStorage.setItem(USER, JSON.stringify(user));
    }
  }
  
  static getToken(): string | null {
    return localStorage.getItem(TOKEN);
  }

  static getUser(): any {
    if (this.isBrowser()) {
      const user = localStorage.getItem(USER);
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  static getUserRole(): string {
    const user = this.getUser();
    return user ? user.role : '';
  }

  static isAdminLoggedIn(): boolean {
    if (!this.isBrowser() || this.getToken() === null) {
      return false;
    }
    return this.getUserRole() === 'ADMIN';
  }

  static isCustomerLoggedIn(): boolean {
    if (!this.isBrowser() || this.getToken() === null) {
      return false;
    }
    return this.getUserRole() === 'CUSTOMER';
  }

  static signout(){
    window.localStorage.removeItem(USER);
    window.localStorage.removeItem(TOKEN);
  }
}
