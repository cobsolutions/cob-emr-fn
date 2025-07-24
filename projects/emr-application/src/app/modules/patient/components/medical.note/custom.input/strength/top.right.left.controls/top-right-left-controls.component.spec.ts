import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRightLeftControlsComponent } from './top-right-left-controls.component';

describe('TopRightLeftControlsComponent', () => {
  let component: TopRightLeftControlsComponent;
  let fixture: ComponentFixture<TopRightLeftControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopRightLeftControlsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopRightLeftControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
