import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClericalUserComponent } from './create-clerical-user.component';

describe('CreateClericalUserComponent', () => {
  let component: CreateClericalUserComponent;
  let fixture: ComponentFixture<CreateClericalUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateClericalUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateClericalUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
