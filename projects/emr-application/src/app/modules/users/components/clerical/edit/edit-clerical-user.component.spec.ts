import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClericalUserComponent } from './edit-clerical-user.component';

describe('EditClericalUserComponent', () => {
  let component: EditClericalUserComponent;
  let fixture: ComponentFixture<EditClericalUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditClericalUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditClericalUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
