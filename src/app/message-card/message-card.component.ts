import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogBigPictureComponent } from '../dialog-big-picture/dialog-big-picture.component';
import { MessageDataService } from '../message-data-service/message-data.service';

@Component({
  selector: 'app-message-card',
  templateUrl: './message-card.component.html',
  styleUrls: ['./message-card.component.scss']
})

export class MessageCardComponent implements OnInit {

  @Input() messageText: string = '';
  @Input() picture: string = '';
  @Input() threadData: any;
  @Input() counter: any;
  @Input() timestamp: any;
  index: number;
  messageId: string = '';
  @Input() creatorId: string = '';
  currentAnwsers: Array<any>;
  thread: boolean = false;
  creator: any = {};
  anwsers: Array<any> = [];

  constructor(
    private firestore: AngularFirestore,
    public messageService: MessageDataService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (this.threadData != null) {
      let threadDataToJson = JSON.parse(this.threadData);
      this.currentAnwsers = threadDataToJson['anwsers'];
      this.creatorId = threadDataToJson['creatorId'];
      this.index = threadDataToJson['index']
      this.messageId = threadDataToJson['messageId'];
      this.creator = this.creatorId;
      this.getUser();
    }
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
      .doc(this.creatorId)
      .valueChanges()
      .subscribe((user) => {
        this.creator = user;
      });
  }

  openDialog(url) {
    const dialog = this.dialog.open(DialogBigPictureComponent);
    dialog.componentInstance.imagePath = url;
  }



}
