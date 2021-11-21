import { RencontreService } from './../services/rencontre.service';
import { Component, Input, OnInit } from '@angular/core';
import { Joueur } from 'src/data/Joueur';
import { Rencontre } from 'src/data/Rencontre';
import { Tour } from 'src/data/Tour';
import { TourService } from '../services/tour.service';
import { Choix } from 'src/data/Choix';
import { ChoixStrategie } from 'src/data/ChoixStrategie';
import { JoueurService } from '../services/joueur.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  @Input() joueur: Joueur;
  @Input() rencontre: Rencontre;
  @Input() abandonnerIsClicked: boolean;
  @Input() abandonnerToggle: boolean;
  @Input() choix : ChoixStrategie;

  tours: Tour[] = [];
  tour: Tour = {
    "id":0,
    "choixJ1":null,
    "choixJ2":null
  };
  choixFait : boolean = false;
  choixAdversaire : boolean = false;
  numbers = [];

  constructor(private tourService: TourService,
              private rencontreService: RencontreService,
              private joueurService: JoueurService) { }

ngOnInit() {
    this.tour.idRencontre = this.rencontre.id;
    this.tour.id = this.rencontre.id * 100 + this.rencontre.tours.length+1;
    this.tour.numTour=this.rencontre.tours.length +1;
    this.rencontreService.findById(this.rencontre.id).subscribe((data: Rencontre) => {
      this.rencontre = data;
    });
    this.tourService.findById(this.tour.id).subscribe((data: Tour) => {
      if(data!=null){
        this.tour = data;
        this.coop2();
      }
    });
    console.log("test");
  }

  upTour(){
    return this.tourService.findById(this.tour.id).toPromise().then((data: Tour) => {
      if(data!=null){
        this.tour = data;
      }
    });
  }

  fusionFctCoop(){
    this.upTour().then(
      ()=> this.coop()
    ).then(
      ()=> this.updateTour())
  }


  fusionFctTrahir(){
    this.upTour().then(
      ()=> this.trahir()
    ).then(
      ()=> this.updateTour())
  }

  gagnant(){
    if(this.rencontre.scoreJ1>this.rencontre.scoreJ2){
      return this.rencontre.j1.username;
    }
    else{
      if(this.rencontre.scoreJ1==this.rencontre.scoreJ2){
        return "egalité parfaite"
      }
    }
    return this.rencontre.j2.username;
  }

  updateTour() {
    if(this.tour.choixJ1==null || this.tour.choixJ2==null){
        this.tourService.save(this.tour).subscribe(
          ()=> {
            this.choixAdversaire=true;
            this.rencontreService.findById(this.rencontre.id).subscribe((data: Rencontre) => {
              this.rencontre = data;
              this.newTour();
            });
          }
        );
    }
    else{
      this.choixAdversaire=true;
      this.tourService.update(this.tour).subscribe(
        res=>{
          this.tourService.findById(this.tour.id).subscribe(
            (data: Tour) => {
                this.tour = data;
                this.rencontre.tours.push(this.tour);
                this.rencontreService.updateRencontre(this.rencontre).subscribe(
                  ()=> {
                    this.newTour();
                  }
                );
            });
        }
      );
    }
  }

  newTour(){
    this.choixFait = false;
    this.choixAdversaire = false;
    this.tour = {
      "id": (this.tour.id+1),
      "choixJ1": null,
      "choixJ2": null,
      "numTour": this.tour.numTour+1
    };
    if (this.abandonnerToggle && this.tour.numTour<=this.rencontre.nbTours){
       this.fctAuto(this.choix);
    }
    this.rencontreService.findById(this.rencontre.id).subscribe((data: Rencontre) => {
      this.rencontre = data;
    });
  }

  coop2(){
    if(this.joueurEquals(this.rencontre.j1,this.joueur)){
      this.tour.choixJ1=Choix.COOPERER;
    }
    else{
      this.tour.choixJ2=Choix.COOPERER;
    }
    this.choixFait=true;
    this.choixAdversaire = !(this.tour.choixJ1==null || this.tour.choixJ2==null)
  }

  fctAuto(choix:ChoixStrategie){
    switch(choix){
      case ChoixStrategie.DonnantDonnant:this.fusionFctDonnant();break;
      case ChoixStrategie.ToujoursCooperer:this.fusionFctTjrCooperer();break;
      case ChoixStrategie.ToujoursTrahir:this.fusionFctTjrTrahir();break;
    }
  }

  joueurEquals(joueur1: Joueur,joueur2: Joueur){
    return (joueur1.username==joueur2.username);
  }

  coop() {
    if(this.joueurEquals(this.rencontre.j1,this.joueur)){
      this.tour.choixJ1=Choix.COOPERER;
      this.rencontre.j1.coupsPrecedents.push(Choix.COOPERER);
    }
    else{
      this.tour.choixJ2=Choix.COOPERER;
      this.rencontre.j2.coupsPrecedents.push(Choix.COOPERER);
    }
    this.joueur.coupsPrecedents.push(Choix.COOPERER);
    this.joueurService.update(this.joueur).subscribe();
    this.choixFait =true;
    this.choixAdversaire = !(this.tour.choixJ1==null || this.tour.choixJ2==null)
  }

  trahir(){
    if(this.joueurEquals(this.rencontre.j1,this.joueur)){
      this.tour.choixJ1=Choix.TRAHIR;
      this.rencontre.j1.coupsPrecedents.push(Choix.TRAHIR);
    }
    else{
      this.tour.choixJ2=Choix.TRAHIR;
      this.rencontre.j2.coupsPrecedents.push(Choix.TRAHIR);
    }
    this.choixFait=true;
    this.choixAdversaire = !(this.tour.choixJ1==null || this.tour.choixJ2==null)
    this.joueur.coupsPrecedents.push(Choix.TRAHIR);
    this.joueurService.update(this.joueur).subscribe();
  }

  donnantDonnant(){
    if(this.joueurEquals(this.rencontre.j1,this.joueur)){
      this.tour.choixJ1=this.rencontre.tours[this.rencontre.tours.length-1].choixJ2;
      this.rencontre.j1.coupsPrecedents.push(this.rencontre.tours[this.rencontre.tours.length-1].choixJ2);
    }
    else{
      this.tour.choixJ2=this.rencontre.tours[this.rencontre.tours.length-1].choixJ1;
      this.rencontre.j2.coupsPrecedents.push(this.rencontre.tours[this.rencontre.tours.length-1].choixJ1);
    }
    this.choixFait =true;
    this.choixAdversaire = !(this.tour.choixJ1==null || this.tour.choixJ2==null)
    this.abandonnerToggle = true;
    this.joueur.coupsPrecedents.push(this.rencontre.tours[this.rencontre.tours.length-1].choixJ1);
    this.choix = ChoixStrategie.DonnantDonnant;
    this.joueurService.update(this.joueur).subscribe();
  }

  fusionFctDonnant(){
    this.upTour().then(
      ()=> this.donnantDonnant()
    ).then(
      ()=> this.updateTour())
  }

  fusionFctTjrTrahir(){
    this.upTour().then(
      ()=> this.tjrTrahir()
    ).then(
      ()=> this.updateTour())
  }

  tjrTrahir(){
    if(this.joueurEquals(this.rencontre.j1,this.joueur)){
      this.tour.choixJ1=Choix.TRAHIR;
      this.rencontre.j1.coupsPrecedents.push(Choix.TRAHIR);
    }
    else{
      this.tour.choixJ2=Choix.TRAHIR;
      this.rencontre.j2.coupsPrecedents.push(Choix.TRAHIR);
    }
    this.choixFait =true;
    this.choixAdversaire = !(this.tour.choixJ1==null || this.tour.choixJ2==null)
    this.abandonnerToggle = true;
    this.joueur.coupsPrecedents.push(Choix.TRAHIR);
    this.choix = ChoixStrategie.ToujoursTrahir;
    this.joueurService.update(this.joueur).subscribe();
  }

  fusionFctTjrCooperer(){
    this.upTour().then(
      ()=> this.tjrCooperer()
    ).then(
      ()=> this.updateTour())
  }

  tjrCooperer(){
    if(this.joueurEquals(this.rencontre.j1,this.joueur)){
      this.tour.choixJ1=Choix.COOPERER;
      this.rencontre.j1.coupsPrecedents.push(Choix.COOPERER);
    }
    else{
      this.tour.choixJ2=Choix.COOPERER;
      this.rencontre.j2.coupsPrecedents.push(Choix.COOPERER);
    }
    this.choixFait =true;
    this.choixAdversaire = !(this.tour.choixJ1==null || this.tour.choixJ2==null)
    this.abandonnerToggle = true;
    this.joueur.coupsPrecedents.push(Choix.COOPERER);
    this.choix = ChoixStrategie.ToujoursCooperer;
    this.joueurService.update(this.joueur).subscribe();
  }
}
