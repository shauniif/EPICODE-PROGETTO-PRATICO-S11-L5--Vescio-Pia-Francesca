import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { iUser } from '../../interfaces/i-user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { iAuthResponse } from '../../interfaces/i-auth-response';
import { iAuthData } from '../../interfaces/i-auth-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper: JwtHelperService = new JwtHelperService();
  authSubject = new BehaviorSubject<null|iUser>(null)
   syncisLoggedIn:boolean = false;
    user$ = this.authSubject.asObservable();
    isLoggedIn$ = this.user$.pipe(
    map(user => !!user),
    tap(user => this.syncisLoggedIn =user)
  )
  constructor(
    private http:HttpClient,
    private router: Router
  ) {
    this.restoreUser();
  }

  registerUrl: string = environment.registerUrl
  loginUrl: string = environment.loginUrl

  register(newUser:Partial<iUser>):Observable<iAuthResponse> {
    return this.http.post<iAuthResponse>(this.registerUrl, newUser);
   }

   login(authData:iAuthData):Observable<iAuthResponse> {
    return this.http.post<iAuthResponse>(this.loginUrl, authData)
    .pipe(tap(data => {
      this.authSubject.next(data.user);
      localStorage.setItem('accessData', JSON.stringify(data));

     this.autoLogout()
    })
    );
  }

  logout():void {
    this.authSubject.next(null);
    localStorage.removeItem('accessData');
    this.router.navigate(['/login']);
   }

   autoLogout():void {
    const accessData = this.getAccessData();
    if(!accessData) return;
    const expDate= this.jwtHelper.getTokenExpirationDate(accessData.accessToken) as Date
    const expMs = expDate.getTime() - new Date().getTime();
    setTimeout(this.logout, expMs)
   }
   getAccessData():iAuthResponse|null {
    const accessDataJson = localStorage.getItem('accessData');
    if(!accessDataJson) return null
    const accessData:iAuthResponse = JSON.parse(accessDataJson);
    return accessData
   }

   restoreUser(): void {
    const accessData = this.getAccessData();
    if(!accessData) return;
    if(this.jwtHelper.isTokenExpired(accessData.accessToken)) return;

    this.authSubject.next(accessData.user)
    this.autoLogout();
   }
}
