import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../models/client';

@Injectable()
export class ClientService {
  constructor(private http: HttpClient) { }
  getClients(){
    return this.http.get('/api/clients');
  }
  addClient(payload){
    this.http.post('/api/clients',payload).subscribe(response=>{
      console.log(response);
    });
  }
}
