import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { User } from './models/user';
import { trigger, transition, query, style, group, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routerTransition', [
      transition('* <=> *', [    
        query(':enter, :leave', style({ position: 'fixed', width:'80%' })),
        group([ 
          query(':enter', [
            style({ transform: 'translateX(-50px)',opacity:'0' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(0)',opacity: '1' }))
          ]),
          query(':leave', [
            style({ transform: 'translateX(0)', opacity: '1' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(50px)', opacity: '0' }))]),
        ])
      ])
    ])
   ],
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthService){
    
  }
  ngOnInit(){
    this.auth.autoLogin();
  }
  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}
