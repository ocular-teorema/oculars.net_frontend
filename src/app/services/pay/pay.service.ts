import { Injectable } from '@angular/core';
import { PayModule } from './pay.type';
import { HttpService } from '../http/http.service';
import { Observable } from '../../../../node_modules/rxjs';

const PAY_CAM_URL = '/cam_pay/';
const TRANSACTIONS_URL = '/transaction/';

@Injectable({
  providedIn: 'root'
})
export class PayService implements PayModule.IPayService {

  constructor(
    private _http: HttpService
  ) { }

  public camPay(data: PayModule.IPayData): Observable<PayModule.IResponse> {
    return this._http.postData(PAY_CAM_URL, data);
  }

  public getTransactions(): Observable<any> {
    return this._http.getData(TRANSACTIONS_URL);
  }
}
