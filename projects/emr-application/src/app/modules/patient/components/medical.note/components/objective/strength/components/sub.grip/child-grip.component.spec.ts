import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildGripComponent } from './child-grip.component';

describe('ChildGripComponent', () => {
  let component: ChildGripComponent;
  let fixture: ComponentFixture<ChildGripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildGripComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildGripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
