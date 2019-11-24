import { tap, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
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
    return this.http.get<Machine[]>(this.api + 'machines').pipe(catchError(this.handleError)); // TODO NOT WORKING UPON ERROR WHY?
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(this.api + 'machine/' + id).pipe(
      catchError(this.handleError),
      tap(() => this.toastr.success('Une machine a été supprimé.'))
    );
  }

  public getOne(id: number): Observable<Machine> {
    return this.http.get<Machine>(this.api + 'machine/' + id).pipe(catchError(this.handleError));
  }

  public update(newMachine: Machine): Observable<any> {
    return this.http.put(this.api + 'machine', newMachine, this.httpOptions).pipe(
      catchError(this.handleError),
      tap(() => this.toastr.success('Une machine a été modifié.'))
    );
  }

  public add(newMachine: Machine): Observable<any> {
    return this.http.post(this.api + 'machine', newMachine, this.httpOptions).pipe(
      catchError(this.handleError),
      tap(() => this.toastr.success('Une machine a été ajouté.'))
    );
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
