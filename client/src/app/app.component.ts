import { Component, OnInit, trigger, transition, style, animate } from '@angular/core';
import { AuthService } from './services/auth.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fadeIn',[
      transition('* => *', [
        style({transform: 'translateX(-20px)',opacity:0}),
        animate(2000,style({transform:'translateX(0)',opacity:1}))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthService){
    
  }
  ngOnInit(){
    this.auth.autoLogin();
  }
}
