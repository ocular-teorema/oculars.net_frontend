import { Observable } from 'rxjs';

export namespace PayModule {
  export interface IPayData {
    sum: number;
    cam: {
      a: number;
      f: number;
      s: number;
    };
  }
  export interface IPayService {
    camPay(data: IPayData): Observable<any>;
    getTransactions(): Observable<any>;
  }
}
