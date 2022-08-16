import { Component, Input, OnInit, Output } from '@angular/core';
import { MessageDataService } from '../message-data-service/message-data.service';

@Component({
  selector: 'app-message-card',
  templateUrl: './message-card.component.html',
  styleUrls: ['./message-card.component.scss']
})
export class MessageCardComponent implements OnInit {
@Input() messageText : string = '';
@Input() threadData : any;
@Input() messageId : string = '';
@Input() creatorId : string = '';
@Input() currentAnwsers : Array<any>;
thread: boolean = false;
  constructor(private MessageService: MessageDataService) {

   }

  ngOnInit(): void {
    let threadDataToJson = JSON.parse(this.threadData)
    this.currentAnwsers = threadDataToJson['anwsers']
    this.creatorId = threadDataToJson['creatorId']
    this.messageId = threadDataToJson['messageId']
  }
toggleThread(){
  // console.warn(this.threadData)
   this.MessageService.openThread(JSON.parse(this.threadData));
   this.MessageService.thread = true;
  //  console.log(this.MessageService.thread);
   
   //this.MessageService.updateThread(JSON.parse(this.threadData))
  }

 
}
