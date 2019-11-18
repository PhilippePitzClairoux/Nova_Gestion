import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Status} from '../models/status';
import * as config from '../../assets/config/config.json';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  api = config.apiUrl;

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Status[]> {
    return this.http.get<Status[]>(this.api + 'status');
  }
}
