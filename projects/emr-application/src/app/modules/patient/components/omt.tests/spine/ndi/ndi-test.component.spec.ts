import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NdiTestComponent } from './ndi-test.component';

describe('NdiTestComponent', () => {
  let component: NdiTestComponent;
  let fixture: ComponentFixture<NdiTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NdiTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NdiTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
