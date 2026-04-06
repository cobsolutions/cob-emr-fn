import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectTimedCodeNComponent } from './direct-timed-code-n.component';

describe('DirectTimedCodeNComponent', () => {
  let component: DirectTimedCodeNComponent;
  let fixture: ComponentFixture<DirectTimedCodeNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectTimedCodeNComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectTimedCodeNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
