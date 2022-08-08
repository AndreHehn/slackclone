import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogCreateNewChannelComponent } from '../dialog-create-new-channel/dialog-create-new-channel.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-left-side',
  templateUrl: './left-side.component.html',
  styleUrls: ['./left-side.component.scss']
})
export class LeftSideComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private firestore: AngularFirestore,
  ) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogCreateNewChannelComponent);
    dialogRef.afterClosed().subscribe((channelName: any) => {
      console.log('The dialog was closed', channelName);
      if (channelName && channelName.length > 0){      
        this.addToCollection('channel', {channelName})
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
}
