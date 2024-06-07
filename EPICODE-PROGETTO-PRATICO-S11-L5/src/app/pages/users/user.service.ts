import { Injectable } from '@angular/core';
import { iUser } from '../../interfaces/i-user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: iUser[] = [];

  constructor(private http:HttpClient) {
   }

  usersUrl:string = environment.usersUrl
  getAll() {
    return this.http.get<iUser[]>(this.usersUrl)
  }

}
