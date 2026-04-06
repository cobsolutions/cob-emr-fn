import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceduresNComponent } from './procedures-n.component';

describe('ProceduresNComponent', () => {
  let component: ProceduresNComponent;
  let fixture: ComponentFixture<ProceduresNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProceduresNComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProceduresNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
