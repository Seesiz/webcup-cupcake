import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Application } from '@splinetool/runtime';
import { StartComponent } from './start/start.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}

export const baseUrl = 'http://10.200.215.76:3000';
export const baseSocket = 'ws://10.200.215.76:8080';
