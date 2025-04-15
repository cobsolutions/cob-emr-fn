import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentFunvtionlimitComponent } from './current-funvtionlimit.component';

describe('CurrentFunvtionlimitComponent', () => {
  let component: CurrentFunvtionlimitComponent;
  let fixture: ComponentFixture<CurrentFunvtionlimitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentFunvtionlimitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentFunvtionlimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
