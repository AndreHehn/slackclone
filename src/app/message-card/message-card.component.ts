import { Component, Input, OnInit, Output } from '@angular/core';
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

  constructor(public messageService: MessageDataService,private router: Router) { }

  ngOnInit(): void {
    let threadDataToJson = JSON.parse(this.threadData)
    console.error(threadDataToJson)
    this.currentAnwsers = threadDataToJson['anwsers']
    this.creatorId = threadDataToJson['creatorId']
    this.messageId = threadDataToJson['messageId']
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
}
