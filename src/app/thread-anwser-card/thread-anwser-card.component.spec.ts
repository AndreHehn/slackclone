import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadAnwserCardComponent } from './thread-anwser-card.component';

describe('ThreadAnwserCardComponent', () => {
  let component: ThreadAnwserCardComponent;
  let fixture: ComponentFixture<ThreadAnwserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreadAnwserCardComponent ]
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
