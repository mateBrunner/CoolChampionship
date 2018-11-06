import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-championship',
  templateUrl: './championship.component.html',
  styleUrls: ['./championship.component.css']
})
export class ChampionshipComponent implements OnInit {

  public id: string;
  public status: string;
  public championship: ChampionshipDetails;

  constructor(private route: ActivatedRoute) {
    this.status = 'new';
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.championship = new ChampionshipDetails(4, 'hello', 'big-round', 2, 6);
    });
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
