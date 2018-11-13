import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BasicValue, ChampionshipData, ChampionshipDetails} from './app.component';
import {Router} from '@angular/router';
import {ChampionshipSettings} from './new-championship/new-championship.component';

@Injectable({
  providedIn: 'root'
})
export class ChampionshipService {

  constructor(private http: HttpClient) { }

  public getChampionshipStatus(id: number): Observable<BasicValue> {
    return this.http.get<BasicValue>('http://localhost:8100/championship-status/' + id);
  }

  public getActualChampionships(): Observable<ChampionshipData[]> {
    return this.http.get<ChampionshipData[]>('http://localhost:8100/actual-championships');
  }

  public getChampionshipSettings(id: number): Observable<ChampionshipSettings> {
    return this.http.get<ChampionshipSettings>('http://localhost:8100/championship-settings/' + id);
  }

  /*public createChampionship(name: string, router: Router) {
    this.http.post('http://localhost:8100/championship', {'name': name}).subscribe(
      data => {
        this.getActualChampionships();
        router.navigate(['/championship/' + data['id']]);
      },
      error => {
        console.log('error', error);
      }
    );
  }*/

  public updateSettings(id: number, data, isInvalid: boolean, lastValidName: string): Observable<BasicValue> {
    if (isInvalid) {
      data.newChampName = lastValidName;
    }
    return this.http.post<BasicValue>('http://localhost:8100/update-championship-settings/' + id,{'settings': data});
  }

  public createChampionship(name: string): Observable<ChampionshipData> {
    return this.http.post<ChampionshipData>('http://localhost:8100/championship', {'name': name});
  }

}

