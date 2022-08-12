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


  constructor(public dialogRef: MatDialogRef<DialogCreateNewChannelComponent>,
    public dialog: MatDialog,
    private firestore: AngularFirestore,
    private router: Router) { }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  createNewChannel() {
    this.fillObject();
    this.firestore
      .collection('channel')
      .add(this.channel.toJson())
      .then((ref) => {
        let channelId = ref.id;
        this.channel.channelId = channelId;
        this.pushCustomIdToChannel(channelId);
      });
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

}
