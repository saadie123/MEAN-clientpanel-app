import { ClientService } from './../../services/client.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Client } from '../../models/client';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit, OnDestroy {
  clientsLoading:boolean = false;
  clients:Client[] = [];
  totalOwed: number;
  constructor(private clientService: ClientService) { }
  subscription:Subscription;
  ngOnInit() {
    this.clientsLoading = true;
    this.subscription = this.clientService.getClients().subscribe((response:any)=>{
      this.clients = response.clients;
      this.clientsLoading = false;
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

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
