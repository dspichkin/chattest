import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { WebSocketService } from './websocket.service';
import { AppSettings } from './app.settings';

export interface Message {
  author: string,
  message?: string,
  image?: string
}

@Injectable()
export class ChatService {
  public messages: Subject<Message>;

  constructor(public wsService: WebSocketService, public http: HttpClient) {
  }

  init() {
    this.messages = <Subject<Message>>this.wsService
      .connect(AppSettings.URL_WEBSOKET).pipe(
        map((response: MessageEvent): Message => {
          let data = JSON.parse(response.data);
          return {
            author: data.author,
            message: data.message,
            image: data.image
          }
        })
      );
  }

  sendFile(file) {
    let formData = new FormData();
    formData.append('file', file);
    return this.http.post(AppSettings.URL_FILE, formData)
  }

  getLog() {
    return this.http.get(AppSettings.URL_LOG)
  }
}