import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpParams, HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient,) { }
    
  getData(): Observable<any> {
    const params = new HttpParams({
    });
    return this.http.get('http://localhost:8881/log', {params, responseType: 'json'})
      .pipe(
        map(data => {
          return data;
        }),
      );
  }
  SendDataForm(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    return this.http.post('http://localhost:8881/data', data, httpOptions)
      .pipe(
        map(data => {
          return data;
        }),
      );
  };
}

