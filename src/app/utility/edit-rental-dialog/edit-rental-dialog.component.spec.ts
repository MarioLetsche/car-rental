import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRentalDialogComponent } from './edit-rental-dialog.component';

describe('EditRentalDialogComponent', () => {
  let component: EditRentalDialogComponent;
  let fixture: ComponentFixture<EditRentalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRentalDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRentalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
