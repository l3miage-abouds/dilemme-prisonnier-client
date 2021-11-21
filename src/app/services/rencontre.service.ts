import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Rencontre } from 'src/data/Rencontre';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RencontreService {

  private apiUrl: string = environment.apiUrl;
  private rencontresUrl: string = this.apiUrl + "rencontres";
  //private rencontresUrl = 'https://dilemme-prisonnier-serveur.herokuapp.com/rencontres'

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Rencontre[]> {
    return this.http.get<Rencontre[]>(this.rencontresUrl);
  }

  public findById(id: number): Observable<Rencontre> {
    return this.http.get<Rencontre>(`${this.rencontresUrl}/${id}`);
  }

  public addRencontre(rencontre: Rencontre) {
    console.log("create rencontre");
    console.log(rencontre);
    return this.http.post<Rencontre>(this.rencontresUrl, rencontre);
  }

  public updateRencontre(rencontre: Rencontre) {
    console.log("update rencontre");
    console.log(rencontre);
    return this.http.put<Rencontre>(this.rencontresUrl, rencontre);
  }
}

