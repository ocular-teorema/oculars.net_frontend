import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UserModule } from './services/user/user.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public userModel: UserModule.IUser;
  private _storeSubscription = new Subscription();

  constructor(private _store: Store<any>) {}

  ngOnInit() {
    this._storeSubscription = this._store.select('common').subscribe(state => {
      this.userModel = state && state.userModel;
    });
  }

  ngOnDestroy() {
    this._storeSubscription.unsubscribe();
  }
}
