import { Component, OnInit, trigger, transition, style, animate } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('fadeIn',[
      transition('void => *', [
        style({transform: 'translateX(-20px)',opacity:0}),
        animate(500,style({transform:'translateX(0)',opacity:1}))
      ])
    ])
  ]
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
