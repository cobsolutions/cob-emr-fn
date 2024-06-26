import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EssentialInformationComponent } from './essential-information.component';

describe('EssentialInformationComponent', () => {
  let component: EssentialInformationComponent;
  let fixture: ComponentFixture<EssentialInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EssentialInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EssentialInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
