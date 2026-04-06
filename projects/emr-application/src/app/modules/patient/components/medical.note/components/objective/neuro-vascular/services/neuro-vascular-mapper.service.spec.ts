import { TestBed } from '@angular/core/testing';

import { NeuroVascularMapperService } from './neuro-vascular-mapper.service';

describe('NeuroVascularMapperService', () => {
  let service: NeuroVascularMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NeuroVascularMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
