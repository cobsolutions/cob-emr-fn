import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragableSeriesAppointmetModalComponent } from './dragable-series-appointmet-modal.component';

describe('DragableSeriesAppointmetModalComponent', () => {
  let component: DragableSeriesAppointmetModalComponent;
  let fixture: ComponentFixture<DragableSeriesAppointmetModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragableSeriesAppointmetModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragableSeriesAppointmetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
