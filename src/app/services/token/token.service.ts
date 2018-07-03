import { Injectable } from '@angular/core';
import { TokenModule } from './token.type';

const TOKEN = 'token';

@Injectable({
  providedIn: 'root'
})
export class TokenService implements TokenModule.ITokenService {

  constructor() { }

  setToken(token: string): void {
    localStorage.setItem(TOKEN, token);
  }

  getToken(): string {
    return localStorage.getItem(TOKEN);
  }

  deleteToken(): void {
    localStorage.removeItem(TOKEN);
  }
}
