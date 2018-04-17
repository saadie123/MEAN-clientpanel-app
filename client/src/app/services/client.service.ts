import { Observable } from 'rxjs/Observable';
import { SnotifyService } from 'ng-snotify';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class ClientService {
  constructor(private http: HttpClient, private snotify:SnotifyService) { }
  getClients(){
    return this.http.get('/api/clients');
  }
  getClient(id){
    return this.http.get('/api/clients/'+id);
  }
  updateBalance(id, balance){
    this.snotify.async('Update balance...',Observable.create(observer=>{
      this.http.put('/api/clients/'+id,{balance}).subscribe((response:any)=>{
        observer.next({
          title: 'Success',
          body: response.message,
          config: {
            closeOnClick: true,
            timeout: 4000,
            showProgressBar: true,
            type: 'success'
          }
        });
      },error=>{
        observer.next({
          title: 'Error',
          body: error.error.message,
          config: {
            closeOnClick: true,
            timeout: 4000,
            showProgressBar: true,
            type: 'error'
          }
        });
      });
    }),{
      position: 'rightTop'
    });
  }
  addClient(payload){
    this.snotify.async('Adding client...',Observable.create(observer=>{
      this.http.post('/api/clients',payload).subscribe((response:any)=>{
        observer.next({
          title: 'Success',
          body: response.message,
          config: {
            closeOnClick: true,
            timeout: 4000,
            showProgressBar: true,
            type: 'success'
          }
        });
      },error=>{
        observer.next({
          title: 'Error',
          body: error.error.message,
          config: {
            closeOnClick: true,
            timeout: 4000,
            showProgressBar: true,
            type: 'error'
          }
        });
      });
    }),{
      position: 'rightTop'
    });
  }
}
