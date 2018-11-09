import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router, RoutesRecognized} from '@angular/router';
import {ChampionshipService} from './championship.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FormBuilder]
})
export class AppComponent implements OnInit {
  title = 'CoolChampionship';

  public actualChampionships: ChampionshipData[] = [];
  public selectedId: number;

  public newChampModalForm: FormGroup;

  constructor(private modalService: NgbModal, private route: ActivatedRoute,
              private router: Router, private championshipService: ChampionshipService) {

    championshipService.getActualChampionships().subscribe((champs) => this.actualChampionships = champs);
  }

  ngOnInit() {
    this.router.events.subscribe(val => {
      if (val instanceof RoutesRecognized && val.state.root.firstChild !== null) {
        if (val.state.root.firstChild.url[0]['path'] === 'championship') {
          this.selectedId = val.state.root.firstChild.params['id'];
        }
      }
    });

    this.newChampModalForm = new FormGroup({
      'newChampName': new FormControl('name', [Validators.required, this.checkNewChampName.bind(this)])
    });

  }

  open(content) {
    this.modalService.open(content);
  }

  createChampionship() {
    this.championshipService.createChampionship(this.newChampModalForm.get('newChampName').value).subscribe(
      (champ) => {
        this.actualChampionships.push(champ);
        this.router.navigate(['/championship/' + champ.id]);
      }
    );
    this.newChampModalForm.reset();
  }

  checkNewChampName(control: FormControl): {[s: string]: boolean} {
    for (const champ of this.actualChampionships) {
      if (champ.name === control.value) {
        return {'badName': true};
      }
    }
    return null;
  }

  onSubmit() {
    console.log('submit');
  }

}

export class ChampionshipData {

  constructor(
    public id: number,
    public name: string
  ) {}

  getName() {
    return this.name;
  }

}

export class ChampionshipDetails {

  constructor(
    public id: number,
    public name: string,
    public format?: string,
    public numberOfMatches?: number,
    public sizeOfPlayoff?: number
  ) {}

}
