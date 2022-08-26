import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularFireModule } from '@angular/fire/compat';
import { DialogCreateNewChannelComponent } from './dialog-create-new-channel.component';
import { environment } from 'src/environments/environment';
import { RouterModule } from '@angular/router';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';


describe('DialogCreateNewChannelComponent', () => {
  let component: DialogCreateNewChannelComponent;
  let fixture: ComponentFixture<DialogCreateNewChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogCreateNewChannelComponent],
      imports: [
        MatDialogModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireStorageModule,
        RouterModule.forRoot([])
      ],
      providers: [{
        provide: MatDialogRef,
        useValue: {}
      }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DialogCreateNewChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
