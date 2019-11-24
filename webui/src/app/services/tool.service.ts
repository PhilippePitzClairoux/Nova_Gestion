import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import * as config from '../../assets/config/config.json';
import { Tool } from '../models/tool';

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

  constructor(private http: HttpClient, private toastr: ToastrService) {
  }

  public getAll(): Observable<Tool[]> {
    return this.http.get<Tool[]>(this.api + 'tools');
  }

  public update(tool: Tool): Observable<any> {
    return this.http.put(this.api + 'tool', tool, this.httpOptions).pipe(
      tap(() => this.toastr.success(null, 'Outil modifié'))
    );
  }

  public add(tool: Tool): Observable<any> {
    return this.http.post<any>(this.api + 'tool', tool, this.httpOptions).pipe(
      tap(() => this.toastr.success(null, 'Outil ajouté'))
    );
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(this.api + 'tool/' + id).pipe(
      tap(() => this.toastr.success(null, 'Outil supprimé'))
    );
  }
}
