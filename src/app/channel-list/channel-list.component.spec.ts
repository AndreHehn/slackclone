import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { MatDialogModule } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { RouterModule } from '@angular/router';
import { ChannelListComponent } from './channel-list.component';
import { LeftSideComponent } from '../left-side/left-side.component';


describe('ChannelListComponent', () => {
  let component: ChannelListComponent;
  let fixture: ComponentFixture<ChannelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireStorageModule,
        MatDialogModule,
        RouterModule.forRoot([]),
      ],
      declarations: [ChannelListComponent],
      providers: [LeftSideComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ChannelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
