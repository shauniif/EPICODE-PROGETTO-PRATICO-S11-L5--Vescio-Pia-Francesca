import { Component } from '@angular/core';
import { iUser } from '../../interfaces/i-user';
import { UserService } from './user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  users:iUser[] = [];
  constructor(private usersSvc:UserService) {}
  ngOnInit() {
    this.usersSvc.getAll().subscribe(users => {
      this.users = users;
    console.log(this.users)
      })
  }
}
