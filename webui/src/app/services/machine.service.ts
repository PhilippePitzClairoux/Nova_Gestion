import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as config from '../../assets/config/config.json';
import {Machine} from '../models/machine';

@Injectable({
  providedIn: 'root'
})
export class MachineService {
  api = config.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Machine[]> {
    return this.http.get<Machine[]>(this.api + 'machines');
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.api + 'machine/' + id);
  }

  getOne(id: number): Observable<Machine> {
    return this.http.get<Machine>(this.api + 'machine/' + id);
  }

  update(newMachine: Machine): Observable<any> {
    return this.http.put(this.api + 'machine', newMachine, this.httpOptions);
  }

  add(newMachine: Machine): Observable<any> {
    return this.http.post(this.api + 'machine', newMachine, this.httpOptions);
  }
}
