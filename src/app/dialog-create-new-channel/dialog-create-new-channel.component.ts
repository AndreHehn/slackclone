import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Channel } from 'src/models/channel.class';

@Component({
  selector: 'app-dialog-create-new-channel',
  templateUrl: './dialog-create-new-channel.component.html',
  styleUrls: ['./dialog-create-new-channel.component.scss']
})
export class DialogCreateNewChannelComponent implements OnInit {

  channelName: string = '';
  channel: Channel = new Channel();
  allChannels;
  usedNames = [];
  nameIsUsed = false;


  constructor(public dialogRef: MatDialogRef<DialogCreateNewChannelComponent>,
    public dialog: MatDialog,
    private firestore: AngularFirestore,
    private router: Router) { }


  ngOnInit(): void {
    this.getUsedNames();
  }


  onNoClick() {
    this.dialogRef.close();
  }


  createNewChannel() {
    this.checkIfNameIsUsed();
    if (!this.nameIsUsed) {
      this.fillObject();
      this.firestore
        .collection('channel')
        .add(this.channel.toJson())
        .then((ref) => {
          let channelId = ref.id;
          this.channel.channelId = channelId;
          this.pushCustomIdToChannel(channelId);
          this.dialogRef.close();
        });
    }
  }


  fillObject() {
    let currentUser = JSON.parse(localStorage.getItem('slackCloneUser'));
    this.channel.users.push(currentUser);
    this.channel.channelName = this.channelName;
    this.channel.type = 'channel';
  }


  pushCustomIdToChannel(channelId) {
    this.firestore
      .collection('channel')
      .doc(channelId)
      .update(this.channel.toJson())
      .then(() => {
        this.router.navigate(['main/channel/' + channelId]);
      });
  }


  getUsedNames() {
    this.firestore.collection('channel').valueChanges({ idField: 'customId' }).subscribe((changes: any) => {
      this.allChannels = changes;
      this.allChannels.forEach(element => { this.usedNames.push(element.channelName); });
    });
  }


  checkIfNameIsUsed() {
    this.nameIsUsed = false;
    this.usedNames.forEach(element => {
      if (element == this.channelName) this.nameIsUsed = true;
    });
  }
}
