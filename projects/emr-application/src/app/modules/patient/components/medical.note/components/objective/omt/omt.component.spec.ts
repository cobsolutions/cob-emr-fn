import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmtComponent } from './omt.component';

describe('OmtComponent', () => {
  let component: OmtComponent;
  let fixture: ComponentFixture<OmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OmtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
