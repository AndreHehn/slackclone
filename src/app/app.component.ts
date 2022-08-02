import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'slackclone';
  connected = false;
  showSearch = false;

  constructor(private router: Router,
    public authService: AuthService) { }


 public ngOnInit() {
    this.connected = (this.authService.isLoggedIn) ? true : false;
  }

  logOut() {
    this.router.navigate(['/']);
    this.authService.SignOut();
  }


}
