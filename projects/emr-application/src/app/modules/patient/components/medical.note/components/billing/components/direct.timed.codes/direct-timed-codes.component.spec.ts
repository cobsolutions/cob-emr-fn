import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectTimedCodesComponent } from './direct-timed-codes.component';

describe('DirectTimedCodesComponent', () => {
  let component: DirectTimedCodesComponent;
  let fixture: ComponentFixture<DirectTimedCodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectTimedCodesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectTimedCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
