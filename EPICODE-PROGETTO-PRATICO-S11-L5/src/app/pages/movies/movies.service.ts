import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { iMovie } from '../../interfaces/i-movie';
import { environment } from '../../../environments/environment.development';
import { iFavorite } from '../../interfaces/i-favorite';
import { FavoriteService } from '../../favorite/favorite.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  movies: iMovie[] = [];
  favoritemovies: iFavorite[] = [];
  userId!: number;
  favoritemovieswithId!: iFavorite
  constructor(private http:HttpClient, private authSvc: AuthService, private favoriteSvc: FavoriteService) {}

  ngOnInit() {


  }

  moviesUrl:string = environment.moviesUrl
  getAll() {
    return this.http.get<iMovie[]>(this.moviesUrl);
  }

  toggleFavorite(movie:iMovie){
    const accessData = this.authSvc.getAccessData()
    if(!accessData) return;
    this.userId = accessData.user.id;

    const favoriteMovie:Partial<iFavorite> = {
      userId: this.userId,
      movie: movie
      }

    const searchFavorite: iFavorite| undefined = this.favoritemovies.find(fav => fav.movie.id === movie.id)
    if(searchFavorite !== undefined) {
      this.favoriteSvc.delete(this.favoritemovieswithId.id).subscribe({})
      } else {
        this.favoriteSvc.create(favoriteMovie).subscribe(fav =>{
           this.favoritemovieswithId = fav
          this.favoritemovies.push(this.favoritemovieswithId)
          console.log(this.favoritemovies)
        })
    }
  }
}
