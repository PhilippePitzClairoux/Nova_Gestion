import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import * as config from '../../assets/config/config.json';
import { Client } from './../models/client';

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

  constructor(private http: HttpClient, private toastr: ToastrService) {
  }

  public clientsList$(): Observable<Client[]> {
    return this.clientsListSubject.asObservable();
  }

  public getAll(): Observable<Client[]> {
    return this.http.get<Client[]>(this.api + 'clients').pipe(tap(result => {
      this.clientsList = result;
      this.clientsListSubject.next(this.clientsList);
    }));
  }

  public createClient(client: Client): void {
    this.http.post<Client>(this.api + 'client', client, this.httpOptions).subscribe(result => {
      client.idClient = result.idClient;
      this.clientsList = [...this.clientsList, client];
      this.clientsListSubject.next(this.clientsList);
      this.toastr.success(null, 'Client créé');
    });
  }

  public updateClient(client: Client): void {
    this.http.put<Client>(this.api + 'client', client, this.httpOptions).subscribe(() => {
      const index = this.clientsList.findIndex(t => t.idClient === client.idClient);
      this.clientsList[index] = client;
      this.clientsList = [...this.clientsList];
      this.clientsListSubject.next(this.clientsList);
      this.toastr.success(null, 'Client modifié');
    });
  }

  public deleteClient(id: number): void {
    this.http.delete<Client>(this.api + 'client/' + id.toString() + '/').subscribe(() => {
      this.clientsList = this.clientsList.filter(t => t.idClient !== id);
      this.clientsListSubject.next(this.clientsList);
      this.toastr.success(null, 'Client supprimé');
    });
  }
}
