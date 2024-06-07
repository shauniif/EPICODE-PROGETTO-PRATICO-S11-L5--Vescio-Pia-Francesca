import { Component, Input } from '@angular/core';
import { iMovie } from '../../interfaces/i-movie';
import { MoviesService } from '../../pages/movies/movies.service';

@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrl: './single-movie.component.scss'
})
export class SingleMovieComponent {

  @Input() movie!: iMovie;

  constructor(private moviesSvc: MoviesService) { }


}
