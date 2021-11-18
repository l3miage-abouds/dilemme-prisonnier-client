import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Joueur } from 'src/data/Joueur';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private urlJoueurs = "http://localhost:5000/api/joueurs/"

  constructor(private http: HttpClient) { }

  getJoueurs() {
    return this.http.get<Joueur[]>(this.urlJoueurs);
  }

  getJoueur(username: string) {
    return this.http.get<Joueur>(`${this.urlJoueurs}/${username}`);
  }
}
