import { TestBed } from '@angular/core/testing';

import { FieldDependentsService } from './field-dependents.service';

describe('FieldDependentsService', () => {
  let service: FieldDependentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldDependentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
