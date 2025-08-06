import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CutomPalpationComponent } from './cutom-palpation.component';

describe('CutomPalpationComponent', () => {
  let component: CutomPalpationComponent;
  let fixture: ComponentFixture<CutomPalpationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CutomPalpationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CutomPalpationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
