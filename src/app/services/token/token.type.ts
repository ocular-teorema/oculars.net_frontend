export namespace TokenModule {
  export interface IToken {
    token: string;
  }
  export interface ITokenService {
    setToken(token: string): void;
    getToken(): string;
    deleteToken(): void;
  }
}