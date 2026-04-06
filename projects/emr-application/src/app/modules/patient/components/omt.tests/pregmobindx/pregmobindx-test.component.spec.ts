import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregmobindxTestComponent } from './pregmobindx-test.component';

describe('PregmobindxTestComponent', () => {
  let component: PregmobindxTestComponent;
  let fixture: ComponentFixture<PregmobindxTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregmobindxTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PregmobindxTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
