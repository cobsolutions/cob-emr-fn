import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForwardModalComponent } from './forward-modal.component';

describe('ForwardModalComponent', () => {
  let component: ForwardModalComponent;
  let fixture: ComponentFixture<ForwardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForwardModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForwardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
