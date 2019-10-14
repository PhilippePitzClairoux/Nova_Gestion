import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';

import { User } from './../Models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  private usersList: User[] = [];
  private usersListSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient) { }

  public usersList$(): Observable<User[]> {
    return this.usersListSubject.asObservable();
  }

  public getAllUsers(): void {
    this.http.get<User[]>('/v1/users').subscribe(result => {
      this.usersList = result;
      this.usersListSubject.next(this.usersList);
      console.log('UserService -> getAllUser() : [SUCCESS]');
    });
  }

  public createUser(user: User): void {
    this.http.post<User>('/v1/user', user, this.httpOptions).subscribe(result => {
      user.idUser = result.idUser; // TODO backend changer id pour idUser dans la response
      this.usersList = [...this.usersList, user];
      this.usersListSubject.next(this.usersList);
      console.log('UserService -> CreateUser() : [SUCCESS]');
    });
  }

  public updateUser(user: User): void {
    this.http.put<User>('/v1/user', user, this.httpOptions).subscribe(() => {
      const index = this.usersList.findIndex(t => t.idUser === user.idUser);
      this.usersList[index] = user;
      this.usersListSubject.next(this.usersList);
      console.log('UserService -> Update() : [SUCCESS]');
    });
  }

  public deleteUser(id: number): void {
    this.http.delete<User>('/v1/user/' + id.toString()).subscribe(() => {
      this.usersList = this.usersList.filter(t => t.idUser !== id);
      this.usersListSubject.next(this.usersList);
      console.log('UserService -> DeleteUser() : [SUCCESS]');
    });
  }
}
