import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdisquestiTestComponent } from './cdisquesti-test.component';

describe('CdisquestiTestComponent', () => {
  let component: CdisquestiTestComponent;
  let fixture: ComponentFixture<CdisquestiTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CdisquestiTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CdisquestiTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
