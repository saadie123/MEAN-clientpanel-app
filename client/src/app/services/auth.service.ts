import { HttpClient } from '@angular/common/http';
import { User } from './../models/user';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private user:User;
  @Output()onLogin = new EventEmitter<User>();
  @Output()onLogout = new EventEmitter<boolean>();
  constructor(private http: HttpClient,private router:Router) { }

  loginUser(email:string,password:string){
    let payload = {
      email,
      password
    }
    this.http.post('/auth/login',payload).subscribe((response:any)=>{
      this.user = response.user;
      this.router.navigate(['/']);
      this.onLogin.next(this.user);
    });
  }
  getUser(){
    return this.user;
  }
  autoLogin(){
    return this.http.get('/auth/current-user');
  }
  logoutUser(){
    this.http.get('/auth/logout').subscribe(response=>{
      this.user  = undefined;
      this.onLogout.next(true);
    });
  }
}
