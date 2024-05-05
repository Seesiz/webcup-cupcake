import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: WebSocket | undefined;

  constructor() {}

  connect(url: string): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket = new WebSocket(url);

      this.socket.onopen = (event) => {
        console.log('WebSocket connected');
        observer.next({ type: 'open', data: event });
      };

      this.socket.onmessage = (event) => {
        observer.next({ type: 'message', data: JSON.parse(event.data) });
      };

      this.socket.onerror = (event) => {
        console.error('WebSocket error:', event);
        observer.error(event);
      };

      this.socket.onclose = (event) => {
        console.log('WebSocket closed');
        observer.next({ type: 'close', data: event });
        observer.complete();
      };

      return () => {
        if (this.socket) {
          this.socket.close();
        }
      };
    });
  }

  send(data: any): void {
    if (this.socket) {
      this.socket.send(JSON.stringify(data));
    } else {
      console.error('WebSocket is not connected');
    }
  }
}
