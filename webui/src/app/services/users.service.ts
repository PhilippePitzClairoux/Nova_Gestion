import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { User } from '../models/user.model';
import { TypeUser } from '../models/user-type.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  private usersList: User[] = [];
  private usersListSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  private userTypesList: TypeUser[] = [];
  private userTypesListSubject: BehaviorSubject<TypeUser[]> = new BehaviorSubject<TypeUser[]>([]);

  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  public usersList$(): Observable<User[]> {
    return this.usersListSubject.asObservable();
  }

  public userTypesList$(): Observable<TypeUser[]> {
    return this.userTypesListSubject.asObservable();
  }

  public getAllUsers(): void {
    this.http.get<User[]>('/v1/users').pipe(catchError(this.handleError)).subscribe(result => {
      this.usersList = result;
      this.usersListSubject.next(this.usersList);
    });
  }

  public createUser(user: User): void {
    this.http.post<User>('/v1/user', user, this.httpOptions).pipe(catchError(this.handleError)).subscribe(result => {
      user.idUser = result.idUser;
      this.usersList = [...this.usersList, user];
      this.usersListSubject.next(this.usersList);
      this.toastr.success('Un utilisateur a été ajouté.');
    });
  }

  public updateUser(user: User): void {
    this.http.put<User>('/v1/user', user, this.httpOptions).pipe(catchError(this.handleError)).subscribe(() => {
      const index = this.usersList.findIndex(t => t.idUser === user.idUser);
      this.usersList[index] = user;
      this.usersListSubject.next(this.usersList);
      this.toastr.success('Un utilisateur a été modifier.');
    });
  }

  public deleteUser(id: number): void {
    this.http.delete<User>('/v1/user/' + id.toString() + '/').pipe(catchError(this.handleError)).subscribe(() => {
      this.usersList = this.usersList.filter(t => t.idUser !== id);
      this.usersListSubject.next(this.usersList);
      this.toastr.success('Un utilisateur à été supprimer.');
    });
  }

  public getAllUserTypes(): void {
    this.http.get<TypeUser[]>('/v1/usertypes').pipe(catchError(this.handleError)).subscribe(result => {
      this.userTypesList = result;
      this.userTypesListSubject.next(this.userTypesList);
    });
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
