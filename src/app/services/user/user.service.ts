import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { TokenService } from '../token/token.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserModule } from './user.type';

const REST_AUTH_URL = '/rest-auth/';
const REGISTRATION_URL = REST_AUTH_URL + 'registration/';
const LOGOUT_URL = REST_AUTH_URL + 'logout/';
const LOGIN_URL = REST_AUTH_URL + 'login/';
const PROFILE_URL = '/profile/';
const PASSWORD_URL = REST_AUTH_URL + 'password/';
const CHANGE_PASSWORD_URL = PASSWORD_URL + 'change/';
const RESET_PASSWORD_URL = PASSWORD_URL + 'reset/';

@Injectable({
  providedIn: 'root'
})
export class UserService implements UserModule.IUserService {
  constructor(
    private _httpService: HttpService,
    private _tokenService: TokenService
  ) {}

  public registerUser(data: UserModule.ILogin): Observable<UserModule.IToken> {
    return this._httpService.postData(REGISTRATION_URL, data).pipe(
      tap(res => {
        this._tokenService.setToken(res.key);
      })
    );
  }

  public getProfiles(): Observable<UserModule.IUser[]> {
    return this._httpService.getData(PROFILE_URL);
  }

  public changeProfile(data: UserModule.IUser): Observable<UserModule.IUser> {
    return this._httpService.patchData(PROFILE_URL + data.id + '/', data);
  }

  public changePassword(data: UserModule.INewPass): Observable<any> {
    return this._httpService.postData(CHANGE_PASSWORD_URL, data);
  }

  public resetPassword(email: string): Observable<any> {
    return this._httpService.postData(RESET_PASSWORD_URL, {email});
  }

  public login(data: UserModule.ILogin): Observable<UserModule.IToken> {
    return this._httpService.postData(LOGIN_URL, data).pipe(
      tap(res => {
        this._tokenService.setToken(res.key);
      })
    );
  }

  logout(): Observable<any> {
    return this._httpService
      .postData(LOGOUT_URL)
      .pipe(tap(() => this._tokenService.deleteToken()));
  }
}
