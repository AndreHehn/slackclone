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
  @Input() messageId: string = '';
  @Input() creatorId: string = '';
  @Input() currentAnwsers: Array<any>;
  thread: boolean = false;
  creator: any = {};
 
  constructor(
    private firestore: AngularFirestore,
    public messageService: MessageDataService,
    private router: Router) { }

  ngOnInit(): void {
    let threadDataToJson = JSON.parse(this.threadData);
    this.currentAnwsers = threadDataToJson['anwsers'];
    this.creatorId = threadDataToJson['creatorId'];
    this.messageId = threadDataToJson['messageId'];
    this.creator = this.creatorId;
    this.getUser()
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

  getUser() {
    this.firestore
      .collection('users')
      .doc(this.creator)
      .valueChanges()
      .subscribe((user) =>{
        this.creator = user;
        console.log(this.creator)
      });
  }
}
