import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateNewMessageComponent } from './dialog-create-new-message.component';

describe('DialogCreateNewMessageComponent', () => {
  let component: DialogCreateNewMessageComponent;
  let fixture: ComponentFixture<DialogCreateNewMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCreateNewMessageComponent ]
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
