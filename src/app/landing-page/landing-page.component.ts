import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TextService } from '../Service/text.service';
import { MouseService } from '../Service/mouse.service';

const load = trigger('loadAnimation', [
  state(
    'start',
    style({
      width: '30%',
      height: '70%',
      borderRadius: '10px',
      zIndex: 'block',
    })
  ),
  state(
    'end',
    style({
      width: '100%',
      height: '100%',
      borderRadius: '0px',
      display: 'none',
    })
  ),
  transition('end => start', animate('.3s ease')),
  transition('* => end', animate('.3s ease-in')),
]);

const onde = trigger('ondeTransition', [
  transition(':enter', [
    animate(
      '0.3s',
      keyframes([
        style({
          width: '0px',
          height: '0px',
          backgroundColor: 'rgba(201, 201, 201, 0.492)',
        }),
        style({
          width: '1000px',
          height: '1000px',
          backgroundColor: 'rgba(0, 0, 0, 0)',
        }),
      ])
    ),
  ]),
  transition(':leave', [
    animate(
      '0.3s',
      keyframes([
        style({
          width: '1000px',
          height: '1000px',
          backgroundColor: 'rgba(0, 0, 0, 0)',
        }),
        style({
          width: '0px',
          height: '0px',
          backgroundColor: 'rgba(201, 201, 201, 0.492)',
        }),
      ])
    ),
  ]),
]);

const menu = trigger('menuTransition', [
  state(
    'start',
    style({
      transform: 'translateX(4%)',
      blur: '0px',
    })
  ),
  state(
    'end',
    style({
      blur: '5px',
      transform: 'translateX(100%)',
    })
  ),
  transition('* => start', animate('.3s')),
  transition('* => end', animate('0.1s')),
]);

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  animations: [load, onde, menu],
})
export class LandingPageComponent implements AfterViewInit {
  bounds: number = 10;
  coords: any = { x: 0, y: 0 };
  boundsCircle: string = `width: ${this.bounds}px; height: ${this.bounds}px`;
  showOnde: boolean = false;
  ondePosition: any = { x: 0, y: 0 };
  @ViewChild('circle') circleRef: ElementRef | undefined;
  showText: boolean = false;
  isConnected: boolean = true;

  constructor(
    private router: Router,
    private sharedService: TextService,
    private mouseService: MouseService
  ) {
    this.sharedService.showText$.subscribe((value) => {
      this.showText = value;
    });
  }

  ngOnInit(): void {
    this.mouseService.onEnter().subscribe(() => {
      this.onEnter();
    });

    this.mouseService.onExit().subscribe(() => {
      this.onExit();
    });

    this.mouseService.onPress().subscribe(() => {
      this.onPress();
    });
  }

  ngAfterViewInit() {
    this.link = this.router.url;

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

    setTimeout(() => {
      this.load = true;
      this.sharedService.setShowText(this.load);
    });
  }

  makeShowText() {
    this.load = true;
    this.sharedService.setShowText(this.load);
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

  navigateMenu() {
    this.load = !this.load;
    this.sharedService.setShowText(this.load);
  }

  fixed: boolean = false;
  link: string = '/home/started';

  hoverShowOn(url: string) {
    this.fixed = false;
    this.router.navigateByUrl(url);
  }
  hoverShowExit(url: string, link_: string) {
    if (!this.fixed && link_ != this.link) this.router.navigateByUrl(this.link);
  }
  navigate(url: string) {
    this.fixed = true;
    this.link = url;
    this.router.navigateByUrl(url);
  }

  enterOnde(event: any) {
    const loadRect = document.querySelector('.load')?.getBoundingClientRect();
    if (loadRect) {
      this.ondePosition.x = event.clientX - loadRect.left + 'px';
      this.ondePosition.y = event.clientY - loadRect.top + 'px';
      setTimeout(() => {
        this.showOnde = !this.showOnde;
      });
    }
  }
}
