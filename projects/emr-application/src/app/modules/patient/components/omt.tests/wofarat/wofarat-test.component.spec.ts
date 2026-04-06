import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WofaratTestComponent } from './wofarat-test.component';

describe('WofaratTestComponent', () => {
  let component: WofaratTestComponent;
  let fixture: ComponentFixture<WofaratTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WofaratTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WofaratTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
