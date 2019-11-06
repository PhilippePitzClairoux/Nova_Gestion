import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import * as config from '../../assets/config/config.json';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Worksheet} from '../models/worksheet';

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

  getOne(id: any): Observable<Worksheet> {
    return this.http.get<Worksheet>(this.api + 'worksheet');
  }

  update(newWorksheet: any): Observable<any> {
    return this.http.put(this.api + 'workSheet', newWorksheet, this.httpOptions);
  }
}
