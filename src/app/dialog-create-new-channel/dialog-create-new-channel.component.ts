import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-create-new-channel',
  templateUrl: './dialog-create-new-channel.component.html',
  styleUrls: ['./dialog-create-new-channel.component.scss']
})
export class DialogCreateNewChannelComponent implements OnInit {

  channelName:string = '';


  constructor(public dialogRef: MatDialogRef<DialogCreateNewChannelComponent>,
    public dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  
}
