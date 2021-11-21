import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Choix } from 'src/data/Choix';
import { ChoixStrategie } from 'src/data/ChoixStrategie';
import { Tour } from 'src/data/Tour';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  private apiUrl: string = environment.apiUrl;
  private toursUrl: string = this.apiUrl + "tours";
  //private toursUrl = 'https://dilemme-prisonnier-serveur.herokuapp.com/tours'

  constructor(private http : HttpClient){}

  public save(tour: Tour) {
    console.log("create tour");
    console.log(tour);
    return this.http.post<Tour>(this.toursUrl, tour);
  }

  public update(tour: Tour){
    console.log("update tour");
    console.log(tour);
    return this.http.put<Tour>(this.toursUrl, tour);
  }

  public findAll(): Observable<Tour[]> {
    return this.http.get<Tour[]>(this.toursUrl);
  }

  public findById(id: number): Observable<Tour> {
    return this.http.get<Tour>(`${this.toursUrl}/${id}`);
  }

}
