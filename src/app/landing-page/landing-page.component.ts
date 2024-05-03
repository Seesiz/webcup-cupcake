import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TextService } from '../Service/text.service';

const load = trigger('loadAnimation', [
  state(
    'start',
    style({
      width: '30%',
      height: '70%',
      borderRadius: '10px',
      zIndex: 'block',
      backdropFilter: 'blur(5px)',
    })
  ),
  state(
    'end',
    style({
      width: '100%',
      height: '100%',
      borderRadius: '0px',
      display: 'none',
      backdropFilter: 'blur(0px)',
    })
  ),
  transition('* => start', animate('.6s')),
  transition('* => end', animate('.6s')),
]);

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  animations: [load],
})
export class LandingPageComponent implements AfterViewInit {
  bounds: number = 10;
  coords: any = { x: 0, y: 0 };
  boundsCircle: string = `width: ${this.bounds}px; height: ${this.bounds}px`;

  @ViewChild('circle') circleRef: ElementRef | undefined;
  showText: boolean = false;

  constructor(private router: Router, private sharedService: TextService) {
    this.sharedService.showText$.subscribe((value) => {
      this.showText = value;
    });
  }

  ngAfterViewInit() {
    this.sharedService.setShowText(this.load);

    const circle = document.querySelector('.circle') as HTMLElement;
    circle.style.position = 'absolute';
    circle.style.left = '49%';
    circle.style.top = '48%';

    window.addEventListener('mousemove', (e) => {
      this.coords.x = e.clientX;
      this.coords.y = e.clientY;
      animateScroll();
    });

    const animateScroll = () => {
      let x = this.coords.x;
      let y = this.coords.y;

      circle.style.left = x - this.bounds / 2 + 'px';
      circle.style.top = y - this.bounds / 2 + 'px';
    };
  }

  onEnter() {
    this.bounds = 50;
    this.boundsCircle = `width: ${this.bounds}px; height: ${this.bounds}px`;
    this.animateScroll();
  }

  onExit() {
    this.bounds = 10;
    this.boundsCircle = `width: ${this.bounds}px; height: ${this.bounds}px`;
    this.animateScroll();
  }

  onPress() {
    this.bounds = 30;
    this.boundsCircle = `width: ${this.bounds}px; height: ${this.bounds}px; border: 1.4px solid var(--third); background: transparent`;
    this.animateScroll();
  }

  animateScroll() {
    if (this.circleRef && this.coords) {
      const circle = this.circleRef.nativeElement;
      circle.style.left = this.coords.x - this.bounds / 2 + 'px';
      circle.style.top = this.coords.y - this.bounds / 2 + 'px';
    }
  }

  load: boolean = false;

  navigateTo(data: any) {
    this.load = !this.load;
    this.router.navigateByUrl(data.url);
    this.sharedService.setShowText(this.load);
  }

  hoverShow(url: string) {
    this.router.navigateByUrl(url);
  }
}
