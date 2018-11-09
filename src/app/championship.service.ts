import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ChampionshipData, ChampionshipDetails} from './app.component';

@Injectable({
  providedIn: 'root'
})
export class ChampionshipService {

  constructor(private http: HttpClient) { }

  public getActualChampionships(): Observable<ChampionshipData[]> {
    return this.http.get<ChampionshipData[]>('http://localhost:8080/actual-championships');
  }

}
