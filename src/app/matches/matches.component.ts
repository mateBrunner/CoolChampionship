import { Component, OnInit } from '@angular/core';
import {MatchesService} from '../matches.service';
import {ActivatedRoute} from '@angular/router';
import {Player} from '../app.component';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {

  public format: string;
  public champId: number;

  constructor(private matchesService: MatchesService,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params
      .subscribe(params => {
        this.matchesService.getChampionshipFormat(params['id']).subscribe(
          (data) => {
            this.champId = params['id'];
            this.format = data.value; }
        );
      });
  }

}

export class Match {

  constructor(
    public player1: Player,
    public player2: Player,
    public point1: number,
    public point2: number
  ) {}

}
