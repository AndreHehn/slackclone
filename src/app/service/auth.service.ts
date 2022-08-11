import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  authState,
  createUserWithEmailAndPassword,
  updateProfile,
  UserInfo,
  UserCredential,
} from '@angular/fire/auth';
import { HotToastService } from '@ngneat/hot-toast';
import { concatMap, from, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  currentUser$ = authState(this.auth);

  constructor(private auth: Auth,
    private toast: HotToastService) {}

  signUp(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  logout(): Observable<any> {
    this.toast.observe({
      success: 'Logged out',
      loading: 'Logging in...',
      error: ({ message }) => `There was an error: ${message} `
    })
    return from(this.auth.signOut());
  }



  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('slackCloneUser')!);
    return user !== null !== false ? true : false;
  }

}