import { Component, OnInit } from '@angular/core';
import { MessageDataService } from '../message-data-service/message-data.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})

export class ThreadComponent implements OnInit {
  threadData: any;
  anwsers: Array<any> = [];
  constructor(public messageService: MessageDataService) { }

  ngOnInit(): void {
    this.threadData = this.messageService.currentThread['source']['_value'];
    console.log(this.threadData)
    let threadMessages = this.threadData['threadMessages']
    if (threadMessages) {
      threadMessages.forEach(anwser => {
        this.anwsers.push(anwser['message'])
      });
    };
    this.calc();
  }

  closeThread() {
    this.messageService.thread = false;
  }

  calc() {
    let heightThradAnswers = document.getElementById('threadAnwsers').offsetHeight;
    let heightThreadCont = document.getElementById('threadCont').offsetHeight;
    let firstMessage = document.getElementById('firstMessage').offsetHeight;
    let xyz = heightThreadCont - firstMessage;

    document.getElementById('threadAnwsers').style.height = xyz + '1px';

    heightThradAnswers = document.getElementById('threadAnwsers').offsetHeight;

    console.log('threadAnwsers', heightThradAnswers);
    console.log('threadCont', heightThreadCont);
    console.log('firstMessage', firstMessage);
    console.log('xyz', xyz);
  }


}
