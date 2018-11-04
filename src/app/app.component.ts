import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder} from '@angular/forms';
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
  }

  open(content) {
    this.modalService.open(content);
  }

  createChampionship() {
    this.actualChampionships.push(new ChampionshipData(5, this.newChampName));
    this.newChampName = '';
  }

  checkNewChampName(value) {
    if (this.actualChampionships.indexOf(value) !== -1) {
      this.isNewChampNameValid = false;
    } else {
      this.isNewChampNameValid = true;
    }
    console.log(this.isNewChampNameValid);
  }

}

export class ChampionshipData {

  constructor(
    public id: number,
    public name: string
  ) {}

}
