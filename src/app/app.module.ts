import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { ChampionshipComponent } from './championship/championship.component';
import { ProfileComponent } from './profile/profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule, NgbModalModule, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatInputModule, MatSliderModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material';
import { InProgressChampionshipComponent } from './in-progress-championship/in-progress-championship.component';
import { NewChampionshipComponent } from './new-championship/new-championship.component';
import { PlayersService } from './players.service';


@NgModule({
  declarations: [
    AppComponent,
    ChampionshipComponent,
    ProfileComponent,
    InProgressChampionshipComponent,
    NewChampionshipComponent,
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
    NgbModule,
    NgbModalModule,
    FormsModule
  ],
  exports: [
    NgbModalModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    FormsModule
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  providers: [PlayersService],
  bootstrap: [AppComponent],
})
export class AppModule { }
