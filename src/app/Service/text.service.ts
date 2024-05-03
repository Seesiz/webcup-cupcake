import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TextService {
  private _showTextSubject = new BehaviorSubject<boolean>(false);
  showText$ = this._showTextSubject.asObservable();

  constructor() {}

  setShowText(value: boolean) {
    this._showTextSubject.next(value);
  }
}
