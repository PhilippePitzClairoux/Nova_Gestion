import { BehaviorSubject, Observable } from 'rxjs';
import { Program } from './../models/program.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  private programsList: Program[] = [];
  private programsListSubject: BehaviorSubject<Program[]> = new BehaviorSubject<Program[]>([]);

  constructor(private http: HttpClient) { }

  public programsList$(): Observable<Program[]> {
    return this.programsListSubject.asObservable();
  }

  public getAllProgram(): void {
    this.http.get<Program[]>('/v1/programs').subscribe(result => {
      this.programsList = result;
      this.programsListSubject.next(this.programsList);
    });
  }

  public createProgram(program: Program): void {
    this.http.post<Program>('/v1/program', program, this.httpOptions).subscribe(result => {
      program.idProgram = result.idProgram;
      this.programsList = [...this.programsList, program];
      this.programsListSubject.next(this.programsList);
    });
  }

  public updateProgram(program: Program): void {
    this.http.put<Program>('/v1/program', program, this.httpOptions).subscribe(() => {
      const index = this.programsList.findIndex(t => t.idProgram === program.idProgram);
      this.programsList[index] = program;
      this.programsListSubject.next(this.programsList);
    });
  }

  public deleteProgram(id: number): void {
    this.http.delete<Program>('/v1/program/' + id.toString() + '/').subscribe(() => {
      this.programsList = this.programsList.filter(t => t.idProgram !== id);
      this.programsListSubject.next(this.programsList);
    });
  }
}
