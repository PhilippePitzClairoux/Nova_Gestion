import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Maintenance } from '../models/maintenance';
import * as config from '../../assets/config/config.json';
import { tap } from 'rxjs/operators';

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

  constructor(private http: HttpClient, private toastr: ToastrService) {
  }

  update(maintenance: Maintenance): Observable<any> {
    return this.http.put(this.api + 'maintenance', maintenance, this.httpOptions);
  }

  add(maintenance: Maintenance): Observable<any> {
    return this.http.post<any>(this.api + 'maintenance', maintenance, this.httpOptions).pipe(
      tap(() => this.toastr.success(null, 'Maintenance ajouté'))
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.api + 'maintenance/' + id).pipe(
      tap(() => this.toastr.success(null, 'Maintenance supprimé'))
      );
  }
}
