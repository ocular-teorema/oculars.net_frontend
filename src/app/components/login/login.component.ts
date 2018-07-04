import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { UserService } from "../../services/user/user.service";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AddUser } from "../../store/actions";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit, OnDestroy {
  private _registerSubscription = new Subscription();
  private _profileSubscription = new Subscription();
  private _loginSubscription = new Subscription();

  constructor(private _userService: UserService, private _store: Store<any>) {}

  ngOnInit() {}

  public loginSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      this._loginSubscription = this._userService
        .login({
          username: loginForm.value.login,
          password: loginForm.value.password
        })
        .subscribe(res => {
          this._addProfileToStore(loginForm.value.login);
        });
    }
  }

  public registerSubmit(registerForm: NgForm) {
    if (registerForm.valid) {
      this._registerSubscription = this._userService
        .registerUser({
          email: registerForm.value.email,
          password1: registerForm.value.password1
        })
        .subscribe(res => {
          this._addProfileToStore(registerForm.value.email);
        });
    }
  }

  private _addProfileToStore(email: string): void {
    this._profileSubscription = this._userService
      .getProfiles()
      .subscribe(profiles => {
        if (profiles.length > 1) {
          const currentProfile = profiles.filter(profile => {
            profile.username === email;
          });
          this._store.dispatch(new AddUser(currentProfile[0]));
        } else {
          this._store.dispatch(new AddUser(profiles[0]));
        }
      });
  }

  ngOnDestroy() {
    this._registerSubscription.unsubscribe();
    this._profileSubscription.unsubscribe();
    this._loginSubscription.unsubscribe();
  }
}
