import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { filter } from 'rxjs';

import { LoggedInService } from '../../../../security/service/loggedIn/logged-in.service';
import { FinalizeMedicalNoteRequest } from '../../../models/medical.note/finalize.medical.note.request';
import { MedicalNoteRequest } from '../../../models/medical.note/medical.note.request';
import { MedicalNoteType } from '../../../models/medical.note/medical.note.type';
import { InitialExamNoteService } from '../../../services/medical.note/initial.exam/initial-exam-note.service';
import { MedialNoteService } from '../../../services/medical.note/medial-note.service';

@Component({
  selector: 'finalize-medical-note',
  templateUrl: './finalize-medical-note.component.html',
  styleUrls: ['./finalize-medical-note.component.css']
})
export class FinalizeMedicalNoteComponent implements OnInit {
  @Input() patientCaseId: string;
  @Input() medicalNoteId: number;
  @Input() noteType: MedicalNoteType
  @Input() medicalNoteRequest: MedicalNoteRequest;
  @Input() noteId: string;
  @Output() changeVisibility = new EventEmitter<string>()
  finalizeMessage: string = 'The medical note is being finalized. Please be patient.';
  finalizeMessageFlag: boolean = false
  constructor(private medialNoteService: MedialNoteService
    , private loggedInService: LoggedInService
    , private initialExamNoteService: InitialExamNoteService) { }
  ngOnInit(): void {
  }
  onNo() {
    this.changeVisibility.emit('no')
    this.medialNoteService.notifyFinalize(false);
  }
  onYes() {
    this.finalizeMessageFlag = true
    const loggedUser = this.loggedInService.getLoggedUser();
    this.medicalNoteRequest.finalizedBy = {
      ...loggedUser.providerInfo,
      uuid: loggedUser.uuid
    };
    this.initialExamNoteService.finalize(this.medicalNoteRequest, this.noteId).subscribe({
      next: (data) => {
        this.medialNoteService.notifyFinalize(true);
        this.changeVisibility.emit('yes')
      },
      error: (error) => {
        this.finalizeMessageFlag = false
        console.error('Finalize failed:', error);
      }
    });
  }

}
