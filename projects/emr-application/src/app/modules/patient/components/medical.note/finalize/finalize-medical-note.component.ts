import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { filter } from 'rxjs';

import { LoggedInService } from '../../../../security/service/loggedIn/logged-in.service';
import { FinalizeMedicalNoteRequest } from '../../../models/medical.note/finalize.medical.note.request';
import { MedicalNoteRequest } from '../../../models/medical.note/medical.note.request';
import { MedicalNoteType } from '../../../models/medical.note/medical.note.type';
import { DailyNoteService } from '../../../services/medical.note/daily.note/daily-note.service';
import { DischargeNoteService } from '../../../services/medical.note/discharge.note/discharge-note.service';
import { InitialExamNoteService } from '../../../services/medical.note/initial.exam/initial-exam-note.service';
import { MedialNoteService } from '../../../services/medical.note/medial-note.service';
import { ProgressNoteService } from '../../../services/medical.note/progress.note/progress-note.service';
import { QuickDischargeNoteService } from '../../../services/medical.note/quick.discharge/quick-discharge-note.service';

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
  errorMessage: string = undefined
  constructor(private medialNoteService: MedialNoteService
    , private loggedInService: LoggedInService
    , private initialExamNoteService: InitialExamNoteService
    , private quickDischargeNoteService: QuickDischargeNoteService
    , private dischargeNoteService: DischargeNoteService
    , private dailyNoteService: DailyNoteService
    , private progressNoteService: ProgressNoteService) { }
  ngOnInit(): void {
  }
  onNo() {
    this.changeVisibility.emit('no')
    this.medialNoteService.notifyFinalize(false);
  }
  onYes() {
    this.finalizeMessageFlag = true
    const loggedUser = this.loggedInService.getLoggedUser();

    if (this.noteType === MedicalNoteType.Quick_Discharge_Note) {
      this.medicalNoteRequest.finalizedBy = {
        ...loggedUser.providerInfo,
        uuid: loggedUser.uuid,
        providerName: `${loggedUser.lastName}, ${loggedUser.firstName}`
      };
      this.quickDischargeNoteService.finalize(this.medicalNoteRequest, this.noteId).subscribe({
        next: (data) => {
          this.medialNoteService.notifyFinalize(true);
          this.changeVisibility.emit('yes')
        },
        error: (err) => {
          this.finalizeMessageFlag = false
          this.errorMessage = err.error?.message || 'Failed to finalize the note. Please try again.';
        }
      });
    } else if (this.noteType === MedicalNoteType.Discharge_Note) {
      this.medicalNoteRequest.finalizedBy = {
        ...loggedUser.providerInfo,
        uuid: loggedUser.uuid,
        providerName: `${loggedUser.lastName}, ${loggedUser.firstName}`
      };
      this.dischargeNoteService.finalize(this.medicalNoteRequest, this.noteId).subscribe({
        next: (data) => {
          this.medialNoteService.notifyFinalize(true);
          this.changeVisibility.emit('yes')
        },
        error: (err) => {
          this.finalizeMessageFlag = false
          this.errorMessage = err.error?.message || 'Failed to finalize the note. Please try again.';
        }
      });
    } else if (this.noteType === MedicalNoteType.Daily_Note) {
      this.medicalNoteRequest.finalizedBy = {
        ...loggedUser.providerInfo,
        uuid: loggedUser.uuid,
        providerName: `${loggedUser.lastName}, ${loggedUser.firstName}`
      };
      this.dailyNoteService.finalize(this.medicalNoteRequest, this.noteId).subscribe({
        next: (data) => {
          this.medialNoteService.notifyFinalize(true);
          this.changeVisibility.emit('yes')
        },
        error: (err) => {
          this.finalizeMessageFlag = false
          this.errorMessage = err.error?.message || 'Failed to finalize the note. Please try again.';
        }
      });
    } else if (this.noteType === MedicalNoteType.Progress_Note) {
      this.medicalNoteRequest.finalizedBy = {
        ...loggedUser.providerInfo,
        uuid: loggedUser.uuid,
        providerName: `${loggedUser.lastName}, ${loggedUser.firstName}`
      };
      this.progressNoteService.finalize(this.medicalNoteRequest, this.noteId).subscribe({
        next: (data) => {
          this.medialNoteService.notifyFinalize(true);
          this.changeVisibility.emit('yes')
        },
        error: (err) => {
          this.finalizeMessageFlag = false
          this.errorMessage = err.error?.message || 'Failed to finalize the note. Please try again.';
        }
      });
    } else if (this.noteType === MedicalNoteType.Initial_Examination) {
      this.medicalNoteRequest.finalizedBy = {
        ...loggedUser.providerInfo,
        uuid: loggedUser.uuid,
        providerName: `${loggedUser.lastName}, ${loggedUser.firstName}`
      };
      this.initialExamNoteService.finalize(this.medicalNoteRequest, this.noteId).subscribe({
        next: (data) => {
          this.medialNoteService.notifyFinalize(true);
          this.changeVisibility.emit('yes')
        },
        error: (err) => {
          this.finalizeMessageFlag = false
          this.errorMessage = err.error?.message || 'Failed to finalize the note. Please try again.';
        }
      });
    }
  }

}
