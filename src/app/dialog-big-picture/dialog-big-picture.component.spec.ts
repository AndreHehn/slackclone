import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBigPictureComponent } from './dialog-big-picture.component';

describe('DialogBigPictureComponent', () => {
  let component: DialogBigPictureComponent;
  let fixture: ComponentFixture<DialogBigPictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBigPictureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogBigPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
