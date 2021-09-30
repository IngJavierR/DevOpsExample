import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ConsumeService {

  constructor(private http: HttpClient, private dataService: DataService) { }

  httpGet<T>(url: string, params?: any, headers?: any): Observable<T> {
    let objHeaders = new HttpHeaders();
    if (headers) {
      Object.keys(headers).forEach((key) => {
        objHeaders = objHeaders.append(key, headers[key]);
      });
    }

    let objParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        objParams = objParams.append(key, params[key]);
      });
    }

    this.dataService.setIsLoading(true);
    return new Observable<T>(observer => {
      this.http.get<any>(url, { headers: objHeaders, params: objParams })
        .subscribe(response => {
          this.returnResponse(observer, response);
        }, err => {
          this.returnError(observer, err);
        });
    });
  }

  httpPost<T>(url: string, body: any, headers?: any): Observable<T> {
    let objHeaders = new HttpHeaders();
    if (headers) {
      Object.keys(headers).forEach((key) => {
        objHeaders = objHeaders.append(key, headers[key]);
      });
    }

    this.dataService.setIsLoading(true);
    return new Observable<T>(observer => {
      this.http.post<any>(url, body, { headers: objHeaders })
        .subscribe(response => {
          this.returnResponse(observer, response);
        }, err => {
          this.returnError(observer, err);
        });
    });
  }

  httpPut<T>(url: string, body: any, headers?: any): Observable<T> {
    let objHeaders = new HttpHeaders();
    if (headers) {
      Object.keys(headers).forEach((key) => {
        objHeaders = objHeaders.append(key, headers[key]);
      });
    }

    this.dataService.setIsLoading(true);
    return new Observable<T>(observer => {
      this.http.put<any>(url, body, { headers: objHeaders })
        .subscribe(response => {
          this.returnResponse(observer, response);
        }, err => {
          this.returnError(observer, err);
        });
    });
  }

  private returnResponse<T>(observer: Subscriber<T>, response: any): void {
    observer.next(response);
    observer.complete();
    this.dataService.setIsLoading(false);
  }

  private returnError<T>(observer: Subscriber<T>, error: any): void {
    observer.error(error);
    this.dataService.setIsLoading(false);
  }
}
