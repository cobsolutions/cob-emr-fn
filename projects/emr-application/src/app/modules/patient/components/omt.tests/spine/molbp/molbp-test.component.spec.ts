import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MolbpTestComponent } from './molbp-test.component';

describe('MolbpTestComponent', () => {
  let component: MolbpTestComponent;
  let fixture: ComponentFixture<MolbpTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MolbpTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MolbpTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
