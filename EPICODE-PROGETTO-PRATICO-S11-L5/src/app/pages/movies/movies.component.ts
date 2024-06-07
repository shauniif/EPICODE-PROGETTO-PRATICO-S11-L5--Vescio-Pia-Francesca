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
  constructor(private moviesSvc:MoviesService, private authSvc: AuthService) {}
  ngOnInit() {
    this.moviesSvc.getAll().subscribe(movies => {
      this.movies = movies;
      console.log(this.movies);


    })
  }
  togglefavorite(movie:iMovie) {
    this.moviesSvc.toggleFavorite(movie);
  }
  isMovieLiked(movie:iMovie): boolean {
    return this.moviesSvc.isMovieLiked(movie);
  }
}
