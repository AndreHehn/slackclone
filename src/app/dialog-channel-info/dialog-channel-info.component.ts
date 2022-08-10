import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-channel-info',
  templateUrl: './dialog-channel-info.component.html',
  styleUrls: ['./dialog-channel-info.component.scss']
})
export class DialogChannelInfoComponent implements OnInit {

  countMembers: number = null;
  userList;
  creator;
  constructor() { }

  ngOnInit(): void {
  }

}
