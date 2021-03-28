import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import * as config from '../../assets/config/config.json';
import {Blank} from '../models/blank';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class BlankService {
  api = config.apiUrl;
  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  constructor(private http: HttpClient, public snackBar: MatSnackBar) {
  }

  public getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.api + 'blanks');
  }

  public update(blank: Blank): Observable<any> {
    return this.http.put(this.api + 'blank', blank, this.httpOptions).pipe(
      tap(() => {
        this.snackBar.open('Tige de carbure modifiée', 'x', {duration: 1500});
      })
    );
  }

  public add(blank: Blank): Observable<any> {
    return this.http.post<any>(this.api + 'blank', blank, this.httpOptions).pipe(
      tap(() => {
        this.snackBar.open('Tige de carbure ajoutée', 'x', {duration: 1500});
      })
    );
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(this.api + 'blank/' + id).pipe(
      tap(() => {
        this.snackBar.open('Tige de carbure supprimée', 'x', {duration: 1500});
      })
    );
  }

  getOrderHistory(startDate: string, endDate: string, id: number): Observable<any> {
    return this.http.get<any>(this.api + 'orderhistory/' + startDate + '/' + endDate + '/' + id);
  }
}
