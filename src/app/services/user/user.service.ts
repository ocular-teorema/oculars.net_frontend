import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";
import { TokenService } from "../token/token.service";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';
import { UserModule } from './user.type';

const REST_AUTH = "/rest-auth/";
const REGISTRATION = REST_AUTH + "registration/";
const PROFILE = '/profile/';

@Injectable({
  providedIn: "root"
})
export class UserService implements UserModule.IUserService {
  constructor(
    private _httpService: HttpService,
    private _tokenService: TokenService
  ) {}

  registerUser(data: UserModule.IUser): Observable<UserModule.IToken> {
    return this._httpService.postData(REGISTRATION, data).pipe(
      tap(res => {this._tokenService.setToken(res.key)})
    )
  }

  getUserInfo(): Observable<UserModule.IUser> {
    return this._httpService.getData(PROFILE)
  }
}
