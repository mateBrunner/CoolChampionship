import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BasicValue, Player} from './app.component';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private http: HttpClient) { }

  public getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>('http://localhost:8100/players');
  }

  public getSelectedPlayers(id: number): Observable<Player[]> {
    return this.http.get<Player[]>('http://localhost:8100/selected-players/' + id);
  }


}
