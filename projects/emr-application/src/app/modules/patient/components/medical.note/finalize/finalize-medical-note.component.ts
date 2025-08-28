import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  constructor(private medialNoteService: MedialNoteService
    , private loggedInService: LoggedInService) { }
  ngOnInit(): void {
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
    this.medialNoteService.pingSaveData(true)
    this.medialNoteService.finalizea(request).subscribe(v => {
      this.changeVisibility.emit('yes')
    })
  }

}
