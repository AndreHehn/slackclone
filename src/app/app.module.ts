import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { ChannelListComponent } from './channel-list/channel-list.component';
import { ChannelComponent } from './channel/channel.component';
import { ThreadComponent } from './thread/thread.component';
import { DialogChannelInfoComponent } from './dialog-channel-info/dialog-channel-info.component';
import { DialogCreateNewChannelComponent } from './dialog-create-new-channel/dialog-create-new-channel.component';
import { DialogCreateNewMessageComponent } from './dialog-create-new-message/dialog-create-new-message.component';

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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AutosizeModule } from 'ngx-autosize';
import { DialogBigPictureComponent } from './dialog-big-picture/dialog-big-picture.component';
import { DialogChannelInfoEditDescriptionComponent } from './dialog-channel-info-edit-description/dialog-channel-info-edit-description.component';
import { QuillModule } from 'ngx-quill';
import { MainContainerComponent } from './main-container/main-container.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LeftSideComponent } from './left-side/left-side.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MembersComponent } from './members/members.component';


@NgModule({
  declarations: [
    AppComponent,
    ChatboxComponent,
    ChannelListComponent,
    ChannelComponent,
    ThreadComponent,
    DialogChannelInfoComponent,
    DialogCreateNewChannelComponent,
    DialogCreateNewMessageComponent,
    DialogBigPictureComponent,
    DialogChannelInfoEditDescriptionComponent,
    MainContainerComponent,
    LoginComponent,
    SignUpComponent,
    ToolbarComponent,
    LeftSideComponent,
    MembersComponent
  ],
  imports: [
    MatToolbarModule,
    MatCardModule,
    QuillModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatInputModule,
    MatFormFieldModule,
    AutosizeModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
