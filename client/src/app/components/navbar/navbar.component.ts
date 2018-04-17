import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: User;
  constructor(private auth: AuthService,private router:Router) { }

  ngOnInit() {
   this.auth.onLogin.subscribe(user=>{
     this.user = user;
   });
  }

  logout(){
    this.auth.logoutUser();
    this.auth.onLogout.subscribe(status=>{
      if(status === true){
        this.user = undefined;
      }
    });
  }

}
