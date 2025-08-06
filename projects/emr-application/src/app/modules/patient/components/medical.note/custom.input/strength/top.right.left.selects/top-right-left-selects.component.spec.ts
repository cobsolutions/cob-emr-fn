import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRightLeftSelectsComponent } from './top-right-left-selects.component';

describe('TopRightLeftSelectsComponent', () => {
  let component: TopRightLeftSelectsComponent;
  let fixture: ComponentFixture<TopRightLeftSelectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopRightLeftSelectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopRightLeftSelectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
