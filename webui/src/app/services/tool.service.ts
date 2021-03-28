import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import * as config from '../../assets/config/config.json';
import {Tool} from '../models/tool';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToolService {
  api = config.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, public snackBar: MatSnackBar) {
  }

  public getAll(): Observable<Tool[]> {
    return this.http.get<Tool[]>(this.api + 'tools');
  }

  public update(tool: Tool): Observable<any> {
    return this.http.put(this.api + 'tool', tool, this.httpOptions).pipe(
      tap(() => {
        this.snackBar.open('Outil modifié', 'x', {duration: 1500});
      })
    );
  }

  public add(tool: Tool): Observable<any> {
    return this.http.post<any>(this.api + 'tool', tool, this.httpOptions).pipe(
      tap(() => {
        this.snackBar.open('Outil ajouté', 'x', {duration: 1500});
      })
    );
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(this.api + 'tool/' + id).pipe(
      tap(() => {
        this.snackBar.open('Outil supprimé', 'x', {duration: 1500});
      })
    );
  }
}
