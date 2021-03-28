import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Worksheet} from '../models/worksheet';
import * as config from '../../assets/config/config.json';
import {MatSnackBar} from '@angular/material/snack-bar';

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

  constructor(private http: HttpClient,
              public snackBar: MatSnackBar) {
  }

  public getAll(): Observable<Worksheet[]> {
    return this.http.get<Worksheet[]>(this.api + 'workSheets');
  }

  public getOne(id: number): Observable<Worksheet> {
    return this.http.get<Worksheet>(this.api + 'workSheet/' + id);
  }

  public update(newWorksheet: Worksheet): Observable<any> {
    return this.http.put(this.api + 'workSheet', newWorksheet, this.httpOptions).pipe(
      tap(() => {
        this.snackBar.open('Feuille de travail modifiée', 'x', {duration: 1500});
      })
    );
  }

  public add(newWorksheet: Worksheet): Observable<any> {
    return this.http.post(this.api + 'workSheet', newWorksheet, this.httpOptions).pipe(
      tap(() => {
        this.snackBar.open('Feuille de travail ajoutée', 'x', {duration: 1500});
      })
    );
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(this.api + 'workSheet/' + id).pipe(
      tap(() => {
        this.snackBar.open('Feuille de travail supprimée', 'x', {duration: 1500});
      })
    );
  }
}
