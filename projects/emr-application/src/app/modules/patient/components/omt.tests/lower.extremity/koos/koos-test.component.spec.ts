import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KoosTestComponent } from './koos-test.component';

describe('KoosTestComponent', () => {
  let component: KoosTestComponent;
  let fixture: ComponentFixture<KoosTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KoosTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KoosTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
