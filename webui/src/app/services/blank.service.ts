import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as config from '../../assets/config/config.json';
import {Blank} from '../models/blank';

@Injectable({
  providedIn: 'root'
})
export class BlankService {
  api = config.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.api + 'blanks');
  }

  update(blank: Blank): Observable<any> {
    return this.http.put(this.api + 'blank', blank, this.httpOptions);
  }

  add(blank: Blank): Observable<any> {
    return this.http.post<any>(this.api + 'blank', blank, this.httpOptions);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.api + 'blank/' + id);
  }
}
