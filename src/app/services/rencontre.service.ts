import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Rencontre } from 'src/data/Rencontre';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RencontreService {

  private rencontresUrl: string;

  constructor(private http: HttpClient) {
    this.rencontresUrl = 'http://localhost:8080/rencontres';
  }

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

