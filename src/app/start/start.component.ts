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
import { baseSocket, baseUrl } from '../app.component';
import axios from 'axios';
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
  start: boolean = false;
  showText: boolean = false;
  dataUser: any = {};
  connected: boolean = false;
  showGame: boolean = false;
  turn: boolean = false;
  turn_number: number[] = [];
  key: string = '';
  data: any = {};
  myDeck: any[] = [];
  chooseCards: any[] = [];
  wait = false;
  constructor(
    private sharedService: TextService,
    private webSocket: WebSocketService
  ) {
    this.sharedService.showText$.subscribe((value) => {
      this.showText = value;
    });
  }

  adveDeck: any[] = [];

  ngOnInit() {
    const userData = localStorage.getItem('userInfo');
    if (userData) {
      this.dataUser = JSON.parse(userData);
      this.connected = true;
    }
  }

  setData(data: any) {
    this.showGame = true;
    this.data = data;
    this.getArbre().then((resp: any) => {
      console.log('resp', resp);

      for (let i = 0; i < 4; i++) {
        for (let element of resp[i].skills) {
          if (this.myDeck.filter((e) => e.id === element.id).length == 0)
            this.myDeck.push(element);
        }
      }
    });
  }

  async getArbre() {
    try {
      const resp = await axios.get(`${baseUrl}/skill/user/${this.dataUser.id}`);
      return resp.data;
    } catch (error) {
      alert(error);
    }
  }

  choseCard = (card: any) => {
    let results = this.chooseCards.filter((card_: any) => {
      return card_.id === card.id;
    });
    if (this.chooseCards.length < 4 && this.turn && results.length === 0) {
      this.chooseCards.push(card);
      this.webSocket.send(this.prepareParams(card));
    }
  };

  prepareParams = (card: any) => {
    let param = {
      key: this.key,
      sender: this.dataUser.id,
      type: ':deck',
      data: {
        skill: card,
        reverse: this.isReverse(),
      },
    };
    console.log(param);

    return param;
  };

  isReverse = () => {
    let first = this.turn_number[0];
    if (first - 1 == 0) {
      this.turn_number.splice(0, 1);
      this.turn = false;
      return true;
    } else {
      this.turn_number[0]--;
      return false;
    }
  };

  connectSocket() {
    this.webSocket
      .connect(baseSocket, this.dataUser, (data: any) => {
        if (data.type === ':found') {
          this.onOpen(data);
        } else if (data.type === ':deck') {
          this.onDeck(data);
        } else if (data.type === ':start') {
          this.start = true;
        }
      })
      .subscribe();
  }

  onDeck = (data: any) => {
    this.adveDeck = data.data.deck;
    if (data.data.reverse) {
      this.turn = true;
    }
  };

  onOpen = (data: any) => {
    console.log(data);
    this.turn = data.data.turn;
    this.key = data.data.key;
    if (this.turn) {
      this.turn_number = [1, 2, 1];
    } else {
      this.turn_number = [2, 2];
    }
    this.setData(data);
  };

  changeFileName(text: string): string {
    let fileName = text.toLowerCase();

    fileName = fileName.replace(/[^\w\s]/g, '_');
    fileName = fileName.replace(/\s+/g, '_');

    return fileName;
  }

  checkActive(card: any) {
    return this.chooseCards.filter((c) => c.id === card.id).length == 0;
  }
}
