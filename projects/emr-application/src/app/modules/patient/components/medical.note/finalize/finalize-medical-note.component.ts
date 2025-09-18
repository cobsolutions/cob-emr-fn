import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { filter } from 'rxjs';

import { LoggedInService } from '../../../../security/service/loggedIn/logged-in.service';
import { FinalizeMedicalNoteRequest } from '../../../models/medical.note/finalize.medical.note.request';
import { MedicalNoteType } from '../../../models/medical.note/medical.note.type';
import { MedialNoteService } from '../../../services/medical.note/medial-note.service';

@Component({
  selector: 'finalize-medical-note',
  templateUrl: './finalize-medical-note.component.html',
  styleUrls: ['./finalize-medical-note.component.css']
})
export class FinalizeMedicalNoteComponent implements OnInit {
  @Input() patientCaseId: number;
  @Input() medicalNoteId: number;
  @Input() noteType: MedicalNoteType
  @Output() changeVisibility = new EventEmitter<string>()
  finalizeMessage: string = 'The medical note is being finalized. Please be patient.';
  finalizeMessageFlag: boolean = false
  constructor(private medialNoteService: MedialNoteService
    , private loggedInService: LoggedInService) { }
  ngOnInit(): void {
    this.medialNoteService.closeFinalize.pipe(
      filter(sing => sing !== null)
    ).subscribe(sing => {
      if (sing)
        this.changeVisibility.emit('yes')
    })
  }
  onNo() {
    this.changeVisibility.emit('no')
  }
  onYes() {
    var request: FinalizeMedicalNoteRequest = {
      caseId: this.patientCaseId,
      id: this.medicalNoteId,
      noteType: this.noteType,
      finalizedBy: this.loggedInService.getLoggedUser().uuid
    }
    this.medialNoteService.pingSaveData(request)
    this.finalizeMessageFlag = true
  }

}
