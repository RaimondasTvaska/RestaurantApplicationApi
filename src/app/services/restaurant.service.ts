import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurant } from '../models/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private http : HttpClient;

  constructor(http : HttpClient) {
    this.http = http;
   }

   public getAllRestaurants(): Observable<Restaurant[]>{
    return this.http.get<Restaurant[]>("https://localhost:44328/api/Restaurant")
  }
  public addRestaurant(restaurant : Restaurant): Observable<number>{
    return this.http.post<number>("https://localhost:44328/api/Restaurant", restaurant)
  }
}
