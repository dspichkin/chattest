import { Component, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { AppSettings } from './app.settings';
import { WebSocketService } from './websocket.service';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('listSendMessages') private listSendMessages: ElementRef;
  @ViewChild('listReceiveMessages') private listReceiveMessages: ElementRef;


  title = 'app';
  sendMessages = [];
  receiveMessages = [];
  text;
  selectedFile: File;

  constructor(
        private chatService: ChatService,
        private router: Router,
        private ref: ChangeDetectorRef
        ) {
    }
    public ngOnInit():any {
      AppSettings.initialized().then(() => {
        this.chatService.init();
        this.chatService.messages.subscribe(msg => {      
          this.receiveMessages.push(msg)
          this.ref.detectChanges();
          this.listReceiveMessages.nativeElement.scrollTop = this.listReceiveMessages.nativeElement.scrollHeight;
        });
        this.chatService.getLog().subscribe((response: any) => {
          for (let i in response.logs) {
            this.receiveMessages.push(response.logs[i].message)
            response.logs[i].message.author = 'send'
            this.sendMessages.push(response.logs[i].message)
          }
          this.ref.detectChanges();
          setTimeout(() => {
            this.listReceiveMessages.nativeElement.scrollTop = this.listReceiveMessages.nativeElement.scrollHeight;
            this.listSendMessages.nativeElement.scrollTop = this.listSendMessages.nativeElement.scrollHeight;
          }, 300);
        });
      })

    }

    sendMsg() {
      const message = {
        author: 'send',
        message: this.text
      }
      this.sendMessages.push(message)
      this.chatService.messages.next(message);
      this.ref.detectChanges();
      this.listSendMessages.nativeElement.scrollTop = this.listSendMessages.nativeElement.scrollHeight;
      this.text = null;
    }

    keyDownFunction(event) {
      if(event.keyCode == 13 && this.text) {
        this.sendMsg();
      }
    }

    onFileChanged(event) {
      this.selectedFile = event.target.files[0]
      this.chatService.sendFile(this.selectedFile).subscribe((response: any) => {
        if (response.uploaded_file_url) {
          const message = {
            author: 'user1',
            image: AppSettings.BASE_URL + response.uploaded_file_url
          }
          this.chatService.messages.next(message);
          this.sendMessages.push(message)
          this.ref.detectChanges();
          this.listSendMessages.nativeElement.scrollTop = this.listSendMessages.nativeElement.scrollHeight;
        }
        
      });
    }

}
