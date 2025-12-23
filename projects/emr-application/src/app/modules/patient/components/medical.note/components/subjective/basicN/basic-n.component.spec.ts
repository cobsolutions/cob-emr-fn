import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicNComponent } from './basic-n.component';

describe('BasicNComponent', () => {
  let component: BasicNComponent;
  let fixture: ComponentFixture<BasicNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicNComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
