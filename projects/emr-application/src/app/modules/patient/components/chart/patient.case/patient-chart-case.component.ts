import { Component, Input, OnInit } from '@angular/core';
import { IColumn } from '@coreui/angular-pro/lib/smart-table/smart-table.type';
import { PatientName } from 'projects/emr-application/src/app/util/name.util';
import { map, Observable, retry, tap } from 'rxjs';
import { ListTemplate } from '../../../../common/template/list.template';
import { Appointment } from '../../../../scheduler/models/appointment';
import { AppointmentCancelNoShowReason } from '../../../../scheduler/models/appointment.cancel.no.show.reason';
import { AppointmentService } from '../../../../scheduler/service/appointment.service';

import { PatientCase } from '../../../models/case/patient.case';
import { MedicalNoteRequest } from '../../../models/medical.note/medical.note.request';
import { QuickDischargeRequest } from '../../../models/medical.note/quick.discharge.request';
import { PatientRecord } from '../../../models/patient.record/patient.record';
import { PatientRecordRequest } from '../../../models/patient.record/patient.record.request';
import { MedialNoteService } from '../../../services/medical.note/medial-note.service';
import { PatientRecordService } from '../../../services/patient/record/patient-record.service';

@Component({
  selector: 'app-patient-chart-case',
  templateUrl: './patient-chart-case.component.html',
  styleUrls: ['./patient-chart-case.component.css']
})
export class PatientChartCaseComponent extends ListTemplate implements OnInit {
  treatingDoctor: string;
  referringDoctor: string;
  referringNPI: string;
  @Input() case: PatientCase;
  @Input() patientId: number;
  @Input() clinicId: number;
  appointments$!: Observable<Appointment[]>;
  patientRecords$!: Observable<PatientRecord[]>
  reasonVisibility = false;
  columns: (string | IColumn)[];
  patientRecordAction: string;
  patientRecord: boolean = true;
  appointmentCancelNoShowReason: AppointmentCancelNoShowReason
  medicalNoteId: number
  errorMessage: string;
  constructor(
    private patientRecordService: PatientRecordService,
    private medialNoteService: MedialNoteService,
    private appointmentService: AppointmentService) { super() }

  ngOnInit(): void {
    this.columns = this.constructColumns(['record', 'date', 'actions'], true);
    this.gettreatingDoctorFullName();
    this.getReferringCaseData();
    this.getRecords();
  }

  toggleReasonVisibility(data: any) {
    this.reasonVisibility = !this.reasonVisibility;
  }
  gettreatingDoctorFullName() {
    var fName: string = this.case.treatingDoctor?.firstName === undefined ? '' : this.case.treatingDoctor?.firstName;
    var mName: string = this.case.treatingDoctor?.middleName === undefined ? '' : this.case.treatingDoctor?.middleName;
    var lName: string = this.case.treatingDoctor?.lastName === undefined ? '' : this.case.treatingDoctor?.lastName;
    this.treatingDoctor = PatientName.formatName(fName, mName, lName)
  }

  getReferringCaseData() {
    this.referringDoctor = this.case.referralCase.referringPartyName === null ? '' : this.case.referralCase.referringPartyName;
    this.referringNPI = this.case.referralCase.referringPartyNPI === null ? '' : this.case.referralCase.referringPartyNPI;

  }
  private getRecords() {
    const patientRecordRequest: PatientRecordRequest = {
      patientId: this.patientId,
      caseId: this.case.id
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
  executeAction(val: string) {
    this.patientRecord = false;
    this.patientRecordAction = val;
    let medicalNoteType: string;
    let caseId = this.case.id

    if (val === 'Add Initial Examination')
      medicalNoteType = "INITIAL_EVALUATION"
    if (val === 'Add Daily Note')
      medicalNoteType = "DAILY_NOTE"
    if (val === 'Progress Note')
      medicalNoteType = "PROGRESS_NOTE"
    if (val === 'Quick Discharge')
      medicalNoteType = "QUICK_DISCHARGE_NOTE"
    var medicalNoteRequest: MedicalNoteRequest = {
      caseId: caseId,
      noteType: medicalNoteType,
      createdBy: "Mahmoud shalaby",
      subjective: {
        basic: {},
        pain: {},
        priorFunction: {},
        currentFunction: {},
        medicalHistory: {}
      },
      assessment: {},
      planOfCare: {},
      billing: {}
    }
    if (val === 'Quick Discharge') {
      var quickDischargeRequest: QuickDischargeRequest = {
        dischargeDate: 0,
        numberOfVisits: 0
      }
      medicalNoteRequest.quickDischargeRequest = quickDischargeRequest;
    }

    this.medialNoteService.create(medicalNoteRequest).subscribe((medicalNoteId: any) => {
      this.medicalNoteId = medicalNoteId;
      this.errorMessage = undefined
    }, error => {
      this.patientRecordAction = 'ERROR_FINALIZE';
      this.errorMessage = error.error.message;
    })
  }
  executeRecordLineAction(val: string, entityId: number, status?: string) {
    if (val === 'View Reason')
      this.getAppointment(entityId)
    if (val === 'Remove')
      this.removeMedicalNote(entityId);
    if (val === 'Complete') {
      this.completeMedicalNote(entityId, status)
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
    if (status === 'Initial Evaluation')
      this.patientRecordAction = 'Add Initial Examination';
    if (status === 'Daily Note')
      this.patientRecordAction = 'Add Daily Note';
  }
}
