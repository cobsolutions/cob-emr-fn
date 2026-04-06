import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'projects/emr-application/src/app/modules/administration/model/user/user';
import { DotorUserService } from 'projects/emr-application/src/app/modules/administration/services/user/doctor.user/dotor-user.service';
import { ProviderInfo } from 'projects/emr-application/src/app/modules/security/model/provider-info';
import { LoggedInService } from 'projects/emr-application/src/app/modules/security/service/loggedIn/logged-in.service';
import { MedialNoteService } from '../../../../services/medical.note/medial-note.service';
import { MedicalNoteType } from '../../../../models/medical.note/medical.note.type';
import { InitialExamNoteService } from '../../../../services/medical.note/initial.exam/initial-exam-note.service';
import { DailyNoteService } from '../../../../services/medical.note/daily.note/daily-note.service';
import { ProgressNoteService } from '../../../../services/medical.note/progress.note/progress-note.service';
import { DischargeNoteService } from '../../../../services/medical.note/discharge.note/discharge-note.service';
import { QuickDischargeNoteService } from '../../../../services/medical.note/quick.discharge/quick-discharge-note.service';

@Component({
  selector: 'forward-modal',
  templateUrl: './forward-modal.component.html',
  styleUrls: ['./forward-modal.component.css']
})
export class ForwardModalComponent implements OnInit {

  clinicalUsers: User[]
  selectedUserUuid: string;
  errorMessage: string = undefined
  loading: boolean = true;
  @Output() changeVisibility = new EventEmitter<string>()
  @Output() backToRecords = new EventEmitter<void>()
  @Input() noteId: string
  @Input() noteType: MedicalNoteType
  @Input() caseId: string
  clinicId: number;
  constructor(private loggedInService: LoggedInService
    , private dotorUserService: DotorUserService
    , private medialNoteService: MedialNoteService
    , private initialExamNoteService: InitialExamNoteService
    , private dailyNoteService: DailyNoteService
    , private progressNoteService: ProgressNoteService
    , private dischargeNoteService: DischargeNoteService
    , private quickDischargeNoteService: QuickDischargeNoteService
    , private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.clinicId = this.loggedInService.selectedClinic$.value;
    const logged: string = this.loggedInService.getLoggedUser().uuid;
    this.dotorUserService.findAuthProviderToFinalize(this.clinicId, logged)
      .subscribe((users: any) => {
        this.clinicalUsers = users
        this.loading = false;
        if (this.clinicalUsers.length > 0) {
          this.selectedUserUuid = this.clinicalUsers[0].uuid
          this.errorMessage = undefined
        } else {
          this.errorMessage = "Sorry There is no available provider to forward."
        }
        this.cdr.detectChanges();
      })
  }
  private buildForwardedBy(): ProviderInfo {
    const loggedUser = this.loggedInService.getLoggedUser();
    return {
      providerId: loggedUser?.uuid,
      providerName: loggedUser?.lastName + ', ' + loggedUser?.firstName,
      npi: loggedUser.providerInfo?.npi,
      credential: loggedUser.providerInfo?.credential,
      license: loggedUser.providerInfo?.license,
      speciality: loggedUser.providerInfo?.speciality
    };
  }
  private buildForwardedTo(): ProviderInfo {
    const selectedUser = this.clinicalUsers.find(user => user.uuid === this.selectedUserUuid);
    return {
      providerId: selectedUser?.uuid,
      providerName: selectedUser?.lastName + ', ' + selectedUser?.firstName,
      npi: selectedUser?.npi,
      credential: selectedUser?.credential,
      license: selectedUser?.licence,
      speciality: selectedUser?.speciality
    };
  }
  forward() {
    const request = {
      patientCaseId: this.caseId,
      forwardedBy: this.buildForwardedBy(),
      forwardedTo: this.buildForwardedTo()
    };
    let forward$;
    if (this.noteType === MedicalNoteType.Initial_Examination) {
      forward$ = this.initialExamNoteService.forward(this.noteId, request);
    } else if (this.noteType === MedicalNoteType.Daily_Note) {
      forward$ = this.dailyNoteService.forward(this.noteId, request);
    } else if (this.noteType === MedicalNoteType.Progress_Note) {
      forward$ = this.progressNoteService.forward(this.noteId, request);
    } else if (this.noteType === MedicalNoteType.Discharge_Note) {
      forward$ = this.dischargeNoteService.forward(this.noteId, request);
    } else if (this.noteType === MedicalNoteType.Quick_Discharge_Note) {
      forward$ = this.quickDischargeNoteService.forward(this.noteId, request);
    } else {
      forward$ = this.medialNoteService.forward(this.noteId, this.selectedUserUuid);
    }
    forward$.subscribe({
      next: () => {
        document.body.classList.remove('modal-open');
        document.body.style.removeProperty('overflow');
        document.body.style.removeProperty('padding-right');
        this.changeVisibility.emit('close');
        this.backToRecords.emit();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to forward the note. Please try again.';
        this.cdr.detectChanges();
      }
    });
  }
}
