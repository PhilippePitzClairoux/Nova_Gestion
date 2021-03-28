import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {UserTypeString} from '../models/user-type-string.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})};
  public userType = '';
  public userTypeSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient,
              public snackBar: MatSnackBar) {
  }

  public userType$(): Observable<string> {
    return this.userTypeSubject.asObservable();
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
        this.snackBar.open('Un problème est survenu, veuillez contacter l\'administrateur.', 'x', {duration: 1500});
      }
      console.error(error);
    });
  }

}
