import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Worksheet} from '../models/worksheet';
import * as config from '../../assets/config/config.json';

@Injectable({
  providedIn: 'root'
})
export class WorksheetService {
  api = config.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Worksheet[]> {
    return this.http.get<Worksheet[]>(this.api + 'workSheets');
  }

  getOne(id: number): Observable<Worksheet> {
    return this.http.get<Worksheet>(this.api + 'workSheet/' + id);
  }

  update(newWorksheet: Worksheet): Observable<any> {
    return this.http.put(this.api + 'workSheet', newWorksheet, this.httpOptions);
  }

  add(newWorksheet: Worksheet): Observable<any> {
    return this.http.post(this.api + 'workSheet', newWorksheet, this.httpOptions);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.api + 'workSheet/' + id);
  }
}
