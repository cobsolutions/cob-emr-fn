import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NerveConductionStudiesNComponent } from './nerve-conduction-studies-n.component';

describe('NerveConductionStudiesNComponent', () => {
  let component: NerveConductionStudiesNComponent;
  let fixture: ComponentFixture<NerveConductionStudiesNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NerveConductionStudiesNComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NerveConductionStudiesNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
