import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'projects/emr-application/src/app/modules/administration/model/user/user';
import { DotorUserService } from 'projects/emr-application/src/app/modules/administration/services/user/doctor.user/dotor-user.service';
import { LoggedInService } from 'projects/emr-application/src/app/modules/security/service/loggedIn/logged-in.service';
import { filter, switchMap } from 'rxjs';
import { MedialNoteService } from '../../../../services/medical.note/medial-note.service';
import { MedicalNoteType } from '../../../../models/medical.note/medical.note.type';
import { InitialExamNoteService } from '../../../../services/medical.note/initial.exam/initial-exam-note.service';

@Component({
  selector: 'forward-modal',
  templateUrl: './forward-modal.component.html',
  styleUrls: ['./forward-modal.component.css']
})
export class ForwardModalComponent implements OnInit {

  clinicalUsers: User[]
  selectedUserUuid: string;
  errorMessage: string = undefined
  @Output() changeVisibility = new EventEmitter<string>()
  @Output() backToRecords = new EventEmitter<void>()
  @Input() noteId: string
  @Input() noteType: MedicalNoteType
  @Input() caseId: string
  clinicId: number;
  constructor(private loggedInService: LoggedInService
    , private dotorUserService: DotorUserService
    , private medialNoteService: MedialNoteService
    , private initialExamNoteService: InitialExamNoteService) { }

  ngOnInit(): void {
    this.loggedInService.selectedClinic$.pipe(
      filter(clinicId => clinicId !== null),
      switchMap(clinicId => {
        this.clinicId = clinicId;
        const logged: string = this.loggedInService.getLoggedUser().uuid;
        return this.dotorUserService.findAuthProviderToFinalize(clinicId, logged)
      })
    ).subscribe((users: any) => {
      this.clinicalUsers = users
      if (this.clinicalUsers.length > 0) {
        this.selectedUserUuid = this.clinicalUsers[0].uuid
        this.errorMessage = undefined
      } else {
        this.errorMessage = "Sorry There is no available provider to forward."
      }
    })
  }
  forward() {
    if (this.noteType === MedicalNoteType.Initial_Examination) {
      const loggedUser = this.loggedInService.getLoggedUser();
      const selectedUser = this.clinicalUsers.find(user => user.uuid === this.selectedUserUuid);
      const request = {
        patientCaseId: this.caseId,
        forwardedBy: {
          providerName: loggedUser.providerInfo?.providerName,
          npi: loggedUser.providerInfo?.npi,
          credential: loggedUser.providerInfo?.credential,
          license: loggedUser.providerInfo?.license,
          speciality: loggedUser.providerInfo?.speciality
        },
        forwardedTo: {
          providerName: selectedUser?.lastName + ', ' + selectedUser?.firstName,
          npi: selectedUser?.npi,
          credential: selectedUser?.credential,
          license: selectedUser?.licence,
          speciality: selectedUser?.speciality
        }
      };
      this.initialExamNoteService.forward(this.noteId, request).subscribe({
        next: () => {
          document.body.classList.remove('modal-open');
          document.body.style.removeProperty('overflow');
          document.body.style.removeProperty('padding-right');
          this.changeVisibility.emit('close');
          this.backToRecords.emit();
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Failed to forward the note. Please try again.';
        }
      });
    } else {
      this.medialNoteService.forward(this.noteId, this.selectedUserUuid).subscribe({
        next: () => {
          document.body.classList.remove('modal-open');
          document.body.style.removeProperty('overflow');
          document.body.style.removeProperty('padding-right');
          this.changeVisibility.emit('close');
          this.backToRecords.emit();
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Failed to forward the note. Please try again.';
        }
      });
    }
  }
}
