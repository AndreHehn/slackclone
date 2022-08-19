import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-thread-anwser-card',
  templateUrl: './thread-anwser-card.component.html',
  styleUrls: ['./thread-anwser-card.component.scss']
})
export class ThreadAnwserCardComponent implements OnInit {

  @Input() anwser:any = '';
  @Input() creatorId: string = '';
  creator: any = {};


  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser() {
    this.firestore
      .collection('users')
      .doc(this.creatorId)
      .valueChanges()
      .subscribe((user) =>{
        this.creator = user;
       
      });
  }

}
