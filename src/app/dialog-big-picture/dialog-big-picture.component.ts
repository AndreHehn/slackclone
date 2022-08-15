import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-big-picture',
  templateUrl: './dialog-big-picture.component.html',
  styleUrls: ['./dialog-big-picture.component.scss']
})
export class DialogBigPictureComponent implements OnInit {

  imagePath;

  constructor(public dialogRef: MatDialogRef<DialogBigPictureComponent>) { }

  ngOnInit(): void {
  }

}
