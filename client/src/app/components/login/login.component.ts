import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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
