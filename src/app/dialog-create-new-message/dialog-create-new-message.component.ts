import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Channel } from 'src/models/channel.class';
import { User } from 'src/models/user.class';
import { ProfileUser } from '../models/user';
import { map, startWith } from 'rxjs/operators';
import { MessageDataService } from '../message-data-service/message-data.service';

@Component({
  selector: 'app-dialog-create-new-message',
  templateUrl: './dialog-create-new-message.component.html',
  styleUrls: ['./dialog-create-new-message.component.scss']
})

export class DialogCreateNewMessageComponent implements OnInit {

  channel: Channel = new Channel();
  user: User = new User();
  userId: string;
  channelId: string;
  userList: Array<any> = [];
  userIdList: Array<any> = [];
  allUserList: Array<any> = [];
  myControl2 = new FormControl<string | ProfileUser>('');
  options: ProfileUser[];
  filteredOptions: Observable<ProfileUser[]>;
  avatar: string = './assets/avatar.png';
  isUpdated: boolean = false;
  chatAlreadyExists = false;
  channelList: Array<any> = [];
  channelName: string = '';
  sending: boolean;
  checkList: Array<any>;
  idForExistingChat: string;

  constructor(
    public dialogRef: MatDialogRef<DialogCreateNewMessageComponent>,
    public dialog: MatDialog,
    private firestore: AngularFirestore,
    private messageService: MessageDataService,
    private router: Router) { }

  ngOnInit(): void {
    this.allUsers();
    this.pushOwnId();
    this.isUpdated = true;
  }

  onNoClick() {
    this.dialogRef.close();
  }

  pushNewChatToFireStore() {
    this.createChannelName();
    this.fillObject();
    this.firestore
      .collection('channel')
      .add(this.channel.toJson())
      .then((ref) => {
        let channelId = ref.id;
        this.channel.channelId = channelId;
        this.pushCustomIdToChannel(channelId);
      });
  }

  createNewChat() {
    this.sending = true;
    this.checkList = this.userIdList;
    this.chatAlreadyExists = false;
    this.firestore.collection('channel')
      .valueChanges({ idField: 'customId' })
      .subscribe((changes: any) => {
        this.channelList = changes;
        this.checkIfExists();
      });
  }

  checkIfExists() {
    if (this.sending) {
      this.channelList.forEach(channel => {
        let users = channel.users;
        users.sort((a, b) => (a < b) ? 1 : -1);
        this.checkList.sort((a, b) => (a < b) ? 1 : -1);
        if (JSON.stringify(users).length === JSON.stringify(this.checkList).length && channel.type == 'chat' && JSON.stringify(users) === JSON.stringify(this.checkList)) {
          this.chatAlreadyExists = true;
          this.idForExistingChat = channel.channelId;
        }
      });
      this.chatAlreadyExists ? this.navigateToExistingChat(this.idForExistingChat) : this.pushNewChatToFireStore();
      this.sending = false;
    }
  }

  navigateToExistingChat(idForExistingChat) {
    this.dialogRef.close();
    this.messageService.changeId(idForExistingChat);
    this.messageService.toggleThreadOff();
    this.router.navigate(['main/channel/' + idForExistingChat]);
  }

  pushOwnId() {
    this.userId = JSON.parse(localStorage.getItem('slackCloneUser'));
    this.userIdList.push(this.userId);
  }

  forAutoComplete() {//d2
    this.options = this.allUserList;
    this.filteredOptions = this.myControl2.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.displayName;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }

  displayFn(user: ProfileUser): string {//d2
    return user && user.displayName ? user.displayName : '';
  }

  private _filter(name: string): ProfileUser[] {//d2
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.displayName.toLowerCase().includes(filterValue));
  }

  allUsers() {
    this.firestore.
      collection('users')
      .valueChanges({ idField: 'customId' })
      .subscribe((changes: any) => {
        this.allUserList = changes;
        this.forAutoComplete();
        this.updateUserList();
      });
  }

  addUser() {
    this.isUpdated = false;
    this.userList = [];
    let alreadyInChannel = false;
    for (let i = 0; i < this.userIdList.length; i++) {
      if (this.userIdList[i] == this.myControl2.value['uid']) alreadyInChannel = true;
    }
    if (!alreadyInChannel) this.userIdList.push(this.myControl2.value['uid']);
    this.updateUserList();
    this.isUpdated = true;
    this.myControl2.reset();
  }

  updateUserList() {
    this.allUserList.forEach(ele => {
      this.userIdList.forEach(element => {
        if (ele.uid == element) this.userList.push(ele);
      });
    });
  }

  fillObject() {
    this.userIdList.forEach(element => {
      this.channel.users.push(element);
    });
    this.channel.channelName = this.channelName;
    this.channel.type = "chat";
  }

  pushCustomIdToChannel(channelId) {
    this.firestore
      .collection('channel')
      .doc(channelId)
      .update(this.channel.toJson())
      .then(() => {
        this.dialogRef.close();
        this.messageService.changeId(channelId);
        this.messageService.toggleThreadOff();
        this.router.navigate(['main/channel/' + channelId]);
      });
  }

  createChannelName() {
    let userNames = [];
    this.channelName = 'Gruppenchat zwischen: ';
    this.userIdList.forEach(user => {
      this.allUserList.forEach(allUser => {
        if (allUser.uid == user) userNames.push(allUser.displayName);
      });
    });
    for (let i = 0; i < userNames.length - 1; i++)  this.channelName += userNames[i] + ' und '
    this.channelName += userNames[userNames.length - 1] + '.';
    if (userNames.length == 1) this.channelName = userNames[0] + ', hier kannst du Notizen machen';
  }

}
