import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";
import { TokenService } from "../token/token.service";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { UserModule } from "./user.type";

const REST_AUTH = "/rest-auth/";
const REGISTRATION = REST_AUTH + "registration/";
const LOGOUT = REST_AUTH + "logout/";
const LOGIN = REST_AUTH + "login/";
const PROFILE = "/profile/";

@Injectable({
  providedIn: "root"
})
export class UserService implements UserModule.IUserService {
  constructor(
    private _httpService: HttpService,
    private _tokenService: TokenService
  ) {}

  registerUser(data: UserModule.ILogin): Observable<UserModule.IToken> {
    return this._httpService.postData(REGISTRATION, data).pipe(
      tap(res => {
        this._tokenService.setToken(res.key);
      })
    );
  }

  getProfiles(): Observable<UserModule.IUser[]> {
    return this._httpService.getData(PROFILE);
  }

  login(data: UserModule.ILogin): Observable<UserModule.IToken> {
    return this._httpService.postData(LOGIN, data).pipe(
      tap(res => {
        this._tokenService.setToken(res.key);
      })
    );
  }

  logout(): Observable<any> {
    return this._httpService
      .postData(LOGOUT)
      .pipe(tap(() => this._tokenService.deleteToken()));
  }
}
