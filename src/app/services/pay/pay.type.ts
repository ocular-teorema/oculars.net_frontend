import { Observable } from 'rxjs';
import { UserModule } from '../user/user.type';

export namespace PayModule {
  export interface IPayData {
    sum?: number;
    cam?: UserModule.ICamSet;
  }
  export interface IResponse {
    success_url: string;
  }
  export interface IPayService {
    camPay(data: IPayData): Observable<any>;
    getTransactions(): Observable<any>;
  }
}
