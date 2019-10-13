import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';

import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  public usersList: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  constructor(private http: HttpClient) { }

  public usersList$(): Observable<User[]> {
    return this.usersList.asObservable();
  }

  public getAllUsers(): void {
    this.http.get<User[]>('/v1/users').subscribe(result => {
      this.usersList.next(result);
    });
  }
}
