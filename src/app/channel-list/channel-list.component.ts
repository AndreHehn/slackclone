import { NgLocalization } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogCreateNewChannelComponent } from '../dialog-create-new-channel/dialog-create-new-channel.component';
import { MessageDataService } from '../message-data-service/message-data.service';;

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.scss']
})
export class ChannelListComponent implements OnInit {

  allChannels = [];

  constructor(private firestore: AngularFirestore,
    public dialog: MatDialog,
    private MessageService: MessageDataService,
    private router: Router) { }

  ngOnInit(): void {
    this.firestore
      .collection('channel')
      .valueChanges()
      .subscribe((changes: any) => {
        this.allChannels = changes;
        //console.log(this.allChannels);
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogCreateNewChannelComponent);
    dialogRef.afterClosed().subscribe((channelName: any) => {
      console.log('The dialog was closed', channelName);
      if (channelName && channelName.length > 0) {
        this.addToCollection('channel', { channelName })
      }
    });
  }

  addToCollection(collectionName: string, data: any) {
    this.firestore.collection(collectionName)
      .add(data)
      .then(res => {
        console.log('rest', res);
      })
      .catch(e => {
        console.log(e);
      })
  }

  changeSelectedId(channelId: string) {
    this.MessageService.changeId(channelId);
    this.router.navigate(['main/channel/' + channelId]);
    //setTimeout(() => {
    // location.reload();
    //}, 1);

  }

}
