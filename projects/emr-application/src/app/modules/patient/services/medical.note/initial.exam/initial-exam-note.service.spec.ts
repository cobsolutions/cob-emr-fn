import { TestBed } from '@angular/core/testing';

import { InitialExamNoteService } from './initial-exam-note.service';

describe('InitialExamNoteService', () => {
  let service: InitialExamNoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InitialExamNoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
