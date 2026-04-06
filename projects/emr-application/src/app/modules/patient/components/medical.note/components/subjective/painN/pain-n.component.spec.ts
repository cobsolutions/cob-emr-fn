import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainNComponent } from './pain-n.component';

describe('PainNComponent', () => {
  let component: PainNComponent;
  let fixture: ComponentFixture<PainNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PainNComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PainNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
