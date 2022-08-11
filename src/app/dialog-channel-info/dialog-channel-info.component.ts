import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
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

  channel;
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


  constructor(private firestore: AngularFirestore, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      // this.channelId = paramMap.get('id');
      this.channelId = 'gVrGhcP2czZwOffHzfNq';
      this.allUsers();
    });
  }


  displayFn(user: ProfileUser): string {
    return user && user.displayName ? user.displayName : '';
  }


  private _filter(name: string): ProfileUser[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.displayName.toLowerCase().includes(filterValue));
  }


  deleteUser() { // userId aus channel.users löschen

  }

  addUser() {
    console.log(this.myControl.value);// muss noch gemacht werden.
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

}
