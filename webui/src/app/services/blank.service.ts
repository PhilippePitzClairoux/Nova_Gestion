import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import * as config from '../../assets/config/config.json';
import { Blank } from '../models/blank';
import {OrderHistory} from '../models/order-history';

@Injectable({
  providedIn: 'root'
})
export class BlankService {
  api = config.apiUrl;
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient, private toastr: ToastrService) {
  }

  public getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.api + 'blanks');
  }

  public update(blank: Blank): Observable<any> {
    return this.http.put(this.api + 'blank', blank, this.httpOptions).pipe(
      tap(() => this.toastr.success(null, 'Tige de carbure modifiée'))
    );
  }

  public add(blank: Blank): Observable<any> {
    return this.http.post<any>(this.api + 'blank', blank, this.httpOptions).pipe(
      tap(() => this.toastr.success(null, 'Tige de carbure ajoutée'))
    );
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(this.api + 'blank/' + id).pipe(
      tap(() => this.toastr.success(null, 'Tige de carbure supprimée'))
    );
  }

  getOrderHistory(startDate: string, endDate: string, id: number): Observable<any> {
    return this.http.get<any>(this.api + 'orderhistory/' + startDate + '/' + endDate + '/' + id);
  }
}
