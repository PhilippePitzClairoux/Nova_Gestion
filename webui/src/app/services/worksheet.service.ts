import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import * as config from '../../assets/config/config.json';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorksheetService {
  api = config.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any[]>(this.api + 'workSheets');
  }

  getOne(id: any) {
    return this.http.get<any>(this.api + 'worksheet');
  }
}
