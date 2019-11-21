import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';

import { UserTypeString } from '../models/user-type-string.model';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }) };

  public userType = '';
  public userTypeSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {
  }

  public userType$(): Observable<string> {
    return this.userTypeSubject.asObservable();
  }

  public connect(email: string, pass: string): Observable<any> {
    const x = 'username=' + email + '&password=' + pass;
    return this.http.post('/login', x, this.httpOptions);
  }

  public logout(): Observable<any> {
    return this.http.post('/logout', this.httpOptions);
  }

  public getUserType(): void {
    this.http.get<UserTypeString>('/v1/usertype').subscribe(result => {
      this.userType = result.UserType;
      this.userTypeSubject.next(this.userType);
    });
  }

}
