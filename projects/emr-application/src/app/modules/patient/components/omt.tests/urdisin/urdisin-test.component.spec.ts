import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrdisinTestComponent } from './urdisin-test.component';

describe('UrdisinTestComponent', () => {
  let component: UrdisinTestComponent;
  let fixture: ComponentFixture<UrdisinTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrdisinTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UrdisinTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
