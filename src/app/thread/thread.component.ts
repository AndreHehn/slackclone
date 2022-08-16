import { Component, OnInit } from '@angular/core';
import { MessageDataService } from '../message-data-service/message-data.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements OnInit {
  threadData : any;
  anwsers : Array<any> = [];
  constructor(private MessageService: MessageDataService) { }

  ngOnInit(): void {
    this.threadData = this.MessageService.currentThread['source']['_value'];
    console.log(this.threadData)
    let threadMessages = this.threadData['threadMessages']
    if(threadMessages){
      threadMessages.forEach(anwser => {
        this.anwsers.push(anwser)
    });
    }
    
  }

}
