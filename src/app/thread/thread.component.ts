import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MessageDataService } from '../message-data-service/message-data.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})

export class ThreadComponent implements OnInit {

  threadData: any;
  anwsers: Array<any> = [];
  creatorId: any;
  currentId: any;
  index: Number;
  creator: any = {};

  constructor(
    public messageService: MessageDataService, 
    private firestore: AngularFirestore
  ) { }

  ngOnInit(): void {

    this.threadData = this.messageService.currentThread['source']['_value'];
    this.creatorId = this.messageService.currentThread['source']['_value']['creatorId']
    this.messageService.currentId.subscribe((id) => {
      this.currentId = id;
    })


    this.messageService.currentIndex.subscribe((index) => {
      this.index = index
    })

    let threadMessages = this.threadData['threadMessages']
    if (threadMessages) {
      threadMessages.forEach(answer => {
        this.anwsers.push(answer['message'])
      });
    };

    this.getData();
    this.getUser();

    setTimeout(() => {
      this.calc();
    }, 100);
  }

  getData() {
    this.firestore
      .collection('channel')
      .doc(this.currentId)
      .valueChanges()
      .subscribe((channel) => {
        this.anwsers = [];
        let threadData = channel['messages'][this.index]
        this.messageService.updateThread(JSON.parse(threadData), this.index)
        this.threadData = this.messageService.currentThread['source']['_value']
        this.creatorId = this.messageService.currentThread['source']['_value']['creatorId']
        let threadAnwsers = this.threadData['answers']
        if (threadAnwsers) {
          threadAnwsers.forEach(answer => {
            this.anwsers.push(answer['message'])
          });
        }
      })
  }

  getUser() {
    this.firestore
      .collection('users')
      .doc(this.creatorId)
      .valueChanges()
      .subscribe((user) =>{
        this.creator = user;
      });
  }

  closeThread() {
    this.messageService.thread = false;
    this.messageService.threadS = false;
    this.messageService.threadB = false;
  }

  calc() {
    document.getElementById('threadAnwsers').style.height = (
      document.getElementById('threadCont').offsetHeight -
      document.getElementById('firstMessage').offsetHeight - 236) + 'px';
  }
}