import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UserModule } from '../../services/user/user.type';
import { UserService } from '../../services/user/user.service';
import { AddUser } from '../../store/actions';

@Component({
  selector: 'app-lk',
  templateUrl: './lk.component.html',
  styleUrls: ['./lk.component.scss']
})
export class LkComponent implements OnInit, OnDestroy {
  private _storeSubscription = new Subscription();
  private _userSubscription = new Subscription();
  public userModel: UserModule.IUser;
  public camList = {
    s: 0,
    f: 0,
    a: 0
  };

  constructor(private _store: Store<any>, private _user: UserService) {}

  ngOnInit() {
    this._storeSubscription = this._store.select('common').subscribe(state => {
      this.userModel = state.userModel;
    });
  }

  public addCamera(type: string): void {
    this.camList[type] += 1;
  }

  public removeCamera(type: string): void {
    this.camList[type] -= 1;
  }

  public saveCameras(): void {
    let cam_list = {};
    Object.keys(this.userModel.cam_list).forEach(type => {
      cam_list[type] = this.camList[type] + this.userModel.cam_list[type];
    });
    this._userSubscription = this._user
      .changeProfile({
        id: this.userModel.id,
        cam_list
      })
      .subscribe(profile => {
        this._store.dispatch(new AddUser(profile));
        this.camList = {
          s: 0,
          f: 0,
          a: 0
        };
      });
  }

  ngOnDestroy() {
    this._storeSubscription.unsubscribe();
    this._userSubscription.unsubscribe();
  }
}
