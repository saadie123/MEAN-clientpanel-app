import { ClientService } from './../../../services/client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  clientForm = {
    name: '',
    email: '',
    phone: null,
    balance: null
  }
  constructor(private clientService:ClientService) { }

  ngOnInit() {
  }

  onAddClient(form){
    this.clientService.addClient(form);
  }
}
