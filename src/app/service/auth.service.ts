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
import { concatMap, from, Observable, of, switchMap } from 'rxjs';
import { LoginComponent } from "../login/login.component";

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  currentUser$ = authState(this.auth);

  constructor(private auth: Auth,
    private comp: LoginComponent) {}

  signUp(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  logout(): Observable<any> {
    return from(this.auth.signOut());
  }

  alert() {
    this.comp.alert();
    // alert('You are logged out');
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('slackCloneUser')!);
    return user !== null !== false ? true : false;
  }

}