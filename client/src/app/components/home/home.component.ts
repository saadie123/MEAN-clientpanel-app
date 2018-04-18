import { Component, OnInit, trigger, transition, style, animate } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeIn',[
      transition('void => *', [
        style({transform: 'translateX(-20px)',opacity:0}),
        animate(500,style({transform:'translateX(0)',opacity:1}))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
