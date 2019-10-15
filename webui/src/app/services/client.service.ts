import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client} from '../models/client';
import * as config from '../../assets/config/config.json';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  api = config.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Client[]> {
    return this.http.get<Client[]>(this.api + 'clients');
  }
}
