import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespiratoryComponent } from './respiratory.component';

describe('RespiratoryComponent', () => {
  let component: RespiratoryComponent;
  let fixture: ComponentFixture<RespiratoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RespiratoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RespiratoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
