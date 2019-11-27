import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TaskType} from '../models/task-type';
import * as config from '../../assets/config/config.json';
import { Task } from '../models/task';

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

  add(task: Task): Observable<any> {
    return this.http.post(this.api + 'task', task, this.httpOptions);
  }

  getWorksheetTasks(idWorkSheet: number): Observable<Task[]> {
    return this.http.get<Task[]>(this.api + 'task/' + idWorkSheet);
  }

  delete(idTask: number): Observable<any> {
    return this.http.delete(this.api + 'task/' + idTask);
  }

  update(task: Task): Observable<any> {
    return this.http.put(this.api + 'task', task, this.httpOptions);
  }
}
