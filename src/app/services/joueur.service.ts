import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Rencontre } from 'src/data/Rencontre';
import { Observable } from 'rxjs';
import { Joueur } from 'src/data/Joueur';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JoueurService {

  private apiUrl: string = environment.apiUrl;
  private joueursUrl: string = this.apiUrl + "joueurs";
  //private joueursUrl: string = 'http://localhost:5000/joueurs';
  //private joueursUrl: string = 'https://dilemme-prisonnier-serveur.herokuapp.com/joueurs'

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Joueur[]> {
    return this.http.get<Joueur[]>(this.joueursUrl);
  }

  public save(joueur: Joueur) {
    console.log("create joueur");
    console.log(joueur);
    return this.http.post<Joueur>(this.joueursUrl, joueur);
  }

  public update(joueur: Joueur){
    console.log("update joueur");
    console.log(joueur);
    return this.http.put<Joueur>(this.joueursUrl, joueur);
  }

}
