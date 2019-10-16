import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CoolantHoleType} from '../models/coolant-hole-type';
import {HttpClient} from '@angular/common/http';
import * as config from '../../assets/config/config.json';

@Injectable({
  providedIn: 'root'
})
export class CoolantHoleTypeService {
  api = config.apiUrl;

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<CoolantHoleType[]> {
    return this.http.get<CoolantHoleType[]>(this.api + 'clients');
  }
}
