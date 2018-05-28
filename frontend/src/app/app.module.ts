import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WebSocketService } from './websocket.service';
import { ErrorService } from './error.service';
import { ChatService } from './chat.service';


const appRoutes: Routes = [
  {path: '', component: AppComponent}
];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    ErrorService,
    WebSocketService,
    ChatService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
