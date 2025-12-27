import { TestBed } from '@angular/core/testing';

import { SubjectiveMapperService } from './subjective-mapper.service';

describe('SubjectiveMapperService', () => {
  let service: SubjectiveMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectiveMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
