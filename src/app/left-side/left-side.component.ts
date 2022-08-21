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

  menuBtn = false;
  menuOpen: boolean = false;

  constructor(
    public dialog: MatDialog,
    private firestore: AngularFirestore,
  ) { }

  ngOnInit(): void {
    if (window.innerWidth < 900) {
      this.menuBtn = true;
      
    } 
  }

  addClass() {
    if (this.menuOpen) {
      this.menuOpen = false;
    } else {
      this.menuOpen = true;
    }
  }
}
