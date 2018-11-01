import {Component, ElementRef, NgModule, ViewChild} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {MatInput} from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CoolChampionship';
  public actualChampionships = ['asdf', 'afd', 'adf'];
  newChampName;

  constructor(private modalService: NgbModal) {

  }

  open(content) {
    this.modalService.open(content);
  }

  createChampionship() {
    this.actualChampionships.push(this.newChampName);
    this.newChampName = '';
  }


}
