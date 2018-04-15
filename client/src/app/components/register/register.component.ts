import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm : {name: string, email: string, password: string} = {
    name: '', email: '', password: ''
  };  
  constructor(private auth: AuthService) { }

  ngOnInit() {
  }
  onRegister(form){
    this.auth.registerUser(form);
  }
}
