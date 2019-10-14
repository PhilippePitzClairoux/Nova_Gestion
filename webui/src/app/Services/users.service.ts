import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../Models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  public usersList: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  public httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient) { }

  public usersList$(): Observable<User[]> {
    return this.usersList.asObservable();
  }

  public getAllUsers(): void {
    this.http.get<User[]>('/v1/users').subscribe(result => {
      this.usersList.next(result);
      console.log('UserService -> getAllUser() : [SUCCESS]');
    });
  }

  public createUser(user: User): void {
    this.http.put<User>('/v1/user', user, this.httpOptions).subscribe(result => {
      user.id = result.id; // TODO Voir si ça marche, parce que angular s'attend de recevoir un user et on retourne un id seulement.
      this.usersList.value.push(user);
      this.usersList.next(this.usersList.value);
      console.log('UserService -> getAllUser() : [SUCCESS]');
    });
  }
}
