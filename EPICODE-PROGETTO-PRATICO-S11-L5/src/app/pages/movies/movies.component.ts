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
  constructor(private moviesSvc:MoviesService, private authSvc: AuthService) {}
  ngOnInit() {
    this.moviesSvc.getAll().subscribe(movies => {
      this.movies = movies;
      console.log(this.movies);

    })

    this.authSvc.user$.subscribe(user => {
      if(user) this.userId = user.id;
      console.log(this.userId);
    })

  }
  togglefavorite(movie:iMovie) {
    this.moviesSvc.toggleFavorite(movie);
  }
}
