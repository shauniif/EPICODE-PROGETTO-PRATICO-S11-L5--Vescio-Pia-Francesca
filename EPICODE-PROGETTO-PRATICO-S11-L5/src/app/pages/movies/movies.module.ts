import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    MoviesComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    SharedModule
  ]
})
export class MoviesModule { }
