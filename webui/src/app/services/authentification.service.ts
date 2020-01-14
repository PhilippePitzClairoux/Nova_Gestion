import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, BehaviorSubject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

import {UserTypeString} from '../models/user-type-string.model';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})};

  public userType = '';
  public userTypeSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) {
  }

  public isAuthenticated(): boolean {
    return this.userType !== '';
  }

  public userType$(): Observable<string> {
    return this.userTypeSubject.asObservable();
  }

  public getUserTypeString(): string {
    return this.userType;
  }

  public connect(email: string, pass: string): Observable<any> {
    const x = 'username=' + email + '&password=' + pass;
    return this.http.post('/login', x, this.httpOptions).pipe(tap(() => {
      this.userType = 'connect';
    }));
  }

  public logout(): Observable<any> {
    return this.http.post('/logout', this.httpOptions).pipe(tap(() => {
      this.userType = '';
    }));
  }

  public getUserType(): void {
    this.http.get<UserTypeString>('/v1/usertype').subscribe(result => {
      this.userType = result.UserType;
      this.userTypeSubject.next(this.userType);
    }, error => {
      if (error.status === 401) {
        console.error('This error might be because you need to authenticate yourself.');
      } else {
        this.toastr.error(
          'Un problème est survenu, veuillez contacter l\'administrateur.',
          'Erreur',
          {
            onActivateTick: true
          }
        );
      }
      console.error(error);
    });
  }

}
