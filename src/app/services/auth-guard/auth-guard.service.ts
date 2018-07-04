import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AddUser } from '../../store/actions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(
    private _token: TokenService,
    private _user: UserService,
    private _route: Router,
    private _store: Store<any>
  ) {}

  canActivate() {
    return this._user
      .getProfiles()
      .toPromise()
      .then(
        profiles => {
          if (profiles.length > 1) {
            const currentProfile = profiles.filter(
              profile => profile.is_superuser
            );
            this._store.dispatch(new AddUser(currentProfile[0]));
          } else {
            this._store.dispatch(new AddUser(profiles[0]));
          }
          return true;
        },
        res => {
          this._token.deleteToken();
          this._route.navigate(['account/login']);
        }
      );
  }
}
