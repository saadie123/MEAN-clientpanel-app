import { Subscription } from 'rxjs/Subscription';
import { ClientService } from './../../../services/client.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit, OnDestroy {
  subscription:Subscription;
  id:string;
  clientForm = {
    name: '',
    email: '',
    phone: null,
    balance: null
  }
  constructor(private route:ActivatedRoute,private clientService:ClientService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.subscription = this.clientService.getClient(this.id).subscribe((response:any)=>{
      this.clientForm.name = response.client.name;
      this.clientForm.email = response.client.email;
      this.clientForm.phone = response.client.phone;
      this.clientForm.balance = response.client.balance;
    });
  }
  onEditClient(form){
    this.clientService.updateClient(this.id,form);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
