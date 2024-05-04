import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';

import { TextService } from '../Service/text.service';
export const fadeInAnimation = trigger('fadeInAnimation', [
  transition(':enter', [
    animate(
      '0.5s',
      keyframes([
        style({ opacity: 0, offset: 0 }),
        style({ opacity: 1, offset: 1 }),
      ])
    ),
  ]),
  transition(':leave', [animate('0.5s', style({ opacity: 0 }))]),
]);
const lendRight = trigger('lendRight', [
  transition(':enter', [
    animate('0.5s', style({ transform: 'translateX(100%)' })),
  ]),
  transition(':leave', [
    animate('0.5s', style({ transform: 'translateX(0%)' })),
  ]),
]);
const lendLeft = trigger('lendLeft', [
  transition(':enter', [
    animate('0.5s', style({ transform: 'translateX(0%)' })),
  ]),

  transition(':leave', [
    animate('0.5s', style({ transform: 'translateX(-100%)' })),
  ]),
]);
@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
  animations: [fadeInAnimation, lendLeft, lendRight],
})
export class StartComponent {
  showText: boolean = false;

  constructor(private sharedService: TextService) {
    this.sharedService.showText$.subscribe((value) => {
      this.showText = value;
    });
  }
}
