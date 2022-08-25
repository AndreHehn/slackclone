import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { LeftSideComponent } from './left-side.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('LeftSideComponent', () => {
  let component: LeftSideComponent;
  let fixture: ComponentFixture<LeftSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeftSideComponent],
      imports: [
        MatDialogModule,
        AngularFireModule.initializeApp(environment.firebase),
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(LeftSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
