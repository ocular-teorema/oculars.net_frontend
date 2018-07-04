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
    id?: number;
    username?: string;
    hardware_hash?: string;
    cam_list?: {
      s?: number;
      a?: number;
      f?: number;
    };
    is_superuser?: boolean;
  }
  export interface INewPass {
    new_password1: string;
    new_password2: string;
  }
  export interface IUserService {
    registerUser(data: ILogin): Observable<IToken>;
    getProfiles(): Observable<IUser[]>;
    changeProfile(data: IUser): Observable<IUser>;
    changePassword(data: INewPass): Observable<any>;
    logout(): Observable<any>;
    login(data: ILogin): Observable<IToken>;
  }
}
