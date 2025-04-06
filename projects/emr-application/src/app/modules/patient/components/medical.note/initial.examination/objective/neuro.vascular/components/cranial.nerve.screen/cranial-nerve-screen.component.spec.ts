import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CranialNerveScreenComponent } from './cranial-nerve-screen.component';

describe('CranialNerveScreenComponent', () => {
  let component: CranialNerveScreenComponent;
  let fixture: ComponentFixture<CranialNerveScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CranialNerveScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CranialNerveScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
