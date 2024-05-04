import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component } from '@angular/core';

const toLeft = trigger('fadeToLeft', [
  state(
    'load',
    style({
      transform: 'translateX(0%)',
    })
  ),
  state(
    'exit',
    style({
      transform: 'translateX(-100%)',
    })
  ),
  transition('* => *', animate('0.3s ease')),
]);
@Component({
  selector: 'app-troc',
  templateUrl: './troc.component.html',
  styleUrl: './troc.component.css',
  animations: [toLeft],
})
export class TrocComponent {
  isPageOne: boolean = true;
}
