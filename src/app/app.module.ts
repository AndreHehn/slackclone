import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { ChannelListComponent } from './channel-list/channel-list.component';
import { ChannelComponent } from './channel/channel.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ThreadComponent } from './thread/thread.component';
import { DialogChannelInfoComponent } from './dialog-channel-info/dialog-channel-info.component';
import { DirectMessagesComponent } from './direct-messages/direct-messages.component';
import { DialogCreateNewChannelComponent } from './dialog-create-new-channel/dialog-create-new-channel.component';
import { DialogCreateNewMessageComponent } from './dialog-create-new-message/dialog-create-new-message.component';


@NgModule({
  declarations: [
    AppComponent,
    ChatboxComponent,
    ChannelListComponent,
    ChannelComponent,
    ThreadComponent,
    DialogChannelInfoComponent,
    DirectMessagesComponent,
    DialogCreateNewChannelComponent,
    DialogCreateNewMessageComponent
  ],
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
