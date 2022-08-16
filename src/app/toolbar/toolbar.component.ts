import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { HotToastService } from '@ngneat/hot-toast';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'src/models/user.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})

export class ToolbarComponent implements OnInit {

  member: Array<any>;
  pictureUrl: string;
  user: User = new User;

  constructor(private authService: AuthService,
    private router: Router,
    private toast: HotToastService,
    private firestore: AngularFirestore,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe((user: any) => {
        this.member = user;
        this.filterForCurrentUser();
        // console.log(this.member);
      });
  }

  logout() {
    localStorage.clear();
    this.authService.logout()
      .pipe(
        this.toast.observe({
          success: 'Logged out!',
          loading: 'Logging out...',
          error: ({ message }) => `There was an error: ${message} `
        })
      ).subscribe(() => {
        this.router.navigate(['/']);
      });
  }

  filterForCurrentUser() {
    let currentUser = JSON.parse(localStorage.getItem('slackCloneUser'));
    this.member.forEach(user => {
      if (user.uid == currentUser) this.user = user;
      this.pictureUrl = this.user.photoURL;
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogEditUserComponent);
  }

}
