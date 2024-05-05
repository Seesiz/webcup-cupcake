import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { baseUrl } from '../../app.component';

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
export class TrocComponent implements OnInit {
  isPageOne: boolean = true;
  need: number | undefined;
  trocId: number | undefined;
  showModal: boolean = false;
  idUser: number = 1;
  data: any[] = [];
  wantKnown: boolean = false;
  selectedItemId: any;
  showProposition() {
    this.showModal = true;
  }
  selectWant(itemId: any) {
    console.log("ID de l'élément sélectionné:", itemId);
    this.showModal = false;
    this.wantKnown = true;
  }

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.trocId = params['id'];
      console.log('ID du troc:', this.trocId);
    });
    const user = localStorage.getItem('userInfo');
    if (user) {
      this.idUser = JSON.parse(user).id;
    }
    this.getArbre();
    console.log(this.data);
  }
  valider() {}
  async getArbre() {
    try {
      const resp = await axios.get(`${baseUrl}/skill/user/${this.idUser}`);
      this.data = resp.data;
    } catch (error) {
      alert(error);
    }
  }
}
