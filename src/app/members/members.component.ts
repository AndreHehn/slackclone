import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddMembersComponent } from '../dialog-add-members/dialog-add-members.component';
import { DialogCreateNewMessageComponent } from '../dialog-create-new-message/dialog-create-new-message.component';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogCreateNewMessageComponent);
  }
}
