import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients:Client[] = [];
  totalOwed: number;
  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.clientService.getClients().subscribe((response:any)=>{
      this.clients = response.clients;
      this.getTotal();
    });
  }

  getTotal(){
    let total = 0;
    for(let client of this.clients){
      total += client.balance;
    }
    this.totalOwed = total;
  }
}
