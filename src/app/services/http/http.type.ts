import { Observable } from "rxjs";

export namespace HttpModule {
  export interface IResponse {
    data: any;
    status: string;
    type: string;
    error: IServerError;
  }
  export interface IServerError {
    message: string;
    code: number;
    field: string;
  }

  export interface IHttpService {
    getData(url: string, data?: {}): Observable<any>;
    postData(url: string, data?: {}): Observable<any>;
    putData(url: string, data?: {}): Observable<any>;
    patchData(url: string, data?: {}): Observable<any>;
  }
}