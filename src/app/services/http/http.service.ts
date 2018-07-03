import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError,  } from 'rxjs/operators';
import { HttpModule } from './http.type';

export const SERVER_REST_URL = environment.apiBaseHref;
export const DEFAULT_HEADERS = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/json',
  'Cache-Control': 'no-cache',
  'Pragma': 'no-cache'
};

@Injectable({
  providedIn: 'root'
})
export class HttpService implements HttpModule.IHttpService {
  private _apiUrl = SERVER_REST_URL;
  private _defaultHeaders = DEFAULT_HEADERS;

  constructor(
    private _http: HttpClient
  ) { }

  private _createAuthHeaders(): HttpHeaders {
    // const headers = new HttpHeaders(this._defaultHeaders);
    // const token = this._tokenService.getToken();
    // if (token) {
      // return headers.append('Authorization', `JWT ${token}`);
    // }
    // return headers;
    const headers = new HttpHeaders(this._defaultHeaders);
    return headers;
  }

  public getData(url: string, data?: {}): Observable<any> {
    return this._http.get(this._apiUrl + url, {
      headers: this._createAuthHeaders(),
      params: data
    }).pipe(
      catchError(err => this._handleError(err))
    )
  }

  public postData(url: string, data?: {}): Observable<any> {
    return this._http.post(url, data, {
      headers: this._createAuthHeaders()
    }).pipe(
      catchError(err => this._handleError(err))
    )
  }

  public putData(url: string, data?: {}): Observable<any> {
    return this._http.put(url, data, {
      headers: this._createAuthHeaders()
    }).pipe(
      catchError(err => this._handleError(err))
    )
  }

  public patchData(url: string, data?: {}): Observable<any> {
    return this._http.patch(url, data, {
      headers: this._createAuthHeaders()
    }).pipe(
      catchError(err => this._handleError(err))
    )
  }

  private _handleError(err): Observable<any> {
    // if (err.error.code !== 10) {
    //   this._notificationService.show(notificationTypes.SERVER_ERROR, err.error.text);
    // }
    // this._preloaderService.hide();
    return Observable.throw(err.error);
  }
}
