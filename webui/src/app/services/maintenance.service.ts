import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Maintenance} from '../models/maintenance';
import * as config from '../../assets/config/config.json';

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

  update(maintenance: Maintenance): Observable<any> {
    return this.http.put(this.api + 'maintenance', maintenance, this.httpOptions);
  }

  add(maintenance: Maintenance): Observable<any> {
    return this.http.post<any>(this.api + 'maintenance', maintenance, this.httpOptions);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.api + 'maintenance/' + id);
  }
}
