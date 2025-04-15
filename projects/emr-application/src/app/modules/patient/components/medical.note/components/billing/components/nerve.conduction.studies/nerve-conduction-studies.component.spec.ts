import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NerveConductionStudiesComponent } from './nerve-conduction-studies.component';

describe('NerveConductionStudiesComponent', () => {
  let component: NerveConductionStudiesComponent;
  let fixture: ComponentFixture<NerveConductionStudiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NerveConductionStudiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NerveConductionStudiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
