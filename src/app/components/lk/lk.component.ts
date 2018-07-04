import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UserModule } from '../../services/user/user.type';

@Component({
  selector: 'app-lk',
  templateUrl: './lk.component.html',
  styleUrls: ['./lk.component.scss']
})
export class LkComponent implements OnInit, OnDestroy {
  private _storeSubscription = new Subscription();
  public userModel: UserModule.IUser;
  public camList = {
    s: 0,
    f: 0,
    a: 0
  };

  constructor(private _store: Store<any>) {}

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

  ngOnDestroy() {
    this._storeSubscription.unsubscribe();
  }
}
