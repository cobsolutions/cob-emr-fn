import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectiveOMTTestComponent } from './objective-omttest.component';

describe('ObjectiveOMTTestComponent', () => {
  let component: ObjectiveOMTTestComponent;
  let fixture: ComponentFixture<ObjectiveOMTTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectiveOMTTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjectiveOMTTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
