import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { MessageDataService } from '../message-data-service/message-data.service';

@Component({
  selector: 'app-message-card',
  templateUrl: './message-card.component.html',
  styleUrls: ['./message-card.component.scss']
})

export class MessageCardComponent implements OnInit {

  @Input() messageText: string = '';
  @Input() threadData: any;
  @Input() counter: any;
  index: number;
  messageId: string = '';
  creatorId: string = '';
  currentAnwsers: Array<any>;
  thread: boolean = false;
  creator: any = {};
  anwsers: Array<any> = [];
  timestamp: any;

  constructor(
    private firestore: AngularFirestore,
    public messageService: MessageDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let threadDataToJson = JSON.parse(this.threadData);
    this.currentAnwsers = threadDataToJson['anwsers'];
    this.creatorId = threadDataToJson['creatorId'];
    this.index = threadDataToJson['index']
    this.messageId = threadDataToJson['messageId'];
    this.timestamp = threadDataToJson['timestamp'];
    this.creator = this.creatorId; 
    this.getUser();
  }



  toggleThread() {
    if (window.innerWidth < 900) {
      this.messageService.threadS = false;
    } else {
      this.messageService.threadB = false;
    }
    this.messageService.thread = false;
    setTimeout(() => {
      this.messageService.openThread(JSON.parse(this.threadData), this.index);
      if (window.innerWidth < 900) {
        this.messageService.threadS = true;
      } else {
        this.messageService.threadB = true;
      }
      this.messageService.thread = true;
      this.router.navigate(['main/channel/' + this.messageService.currentId['source']['_value'] + '/thread/' + this.messageId]);
    }, 1);
  }

  getUser() {
    this.firestore
      .collection('users')
      .doc(this.creator)
      .valueChanges()
      .subscribe((user) => {
        this.creator = user;
      });
  }


}
