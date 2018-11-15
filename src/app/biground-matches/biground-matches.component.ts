import {Component, Input, OnInit} from '@angular/core';
import {MatchesService} from '../matches.service';
import {ChampionshipData, Player} from '../app.component';
import {Match} from '../matches/matches.component';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-biground-matches',
  templateUrl: './biground-matches.component.html',
  styleUrls: ['./biground-matches.component.css']
})
export class BigroundMatchesComponent implements OnInit {

  @Input() champId: number;

  navigationSubscription: Subscription;
  paramsSubscription: Subscription;

  public players: Player[] = [];
  public playerIds: number[] = [];
  public matches: Match[] = [];
  public opponentTable: Opponents[] = [];
  public playerCount: number[] = [];

  constructor(private matchesService: MatchesService,
              private route: ActivatedRoute,
              private router: Router) {

    this.navigationSubscription = this.router.events.subscribe(event => {
      if (!(event instanceof NavigationEnd)) {
        this.paramsSubscription.unsubscribe();
        return;
      }
    });

  }

  ngOnInit() {

    this.paramsSubscription = this.route.params
      .subscribe(params => {

        this.players = [];
        this.playerIds = [];
        this.matches = [];
        this.opponentTable = [];
        this.playerCount = [];

    this.matchesService.getMatches(this.champId).subscribe(
      (data) => {
        this.players = data['playerList'];
        this.matches = data['matches'];

        let counter = 0;
        for (const player of this.players) {
          this.playerIds.push(player.id);
          this.opponentTable.push(new Opponents());
          this.playerCount.push(counter);
          counter++;
        }

        for (const match of this.matches) {
          this.opponentTable[this.playerIds.indexOf(match.player1.id)].opponents.push(
            new Opponent(match.player2.name, match.player2.id, match.point1, match.point2));
          this.opponentTable[this.playerIds.indexOf(match.player2.id)].opponents.push(
            new Opponent(match.player1.name, match.player1.id, match.point2, match.point1));
        }
        this.matches = null;
        console.log(this.opponentTable);
      }
    );

      });
  }

}

class Opponents {

  opponents: Opponent[] = []

  constructor(
  ) {}

}

class Opponent {

  constructor(
  name: string,
  id: number,
  pointOwn: number,
  pointOpp: number,
  ) {}

}


