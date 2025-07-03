import { TestBed } from '@angular/core/testing';

import { MedialNoteService } from './medial-note.service';

describe('MedialNoteService', () => {
  let service: MedialNoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedialNoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
