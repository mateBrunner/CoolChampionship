import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChampionshipComponent } from './championship/championship.component';
import { ProfileComponent } from './profile/profile.component';
import {PlayoffComponent} from './playoff/playoff.component';
import {ResultsComponent} from './results/results.component';
import {MatchesComponent} from './matches/matches.component';

const routes: Routes = [
  { path: 'championship/:id', component: ChampionshipComponent },
  { path: 'championship/:id/matches', component: MatchesComponent},
  { path: 'championship/:id/results', component: ResultsComponent },
  { path: 'championship/:id/playoff', component: PlayoffComponent },
  { path: 'profile/:id', component: ProfileComponent }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
