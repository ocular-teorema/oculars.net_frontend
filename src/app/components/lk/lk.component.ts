import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UserModule } from '../../services/user/user.type';
import { UserService } from '../../services/user/user.service';
import { PayService } from '../../services/pay/pay.service';
import { PayModule } from '../../services/pay/pay.type';

const PRICE_LIST = {
  a: 450000,
  s: 250000,
  f: 700000
};

@Component({
  selector: 'app-lk',
  templateUrl: './lk.component.html',
  styleUrls: ['./lk.component.scss']
})
export class LkComponent implements OnInit, OnDestroy {
  private _lkSubscriptions = new Subscription();
  public isHashAvailable: boolean;
  public userModel: UserModule.IUser;
  public camList = {
    s: 0,
    f: 0,
    a: 0
  };

  constructor(
    private _store: Store<any>,
    private _user: UserService,
    private _pay: PayService
  ) {}

  ngOnInit() {
    const storeSubscription = this._store.select('common').subscribe(state => {
      this.userModel = state.userModel;
    });
    this._lkSubscriptions.add(storeSubscription);
    this.isHashAvailable = !!this.userModel.hardware_hash;
  }

  public addCamera(type: string): void {
    this.camList[type] += 1;
  }

  public removeCamera(type: string): void {
    this.camList[type] -= 1;
  }

  public saveCameras(): void {
    let request: PayModule.IPayData = {
      sum: 0
    };
    const cam: UserModule.ICamSet = {};
    Object.keys(this.userModel.cam_list).forEach(type => {
      cam[type] = this.camList[type] + this.userModel.cam_list[type];
      request.sum += this.camList[type] * PRICE_LIST[type];
    });
    request = {
      ...request,
      cam
    };
    const userSub = this._user
      .changeProfile({
        id: this.userModel.id,
        hardware_hash: this.userModel.hardware_hash
      })
      .subscribe(res => {
        const paySub = this._pay.camPay(request).subscribe(result => {
          window.location.href = result.success_url;
        });
        this._lkSubscriptions.add(paySub);
      });
    this._lkSubscriptions.add(userSub);
  }

  ngOnDestroy() {
    this._lkSubscriptions.unsubscribe();
  }
}
