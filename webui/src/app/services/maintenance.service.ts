import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Maintenance} from '../models/maintenance';
import * as config from '../../assets/config/config.json';
import {tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

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

  constructor(private http: HttpClient,
              public snackBar: MatSnackBar) {
  }

  update(maintenance: Maintenance): Observable<any> {
    return this.http.put(this.api + 'maintenance', maintenance, this.httpOptions);
  }

  add(maintenance: Maintenance): Observable<any> {
    return this.http.post<any>(this.api + 'maintenance', maintenance, this.httpOptions).pipe(
      tap(() => {
        this.snackBar.open('Maintenance ajoutée', 'x', {duration: 1500});
      })
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.api + 'maintenance/' + id).pipe(
      tap(() => {
        this.snackBar.open('Maintenance supprimée', 'x', {duration: 1500});
      })
    );
  }
}
