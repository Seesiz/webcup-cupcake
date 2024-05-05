import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';

import { TextService } from '../Service/text.service';
import { WebSocketService } from '../Service/websocket.service';
import { baseSocket } from '../app.component';
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
    style({ transform: 'translateX(-100%)' }),
    animate('0.5s', style({ transform: 'translateX(0%)' })),
  ]),
  transition(':leave', [
    animate('0.5s', style({ transform: 'translateX(-100%)' })),
  ]),
]);
const lendLeft = trigger('lendLeft', [
  transition(':enter', [
    style({ transform: 'translateX(100%)' }),
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
  dataUser: any = {};
  connected: boolean = false;
  constructor(
    private sharedService: TextService,
    private webSocket: WebSocketService
  ) {
    this.sharedService.showText$.subscribe((value) => {
      this.showText = value;
    });
  }

  ngOnInit() {
    const userData = localStorage.getItem('userInfo');
    if (userData) {
      this.dataUser = JSON.parse(userData);
      this.connected = true;
    }
  }

  connectSocket() {
    this.webSocket.connect(baseSocket).subscribe(() => {
      this.webSocket.send({ type: ':open', data: this.dataUser });
    });
  }
}
