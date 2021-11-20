import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RencontreCreationComponent } from './rencontre-creation/rencontre-creation.component';
import { RencontreJoinComponent } from './rencontre-join/rencontre-join.component';
import { JoueurService } from './services/joueur.service';
import { RencontreService } from './services/rencontre.service';
import { AccueilComponent } from './accueil/accueil.component';
import { GameComponent } from './game/game.component';


@NgModule({
  declarations: [
    AppComponent,
    RencontreCreationComponent,
    RencontreJoinComponent,
    AccueilComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [JoueurService, RencontreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
