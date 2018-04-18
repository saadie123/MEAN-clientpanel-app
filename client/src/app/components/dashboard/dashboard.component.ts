import { Component, OnInit, trigger, transition, style, animate } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('fadeIn',[
      transition('void => *', [
        style({transform: 'translateX(-20px)',opacity:0}),
        animate(500,style({transform:'translateX(0)',opacity:1}))
      ])
    ])
  ]
})
export class DashboardComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

}
