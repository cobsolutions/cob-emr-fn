import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CranialNerveComponent } from './cranial-nerve.component';

describe('CranialNerveComponent', () => {
  let component: CranialNerveComponent;
  let fixture: ComponentFixture<CranialNerveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CranialNerveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CranialNerveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
