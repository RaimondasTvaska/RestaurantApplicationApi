import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from '../models/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private http : HttpClient;

  constructor(http : HttpClient) { 
    this.http = http;
  }

  public getAllMenu(): Observable<Menu[]>{
    return this.http.get<Menu[]>("https://localhost:44328/api/Menu")
  }

  public addMenu(menu : Menu): Observable<number>{
    return this.http.post<number>("https://localhost:44328/api/Menu", menu)
  }
  public updateMenu(updatedMenu:Menu): Observable<Menu> {
    return this.http.put<Menu>("https://localhost:44328/api/Menu", updatedMenu);
  }
  public deleteMenu(id: number): Observable<Menu> {
    return this.http.delete<Menu>(`https://localhost:44328/api/Menu/${id}`);
  }

}
