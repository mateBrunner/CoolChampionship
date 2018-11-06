import {AfterContentChecked, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {PlayersService} from '../players.service';
import {ChampionshipData} from '../app.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-championship',
  templateUrl: './new-championship.component.html',
  styleUrls: ['./new-championship.component.css']
})
export class NewChampionshipComponent implements OnInit, AfterContentChecked {

  @Input() championship: ChampionshipDetails;

  newChampForm: FormGroup;

  navigationSubscription;
  public actualChampionships: ChampionshipData[] = [];
  public allPlayers = [];
  public selectedPlayers = [];
  public formats = ['big-round', 'group'];
  public isChampionshipValid = false;
  public numberOfBadSettings: number;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private playersService: PlayersService) {

    this.navigationSubscription = this.router.events.subscribe(event => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }
      console.log(event);
      this.ngOnInit();
    });
  }

  ngOnInit() {
    this.actualChampionships.push(new ChampionshipData(1, 'test1'));
    this.actualChampionships.push(new ChampionshipData(2, 'test2'));
    this.actualChampionships.push(new ChampionshipData(4, 'test3'));
    this.allPlayers = this.playersService.getPlayers();

    this.newChampForm = new FormGroup({
      'newName': new FormControl(null, [Validators.required])
    });

  }

  ngAfterContentChecked() {
    console.log(12);
    this.numberOfBadSettings = document.querySelectorAll('.bad-value').length;
  }

  selectPlayer(player: Player) {
    this.selectedPlayers.push(player);
    this.allPlayers.splice(this.allPlayers.indexOf(player), 1);
  }

  discardPlayer(player: Player) {
    this.allPlayers.push(player);
    this.selectedPlayers.splice(this.selectedPlayers.indexOf(player), 1);
  }

  onSubmit() {
    console.log("submit");
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
