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

  allChannels: Array<any>;
  filteredForType: Array<any>;
  userId;
  filteredForUser: Array<any>;

  constructor(private firestore: AngularFirestore,
    public dialog: MatDialog,
    private messageService: MessageDataService,
    private router: Router) { }

  ngOnInit(): void {
    this.firestore
      .collection('channel')
      .valueChanges()
      .subscribe((changes: any) => {
        this.allChannels = changes;
        this.filterForType();
        this.filterForUser();
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogCreateNewChannelComponent);
    /*  dialogRef.afterClosed().subscribe((channelName: any) => {
        console.log('The dialog was closed', channelName);
        if (channelName && channelName.length > 0) {
          this.addToCollection('channel', { channelName })
        }
      });*/
  }
  /*
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
  */
  changeSelectedId(channelId: string) {
    this.messageService.changeId(channelId);
    this.messageService.toggleThreadOff()
    this.router.navigate(['main/channel/' + channelId]);
    //setTimeout(() => {
    // location.reload();
    //}, 1);

  }

  filterForType() {
    this.allChannels.forEach(elem => {
      if (elem.type == "channel") {
        this.filteredForType.push(elem);
        console.log('test', elem);
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

}
