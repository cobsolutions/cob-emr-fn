import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MTopRightLeftControlsComponent } from './m-top-right-left-controls.component';

describe('MTopRightLeftControlsComponent', () => {
  let component: MTopRightLeftControlsComponent;
  let fixture: ComponentFixture<MTopRightLeftControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MTopRightLeftControlsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MTopRightLeftControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
