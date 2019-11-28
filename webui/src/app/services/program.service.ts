import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { Program } from './../models/program.model';
import { File } from './../models/File.model';
import * as config from '../../assets/config/config.json';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  api = config.apiUrl;

  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  private programsList: Program[] = [];
  private programsListSubject: BehaviorSubject<Program[]> = new BehaviorSubject<Program[]>([]);

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }

  public programsList$(): Observable<Program[]> {
    return this.programsListSubject.asObservable();
  }

  public getAllProgram(): void {
    this.http.get<Program[]>(this.api + 'programs').subscribe(result => {
      this.programsList = result;
      this.programsListSubject.next(this.programsList);
    });
  }

  public getProgramById(id: number): Observable<Program> {
    return this.http.get<Program>(this.api + 'program/' + id.toString() + '/').pipe(tap(result => console.log(result)));
  }

  public createProgram(program: Program): Observable<Program> {
    return this.http.post<Program>(this.api + 'program', program, this.httpOptions).pipe(tap(result => {
      program.idProgram = result.idProgram;
      this.programsList = [...this.programsList, program];
      this.programsListSubject.next(this.programsList);
      this.router.navigate(['programs', result.idProgram]);
      this.toastr.success(null, 'Programme ajouté');
    }));
  }

  public updateProgram(program: Program): void {
    this.http.put<Program>(this.api + 'program', program, this.httpOptions).subscribe(() => {
      const index = this.programsList.findIndex(t => t.idProgram === program.idProgram);
      this.programsList[index] = program;
      this.programsListSubject.next(this.programsList);
      this.router.navigate(['programs']);
      this.toastr.success(null, 'Programme modifié');
    });
  }

  public deleteProgram(id: number): void {
    this.http.delete<Program>(this.api + 'program/' + id.toString() + '/').subscribe(() => {
      this.programsList = this.programsList.filter(t => t.idProgram !== id);
      this.programsListSubject.next(this.programsList);
      this.toastr.success(null, 'Programme suprimé');
    });
  }

  public addClientToProgram(idProg: number, idCli: number): Observable<any> {
    return this.http.post<Program>(this.api + 'workSheetClientProgram', { idProgram: idProg, idClient: idCli }, this.httpOptions).pipe(
      tap(() => this.toastr.success(null, 'Client ajouté au programme'))
    );
  }

  public deleteClientOfProgram(idProgram: number, idClient: number): Observable<any> {
    return this.http.delete<Program>(this.api + 'workSheetClientProgram/' + idProgram.toString() + '/' + idClient.toString() + '/').pipe(
      tap(() => this.toastr.success(null, 'Client supprimé du programme'))
    );
  }

  public addFileToprogram(file: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<any>('/v1/uploadfile', formData).pipe(tap(result => console.log(result)));
  }
}
