import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinettiComponent } from './tinetti.component';

describe('TinettiComponent', () => {
  let component: TinettiComponent;
  let fixture: ComponentFixture<TinettiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TinettiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TinettiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
