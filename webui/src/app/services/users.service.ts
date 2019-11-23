import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable, throwError } from 'rxjs';

import { User } from './../models/user.model';
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

  constructor(private http: HttpClient) { }

  public usersList$(): Observable<User[]> {
    return this.usersListSubject.asObservable();
  }

  public userTypesList$(): Observable<TypeUser[]> {
    return this.userTypesListSubject.asObservable();
  }

  public getAllUsers(): void {
    this.http.get<User[]>('/v1/users').pipe(retry(1), catchError(this.handleError)).subscribe(result => {
      this.usersList = result;
      this.usersListSubject.next(this.usersList);
    });
  }

  public createUser(user: User): void {
    this.http.post<User>('/v1/user', user, this.httpOptions).subscribe(result => {
      user.idUser = result.idUser;
      this.usersList = [...this.usersList, user];
      this.usersListSubject.next(this.usersList);
    });
  }

  public updateUser(user: User): void {
    this.http.put<User>('/v1/user', user, this.httpOptions).subscribe(() => {
      const index = this.usersList.findIndex(t => t.idUser === user.idUser);
      this.usersList[index] = user;
      this.usersListSubject.next(this.usersList);
    });
  }

  public deleteUser(id: number): void {
    this.http.delete<User>('/v1/user/' + id.toString() + '/').subscribe(() => {
      this.usersList = this.usersList.filter(t => t.idUser !== id);
      this.usersListSubject.next(this.usersList);
    });
  }

  public getAllUserTypes(): void {
    this.http.get<TypeUser[]>('/v1/usertypes').subscribe(result => {
      this.userTypesList = result;
      this.userTypesListSubject.next(this.userTypesList);
    });
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    if (error.status === 403) {
      // not autorized
    } else {
      // All other errors
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
