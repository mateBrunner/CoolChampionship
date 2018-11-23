import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  public champId;

  constructor(private router: Router) {
    this.champId = this.router.url.split('/')[2];
  }

  ngOnInit() {
  }

}
