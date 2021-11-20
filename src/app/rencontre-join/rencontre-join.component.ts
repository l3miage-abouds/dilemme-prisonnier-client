import { Component, Input, OnInit } from '@angular/core';
import { Joueur } from 'src/data/Joueur';
import { Rencontre } from 'src/data/Rencontre';
import { RencontreService } from '../services/rencontre.service';

@Component({
  selector: 'app-rencontre-join',
  templateUrl: './rencontre-join.component.html',
  styleUrls: ['./rencontre-join.component.scss']
})
export class RencontreJoinComponent implements OnInit {
  @Input() joueur: Joueur;

  rencontres!: Rencontre[];
  rencontreChoisie: Rencontre;
  aChoisiRencontre: boolean = false;

  constructor(private rencontreService: RencontreService) { }

  ngOnInit() {
    this.rencontreService.findAll().subscribe((data: Rencontre[]) => {
      this.rencontres = data;
    });
  }

  updateRencontre(r: Rencontre) {
    r.j2 = this.joueur;
    this.rencontreService.updateRencontre(r).subscribe();
  }

}
