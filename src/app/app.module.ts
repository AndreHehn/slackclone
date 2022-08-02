import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { ChannelListComponent } from './channel-list/channel-list.component';
import { ChannelComponent } from './channel/channel.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatboxComponent,
    ChannelListComponent,
    ChannelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
