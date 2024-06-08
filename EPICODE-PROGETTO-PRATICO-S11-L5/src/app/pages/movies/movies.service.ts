import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { iMovie } from '../../interfaces/i-movie';
import { environment } from '../../../environments/environment.development';
import { iFavorite } from '../../interfaces/i-favorite';
import { FavoriteService } from '../../favorite/favorite.service';
import { BehaviorSubject, Subject, SubjectLike } from 'rxjs';

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

    let searchFavorite: iFavorite| undefined = this.favoritemovies.find(fav => fav.movie.id === movie.id)

    if(searchFavorite !== undefined) {
      let searchDeleted: number = this.favoritemovies.findIndex(fav => fav.id === this.favoritemovieswithId.id);
          if (searchDeleted !== -1) {
            this.favoritemovies.splice(searchDeleted, 1);
            console.log(searchDeleted)
            searchFavorite = undefined;
              }
          console.log(this.favoritemovies);

      this.favoriteSvc.delete(this.favoritemovieswithId.id).subscribe(data =>{
      })

    } else {
        this.favoriteSvc.create(favoriteMovie).subscribe(fav =>{
           this.favoritemovieswithId = fav
          this.favoritemovies.push(this.favoritemovieswithId)
          console.log(this.favoritemovies)
        })
    }
  }
  // prima ho usato i Behavior Subject per far cambiare il testo del bottone all'iterno del movies component ma in quel modo ovviamente, al click di uno cambiava lo stato di tutti gli altri. Così ho usato questa funzione che ritorna se l'id del film preferito è uguale all'id del film. Anche se mi da ancora problemi. Quale sarebbe la soluzione adatta?
  isMovieLiked(movie: iMovie): boolean {
    return this.favoritemovies.some(fav => fav.movie.id === movie.id);
  }
}
