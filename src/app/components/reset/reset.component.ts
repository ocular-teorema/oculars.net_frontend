import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit, OnDestroy {
  private _resetSubscription = new Subscription();

  constructor(private _user: UserService, private _route: Router) {}

  ngOnInit() {}

  public onSubmit(resetForm: NgForm): void {
    if (resetForm.valid) {
      this._resetSubscription = this._user
        .resetPassword(resetForm.value.email)
        .subscribe(res => {
          this._route.navigate(['account/login']);
        });
    }
  }

  ngOnDestroy() {
    this._resetSubscription.unsubscribe();
  }
}
