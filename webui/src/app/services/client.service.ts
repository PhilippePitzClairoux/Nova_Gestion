import { Client } from './../models/client';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';
import * as config from '../../assets/config/config.json';
import { tap } from 'rxjs/operators';

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

  private clientsList: Client[] = [];
  private clientsListSubject: BehaviorSubject<Client[]> = new BehaviorSubject<Client[]>([]);

  constructor(private http: HttpClient) {
  }

  public clientsList$(): Observable<Client[]> {
    return this.clientsListSubject.asObservable();
  }

  public getAll(): Observable<Client[]> {
    return this.http.get<Client[]>(this.api + 'clients').pipe(tap(result => {
      this.clientsList = result;
      this.clientsListSubject.next(this.clientsList);
      console.log('ClientService -> GetAll() : [SUCCESS]');
    }));
  }

  public createClient(client: Client): void {
    this.http.post<Client>(this.api + 'client', client, this.httpOptions).subscribe(result => {
      client.idClient = result.idClient;
      this.clientsList = [...this.clientsList, client];
      this.clientsListSubject.next(this.clientsList);
      console.log('ClientService -> CreateUser() : [SUCCESS]');
    });
  }

  public updateClient(client: Client): void {
    this.http.put<Client>(this.api + 'client', client, this.httpOptions).subscribe(result => {
      const index = this.clientsList.findIndex(t => t.idClient === client.idClient);
      this.clientsList[index] = client;
      this.clientsListSubject.next(this.clientsList);
      console.log('ClientService -> UpdateClient() : [SUCCESS]');
    });
  }

  public deleteClient(id: number): void {
    this.http.delete<Client>(this.api + 'client/' + id.toString() + '/').subscribe(result => {
      this.clientsList = this.clientsList.filter(t => t.idClient !== id);
      this.clientsListSubject.next(this.clientsList);
      console.log('ClientService -> DeleteClient() : [SUCCESS]');
    });
  }
}
