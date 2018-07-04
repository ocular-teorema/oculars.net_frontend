import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserModule } from '../../services/user/user.type';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { AddUser } from '../../store/actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  public userModel: UserModule.IUser;
  private _currentEmail: string;
  private _storeSubscription = new Subscription();
  private _loginSubscription = new Subscription();
  private _profileSubscription = new Subscription();
  private _passwordSubscription = new Subscription();

  constructor(private _store: Store<any>, private _user: UserService) {}

  ngOnInit() {
    this._storeSubscription = this._store.select('common').subscribe(state => {
      this.userModel = state.userModel;
      this._currentEmail = state.userModel.username;
    });
  }

  public changeEmail(e): void {
    this.userModel.username = e.target.value;
  }

  public onSubmit(profileForm: NgForm): void {
    if (profileForm.valid) {
      this._loginSubscription = this._user
        .login({
          username: this._currentEmail,
          password: profileForm.value.password
        })
        .subscribe(res => {
          let request = {
            id: this.userModel.id
          };
          if (this.userModel.username !== this._currentEmail) {
            request['username'] = this.userModel.username;
            this._profileSubscription = this._user.changeProfile({
              ...request
            }).subscribe(res => {
              this._store.dispatch(new AddUser(res))
            })
          }
          if (profileForm.value.new_password1) {
            const passRequest = {
              new_password1: profileForm.value.new_password1,
              new_password2: profileForm.value.new_password2
            }
            this._passwordSubscription = this._user.changePassword(passRequest).subscribe()
          }
          profileForm.reset();
        });
    }
  }

  ngOnDestroy() {
    this._storeSubscription.unsubscribe();
    this._loginSubscription.unsubscribe();
    this._profileSubscription.unsubscribe();
    this._passwordSubscription.unsubscribe();
  }
}
