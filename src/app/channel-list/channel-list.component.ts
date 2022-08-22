import { NgLocalization } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogCreateNewChannelComponent } from '../dialog-create-new-channel/dialog-create-new-channel.component';
import { LeftSideComponent } from '../left-side/left-side.component';
import { MessageDataService } from '../message-data-service/message-data.service';;

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.scss']
})

export class ChannelListComponent implements OnInit {
  @Output() leftSide: EventEmitter<any> = new EventEmitter();


  allChannels = [];
  filteredForType = [];
  userId;
  filteredForUser = [];

  constructor(private firestore: AngularFirestore,
    public dialog: MatDialog,
    private messageService: MessageDataService,
    private router: Router,
    private leftSideAdd: LeftSideComponent
    ) { }

  ngOnInit(): void {
    this.firestore
      .collection('channel')
      .valueChanges()
      .subscribe((changes: any) => {
        this.filteredForType = [];
        this.filteredForUser = [];
        this.allChannels = changes;
        this.filterForType();
        this.filterForUser();
        this.sortChannels();
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogCreateNewChannelComponent);
  }

  changeSelectedId(channelId: string) {
    this.messageService.changeId(channelId);
    this.messageService.toggleThreadOff()
    this.router.navigate(['main/channel/' + channelId]);
    this.messageService.thread = false;
    this.messageService.threadB = false;
    this.messageService.threadS = false;
    this.leftSide.emit();
    this.leftSideAdd.addClass();
  }

  filterForType() {
    this.allChannels.forEach(elem => {
      if (elem.type == "channel") {
        this.filteredForType.push(elem);
      }
    });
  }

  filterForUser() {
    this.userId = JSON.parse(localStorage.getItem('slackCloneUser'));
    this.filteredForType.forEach(element => {
      element.users.forEach(ele => {
        if (ele == this.userId) this.filteredForUser.push(element)
      })
    })
  }

  sortChannels() {
    this.filteredForUser.sort((a, b) => (a.channelName > b.channelName) ? 1 : -1)
  }


}
