import { Component, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { MessageDataService } from '../message-data-service/message-data.service';
import { User } from 'src/models/user.class';


@Component({
  selector: 'app-message-card',
  templateUrl: './message-card.component.html',
  styleUrls: ['./message-card.component.scss']
})

export class MessageCardComponent implements OnInit {

  @Input() messageText: string = '';
  @Input() threadData: any;
  @Input() messageId: string = '';
  @Input() creatorId: string = '';
  @Input() currentAnwsers: Array<any>;
  thread: boolean = false;
  allChannels = [];
  filteredForType = [];
  filteredForUser = [];
  userId;
  member: Array<any>;
  pictureUrl: string;
  user: User = new User;

  constructor(
    private firestore: AngularFirestore,
    public messageService: MessageDataService,
    private router: Router) { }

  ngOnInit(): void {
    let threadDataToJson = JSON.parse(this.threadData);
    // console.error(threadDataToJson);
    this.currentAnwsers = threadDataToJson['anwsers'];
    this.creatorId = threadDataToJson['creatorId'];
    this.messageId = threadDataToJson['messageId'];
    this.firestore
      .collection('channel')
      .valueChanges()
      .subscribe((changes: any) => {
        this.filteredForType = [];
        this.filteredForUser = [];
        this.allChannels = changes;
        this.filterForType();
        this.filterForUser();
        this.changeUidToDisplayName();
      });
      this.firestore
      .collection('users')
      .valueChanges()
      .subscribe((user: any) => {
        this.member = user;
        this.filterForCurrentUser();
        // console.log(this.member);
      });
  }

  toggleThread() {
    this.messageService.thread = false;
    setTimeout(() => {
      this.messageService.openThread(JSON.parse(this.threadData));
      this.messageService.thread = true;
      console.log(this.messageId, 'HERE')
      this.router.navigate(['main/channel/' + this.messageService.currentId['source']['_value'] + '/thread/' + this.messageId]);
    }, 1);
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

  filterForCurrentUser() {
    let currentUser = JSON.parse(localStorage.getItem('slackCloneUser'));
    this.member.forEach(user => {
      if (user.uid == currentUser) this.user = user;
      this.pictureUrl = this.user.photoURL;
    });
  }

  changeUidToDisplayName() {
    let userList;
    this.firestore.collection('users').valueChanges().subscribe((changes: any) => {
      let registeredUserList = changes;
      this.filteredForUser.forEach(chat => {
        let usersInChatList = chat.users;
        userList = [];
        usersInChatList.forEach(user => {
          registeredUserList.forEach(registeredUser => {
            if (registeredUser.uid == user && registeredUser.uid != this.userId) userList.push(registeredUser);
          })
        })
        usersInChatList = [];
        chat.users = userList;
      })
    })
  }
}
