import { ComponentFixture, TestBed } from '@angular/core/testing';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { Firestore, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../service/auth.service';


import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthModule,
        RouterModule.forRoot([]),
        AngularFireModule.initializeApp(environment.firebase),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
      ],

      providers:
        [
          AuthService,
          {
            provide: AuthService,
            useValue: {
              email: 'newguestuser@slackclone.de',
              password: 'passwort'
            },
          },
        ]

    })
      .compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
