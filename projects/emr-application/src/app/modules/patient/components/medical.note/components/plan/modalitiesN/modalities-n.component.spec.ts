import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalitiesNComponent } from './modalities-n.component';

describe('ModalitiesNComponent', () => {
  let component: ModalitiesNComponent;
  let fixture: ComponentFixture<ModalitiesNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalitiesNComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalitiesNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
