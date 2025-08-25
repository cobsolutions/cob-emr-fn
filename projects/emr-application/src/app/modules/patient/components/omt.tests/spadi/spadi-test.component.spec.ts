import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpadiTestComponent } from './spadi-test.component';

describe('SpadiTestComponent', () => {
  let component: SpadiTestComponent;
  let fixture: ComponentFixture<SpadiTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpadiTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpadiTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
