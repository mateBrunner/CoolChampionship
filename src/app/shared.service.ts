import { Injectable } from '@angular/core';
import {ChampionshipData} from './app.component';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  actualChampionships: ChampionshipData[] = [];

  constructor() { }
}
