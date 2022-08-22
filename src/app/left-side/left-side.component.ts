import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogCreateNewChannelComponent } from '../dialog-create-new-channel/dialog-create-new-channel.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-left-side',
  templateUrl: './left-side.component.html',
  styleUrls: ['./left-side.component.scss']
})

export class LeftSideComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.ngOnInit();
  }

  @ViewChild('drawer') drawer: MatDrawer;
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

  leftSide() {
    this.drawer.toggle();
  }
}
