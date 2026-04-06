import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongrscTestComponent } from './congrsc-test.component';

describe('CongrscTestComponent', () => {
  let component: CongrscTestComponent;
  let fixture: ComponentFixture<CongrscTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongrscTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CongrscTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
