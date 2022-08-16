import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/service/auth.service';
import { getAuth, onAuthStateChanged } from "firebase/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

@Injectable({
  providedIn: 'any',
})

export class LoginComponent implements OnInit {
  auth = getAuth();
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private authService: AuthService,
    private toast: HotToastService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn) this.router.navigate(['main']);
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  submit() {
    if (!this.loginForm.valid) return;
    const { email, password } = this.loginForm.value;
    this.logIn(email, password);
  }

  logInAsGuest() {
    this.logIn('guestuser@slackclone.de', 'password');
  }

  logIn(email: string, password: string) {
    this.authService.login(email, password).pipe(
      this.toast.observe({
        success: 'Logged in successfully',
        loading: 'Logging in...',
        error: ({ message }) => `There was an error: ${message} `
      })
    ).subscribe(() => {
      this.pushUidToLocalStorage();
      this.router.navigate(['main']);
    });
  }

  pushUidToLocalStorage() {

    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        localStorage.setItem('slackCloneUser', JSON.stringify(user.uid));
        JSON.parse(localStorage.getItem('slackCloneUser')!);
      }
      else {
        localStorage.setItem('slackCloneUser', 'null');
        JSON.parse(localStorage.getItem('slackCloneUser')!);
      }
    });
  }
  
}
