import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { iUser } from '../../../interfaces/i-user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  newUser: Partial<iUser> = {}
  constructor(
  private authSvc:  AuthService,
  private router: Router
) {}
register() {
  this.authSvc.register(this.newUser).subscribe(() => {
    this.router.navigate(['/login'])
  })

  }
}
