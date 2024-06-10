import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReferringProviderComponent } from './create-referring-provider.component';

describe('CreateReferringProviderComponent', () => {
  let component: CreateReferringProviderComponent;
  let fixture: ComponentFixture<CreateReferringProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateReferringProviderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateReferringProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
