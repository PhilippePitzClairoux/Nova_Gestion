import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { Worksheet } from '../models/worksheet';
import * as config from '../../assets/config/config.json';

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

  constructor(private http: HttpClient, private toastr: ToastrService) {
  }

  public getAll(): Observable<Worksheet[]> {
    return this.http.get<Worksheet[]>(this.api + 'workSheets');
  }

  public getOne(id: number): Observable<Worksheet> {
    return this.http.get<Worksheet>(this.api + 'workSheet/' + id);
  }

  public update(newWorksheet: Worksheet): Observable<any> {
    return this.http.put(this.api + 'workSheet', newWorksheet, this.httpOptions).pipe(
      tap(() => this.toastr.success(null, 'Feuille de travail modifiée'))
    );
  }

  public add(newWorksheet: Worksheet): Observable<any> {
    return this.http.post(this.api + 'workSheet', newWorksheet, this.httpOptions).pipe(
      tap(() => this.toastr.success(null, 'Feuille de travail ajoutée'))
    );
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(this.api + 'workSheet/' + id).pipe(
      tap(() => this.toastr.success(null, 'Feuille de travail supprimée'))
    );
  }
}
