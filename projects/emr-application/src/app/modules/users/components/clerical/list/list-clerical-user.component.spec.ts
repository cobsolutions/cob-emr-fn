import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClericalUserComponent } from './list-clerical-user.component';

describe('ListClericalUserComponent', () => {
  let component: ListClericalUserComponent;
  let fixture: ComponentFixture<ListClericalUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListClericalUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListClericalUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
