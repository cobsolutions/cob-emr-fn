import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReferringProviderComponent } from './list-referring-provider.component';

describe('ListReferringProviderComponent', () => {
  let component: ListReferringProviderComponent;
  let fixture: ComponentFixture<ListReferringProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListReferringProviderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListReferringProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
