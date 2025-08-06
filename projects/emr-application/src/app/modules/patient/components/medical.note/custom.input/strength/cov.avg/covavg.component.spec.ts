import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovavgComponent } from './covavg.component';

describe('CovavgComponent', () => {
  let component: CovavgComponent;
  let fixture: ComponentFixture<CovavgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovavgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CovavgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
