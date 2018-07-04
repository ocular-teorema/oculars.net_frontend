import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { UserService } from '../user/user.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private _token: TokenService,
    private _user: UserService
  ) { }

  canActivate() {
    // return this._user.getProfiles().pipe(
    //   tap (res => )
    // )
  }
}
