import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Application } from '@splinetool/runtime';
import { StartComponent } from './start/start.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}

//export const baseUrl = 'https://cupcake.madagascar.webcup.hodi.host/backend';
export const baseUrl = 'http://localhost:3000';

