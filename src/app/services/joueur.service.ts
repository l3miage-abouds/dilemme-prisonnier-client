import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Rencontre } from 'src/data/Rencontre';
import { Observable } from 'rxjs';
import { Joueur } from 'src/data/Joueur';

@Injectable({
  providedIn: 'root'
})
export class JoueurService {

  private joueursUrl: string = 'http://localhost:8080/joueurs';

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Joueur[]> {
    return this.http.get<Joueur[]>(this.joueursUrl);
  }

  public save(joueur: Joueur) {
    console.log("create joueur");
    console.log(joueur);
    return this.http.post<Joueur>(this.joueursUrl, joueur);
  }

}
