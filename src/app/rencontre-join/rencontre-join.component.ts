import { Component, OnInit } from '@angular/core';
import { Rencontre } from 'src/data/Rencontre';
import { RencontreService } from '../services/rencontre.service';

@Component({
  selector: 'app-rencontre-join',
  templateUrl: './rencontre-join.component.html',
  styleUrls: ['./rencontre-join.component.scss']
})
export class RencontreJoinComponent implements OnInit {

  rencontres!: Rencontre[];

  constructor(private rencontreService: RencontreService) { }

  ngOnInit() {
    this.rencontreService.findAll().subscribe((data: Rencontre[]) => {
      this.rencontres = data;
    });
  }

}
