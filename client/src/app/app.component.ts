import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: User;
  constructor(private auth: AuthService){
    
  }
  ngOnInit(){
    this.auth.autoLogin().subscribe((response:any)=>{
      this.user = response.user;
    })
  }
}
