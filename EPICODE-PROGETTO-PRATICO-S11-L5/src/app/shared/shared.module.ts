import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleMovieComponent } from './single-movie/single-movie.component';



@NgModule({
  declarations: [
    SingleMovieComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    SingleMovieComponent
  ]
})
export class SharedModule { }
