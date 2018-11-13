import {AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {PlayersService} from '../players.service';
import {ChampionshipData, FilterObject} from '../app.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ChampionshipService} from '../championship.service';

@Component({
  selector: 'app-new-championship',
  templateUrl: './new-championship.component.html',
  styleUrls: ['./new-championship.component.css']
})
export class NewChampionshipComponent implements OnInit, OnDestroy {

  @Input() championship: ChampionshipDetails;
  @Input() actualChampionships: ChampionshipData[] = [];

  public id;

  private allPlayers: Player[];
  public filteredPlayers: Player[];
  public selectedPlayers = [];
  public lastValidName: string;

  private _searchPlayer: string;
  set searchPlayer(value: string) {
    this._searchPlayer = value;
    this.filteredPlayers = this.filterPlayers();
  }
  get searchPlayer(): string {
    return this._searchPlayer;
  }

  public newChampForm: FormGroup;
  public format = 'big-round';

  navigationSubscription;
  public formats = ['big-round', 'group'];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private playersService: PlayersService,
              private championshipService: ChampionshipService) {

    this.navigationSubscription = this.router.events.subscribe(event => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }
    });

  }

  ngOnInit() {
    this.allPlayers = this.playersService.getPlayers();

    this.buildNewChampForm();

    this.subscribeForChampionshipId();

  }

  filterPlayers() {
    return this.allPlayers.filter(player =>
    player.name.toLowerCase().indexOf(this._searchPlayer.toLowerCase()) !== -1 && !this.isInSelected(player.name));
  }

  isInSelected(value) {
    for (const player of this.selectedPlayers) {
      if (player.name === value) {
        return true;
      }
    }
    return false;
  }

  subscribeForChampionshipId() {
    this.filteredPlayers = this.allPlayers;
    this.route.params
      .subscribe(params => {
        this.id = +params['id'];
        this.championshipService.getChampionshipSettings(params['id']).subscribe(
          (data) => {
            this.newChampForm.setValue({
              'newChampName': data.newChampName,
              'format': data.format,
              'numberOfGroups': data.numberOfGroups,
              'numberOfMatches': data.numberOfMatches,
              'sizeOfPlayoff': data.sizeOfPlayoff
            });
            this.lastValidName = this.newChampForm.controls['newChampName'].value;
          }
        );
      });
  }

  changeForm() {
      const isInvalid = this.newChampForm.controls['newChampName'].invalid;
      if (!isInvalid) { this.lastValidName = this.newChampForm.controls['newChampName'].value; }
      this.championshipService.updateSettings(this.id, this.newChampForm.value,
        this.newChampForm.controls['newChampName'].invalid, this.lastValidName).subscribe(
        (response) => null
      );
  }

  ngOnDestroy() {
    console.log(123);
  }

  buildNewChampForm() {
    this.newChampForm = new FormGroup({
      'newChampName': new FormControl('hello', [Validators.required, this.checkNewChampName.bind(this)]),
      'format': new FormControl('big-round'),
      'numberOfGroups': new FormControl(4),
      'numberOfMatches': new FormControl(2),
      'sizeOfPlayoff': new FormControl(4, [this.checkSizeOfPlayoff.bind(this)])
    });
    this.newChampForm.controls['numberOfGroups'].setValidators([this.checkNumberOfGroups.bind(this)]);
    this.newChampForm.controls['numberOfMatches'].setValidators([this.checkNumberOfMatches.bind(this)]);
    this.newChampForm.controls['format'].valueChanges.subscribe(params => { this.updateSliders(); });

    /*this.newChampForm.valueChanges.subscribe(data =>
      this.championshipService.updateSettings(this.id, data).subscribe(
        (response) => null
      ) );*/
  }

  checkNewChampName(control: FormControl): {[s: string]: boolean} {
    for (const champ of this.actualChampionships) {
      if (champ.name === control.value && this.id !== champ.id ) {
        return {'badName': true};
      }
    }
    return null;
  }

  checkNumberOfGroups(control: FormControl): {[s: string]: boolean} {
    if (this.selectedPlayers.length < 3 * control.value && this.newChampForm.get('format').value === 'group') {
      return {'tooFewPlayers': true};
    }
    return null;
  }

  checkNumberOfMatches(control: FormControl): {[s: string]: boolean} {
    if (this.selectedPlayers.length <= control.value && this.newChampForm.get('format').value === 'big-round') {
      return {'tooManyMatches': true};
    }
    return null;
  }

  checkSizeOfPlayoff(control: FormControl): {[s: string]: boolean} {
    if (this.selectedPlayers.length < control.value) {
      return {'tooFewPlayers': true};
    }
    return null;
  }

  selectPlayer(player: Player) {
    this.selectedPlayers.push(player);
    this.searchPlayer = '';
    this.updateSliders();
  }

  discardPlayer(player: Player) {
    this.selectedPlayers.splice(this.selectedPlayers.indexOf(player), 1);
    this.filteredPlayers = this.filterPlayers();
    this.updateSliders();
  }

  updateSliders() {
    this.newChampForm.controls['numberOfMatches'].updateValueAndValidity();
    this.newChampForm.controls['sizeOfPlayoff'].updateValueAndValidity();
    this.newChampForm.controls['numberOfGroups'].updateValueAndValidity();
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

export class ChampionshipSettings {

  constructor (
    public newChampName: string,
    public format: string,
    public numberOfGroups: number,
    public numberOfMatches: number,
    public sizeOfPlayoff: number
  ) {}

}

export class Player {

  constructor(
    public id: number,
    public name: string
  ) {}

}
