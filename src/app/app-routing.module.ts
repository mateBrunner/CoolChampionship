import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChampionshipComponent } from './championship/championship.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'championship/:id', component: ChampionshipComponent},
  { path: 'profile/:id', component: ProfileComponent}
]

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
