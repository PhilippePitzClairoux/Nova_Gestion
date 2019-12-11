import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class RapportService {

  private clientsList: Client[] = [];
  private clientsListSubject: BehaviorSubject<Client[]> = new BehaviorSubject<Client[]>([]);

  constructor(private http: HttpClient) { }

  public clientsList$(): Observable<Client[]> {
    return this.clientsListSubject.asObservable();
  }

  public getAllClients() {
    this.http.get<Client[]>('/v1/clientsActiveInactive').subscribe(result => {
      this.clientsList = result;
      this.clientsListSubject.next(this.clientsList);
    });
  }
}
