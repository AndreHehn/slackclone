import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogChannelInfoComponent } from '../dialog-channel-info/dialog-channel-info.component';
import { MessageDataService } from '../message-data-service/message-data.service';


@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})

export class ChannelComponent implements OnInit {

  channelId: any;
  messages: any = [];
  messageId: any = [];
  users: any = [];
  creatorId: any = [];
  threadMessages: any = [];
  channelName: string;

  constructor(
    private firestore: AngularFirestore,
    public messageService: MessageDataService,
    public dialog: MatDialog,
   ) { }

  ngOnInit(): void {
    this.messageService.currentId.subscribe((id) => {
      this.channelId = id;
      this.saveLastChannelId()
      this.loadData()
    });

  }

  loadData() {
    this.firestore.collection('channel').doc(this.channelId).valueChanges().subscribe((channel: any) => {
      this.messages = [];
      this.messageId = [];
      this.creatorId = [];
      this.threadMessages = [];
      let messageAll = channel.messages;
      messageAll.forEach(message => {
        let messagesToJson = JSON.parse(message)
        this.messages.push(messagesToJson['message'])
        this.messageId.push(messagesToJson['messageId'])
        this.creatorId.push(messagesToJson['creatorId'])
        this.threadMessages.push(messagesToJson['answers'])
      });
      this.users = channel.users;
      this.channelName = channel.channelName;
    })
  }

  toggleThread() {
    this.messageService.toggleThread();
  }

  saveLastChannelId() {
    localStorage.setItem('channelId', this.channelId)
  }

  threadAnwsersToJson(i: number) {
    let threadData = {
      message: this.messages[i],
      creatorId: this.creatorId[i],
      threadMessages: this.threadMessages[i],
      messageId : this.messageId[i],
      index : i
    }
    return JSON.stringify(threadData)
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogChannelInfoComponent);
    dialogRef.componentInstance.channelId = this.channelId;
  }

 

}