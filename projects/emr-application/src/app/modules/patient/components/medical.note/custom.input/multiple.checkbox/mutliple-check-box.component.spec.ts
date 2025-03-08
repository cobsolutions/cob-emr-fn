import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutlipleCheckBoxComponent } from './mutliple-check-box.component';

describe('MutlipleCheckBoxComponent', () => {
  let component: MutlipleCheckBoxComponent;
  let fixture: ComponentFixture<MutlipleCheckBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MutlipleCheckBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MutlipleCheckBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
