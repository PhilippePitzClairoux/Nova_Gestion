import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }) };

  constructor(private http: HttpClient) {
  }

  public connect(email: string, pass: string): Observable<any> {
    const x = 'username=' + email + '&password=' + pass;
    return this.http.post('/login', x, this.httpOptions);
  }

  public logout(): Observable<any> {
    return this.http.post('/logout', this.httpOptions);
  }

}
