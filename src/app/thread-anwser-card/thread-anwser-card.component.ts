import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-thread-anwser-card',
  templateUrl: './thread-anwser-card.component.html',
  styleUrls: ['./thread-anwser-card.component.scss']
})
export class ThreadAnwserCardComponent implements OnInit {

  @Input() anwser:any = '';
  @Input() threadData: any;
  @Input() creatorId: string = '';
  creator: any = {};


  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    // let threadDataToJson = JSON.parse(this.threadData);
    // this.creator = threadDataToJson['creatorId'];
    // this.getUser()
    // console.log(this.anwser, 'HERRRRRE')
  }

  getUser() {
    // this.firestore
    //   .collection('users')
    //   .doc(this.creator)
    //   .valueChanges()
    //   .subscribe((user) =>{
    //     this.creator = user;
    //     console.log(this.creator)
    //   });
  }

}
