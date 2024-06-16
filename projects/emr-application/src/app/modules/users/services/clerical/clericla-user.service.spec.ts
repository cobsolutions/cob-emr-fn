import { TestBed } from '@angular/core/testing';

import { ClericlaUserService } from './clericla-user.service';

describe('ClericlaUserService', () => {
  let service: ClericlaUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClericlaUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
