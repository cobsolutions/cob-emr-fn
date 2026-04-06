import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VuvpfunqueTestComponent } from './vuvpfunque-test.component';

describe('VuvpfunqueTestComponent', () => {
  let component: VuvpfunqueTestComponent;
  let fixture: ComponentFixture<VuvpfunqueTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VuvpfunqueTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VuvpfunqueTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
