import { Component, OnInit, Input } from '@angular/core';
import { PayService } from '../../services/pay/pay.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  @Input() isSuperuser: boolean;
  public transactions: Array<{}>;

  constructor(
    private _pay: PayService
  ) { }

  public ngOnInit() {
    this._pay.getTransactions().subscribe(res => {
      this.transactions = res;
    });
  }

}
