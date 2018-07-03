import { Observable } from 'rxjs';

export namespace UserModule {
  export interface IToken {
    key: String;
  }
  export interface IUser {
    email?: string;
    login?: string;
    password1?: string;
    password?: string;
  }
  export interface IUserService {
    registerUser(data: IUser): Observable<IToken>;
  }
}