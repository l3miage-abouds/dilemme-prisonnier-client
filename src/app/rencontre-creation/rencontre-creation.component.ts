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

  rencontre: Rencontre = {
    nbTours: 0
  }

  constructor(private rencontreService: RencontreService) {
  }

  ngOnInit() {
    this.rencontre.j1 = this.joueur;
  }

  createRencontre(r: Rencontre) {
    this.rencontreService.save(r).subscribe();
  }

}
