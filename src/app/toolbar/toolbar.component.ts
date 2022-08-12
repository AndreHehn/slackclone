import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { HotToastService } from '@ngneat/hot-toast';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  member = [];

  constructor(private authService: AuthService,
    private router: Router,
    private toast: HotToastService,
    private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe((user: any) =>{
        this.member = user;
        console.log(this.member);
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

}
