import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespiratoryNComponent } from './respiratory-n.component';

describe('RespiratoryNComponent', () => {
  let component: RespiratoryNComponent;
  let fixture: ComponentFixture<RespiratoryNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RespiratoryNComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RespiratoryNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
