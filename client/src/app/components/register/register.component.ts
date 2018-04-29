import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  profilePic = null;
  registerForm : {name: string, email: string, password: string} = {
    name: '', email: '', password: ''
  };  
  constructor(private auth: AuthService) { }

  ngOnInit() {
  }
  onRegister(form){
    const fd = new FormData();
    fd.append('profilePic', this.profilePic, this.profilePic.name);
    fd.append('name',form.name);
    fd.append('email',form.email);
    fd.append('password',form.password);
    this.auth.registerUser(fd);
  }
  onFileSelected(event, canvas){
    const ctx = canvas.getContext('2d');
    const reader = new FileReader();
    this.profilePic = event.target.files[0];
    reader.readAsDataURL(this.profilePic)
    reader.onload = () =>{
      const img = new Image();
      img.src = reader.result;
      img.onload = ()=>{
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0, img.width, img.height);
      }
    };
  }
}
