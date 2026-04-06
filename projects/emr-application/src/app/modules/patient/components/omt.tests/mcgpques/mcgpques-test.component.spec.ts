import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McgpquesTestComponent } from './mcgpques-test.component';

describe('McgpquesTestComponent', () => {
  let component: McgpquesTestComponent;
  let fixture: ComponentFixture<McgpquesTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ McgpquesTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(McgpquesTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
