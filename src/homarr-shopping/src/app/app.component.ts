import { Component } from '@angular/core';
import { trigger, animate, transition, style } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({transform: 'scale(0)', 'transform-origin': 'right bottom'}),
        animate('200ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({transform: 'scale(1)', 'transform-origin': 'right bottom'}))
      ]),
      transition(':leave', [
        animate('200ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({transform: 'scale(0)', 'transform-origin': 'right bottom'}))
      ])
    ])
  ]
})
export class AppComponent {
  title = 'app works!';

  constructor() {
  }
}
