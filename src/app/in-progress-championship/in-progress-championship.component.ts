import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-in-progress-championship',
  templateUrl: './in-progress-championship.component.html',
  styleUrls: ['./in-progress-championship.component.css']
})
export class InProgressChampionshipComponent implements OnInit {

  public champId;

  constructor(public router: Router) {

    this.champId = router.url.split('/')[2];

  }

  ngOnInit() {
  }

}
