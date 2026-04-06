import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfopinsexTestComponent } from './pfopinsex-test.component';

describe('PfopinsexTestComponent', () => {
  let component: PfopinsexTestComponent;
  let fixture: ComponentFixture<PfopinsexTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PfopinsexTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PfopinsexTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
