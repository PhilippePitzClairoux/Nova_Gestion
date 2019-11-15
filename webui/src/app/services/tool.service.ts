import {Injectable} from '@angular/core';
import {Tool} from '../models/tool';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as config from '../../assets/config/config.json';

@Injectable({
  providedIn: 'root'
})
export class ToolService {
  api = config.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Tool[]> {
    return this.http.get<Tool[]>(this.api + 'tools');
  }

  update(tool: Tool): Observable<any> {
    return this.http.put(this.api + 'tool', tool, this.httpOptions);
  }

  add(tool: Tool): Observable<any> {
    return this.http.post<any>(this.api + 'tool', tool, this.httpOptions);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.api + 'tool/' + id);
  }
}
