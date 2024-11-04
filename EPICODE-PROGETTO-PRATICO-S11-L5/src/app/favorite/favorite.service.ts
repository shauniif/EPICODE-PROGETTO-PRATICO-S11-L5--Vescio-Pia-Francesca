import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { iFavorite } from '../interfaces/i-favorite';
import { AuthService } from '../pages/auth/auth.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private http:HttpClient, private authSvc: AuthService) { }
  userId!:number;
  favMoviesUrl:string = environment.favoritesUrl;
  create(newFavMovie:Partial<iFavorite>) {
    return this.http.post<iFavorite>(this.favMoviesUrl, newFavMovie);
  }

  delete(id:number) {
    return this.http.delete<iFavorite>(`${this.favMoviesUrl}/${id}`);
  }
  getFavoriteByUser() {
    const accessData = this.authSvc.getAccessData()
    if (!accessData) {
      console.log("Access data non disponibile.");
      return of([]);
    }
    this.userId = accessData.user.id;
    console.log("UserId trovato:", this.userId);
    return this.http.get<iFavorite[]>(`${this.favMoviesUrl}?userId=${this.userId}`);
  }
}
