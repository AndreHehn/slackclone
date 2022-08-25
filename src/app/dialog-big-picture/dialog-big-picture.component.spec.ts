import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { DialogBigPictureComponent } from './dialog-big-picture.component';

describe('DialogBigPictureComponent', () => {
  let component: DialogBigPictureComponent;
  let fixture: ComponentFixture<DialogBigPictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), MatDialogModule],
      declarations: [ DialogBigPictureComponent ],
      providers: [{
        provide: MatDialogRef,
        useValue: {}
      }]
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
function routes(routes: any): any {
  throw new Error('Function not implemented.');
}

