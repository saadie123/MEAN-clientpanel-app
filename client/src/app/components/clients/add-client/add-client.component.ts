import { ClientService } from './../../../services/client.service';
import { Component, OnInit, trigger, transition, style, animate } from '@angular/core';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
  animations: [
    trigger('fadeIn',[
      transition('void => *', [
        style({transform: 'translateX(-20px)',opacity:0}),
        animate(500,style({transform:'translateX(0)',opacity:1}))
      ])
    ])
  ]
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
