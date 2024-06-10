import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppobntmentModalComponent } from './add-appobntment-modal.component';

describe('AddAppobntmentModalComponent', () => {
  let component: AddAppobntmentModalComponent;
  let fixture: ComponentFixture<AddAppobntmentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAppobntmentModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAppobntmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
