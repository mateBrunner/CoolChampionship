import {AfterContentChecked, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {PlayersService} from '../players.service';
import {ChampionshipData} from '../app.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-championship',
  templateUrl: './new-championship.component.html',
  styleUrls: ['./new-championship.component.css']
})
export class NewChampionshipComponent implements OnInit {

  @Input() championship: ChampionshipDetails;

  public id;
  public searchPlayer: string;

  public newChampForm: FormGroup;
  public format = 'big-round';

  navigationSubscription;
  public actualChampionships: ChampionshipData[] = [];
  public allPlayers: Player[];
  public selectedPlayers = [];
  public formats = ['big-round', 'group'];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private playersService: PlayersService) {

    this.navigationSubscription = this.router.events.subscribe(event => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }
    });
  }

  ngOnInit() {
    this.actualChampionships.push(new ChampionshipData(1, 'test1'));
    this.actualChampionships.push(new ChampionshipData(2, 'test2'));
    this.actualChampionships.push(new ChampionshipData(4, 'test3'));
    this.allPlayers = this.playersService.getPlayers();

    this.buildNewChampForm();

    this.route.params
      .subscribe(params => {
        this.id = params['id'];
        this.championship = new ChampionshipDetails(4, 'hello', 'big-round', 2, 6);
        this.newChampForm.patchValue({
          'newChampName': this.id
        });
      });
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
  }

  checkNewChampName(control: FormControl): {[s: string]: boolean} {
    for (const champ of this.actualChampionships) {
      if (champ.name === control.value) {
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
    this.allPlayers.splice(this.allPlayers.indexOf(player), 1);
    this.updateSliders();
  }

  discardPlayer(player: Player) {
    this.allPlayers.push(player);
    this.selectedPlayers.splice(this.selectedPlayers.indexOf(player), 1);
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

export class Player {

  constructor(
    public id: number,
    public name: string
  ) {}

}
