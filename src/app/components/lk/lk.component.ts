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
  private _lkSubscriptions = new Subscription();
  public userModel: UserModule.IUser;
  public camList = {
    s: 0,
    f: 0,
    a: 0
  };

  constructor(private _store: Store<any>, private _user: UserService) {}

  ngOnInit() {
    const storeSubscription = this._store.select('common').subscribe(state => {
      this.userModel = state.userModel;
    });
    this._lkSubscriptions.add(storeSubscription);
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
    const userSubscription = this._user
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
      this._lkSubscriptions.add(userSubscription);
  }

  ngOnDestroy() {
    this._lkSubscriptions.unsubscribe();
  }
}
