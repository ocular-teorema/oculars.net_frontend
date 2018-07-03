import { Component, OnInit } from "@angular/core";
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
export class LoginComponent implements OnInit {
  private userModel: {};
  private _storeSubscription = new Subscription();

  constructor(private _userService: UserService, private _store: Store<any>) {}

  ngOnInit() {
    this._storeSubscription = this._store.subscribe(state => {
      this.userModel = state;
    });
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
          this._userService.getProfiles().subscribe(profiles => {
            if (profiles.length > 1) {
              const currentProfile = profiles.filter(profile => {
                profile.username === registerForm.value.email;
              });
              this._store.dispatch(new AddUser(currentProfile[0]));
            } else {
              this._store.dispatch(new AddUser(profiles[0]));
            }
          });
        });
    }
  }
}
