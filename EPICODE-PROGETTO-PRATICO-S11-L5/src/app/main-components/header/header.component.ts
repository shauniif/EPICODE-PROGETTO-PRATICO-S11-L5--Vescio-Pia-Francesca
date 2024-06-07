import { Component } from '@angular/core';
import { AuthService } from '../../pages/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isCollapsed:boolean = true;
  isLoggedIn:boolean = false;

  constructor(private authSvc:AuthService) {}

  ngOnInit() {
    this.authSvc.isLoggedIn$.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
  }
}
