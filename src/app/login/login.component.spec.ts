import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthModule } from '@angular/fire/auth';
import { RouterModule } from '@angular/router';
import { AuthService } from '../service/auth.service';



import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
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

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
