import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TaskType} from '../models/task-type';
import * as config from '../../assets/config/config.json';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  api = config.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  getAllTypes(): Observable<TaskType[]> {
    return this.http.get<TaskType[]>(this.api + 'taskTypes');
  }
}
