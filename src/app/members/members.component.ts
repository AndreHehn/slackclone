import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/models/user.class';
import { DialogAddMembersComponent } from '../dialog-add-members/dialog-add-members.component';
import { DialogCreateNewMessageComponent } from '../dialog-create-new-message/dialog-create-new-message.component';
import { MessageDataService } from '../message-data-service/message-data.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})

export class MembersComponent implements OnInit {

  allChannels = [];
  filteredForType = [];
  userId;
  filteredForUser = [];
  filteredForUserImg = [];
  UserList = [];
  member: Array<any>;
  pictureUrl: string;
  user: User = new User;

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
    // this.firestore
    //   .collection('users')
    //   .valueChanges()
    //   .subscribe((user: any) => {
    //     this.member = user;
    //     this.filterForCurrentUser();
    //     // console.log(this.member);
    //   });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogCreateNewMessageComponent);
  }

  changeSelectedId(channelId: string) {
    this.messageService.changeId(channelId);
    this.messageService.toggleThreadOff()
    this.router.navigate(['main/channel/' + channelId]);
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
        if (ele == this.userId) this.filteredForUser.push(element);
        console.log(element);
        
      })
    });
  }

  sortChannels() {
    this.filteredForUser.sort((a, b) => (a.channelName < b.channelName) ? 1 : -1)
  }

  changeUidToDisplayName() {
    let userNameList;
    this.firestore
.collection('users')
      .valueChanges()
      .subscribe((changes: any) => {
        let registeredUserList = changes;
        this.filteredForUser.forEach(chat => {
          let usersInChatList = chat.users;
          userNameList = [];
          usersInChatList.forEach(user => {
            registeredUserList.forEach(registeredUser => {
              if (registeredUser.uid == user && registeredUser.uid != this.userId) userNameList.push(registeredUser.displayName);
            })
          })
          usersInChatList = [];
          chat.users = userNameList;
        })
      });
  }

  // filterForCurrentUser() {
  //   let currentUser = JSON.parse(localStorage.getItem('slackCloneUser'));
  //   this.member.forEach(user => {
  //     if (user.uid == currentUser) this.user = user;
  //     this.pictureUrl = this.user.photoURL;
  //   });
  // }
}


