import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router, RoutesRecognized} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FormBuilder]
})
export class AppComponent implements OnInit {
  title = 'CoolChampionship';

  public actualChampionships: ChampionshipData[] = [];
  public isNewChampNameValid = false;
  public newChampName: string;
  public selectedId: number;

  public newChampModalForm: FormGroup;

  constructor(private modalService: NgbModal, private route: ActivatedRoute,
              private router: Router) {
    this.actualChampionships.push(new ChampionshipData(1, 'test1'));
    this.actualChampionships.push(new ChampionshipData(2, 'test2'));
    this.actualChampionships.push(new ChampionshipData(3, 'test3'));
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
    this.actualChampionships.push(new ChampionshipData(this.actualChampionships.length + 1, this.newChampModalForm.get('newChampName').value));
    this.newChampName = '';
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
