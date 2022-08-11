import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Channel } from 'src/models/channel.class';

@Component({
  selector: 'app-dialog-channel-info',
  templateUrl: './dialog-channel-info.component.html',
  styleUrls: ['./dialog-channel-info.component.scss']
})
export class DialogChannelInfoComponent implements OnInit {
  channel;
  user;
  userId;
  channelId;
  countMembers: number = null;
  userList;
  creator;
  constructor(private firestore: AngularFirestore, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.channelId = paramMap.get('id');
      this.getChannelInfo();
    });

  }

  deleteUser(userId) {

  }




  getChannelInfo() {
    this.firestore.collection('fishes')
      .doc(this.channelId).valueChanges()
      .subscribe((channel: any) => {
        this.channel = new Channel(channel);
        this.userId = JSON.parse(localStorage.getItem('slackCloneUser'));
      })
  }

  /**
   *     users: string[] = [];
    messages: string[] = [];
    channelId: string = '';
    channelName: string = '';
    description: string = '';
    type: string = '';
   */

}
