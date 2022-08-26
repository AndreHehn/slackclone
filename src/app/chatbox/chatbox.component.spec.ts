import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';

import { ChatboxComponent } from './chatbox.component';

describe('ChatboxComponent', () => {
  let component: ChatboxComponent;
  let fixture: ComponentFixture<ChatboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase), 
        AngularFireStorageModule, 
        RouterModule, 
        RouterTestingModule,
      ],
      declarations: [ChatboxComponent],
      providers:
      [
        {
          provide: Router,
          useValue: {
            snapshot: {params: {id: '24fkzrw3487943uf358lovd'}}
          },
        
        },
        {
          provide: Router,
          useValue: {
            snapshot: {root: {id: '24fkzrw3487943uf358lovd'}}
          },
        },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ChatboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
