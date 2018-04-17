import { ClientService } from './../../../services/client.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Client } from '../../../models/client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id:string;
  client:Client;
  hasBalance:boolean = false;
  showBalanceUpdateInput:boolean = false;
  constructor(private route:ActivatedRoute, private clientService:ClientService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe((response:any)=>{
      this.client = response.client;
      if(this.client.balance > 0){
        this.hasBalance = true;
      }
    });
  }
  updateBalance(id){
    if(this.client.balance === 0){
      this.hasBalance = false;      
    } else {
      this.hasBalance = true;      
    }
    this.clientService.updateBalance(id, this.client.balance);
  }

}
