import { Component, OnInit } from '@angular/core';
import { Joueur } from 'src/data/Joueur';
import { JoueurService } from '../services/joueur.service';
import { RencontreService } from '../services/rencontre.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  joueur: Joueur = {
    "username": "",
  };
  entrerIsClicked: boolean = false;
  createIsClicked: boolean = false;
  joinIsClicked: boolean = false;
  choixRencontre: boolean = false;
  rencontresNotExist: boolean = true;
  cOrJ: string = "";

  constructor(private joueurService: JoueurService, private rencontreService: RencontreService) { }

  ngOnInit() { }

  createJoueur(j: Joueur) {
    this.joueurService.save(j).subscribe();
  }

  traiter() {
    if (this.cOrJ === "c") {
      this.createIsClicked=true;
      this.choixRencontre=true;
      this.joinIsClicked=false
    }
    else {
      this.joinIsClicked=true;
      this.choixRencontre=true;
      this.createIsClicked=false;
    }

    console.log("entrerIsClicked: " + this.entrerIsClicked);
    console.log("createIsClicked: " + this.createIsClicked);
    console.log("joinIsClicked: " + this.joinIsClicked);
    console.log("choixRencontre: " + this.choixRencontre);
  }

}
