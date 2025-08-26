import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaamTestComponent } from './faam-test.component';

describe('FaamTestComponent', () => {
  let component: FaamTestComponent;
  let fixture: ComponentFixture<FaamTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaamTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaamTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
