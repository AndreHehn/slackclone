import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UsersService } from '../service/user.service';

@Component({
  selector: 'app-dialog-add-members',
  templateUrl: './dialog-add-members.component.html',
  styleUrls: ['./dialog-add-members.component.scss']
})
export class DialogAddMembersComponent implements OnInit {

  checks: any;


  constructor(private firestore: AngularFirestore,
    public comp: UsersService) { }

  ngOnInit(): void {
    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe((changes: any) =>{
        this.comp.allMembers = changes;
        console.log(changes);
      });
  }

  addPersonalUser() {

  }

 

}
