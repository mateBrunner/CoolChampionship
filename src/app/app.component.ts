import {Component} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder} from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FormBuilder]
})
export class AppComponent {
  title = 'CoolChampionship';

  public actualChampionships: ChampionshipData[] = [];
  public isNewChampNameValid = false;
  public newChampName: string;

  constructor(private modalService: NgbModal) {
    this.actualChampionships.push(new ChampionshipData('test1', 1));
    this.actualChampionships.push(new ChampionshipData('test2', 2));
    this.actualChampionships.push(new ChampionshipData('test3', 4));
  }

  open(content) {
    this.modalService.open(content);
  }

  createChampionship() {
    this.actualChampionships.push(new ChampionshipData(this.newChampName, 5));
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
  name: String;
  id: number;

  constructor(name: String, id: number) {
    this.name = name;
    this.id = id;
  }
}
