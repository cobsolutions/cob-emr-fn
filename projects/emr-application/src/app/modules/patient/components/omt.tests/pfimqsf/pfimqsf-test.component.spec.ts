import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfimqsfTestComponent } from './pfimqsf-test.component';

describe('PfimqsfTestComponent', () => {
  let component: PfimqsfTestComponent;
  let fixture: ComponentFixture<PfimqsfTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PfimqsfTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PfimqsfTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
