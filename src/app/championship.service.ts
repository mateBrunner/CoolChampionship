import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ChampionshipData, ChampionshipDetails} from './app.component';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ChampionshipService {

  constructor(private http: HttpClient) { }

  public getActualChampionships(): Observable<ChampionshipData[]> {
    return this.http.get<ChampionshipData[]>('http://localhost:8100/actual-championships');
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

  public createChampionship(name: string): Observable<ChampionshipData> {
    return this.http.post<ChampionshipData>('http://localhost:8100/championship', {'name': name});
  }

}
