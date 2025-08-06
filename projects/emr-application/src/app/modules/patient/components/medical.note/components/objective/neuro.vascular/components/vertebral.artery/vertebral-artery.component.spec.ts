import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VertebralArteryComponent } from './vertebral-artery.component';

describe('VertebralArteryComponent', () => {
  let component: VertebralArteryComponent;
  let fixture: ComponentFixture<VertebralArteryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VertebralArteryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VertebralArteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
