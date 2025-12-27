import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastsNComponent } from './casts-n.component';

describe('CastsNComponent', () => {
  let component: CastsNComponent;
  let fixture: ComponentFixture<CastsNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CastsNComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CastsNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
