import { Injectable } from '@angular/core';
import { TokenModule } from './token.type';

const TOKEN_NAME = 'token';

@Injectable({
  providedIn: 'root'
})
export class TokenService implements TokenModule.ITokenService {

  constructor() { }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  deleteToken(): void {
    localStorage.removeItem(TOKEN_NAME);
  }
}
