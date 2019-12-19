import { Worksheet } from './../models/worksheet';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../models/client';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RapportService {

  private clientsList: Client[] = [];
  private clientsListSubject: BehaviorSubject<Client[]> = new BehaviorSubject<Client[]>([]);
  private WorksheetList: Worksheet[] = [];
  private worksheetListSubject: BehaviorSubject<Worksheet[]> = new BehaviorSubject<Worksheet[]>([]);

  constructor(private http: HttpClient) { }

  public clientsList$(): Observable<Client[]> {
    return this.clientsListSubject.asObservable();
  }

  public worksheetList$(): Observable<Worksheet[]> {
    return this.worksheetListSubject.asObservable();
  }

  public getAllClients() {
    this.http.get<Client[]>('/v1/clientsActiveInactive').subscribe(result => {
      this.clientsList = result;
      this.clientsListSubject.next(this.clientsList);
    });
  }

  public getAllWorkSheetByClientAndDate(beginDate: string, endDate: string): Observable<Worksheet[]> {
    console.log(beginDate, endDate);
    return this.http.get<Worksheet[]>('/v1/workSheets/' + beginDate + '/' + endDate + '/').pipe(tap((result) => {
      console.log(result);
      this.WorksheetList = result;
      this.worksheetListSubject.next(this.WorksheetList);
    }));
  }
}
