import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { ChampionshipComponent } from './championship/championship.component';
import { ProfileComponent } from './profile/profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule, NgbModalModule, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatInputModule, MatSliderModule, MatSnackBarModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material';
import { InProgressChampionshipComponent } from './in-progress-championship/in-progress-championship.component';
import { NewChampionshipComponent } from './new-championship/new-championship.component';
import { PlayersService } from './players.service';
import { PlayerFilterPipe } from './player-filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { SharedService } from './shared.service';
import { ResultsComponent } from './results/results.component';
import { PlayoffComponent } from './playoff/playoff.component';
import { MatchesComponent } from './matches/matches.component';
import { BigroundMatchesComponent } from './biground-matches/biground-matches.component';
import { GroupMatchesComponent } from './group-matches/group-matches.component';

@NgModule({
  declarations: [
    AppComponent,
    ChampionshipComponent,
    ProfileComponent,
    InProgressChampionshipComponent,
    NewChampionshipComponent,
    PlayerFilterPipe,
    ResultsComponent,
    PlayoffComponent,
    MatchesComponent,
    BigroundMatchesComponent,
    GroupMatchesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatSliderModule,
    MatSnackBarModule,
    NgbModule,
    NgbModalModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    NgbModalModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatSnackBarModule
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  providers: [PlayersService,
              SharedService],
  bootstrap: [AppComponent],
})
export class AppModule { }
