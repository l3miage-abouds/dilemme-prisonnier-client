import { Component, Input, OnInit } from '@angular/core';
import { Joueur } from 'src/data/Joueur';
import { Rencontre } from 'src/data/Rencontre';
import { JoueurService } from '../services/joueur.service';
import { RencontreService } from '../services/rencontre.service';

@Component({
  selector: 'app-rencontre-creation',
  templateUrl: './rencontre-creation.component.html',
  styleUrls: ['./rencontre-creation.component.scss']
})
export class RencontreCreationComponent implements OnInit {
  @Input() joueur: Joueur;

  rencontres: Rencontre[];
  rencontre: Rencontre = {
    nbTours: 0,
    scoreJ1: 0,
    scoreJ2: 0
  }
  rencontreCreated: boolean = false;
  otherPlayerJoined: boolean = false;

  constructor(private rencontreService: RencontreService) {
  }

  ngOnInit() {
    this.rencontre.j1 = this.joueur;
    this.rencontreService.findAll().subscribe(
      (data) => {
        this.rencontres = data;
      }
    )
  }

  createRencontre(r: Rencontre) {
    r.id = this.rencontres.length+1;
    r.j1.coupsPrecedents = [];
    r.tours = [];
    r.scoreJ1 = 0;
    r.scoreJ2 = 0;
    this.rencontreService.addRencontre(r).subscribe(
      () => {
        this.otherPlayerJoined = true;
      }
    );
  }

}
