import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoapFieldBuilderComponent } from './soap-field-builder.component';

describe('SoapFieldBuilderComponent', () => {
  let component: SoapFieldBuilderComponent;
  let fixture: ComponentFixture<SoapFieldBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoapFieldBuilderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoapFieldBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
