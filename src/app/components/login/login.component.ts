import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { UserService } from "../../services/user/user.service";
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  private userModel: {};
  private _storeSubscription = new Subscription();

  constructor(
    private _userService: UserService,
    private _store: Store<any>
  ) {}

  ngOnInit() {
    this._storeSubscription = this._store.subscribe(state => {
      this.userModel = state
    })
  }

  loginSubmit(loginForm: NgForm) {
    console.log("====================================");
    console.log(loginForm.value);
    console.log("====================================");
  }

  registerSubmit(registerForm: NgForm) {
    if (registerForm.valid) {
      this._userService
        .registerUser({
          email: registerForm.value.email,
          password1: registerForm.value.password1
        })
        .subscribe(res => {
          this._userService.getUserInfo().subscribe(profile => {
            console.log('====================================');
            console.log(profile);
            console.log('====================================');
          })
        });
    }
  }
}
