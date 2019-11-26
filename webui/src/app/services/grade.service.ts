import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Grade } from '../models/grade';
import * as config from '../../assets/config/config.json';

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  api = config.apiUrl;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Grade[]> {
    return this.http.get<Grade[]>(this.api + 'grades');
  }
}
