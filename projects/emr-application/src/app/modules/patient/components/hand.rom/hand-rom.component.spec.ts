import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandROMComponent } from './hand-rom.component';

describe('HandROMComponent', () => {
  let component: HandROMComponent;
  let fixture: ComponentFixture<HandROMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandROMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HandROMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
