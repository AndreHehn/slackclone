import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogCreateNewMessageComponent } from '../dialog-create-new-message/dialog-create-new-message.component';
import { MessageDataService } from '../message-data-service/message-data.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})

export class MembersComponent implements OnInit {
  @Output() leftSide: EventEmitter<any> = new EventEmitter();
  allChannels = [];
  filteredForType = [];
  userId;
  filteredForUser = [];
  userList = [];
  usersInChatList = [];

  constructor(private firestore: AngularFirestore,
    public dialog: MatDialog,
    private messageService: MessageDataService,
    private router: Router) { }

  ngOnInit(): void {
    this.firestore
      .collection('channel')
      .valueChanges()
      .subscribe((changes: any) => {
        this.filteredForType = [];
        this.filteredForUser = [];
        this.allChannels = changes;
        this.filterForType();
        this.filterForUser();
        this.sortChannels();
        this.changeUidToDisplayName();
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogCreateNewMessageComponent);
  }

  changeSelectedId(channelId: string) {
    this.messageService.changeId(channelId);
    this.messageService.toggleThreadOff()
    this.router.navigate(['main/channel/' + channelId]);
    this.leftSide.emit();
  }

  filterForType() {
    this.allChannels.forEach(elem => {
      if (elem.type == "chat") {
        this.filteredForType.push(elem);
      }
    });
  }

  filterForUser() {
    this.userId = JSON.parse(localStorage.getItem('slackCloneUser'));
    this.filteredForType.forEach(element => {
      element.users.forEach(ele => {
        if (ele == this.userId) this.filteredForUser.push(element)
      })
    })
  }

  sortChannels() {
    this.filteredForUser.sort((a, b) => (a.channelName < b.channelName) ? 1 : -1)
  }

  changeUidToDisplayName() {
    this.firestore.collection('users').valueChanges().subscribe((changes: any) => {
      let registeredUserList = changes;
      this.filteredForUser.forEach(chat => {
        this.usersInChatList = chat.users;
        this.checkForUser(registeredUserList, chat);
      })
    })
  }

  checkForUser(registeredUserList, chat) {
    this.userList = [];
    if (this.usersInChatList.length > 1) {
      this.usersInChatList.forEach((user: any) => {
        registeredUserList.forEach(registeredUser => {
          if (registeredUser.uid == user && registeredUser.uid != this.userId) this.userList.push(registeredUser);
        })
      })
    }
    if (this.usersInChatList.length == 1) {
      registeredUserList.forEach(registeredUser => {
        if (registeredUser.uid == this.userId) this.userList.push(registeredUser);
      })
    }
    this.usersInChatList = [];
    chat.users = this.userList;
  }
}
