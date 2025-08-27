import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOMTTestComponent } from './show-omttest.component';

describe('ShowOMTTestComponent', () => {
  let component: ShowOMTTestComponent;
  let fixture: ComponentFixture<ShowOMTTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowOMTTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowOMTTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
