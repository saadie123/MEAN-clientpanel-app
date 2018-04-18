import { Subscription } from 'rxjs/Subscription';
import { ClientService } from './../../../services/client.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, trigger, transition, style, animate } from '@angular/core';
import { Client } from '../../../models/client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css'],
  animations: [
    trigger('fadeIn',[
      transition('void => *', [
        style({transform: 'translateX(-20px)',opacity:0}),
        animate(500,style({transform:'translateX(0)',opacity:1}))
      ])
    ])
  ]
})
export class ClientDetailsComponent implements OnInit, OnDestroy {
  clientLoading:boolean = false;
  subscription:Subscription;
  id:string;
  client:Client;
  hasBalance:boolean = false;
  showBalanceUpdateInput:boolean = false;
  constructor(private route:ActivatedRoute, private clientService:ClientService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.clientLoading = true;
    this.subscription = this.clientService.getClient(this.id).subscribe((response:any)=>{
      this.client = response.client;
      this.clientLoading = false;
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
  onDeleteClient(id){
    this.clientService.deleteClient(id);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
