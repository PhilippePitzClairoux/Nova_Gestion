import { Injectable } from '@angular/core';
import * as config from '../../assets/config/config.json';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Blank} from '../models/blank';
import {Maintenance} from '../models/maintenance';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  api = config.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.api + 'blanks');
  }

  update(maintenance: Maintenance): Observable<any> {
    return this.http.put(this.api + 'maintenances', maintenance, this.httpOptions);
  }

  add(maintenance: Maintenance): Observable<any> {
    return this.http.post<any>(this.api + 'maintenances', maintenance, this.httpOptions);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.api + 'maintenances/' + id);
  }
}
