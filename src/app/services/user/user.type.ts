import { Observable } from 'rxjs';

export namespace UserModule {
  export interface IToken {
    key: String;
  }
  export interface ILogin {
    email?: string;
    username?: string;
    password1?: string;
    password?: string;
  }
  export interface IUser {
    id: number;
    username: string;
    hardware_hash: string;
    cam_list: {
      s: string;
      a: string;
      f: string;
    };
    is_superuser: boolean;
  }
  export interface IUserService {
    registerUser(data: ILogin): Observable<IToken>;
    getProfiles(): Observable<IUser[]>;
    logout(): Observable<any>;
    login(data: ILogin): Observable<IToken>;
  }
}
