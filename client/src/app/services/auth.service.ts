import { HttpClient } from '@angular/common/http';
import { User } from './../models/user';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';

@Injectable()
export class AuthService {
  private user:User;
  @Output()onLogin = new EventEmitter<User>();
  @Output()onLogout = new EventEmitter<boolean>();
  constructor(private snotify: SnotifyService,private http: HttpClient,private router:Router) { }

  loginUser(email:string,password:string){
    let payload = {
      email,
      password
    }
    this.http.post('/auth/login',payload).subscribe((response:any)=>{
      this.user = response.user;
      this.snotify.success(response.message,"Success",{
        position: 'rightTop',
        timeout: 3000
      });      
      this.router.navigate(['/']);
      this.onLogin.next(this.user);
    },error=>{
      this.snotify.error(error.error.message,"Error "+error.status,{
        position: 'rightTop',
        timeout: 3000
      });
    });
  }
  getUser(){
    return this.user;
  }
  autoLogin(){
    return this.http.get('/auth/current-user').subscribe((response:any)=>{
      this.user = response.user;
      this.onLogin.next(this.user);
    });
  }
  logoutUser(){
    this.http.get('/auth/logout').subscribe((response:any)=>{
      this.user  = undefined;
      this.snotify.success(response.message,"Success",{
        position: 'rightTop',
        timeout: 3000
      });
      this.router.navigate(['/login']);      
      this.onLogout.next(true);
    });
  }
  registerUser(payload){
    this.http.post('/auth/register',payload).subscribe((response:any)=>{
      this.snotify.success(response.message,"Success",{
        position: 'rightTop',
        timeout: 5000
      });
      this.router.navigate(['/login']);   
    },error=>{
      this.snotify.error(error.error.message,"Error "+error.status,{
        position: 'rightTop',
        timeout: 3000
      });
    })
  }
}
