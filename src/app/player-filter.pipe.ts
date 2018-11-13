import {Pipe, PipeTransform} from '@angular/core';
import {Player} from './new-championship/new-championship.component';
import {FilterObject} from './app.component';


@Pipe({
  name: 'playerFilter'
})
export class PlayerFilterPipe implements PipeTransform {
  transform(players: Player[], filter: FilterObject): Player[] {

    console.log(filter);

    if (!players || !filter.name) {
      return players;
    }

    //return players.filter(player =>
    //  player.name.toLowerCase().indexOf(searchPlayer.toLowerCase()) !== -1);

    return players.filter(player => player.name.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1);

  }
}

