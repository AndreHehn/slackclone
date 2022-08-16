import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MessageDataService } from '../message-data-service/message-data.service';


@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {


  channelId: any;
  messages: any = [];
  messageId:any = [];
  users: any = [];
  creatorId: any = [];
  // thread : boolean;
  threadMessages:any = [];
  constructor(private firestore: AngularFirestore, public messageService: MessageDataService) { }

  ngOnInit(): void {
    this.messageService.currentId.subscribe((id) => {
      this.channelId = id;
      this.saveLastChannelId()
      this.loadData()
    });

    // this.MessageService.currentToggle.subscribe((toggle:boolean)=>{
    //   this.thread = toggle;
    //   if(this.thread === true){

    //   }
    // })
  }


  loadData() {
    this.firestore.collection('channel').doc(this.channelId).valueChanges().subscribe((channel: any) => {
      this.messages = [];
      this.messageId = [];
      this.creatorId = [];
      this.threadMessages = [];
        let messageAll = channel.messages;
        messageAll.forEach(message => {
          console.log(message)
          let messagesToJson =  JSON.parse(message)
        this.messages.push(messagesToJson['message'])
        //
        this.messageId.push(messagesToJson['messageId'])
        this.creatorId.push(messagesToJson['creatorId'])
        this.threadMessages.push(messagesToJson['answers']) 
        console.log('HERE',this.threadMessages)
        });
      
      
      this.users = channel.users;
      
      setTimeout(() => {
        this.scrollBottom();
      }, 1);
    })
  }


  toggleThread(){
    this.messageService.toggleThread();
   }


  saveLastChannelId() {
    localStorage.setItem('channelId', this.channelId)
  }


  threadAnwsersToJson(i:number){
      let threadData = {
            message : this.messages[i],
            creatorId : this.creatorId[i],
            threadMessages : this.threadMessages[i]
      }
       // console.error( this.threadMessages)
    return JSON.stringify(threadData)
  }


  scrollBottom() {
    //console.log('works');
    let messageContainer = document.getElementById('messageContainer');
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }

}
