import { FavoriteService } from './../../favorite/favorite.service';
import { Component } from '@angular/core';
import { MoviesService } from './movies.service';
import { iMovie } from '../../interfaces/i-movie';
import { AuthService } from '../auth/auth.service';
import { iFavorite } from '../../interfaces/i-favorite';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent {
  movies:iMovie[] = [];
  favoriteMovies:iFavorite[] = []
  userId!: number;
  isLiked: boolean = false;
  constructor(private moviesSvc:MoviesService, private authSvc: AuthService, private favoriteSvc: FavoriteService) {}
  ngOnInit() {
    this.moviesSvc.getAll().subscribe(movies => {
      this.movies = movies;
    })
  }
  togglefavorite(movie:iMovie) {
    this.moviesSvc.toggleFavorite(movie);
  }
  isMovieLiked(movie:iMovie): boolean {
    return this.moviesSvc.isMovieLiked(movie);
  }
}
