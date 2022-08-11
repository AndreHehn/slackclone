import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { HotToastService } from '@ngneat/hot-toast';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router,
    private toast: HotToastService) { }

  ngOnInit(): void {
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
