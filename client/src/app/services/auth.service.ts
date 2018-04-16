import { HttpClient } from '@angular/common/http';
import { User } from './../models/user';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { Observable } from 'rxjs/Observable';

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
    this.snotify.async('Logging In!',Observable.create(observer=>{
      this.http.post('/auth/login',payload).subscribe((response:any)=>{  
        this.user = response.user;
        this.onLogin.next(this.user);
        this.router.navigate(['/']);        
        observer.next({
            title: 'Success',
            body: response.message,
            config: {
              closeOnClick: true,
              timeout: 4000,
              showProgressBar: true,
              type: 'success'
            }
        })
      },(error)=>{
        observer.next({
          title: 'Error',
          body: error.error.message,
          config: {
            closeOnClick: true,
            timeout: 4000,
            showProgressBar: true,
            type: 'error'
          }
        });
      });
    }),{
      position: 'rightTop'
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
    this.snotify.async('Logging out!',Observable.create(observer=>{
      this.http.get('/auth/logout').subscribe((response:any)=>{
        observer.next({
          title: 'Success',
          body: response.message,
          config: {
            closeOnClick: true,
            timeout: 4000,
            showProgressBar: true,
            type: 'success'
          }
        });
        this.router.navigate(['/login']);      
        this.onLogout.next(true);
      });
    }),{
      position: 'rightTop'
    });
  }
  registerUser(payload){
    this.snotify.async('Registering account!',Observable.create(observer=>{
      this.http.post('/auth/register',payload).subscribe((response:any)=>{
        this.router.navigate(['/login']);        
        observer.next({
          title: 'Success',
          body: response.message,
          config: {
            closeOnClick: true,
            timeout: 4000,
            showProgressBar: true,
            type: 'success'
          }
        })
      },error=>{
        observer.next({
          title: 'Error',
          body: error.error.message,
          config: {
            closeOnClick: true,
            timeout: 4000,
            showProgressBar: true,
            type: 'error'
          }
        });
      });
    }),{
      position: 'rightTop'
    });
  }
}
