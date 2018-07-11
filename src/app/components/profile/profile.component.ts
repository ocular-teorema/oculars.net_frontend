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
  private _profileSubscriptions = new Subscription();

  constructor(private _store: Store<any>, private _user: UserService) {}

  ngOnInit() {
    const storeSubscription = this._store.select('common').subscribe(state => {
      this.userModel = state.userModel;
      this._currentEmail = state.userModel.username;
    });
    this._profileSubscriptions.add(storeSubscription);
  }

  public changeEmail(e): void {
    this.userModel.username = e.target.value;
  }

  public onSubmit(profileForm: NgForm): void {
    if (profileForm.valid) {
      const loginSubscription = this._user
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
            const profileSubscription = this._user
              .changeProfile({
                ...request
              })
              .subscribe(res => {
                this._store.dispatch(new AddUser(res));
              });
            this._profileSubscriptions.add(profileSubscription);
          }
          if (profileForm.value.new_password1) {
            const passRequest = {
              new_password1: profileForm.value.new_password1,
              new_password2: profileForm.value.new_password2
            };
            const passwordSubscription = this._user
              .changePassword(passRequest)
              .subscribe();
            this._profileSubscriptions.add(passwordSubscription);
          }
          profileForm.reset();
        });
      this._profileSubscriptions.add(loginSubscription);
    }
  }

  ngOnDestroy() {
    this._profileSubscriptions.unsubscribe();
  }
}
