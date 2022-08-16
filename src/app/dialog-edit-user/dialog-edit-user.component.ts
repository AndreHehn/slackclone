import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})

export class DialogEditUserComponent implements OnInit {

  profileImagePath: string;
  uploaded = true;
  user: User = new User();
  date: Date = new Date();
  pictureUrl: string;
  uploadPercent: Observable<number>;
  currentFile: any;
  userId: string = '';
  displayName: string;
  allUserList: Array<any>;

  constructor(
    public dialogRef: MatDialogRef<DialogEditUserComponent>,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('slackCloneUser'));
    this.allUsers();
  }

  deleteLastUpload() {
    if (this.currentFile) {
      const storageRef = this.currentFile;
      storageRef.delete();
    }
  }

  uploadPicture(event) {
    this.uploaded = false;
    const file = event.target.files[0];
    const filePath = 'user_pic' + Math.floor(Math.random() * 1000000000);
    const fileRef = this.storage.ref(filePath);
    this.currentFile = fileRef;
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => { this.pictureUrl = url; this.profileImagePath = url; }); // saves url of image to a variable
      })
    ).subscribe();
    this.uploaded = true;
  }

  saveEntry() {
    if (this.pictureUrl) this.user.photoURL = this.pictureUrl;
    if (this.displayName) this.user.displayName = this.displayName;
    this.firestore
      .collection('users')
      .doc(this.userId)
      .update(this.user)
      .then(() => {
        this.dialogRef.close();
      });
  }

  allUsers() {
    this.firestore.
      collection('users')
      .valueChanges({ idField: 'uid' })
      .subscribe((changes: any) => {
        this.allUserList = changes;
        this.allUserList.forEach(user => {
          if (user.uid == this.userId) this.user = user;
        })
        this.profileImagePath = this.user.photoURL;
        this.displayName = this.user.displayName;
      });
  }
  
}


