import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BasicValue, ChampionshipData} from '../app.component';
import {SharedService} from '../shared.service';
import {ChampionshipService} from '../championship.service';

@Component({
  selector: 'app-championship',
  templateUrl: './championship.component.html',
  styleUrls: ['./championship.component.css']
})
export class ChampionshipComponent implements OnInit {

  public id: string;
  public status: string;
  public championship: ChampionshipDetails;
  public actualChampionships: ChampionshipData[] = [];
  public result: BasicValue;

  constructor(private sharedService: SharedService,
              private championshipService: ChampionshipService,
              private route: ActivatedRoute) {
    championshipService.getActualChampionships().subscribe((champs) => {
      this.actualChampionships = champs;
    });
  }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
         this.championshipService.getChampionshipStatus(params['id']).subscribe(
           (data) => { this.status = data.value; }
         );
      });
  }

}

class ChampionshipDetails {

  constructor(
    public id: number,
    public name: string,
    public status: string,
    public format?: string,
    public numberOfMatches?: number,
    public sizeOfPlayoff?: number
  ) {}

}
