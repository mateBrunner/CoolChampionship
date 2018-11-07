import {Pipe, PipeTransform} from '@angular/core';
import {Player} from './new-championship/new-championship.component';


@Pipe({
  name: 'playerFilter'
})
export class PlayerFilterPipe implements PipeTransform {
  transform(players: Player[], searchPlayer: string): Player[] {

    if (!players || !searchPlayer) {
      return players;
    }

    return players.filter(player =>
      player.name.toLowerCase().indexOf(searchPlayer.toLowerCase()) !== -1);
  }
}

