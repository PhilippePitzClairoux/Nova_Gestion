import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import * as config from '../../assets/config/config.json';
import { Machine } from '../models/machine';

@Injectable({
  providedIn: 'root'
})
export class MachineService {
  api = config.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, public toastr: ToastrService) {
  }

  public getAll(): Observable<Machine[]> {
    return this.http.get<Machine[]>(this.api + 'machines'); // TODO NOT WORKING UPON ERROR WHY?
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(this.api + 'machine/' + id).pipe(
      tap(() => this.toastr.success('Machine supprimée.'))
    );
  }

  public getOne(id: number): Observable<Machine> {
    return this.http.get<Machine>(this.api + 'machine/' + id);
  }

  public update(newMachine: Machine): Observable<any> {
    return this.http.put(this.api + 'machine', newMachine, this.httpOptions).pipe(
      tap(() => this.toastr.success('Machine modifiée.'))
    );
  }

  public add(newMachine: Machine): Observable<any> {
    return this.http.post(this.api + 'machine', newMachine, this.httpOptions).pipe(
      tap(() => this.toastr.success('Machine ajoutée.'))
    );
  }

}
