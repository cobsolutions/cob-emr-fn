import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RomTestComponent } from './rom-test.component';

describe('RomTestComponent', () => {
  let component: RomTestComponent;
  let fixture: ComponentFixture<RomTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RomTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RomTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
