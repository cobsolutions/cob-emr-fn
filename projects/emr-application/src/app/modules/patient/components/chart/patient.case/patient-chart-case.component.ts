import { Component, Input, OnInit } from '@angular/core';
import { IColumn } from '@coreui/angular-pro/lib/smart-table/smart-table.type';
import * as moment from 'moment';
import { map, Observable, retry, tap } from 'rxjs';
import { ListTemplate } from '../../../../common/template/list.template';
import { Appointment } from '../../../../scheduler/models/appointment';
import { AppointmentCancelNoShowReason } from '../../../../scheduler/models/appointment.cancel.no.show.reason';
import { AppointmentService } from '../../../../scheduler/service/appointment.service';
import { Role } from '../../../../security/model/role';
import { LoggedInService } from '../../../../security/service/loggedIn/logged-in.service';

import { PatientCase } from '../../../models/case/patient.case';
import { CreateNodeRequest } from '../../../models/medical.note/requester/create.note.request';
import { MedicalNoteRequest } from '../../../models/medical.note/medical.note.request';
import { QuickDischargeRequest } from '../../../models/medical.note/quick.discharge.request';

import { PatientRecord } from '../../../models/patient.record/patient.record';
import { PatientRecordRequest } from '../../../models/patient.record/patient.record.request';
import { InitialExamNoteService } from '../../../services/medical.note/initial.exam/initial-exam-note.service';
import { MedialNoteService } from '../../../services/medical.note/medial-note.service';
import { PatientRecordService } from '../../../services/patient/record/patient-record.service';
import { PatientChartNoteService } from '../../../services/revamp/patient.chart.note/patient-chart-note.service';
import { PatientRequest } from '../../../models/medical.note/requester/patient.request';

@Component({
  selector: 'app-patient-chart-case',
  templateUrl: './patient-chart-case.component.html',
  styleUrls: ['./patient-chart-case.component.css']
})
export class PatientChartCaseComponent extends ListTemplate implements OnInit {
  isExpired: boolean = false;
  treatingDoctor: string;
  referringDoctor: string;
  referringNPI: string;
  recordActionEntityId: number;
  recordActionStauts: string;
  @Input() case: PatientCase;
  @Input() patientId: number;
  @Input() patient: PatientRequest;
  @Input() patientName: string
  @Input() clinicId: number;
  appointments$!: Observable<Appointment[]>;
  patientRecords$!: Observable<PatientRecord[]>
  reasonVisibility = false;
  columns: (string | IColumn)[];
  patientRecordAction: string;
  patientRecord: boolean = true;
  appointmentCancelNoShowReason: AppointmentCancelNoShowReason
  medicalNoteId: number
  noteId: string
  errorMessage: string;
  showTest: boolean = false;
  componentRole: string[] = [Role.INITIALIZE_MEDICAL_NOTE_ROLE];
  viewPDFVisibility: boolean = false;
  activeSection: string = 'records';
  patientCaseActions: string[]
  constructor(
    private patientRecordService: PatientRecordService,
    private medialNoteService: MedialNoteService,
    private appointmentService: AppointmentService,
    private loggedInService: LoggedInService,
    private initialExamNoteService: InitialExamNoteService,
    private patientChartNoteService: PatientChartNoteService) { super() }

  setActive(section: string) {
    this.activeSection = section;
  }

  isActive(section: string): boolean {
    return this.activeSection === section;
  }
  formatInfo(info: string): string {
    return info ? info.replace(/\n/g, '<br/>') : '';
  }
  ngOnInit(): void {
    this.initListComponent();
    this.columns = this.constructColumns(['record', 'date', 'actions'], true);

    this.getReferringCaseData();
    this.getRecords();
    this.checkAuthExpiration()
    this.findPatientCaseActions(this.case.uuid);
    this.patient.patientCaseId = this.case.uuid
    console.log('patient', this.patient)
  }
  private findPatientCaseActions(patientCaseId: string) {
    this.patientChartNoteService.find(patientCaseId).subscribe((actions: any) => {
      this.patientCaseActions = actions;
    })
  }
  checkAuthExpiration() {
    if (this.case.authorizationData !== null) {
      const today = new Date();
      const endDate = new Date(this.case.authorizationData.effectiveEndtDate);
      this.isExpired = endDate < today;
    }
  }
  toggleOMTVisibility() {
    this.showTest = !this.showTest;
  }
  toggleviewPDFVisibility() {
    this.viewPDFVisibility = !this.viewPDFVisibility;
  }
  show() {
    this.showTest = true;
  }
  toggleReasonVisibility(data: any) {
    this.reasonVisibility = !this.reasonVisibility;
  }


  getReferringCaseData() {
    this.referringDoctor = this.case.referralCase.referringPartyName === null ? '' : this.case.referralCase.referringPartyName;
    this.referringNPI = this.case.referralCase.referringPartyNPI === null ? '' : this.case.referralCase.referringPartyNPI;

  }
  private getRecords() {
    const patientRecordRequest: PatientRecordRequest = {
      patientId: this.patientId,
      caseId: this.case.uuid,
      loggedIn: this.loggedInService.getLoggedUser().uuid
    }
    this.patientRecords$ = this.patientRecordService.find(this.apiParams$, patientRecordRequest).pipe(
      retry({
        delay: (error) => {
          console.warn('Retry: ', error);
          this.errorMessage$.next(error.message ?? `Error: ${JSON.stringify(error)}`);
          this.loadingData$.next(false);
          return this.retry$;
        }
      }),
      tap((response: any) => {
        this.totalItems$.next(response.number_of_matching_records);
        if (response.number_of_records) {
          this.errorMessage$.next('');
        }
        this.retry$.next(false);
        this.loadingData$.next(false);
      }),
      map((response: any) => {
        return response.records;
      })
    )
  }
  private getLoggedDoctor(): string {
    return this.loggedInService.getLoggedUser().uuid
  }
  executeAction(val: string) {
    this.patientRecordAction = val;
    let medicalNoteType: string;
    let caseId = this.case.id

    if (val === 'Add Initial Examination') {
      medicalNoteType = "INITIAL_EVALUATION"
      this.case.patientRecordActions = [
        "Add Daily Note",
        "Progress Note",
        "Discharge",
        "Quick Discharge",
        "Case Note"
      ]
      this.createInitialExamNote();
      this.medicalNoteId = undefined;
    }

    if (val === 'Add Daily Note') {
      medicalNoteType = "DAILY_NOTE"
      this.medicalNoteId = undefined;
    }
    if (val === 'Progress Note') {
      medicalNoteType = "PROGRESS_NOTE"
      this.medicalNoteId = undefined;
    }

    if (val === 'Quick Discharge') {
      medicalNoteType = "QUICK_DISCHARGE_NOTE"
      this.medicalNoteId = undefined;
    }

    if (val === 'Discharge') {
      medicalNoteType = "DISCHARGE_NOTE"
      this.medicalNoteId = undefined;
    }
    if (val === 'Quick Discharge') {
      var quickDischargeRequest: QuickDischargeRequest = {
        dischargeDate: 0,
        numberOfVisits: 0
      }
    }
  }
  private createInitialExamNote() {
    var request: CreateNodeRequest = {
      patient:this.patient,
      noteType: 'INITIAL_EXAM',
      providerId: this.loggedInService.getLoggedUser().uuid,
      encounterDate: moment().toDate()
    }
    this.initialExamNoteService.create(request).subscribe((response: any) => {
      console.log(JSON.stringify(response))
      this.patientRecord = false;
      this.noteId = response.noteId.value;
      this.medicalNoteId = response.id;
      this.errorMessage = undefined
      this.medialNoteService.medicalNoteID$.next(response.medicalNotId)
    }, error => {
      this.patientRecordAction = 'ERROR_FINALIZE';
      this.errorMessage = error.error.message;
    })
  }
  executeRecordLineAction(val: string, entityId: number, status?: string, noteId?: string) {
    if (val === 'View Reason')
      this.getAppointment(entityId)
    if (val === 'Remove')
      this.removeMedicalNote(entityId);
    if (val === 'Complete') {
      this.noteId = noteId;
      this.completeMedicalNote(entityId, status)
      this.medialNoteService.medicalNoteID$.next(this.medicalNoteId)
    }
    if (val === 'View Pdf') {
      this.viewPDFVisibility = true;
      this.recordActionEntityId = entityId
      this.recordActionStauts = status
    }
  }
  handleBackAction() {
    this.patientRecord = true;
  }
  private getAppointment(id: number) {
    this.appointmentService.getAppointmentCancelNoShow(id).subscribe((appointmentCancelNoShowReason: any) => {
      this.appointmentCancelNoShowReason = appointmentCancelNoShowReason
      this.reasonVisibility = true;
    })
  }
  private removeMedicalNote(id: number) {
    this.medialNoteService.remove(id).subscribe((updatedCase: any) => {
      this.case = updatedCase;
      this.getRecords();
    })
  }
  private completeMedicalNote(id: number, status: string) {
    this.patientRecord = false
    this.medicalNoteId = id;
    if (status === 'Initial Examination')
      this.patientRecordAction = 'Add Initial Examination';
    if (status === 'Daily Note')
      this.patientRecordAction = 'Add Daily Note';
    if (status === 'Progress Note')
      this.patientRecordAction = 'Progress Note';
    if (status === 'Quick Discharge')
      this.patientRecordAction = 'Quick Discharge';
    if (status === 'Discharge Note')
      this.patientRecordAction = 'Discharge';
  }
}
