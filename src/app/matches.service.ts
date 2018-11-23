import { Injectable } from '@angular/core';
import {BasicValue, ChampionshipData} from './app.component';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  constructor(private http: HttpClient) { }

  public getChampionshipFormat(id: number): Observable<BasicValue> {
    return this.http.get<BasicValue>('http://localhost:8100/championship-format/' + id);
  }

  public getMatches(id: number): any {
    return this.http.get('http://localhost:8100/championship-matches/' + id);
  }

}
