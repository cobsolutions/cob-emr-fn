import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TissueTensionUpperComponent } from './tissue-tension-upper.component';

describe('TissueTensionUpperComponent', () => {
  let component: TissueTensionUpperComponent;
  let fixture: ComponentFixture<TissueTensionUpperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TissueTensionUpperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TissueTensionUpperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
