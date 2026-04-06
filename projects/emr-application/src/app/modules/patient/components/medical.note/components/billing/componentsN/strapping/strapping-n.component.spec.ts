import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrappingNComponent } from './strapping-n.component';

describe('StrappingNComponent', () => {
  let component: StrappingNComponent;
  let fixture: ComponentFixture<StrappingNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrappingNComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrappingNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
