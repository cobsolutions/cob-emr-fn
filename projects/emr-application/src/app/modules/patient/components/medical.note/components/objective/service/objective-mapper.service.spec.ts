import { TestBed } from '@angular/core/testing';

import { ObjectiveMapperService } from './objective-mapper.service';

describe('ObjectiveMapperService', () => {
  let service: ObjectiveMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectiveMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
