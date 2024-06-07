import { FavoriteService } from './../../favorite/favorite.service';
import { Component } from '@angular/core';
import { iUser } from '../../interfaces/i-user';
import { AuthService } from '../auth/auth.service';
import { iFavorite } from '../../interfaces/i-favorite';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  user!: iUser;

  favoritebyUser: iFavorite[] = [];
  constructor(private authSvc: AuthService, private favoriteSvc:FavoriteService) {}

  ngOnInit() {
    this.authSvc.user$.subscribe(user => {
      if(user) this.user = user;
    })

    this.favoriteSvc.getFavoriteByUser()?.subscribe(favs =>{
      this.favoritebyUser = favs;
      console.log(this.favoritebyUser);
    })
  }

  logout():void {
    this.authSvc.logout();
  }

}
