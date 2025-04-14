import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GripComponent } from './grip.component';

describe('GripComponent', () => {
  let component: GripComponent;
  let fixture: ComponentFixture<GripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GripComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
