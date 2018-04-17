import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private router: Router, private auth: AuthService){}

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        if(this.auth.getUser()){
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}