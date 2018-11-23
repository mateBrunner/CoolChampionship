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

  public status: string;
  public actualChampionships: ChampionshipData[] = [];

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

