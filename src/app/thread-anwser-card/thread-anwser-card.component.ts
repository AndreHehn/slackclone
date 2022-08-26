import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogBigPictureComponent } from '../dialog-big-picture/dialog-big-picture.component';

@Component({
  selector: 'app-thread-anwser-card',
  templateUrl: './thread-anwser-card.component.html',
  styleUrls: ['./thread-anwser-card.component.scss']
})
export class ThreadAnwserCardComponent implements OnInit {

  @Input() anwser: any;
  @Input() picture;
  @Input() message;
  @Input() timestamp;
  @Input() creatorId: string;
  creator: any = {};


  constructor(private firestore: AngularFirestore,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUser();
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
