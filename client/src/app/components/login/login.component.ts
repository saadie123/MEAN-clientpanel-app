import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ViewChild, trigger, transition, style, animate } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('fadeIn',[
      transition('void => *', [
        style({transform: 'translateX(-20px)',opacity:0}),
        animate(500,style({transform:'translateX(0)',opacity:1}))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {
  loginForm : {email: string, password: string} = { email: '', password: '' };
  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  onSubmit(form){
    this.auth.loginUser(form.email,form.password);
  }
}
