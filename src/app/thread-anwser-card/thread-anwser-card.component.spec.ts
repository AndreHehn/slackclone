import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { MatDialogModule } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

import { ThreadAnwserCardComponent } from './thread-anwser-card.component';

describe('ThreadAnwserCardComponent', () => {
  let component: ThreadAnwserCardComponent;
  let fixture: ComponentFixture<ThreadAnwserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreadAnwserCardComponent ],
      imports: [AngularFireModule.initializeApp(environment.firebase), MatDialogModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreadAnwserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
