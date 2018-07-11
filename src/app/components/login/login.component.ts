import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AddUser } from '../../store/actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private _loginSubscriptions = new Subscription();

  constructor(
    private _userService: UserService,
    private _store: Store<any>,
    private _route: Router
  ) {}

  ngOnInit() {
    const logoutSubscription = this._userService.logout().subscribe(res => {
      this._store.dispatch(new AddUser({}));
    });
    this._loginSubscriptions.add(logoutSubscription);
  }

  public loginSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      const loginSubscription = this._userService
        .login({
          username: loginForm.value.login,
          password: loginForm.value.password
        })
        .subscribe(res => {
          this._addProfileToStore();
        });
      this._loginSubscriptions.add(loginSubscription);
    }
  }

  public registerSubmit(registerForm: NgForm) {
    if (registerForm.valid) {
      const registerSubscription = this._userService
        .registerUser({
          email: registerForm.value.email,
          password1: registerForm.value.password1
        })
        .subscribe(res => {
          this._addProfileToStore();
        });
      this._loginSubscriptions.add(registerSubscription);
    }
  }

  private _addProfileToStore(): void {
    const profileSubscription = this._userService
      .getProfiles()
      .subscribe(profiles => {
        if (profiles.length > 1) {
          const currentProfile = profiles.filter(
            profile => profile.is_superuser
          );
          this._store.dispatch(new AddUser(currentProfile[0]));
        } else {
          this._store.dispatch(new AddUser(profiles[0]));
        }
        this._route.navigate(['/account/lk']);
      });
    this._loginSubscriptions.add(profileSubscription);
  }

  ngOnDestroy() {
    this._loginSubscriptions.unsubscribe();
  }
}
