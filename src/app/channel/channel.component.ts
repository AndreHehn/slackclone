import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MessageDataService } from '../message-data-service/message-data.service';


@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit{


  channelId: any;
  messages: any = [];
  users: any = [];

  constructor(private firestore: AngularFirestore, private MessageService: MessageDataService) { }

  ngOnInit(): void {
    this.MessageService.currentId.subscribe((id) => {
      this.channelId = id;
      this.saveLastChannelId()
      this.loadData()
    });
  }


  loadData() {
    this.firestore.collection('channel').doc(this.channelId).valueChanges().subscribe((channel: any) => {
      this.messages = channel.messages;
      this.users = channel.users;
    })
  }

  saveLastChannelId() {
    localStorage.setItem('channelId', this.channelId)
  }


}
