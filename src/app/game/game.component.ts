import { Component, Input, OnInit } from '@angular/core';
import { Joueur } from 'src/data/Joueur';
import { Rencontre } from 'src/data/Rencontre';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  @Input() joueur: Joueur;
  @Input() rencontre: Rencontre;

  constructor() { }

  ngOnInit(): void {
  }

}
