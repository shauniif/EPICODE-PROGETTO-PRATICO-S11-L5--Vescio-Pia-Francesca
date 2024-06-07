import { Component } from '@angular/core';
import { iAuthData } from '../../../interfaces/i-auth-data';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authData:iAuthData = {
    email: '',
    password: ''
  // la maggior parte delle password son generate con "Fake Filler", tranne quello che ho creato con la mia email, che è "123456", a prova di hacker

  }
  constructor(
    private authSvc: AuthService,
    private router: Router,
  )
  {}
  login() {
    this.authSvc.login(this.authData).subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
  }
}
