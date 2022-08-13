import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Channel } from 'src/models/channel.class';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ProfileUser } from '../models/user';
import { User } from 'src/models/user.class';


@Component({
  selector: 'app-dialog-channel-info',
  templateUrl: './dialog-channel-info.component.html',
  styleUrls: ['./dialog-channel-info.component.scss']
})


export class DialogChannelInfoComponent implements OnInit {

  channel: Channel = new Channel();
  user: User = new User();
  userId;
  channelId;
  countMembers: number = null;
  userList = [];
  userIdList;
  creator;
  allUserList = [];
  myControl = new FormControl<string | ProfileUser>('');
  options: ProfileUser[];
  filteredOptions: Observable<ProfileUser[]>;
  avatar: string = './assets/avatar.png';
  isUpdated = true;


  constructor(private firestore: AngularFirestore, private route: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    this.route.firstChild.paramMap.subscribe(paramMap => { this.channelId = paramMap['params']['id1']; });
    this.allUsers();
  }


  deleteUser() {
    this.deleteUserbyUid();
    this.changeUsers('delete');
  }


  changeUsers(status) {
    this.isUpdated = false;
    this.firestore
      .collection('channel')
      .doc(this.channelId)
      .update(this.channel.toJson())
      .then(() => {
        this.userList = [];
        this.isUpdated = true;
        if (status == 'delete') this.router.navigate(['']);
      });
  }


  addUser() {
    this.addUserById();
    this.changeUsers('add');
  }


  addUserById() {
    let alreadyInChannel = false;
    for (let i = 0; i < this.channel.users.length; i++) {
      if (this.channel.users[i] == this.myControl.value['uid']) alreadyInChannel = true;
    }
    if (!alreadyInChannel) this.channel.users.push(this.myControl.value['uid']);
  }


  getChannelInfo() {
    this.firestore.collection('channel')
      .doc(this.channelId).valueChanges()
      .subscribe((channel: any) => {
        this.defineVar(channel);
        this.getUsers();
      })
  }


  defineVar(channel) {
    this.channel = new Channel(channel);
    this.userId = JSON.parse(localStorage.getItem('slackCloneUser'));
    this.userIdList = channel.users;
    this.countMembers = this.userIdList.length;
  }


  getUsers() {
    this.allUserList.forEach(ele => {
      this.userIdList.forEach(element => {
        if (ele.uid == element) this.userList.push(ele);
      });
    });
  }


  allUsers() {
    this.firestore.
      collection('users')
      .valueChanges({ idField: 'customId' })
      .subscribe((changes: any) => {
        this.allUserList = changes;
        this.getChannelInfo();
        this.forAutoComplete();
      });
  }


  forAutoComplete() {
    this.options = this.allUserList;
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.displayName;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }


  displayFn(user: ProfileUser): string {
    return user && user.displayName ? user.displayName : '';
  }


  private _filter(name: string): ProfileUser[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.displayName.toLowerCase().includes(filterValue));
  }


  loadChannel() {
    this.firestore.collection('channel').doc(this.channelId).valueChanges().subscribe((changes: any) => {
      let dataFromChannel = changes;
      if (dataFromChannel.messages) this.channel.messages = dataFromChannel.messages;
      if (dataFromChannel.users) this.channel.users = dataFromChannel.users;
      if (dataFromChannel.channelId) this.channel.channelId = dataFromChannel.chanelId;
      if (dataFromChannel.channelName) this.channel.channelName = dataFromChannel.channelName;
    });
  }


  deleteUserbyUid() {
    for (let i = 0; i < this.channel.users.length; i++) {
      const element = this.channel.users[i];
      console.log(element);
      if (element == this.userId) this.channel.users.splice(i, 1);
    }
  }

}