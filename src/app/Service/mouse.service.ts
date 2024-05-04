import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MouseService {
  private enterSubject = new Subject<void>();
  private exitSubject = new Subject<void>();
  private pressSubject = new Subject<void>();

  enter() {
    this.enterSubject.next();
  }

  exit() {
    this.exitSubject.next();
  }

  press() {
    this.pressSubject.next();
  }

  onEnter() {
    return this.enterSubject.asObservable();
  }

  onExit() {
    return this.exitSubject.asObservable();
  }

  onPress() {
    return this.pressSubject.asObservable();
  }
}
