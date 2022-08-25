import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { MessageCardComponent } from './message-card.component';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';

describe('MessageCardComponent', () => {
  let component: MessageCardComponent;
  let fixture: ComponentFixture<MessageCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageCardComponent ],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        RouterModule.forRoot([]),
        MatDialogModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
