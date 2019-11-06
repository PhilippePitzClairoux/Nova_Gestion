import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { Program } from './../models/program.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  private programsList: Program[] = [];
  private programsListSubject: BehaviorSubject<Program[]> = new BehaviorSubject<Program[]>([]);

  constructor(private http: HttpClient, private router: Router) { }

  public programsList$(): Observable<Program[]> {
    return this.programsListSubject.asObservable();
  }

  public getAllProgram(): void {
    this.http.get<Program[]>('/v1/programs').subscribe(result => {
      this.programsList = result;
      this.programsListSubject.next(this.programsList);
    });
  }

  public getProgramById(id: number): Observable<Program> {
    return this.http.get<Program>('/v1/program/' + id.toString() + '/');
  }

  public createProgram(program: Program): Observable<Program> {
    return this.http.post<Program>('/v1/program', program, this.httpOptions).pipe(tap(result => {
      program.idProgram = result.idProgram;
      this.programsList = [...this.programsList, program];
      this.programsListSubject.next(this.programsList);
      this.router.navigate(['programs', result.idProgram]);
    }));
  }

  public updateProgram(program: Program): void {
    this.http.put<Program>('/v1/program', program, this.httpOptions).subscribe(() => {
      const index = this.programsList.findIndex(t => t.idProgram === program.idProgram);
      this.programsList[index] = program;
      this.programsListSubject.next(this.programsList);
      this.router.navigate(['programs']);
    });
  }

  public deleteProgram(id: number): void {
    this.http.delete<Program>('/v1/program/' + id.toString() + '/').subscribe(() => {
      this.programsList = this.programsList.filter(t => t.idProgram !== id);
      this.programsListSubject.next(this.programsList);
    });
  }

  public addClientToProgram(idProg: number, idCli: number): Observable<any> {
    return this.http.post<Program>('/v1/workSheetClientProgram', { idProgram: idProg, idClient: idCli }, this.httpOptions);
  }

  public deleteClientOfProgram(idProgram: number, idClient: number): Observable<any> {
    return this.http.delete<Program>('/v1/workSheetClientProgram/' + idProgram.toString() + '/' + idClient.toString() + '/');
  }
}
