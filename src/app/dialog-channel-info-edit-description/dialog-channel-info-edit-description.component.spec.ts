import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogChannelInfoEditDescriptionComponent } from './dialog-channel-info-edit-description.component';

describe('DialogChannelInfoEditDescriptionComponent', () => {
  let component: DialogChannelInfoEditDescriptionComponent;
  let fixture: ComponentFixture<DialogChannelInfoEditDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogChannelInfoEditDescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogChannelInfoEditDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
