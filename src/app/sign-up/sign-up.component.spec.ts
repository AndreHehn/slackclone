import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthModule } from '@angular/fire/auth';
import { RouterModule } from '@angular/router';
import { AuthService } from '../service/auth.service';


import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthModule,
        RouterModule.forRoot([])],
        providers: [AuthService,
          {
            provide: AuthService,
            useValue: {
              email: 'guestuser@slackclone.de',
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
