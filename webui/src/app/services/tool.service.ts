import {Injectable} from '@angular/core';
import {Tool} from '../models/tool';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import config from '../../assets/config/config.json';

@Injectable({
  providedIn: 'root'
})
export class ToolService {
  api = config.apiUrl;

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Tool[]> {
    return this.http.get<Tool[]>(this.api + 'tools');
  }
}
