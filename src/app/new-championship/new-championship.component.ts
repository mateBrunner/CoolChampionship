import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PlayersService} from '../players.service';
import { MatTableModule } from '@angular/material';
import {ChampionshipData} from '../app.component';

@Component({
  selector: 'app-new-championship',
  templateUrl: './new-championship.component.html',
  styleUrls: ['./new-championship.component.css']
})
export class NewChampionshipComponent implements OnInit {

  public model = new ChampionshipDetails(0, '', 'big-round', 2, 0);
  public actualChampionships: ChampionshipData[] = [];
  public allPlayers = [];
  public selectedPlayers = [];
  public displayedPlayerColumns: string[] = ['name', 'select'];
  public formats = ['big-round', 'group'];
  public isChampionshipValid = false;

  submitted = false;

  onSubmit() { this.submitted = true; }

  constructor(private route: ActivatedRoute,
              private playersService: PlayersService) {
    this.route.params.subscribe(params => {
      this.model.id = params['id'];
    });
    this.actualChampionships.push(new ChampionshipData(1, 'test1'));
    this.actualChampionships.push(new ChampionshipData(2, 'test2'));
    this.actualChampionships.push(new ChampionshipData(4, 'test3'));
  }

  ngOnInit() {
    this.allPlayers = this.playersService.getPlayers();
  }

  selectPlayer(player: Player) {
    if (this.selectedPlayers.indexOf(player) === -1) {
      this.selectedPlayers.push(player);
    } else {
      this.selectedPlayers.splice(this.selectedPlayers.indexOf(player),1);
    }
  }

}

class ChampionshipDetails {

  constructor(
    public id: number,
    public name: string,
    public format?: string,
    public numberOfMatches?: number,
    public sizeOfPlayoff?: number
  ) {}

}

class Player {

  checked = false;

  constructor(
    public id: number,
    public name: string
  ) {}

}
