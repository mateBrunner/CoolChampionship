import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor() { }

  getPlayers() {
    return [
      {'id': 1, 'name': 'Aladár'},
      {'id': 2, 'name': 'Béla'},
      {'id': 3, 'name': 'Cecil'},
      {'id': 4, 'name': 'Dezső'},
      {'id': 5, 'name': 'Elemér'},
      {'id': 6, 'name': 'Feri'},
      {'id': 7, 'name': 'Gábor'},
      {'id': 8, 'name': 'Hedvig'},
      {'id': 9, 'name': 'Ilona'},
      {'id': 10, 'name': 'Jani'},
      {'id': 11, 'name': 'Karesz'},
      {'id': 12, 'name': 'Lili'},
      {'id': 13, 'name': 'Miki'},
      {'id': 14, 'name': 'Nándi'},
      {'id': 15, 'name': 'Ottó'},
      {'id': 16, 'name': 'Pali'},
      {'id': 17, 'name': 'Robi'}
    ];
  }

}
