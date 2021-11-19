import { Component, OnInit } from '@angular/core';
import { Joueur } from 'src/data/Joueur';
import { JoueurService } from '../services/joueur.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent {

  joueur: Joueur = {
    "username": "",
  };
  entrerIsClicked: boolean = false;
  createIsClicked: boolean = false;
  joinIsClicked: boolean = false;

  constructor(private joueurService: JoueurService) { }

  createJoueur(j: Joueur) {
    this.joueurService.save(j).subscribe();
  }

}
