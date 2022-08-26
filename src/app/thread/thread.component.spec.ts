import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';

import { ThreadComponent } from './thread.component';

describe('ThreadComponent', () => {
  let component: ThreadComponent;
  let fixture: ComponentFixture<ThreadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebase), AngularFireStorageModule, MatDialogModule,
        RouterTestingModule],
      declarations: [ ThreadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
