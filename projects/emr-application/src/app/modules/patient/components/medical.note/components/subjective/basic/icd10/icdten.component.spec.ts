import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcdtenComponent } from './icdten.component';

describe('IcdtenComponent', () => {
  let component: IcdtenComponent;
  let fixture: ComponentFixture<IcdtenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IcdtenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IcdtenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
