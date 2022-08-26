import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DialogCreateNewMessageComponent } from './dialog-create-new-message.component';

describe('DialogCreateNewMessageComponent', () => {
  let component: DialogCreateNewMessageComponent;
  let fixture: ComponentFixture<DialogCreateNewMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogCreateNewMessageComponent, MatAutocomplete],
      imports: [
        MatDialogModule,
        AngularFireModule.initializeApp(environment.firebase),
        RouterModule.forRoot([]),

      ],
      providers: [{
        provide: MatDialogRef,
        useValue: {}
      }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DialogCreateNewMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
