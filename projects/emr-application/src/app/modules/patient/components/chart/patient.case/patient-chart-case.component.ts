import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import { map, Observable, retry, Subscription, tap } from 'rxjs';
import { ListTemplate } from '../../../../common/template/list.template';
import { Appointment } from '../../../../scheduler/models/appointment';
import { AppointmentCancelNoShowReason } from '../../../../scheduler/models/appointment.cancel.no.show.reason';
import { AppointmentService } from '../../../../scheduler/service/appointment.service';
import { Role } from '../../../../security/model/role';
import { LoggedInService } from '../../../../security/service/loggedIn/logged-in.service';
import { PermissionService } from '../../../../security/service/permission.service';

import { PatientCase } from '../../../models/case/patient.case';
import { CreateNodeRequest } from '../../../models/medical.note/requester/create.note.request';
import { QuickDischargeRequest } from '../../../models/medical.note/quick.discharge.request';

import { PatientRecord } from '../../../models/patient.record/patient.record';
import { PatientRecordRequest } from '../../../models/patient.record/patient.record.request';
import { PatientCaseAction } from '../../../models/chart/patient.case.action';
import { DailyNoteService } from '../../../services/medical.note/daily.note/daily-note.service';
import { DischargeNoteService } from '../../../services/medical.note/discharge.note/discharge-note.service';
import { InitialExamNoteService } from '../../../services/medical.note/initial.exam/initial-exam-note.service';
import { MedialNoteService } from '../../../services/medical.note/medial-note.service';
import { ProgressNoteService } from '../../../services/medical.note/progress.note/progress-note.service';
import { QuickDischargeNoteService } from '../../../services/medical.note/quick.discharge/quick-discharge-note.service';
import { PatientRecordService } from '../../../services/patient/record/patient-record.service';
import { PatientChartNoteService } from '../../../services/revamp/patient.chart.note/patient-chart-note.service';
import { PatientRequest } from '../../../models/medical.note/requester/patient.request';
import { EDocument, EDocumentFormData } from './e-document/patient-case-e-document.component';
import { PatientEDocumentService, EDocumentUploadRequest } from '../../../services/patient/e-document/patient-e-document.service';

@Component({
  selector: 'app-patient-chart-case',
  templateUrl: './patient-chart-case.component.html',
  styleUrls: ['./patient-chart-case.component.css']
})
export class PatientChartCaseComponent extends ListTemplate implements OnInit, OnDestroy {
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
  patientCaseActions: PatientCaseAction[]
  isClinicalUser: boolean = false;
  canInitializeMedicalNote: boolean = false;
  private draftSub!: Subscription;

  // E-Document properties
  showEDocumentForm: boolean = false;
  eDocuments: EDocument[] = [];
  isUploadingDocument: boolean = false;
  constructor(
    private patientRecordService: PatientRecordService,
    private medialNoteService: MedialNoteService,
    private appointmentService: AppointmentService,
    private loggedInService: LoggedInService,
    private initialExamNoteService: InitialExamNoteService,
    private dailyNoteService: DailyNoteService,
    private progressNoteService: ProgressNoteService,
    private quickDischargeNoteService: QuickDischargeNoteService,
    private dischargeNoteService: DischargeNoteService,
    private patientChartNoteService: PatientChartNoteService,
    private permissionService: PermissionService,
    private patientEDocumentService: PatientEDocumentService) { super() }

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
    console.log('provider', this.loggedInService.getLoggedUser)
    this.initListComponent();
    this.checkClinicalUserRole();
    this.getReferringCaseData();
    this.getRecords();
    this.checkAuthExpiration()
    this.findPatientCaseActions(this.case.uuid);
    this.patient.patientCaseId = this.case.uuid
    console.log('patient', this.patient)

    this.draftSub = this.medialNoteService.draft$.subscribe(() => {
      console.log('draftSub')
      this.getRecords();
      this.findPatientCaseActions(this.case.uuid);
    });
  }

  ngOnDestroy(): void {
    this.draftSub?.unsubscribe();
  }
  private findPatientCaseActions(patientCaseId: string) {
    this.patientChartNoteService.find(patientCaseId).subscribe((actions: any) => {
      console.log('actions', actions)
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
  private checkClinicalUserRole() {
    this.isClinicalUser = this.permissionService.canView(Role.INITIALIZE_MEDICAL_NOTE_ROLE)
      || this.permissionService.canView(Role.FORWARD_MEDICAL_NOTE_ROLE)
      || this.permissionService.canView(Role.FINALIZE_MEDICAL_NOTE_ROLE);
    this.canInitializeMedicalNote = this.permissionService.canModify(Role.INITIALIZE_MEDICAL_NOTE_ROLE);
  }
  getFilteredRecordActions(actions: string[]): string[] {
    if (this.isClinicalUser) {
      return actions;
    }
    // Non-clinical users can only View Pdf
    return actions.filter(action => action === 'View Pdf' || action === 'View Reason');
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
  executeAction(key: string) {
    this.patientRecordAction = key;
    let medicalNoteType: string;
    let caseId = this.case.id

    if (key === 'Initial_Examination') {
      medicalNoteType = "INITIAL_EVALUATION"
      this.createInitialExamNote();
      this.medicalNoteId = undefined;
    }

    if (key === 'Daily_Note') {
      medicalNoteType = "DAILY_NOTE"
      console.log('DAILY_NOTE')
      this.createDailyNote();
      this.medicalNoteId = undefined;
    }
    if (key === 'Progress_Note') {
      medicalNoteType = "PROGRESS_NOTE"
      this.createProgressNote();
      this.medicalNoteId = undefined;
    }

    if (key === 'Quick_Discharge') {
      medicalNoteType = "QUICK_DISCHARGE_NOTE"
      this.createQuickDischargeNote();
      this.medicalNoteId = undefined;
    }

    if (key === 'Discharge') {
      medicalNoteType = "DISCHARGE_NOTE"
      this.createDischargeNote();
      this.medicalNoteId = undefined;
    }
  }
  private createInitialExamNote() {
    var request: CreateNodeRequest = {
      patient: this.patient,
      patientCaseId: this.case.uuid,
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
      this.findPatientCaseActions(this.case.uuid);
    }, error => {
      this.patientRecord = false;
      this.patientRecordAction = 'ERROR_FINALIZE';
      this.errorMessage = error.error?.message || error.message || 'An error occurred while creating the initial examination note';
    })
  }
  private createDailyNote() {
    var request: CreateNodeRequest = {
      patient: this.patient,
      patientCaseId: this.case.uuid,
      noteType: 'DAILY',
      providerId: this.loggedInService.getLoggedUser().uuid,
      encounterDate: moment().toDate()
    }
    this.dailyNoteService.create(request).subscribe((response: any) => {
      this.patientRecord = false;
      this.noteId = response.noteId;
      this.medicalNoteId = response.id;
      this.errorMessage = undefined
      this.medialNoteService.medicalNoteID$.next(response.medicalNotId)
      this.findPatientCaseActions(this.case.uuid);
    }, error => {
      this.patientRecord = false;
      this.patientRecordAction = 'ERROR_FINALIZE';
      this.errorMessage = error.error?.message || error.message || 'An error occurred while creating the daily note';
    })
  }
  private createProgressNote() {
    var request: CreateNodeRequest = {
      patient: this.patient,
      patientCaseId: this.case.uuid,
      noteType: 'PROGRESS',
      providerId: this.loggedInService.getLoggedUser().uuid,
      encounterDate: moment().toDate()
    }
    this.progressNoteService.create(request).subscribe((response: any) => {
      console.log(JSON.stringify(response))
      this.patientRecord = false;
      this.noteId = response.noteId.value;
      this.medicalNoteId = response.id;
      this.errorMessage = undefined
      this.medialNoteService.medicalNoteID$.next(response.medicalNotId)
      this.findPatientCaseActions(this.case.uuid);
    }, error => {
      this.patientRecord = false;
      this.patientRecordAction = 'ERROR_FINALIZE';
      this.errorMessage = error.error?.message || error.message || 'An error occurred while creating the progress note';
    })
  }
  private createQuickDischargeNote() {
    var request = {
      patientCaseId: this.case.uuid
    }
    this.quickDischargeNoteService.create(request).subscribe((response: any) => {
      this.patientRecord = false;
      this.noteId = response.noteId.value;
      this.medicalNoteId = response.id;
      this.errorMessage = undefined;
      this.medialNoteService.medicalNoteID$.next(response.medicalNotId);
      this.findPatientCaseActions(this.case.uuid);
    }, error => {
      this.patientRecord = false;
      this.patientRecordAction = 'ERROR_FINALIZE';
      this.errorMessage = error.error?.message || error.message || 'An error occurred while creating the quick discharge note';
    })
  }
  private createDischargeNote() {
    var request: CreateNodeRequest = {
      patient: this.patient,
      patientCaseId: this.case.uuid,
      noteType: 'DISCHARGE',
      providerId: this.loggedInService.getLoggedUser().uuid,
      encounterDate: moment().toDate()
    }
    this.dischargeNoteService.create(request).subscribe((response: any) => {
      console.log(JSON.stringify(response))
      this.patientRecord = false;
      this.noteId = response.noteId.value;
      this.medicalNoteId = response.id;
      this.errorMessage = undefined
      this.medialNoteService.medicalNoteID$.next(response.medicalNotId)
      this.findPatientCaseActions(this.case.uuid);
    }, error => {
      this.patientRecord = false;
      this.patientRecordAction = 'ERROR_FINALIZE';
      this.errorMessage = error.error?.message || error.message || 'An error occurred while creating the discharge note';
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
      this.recordActionEntityId = entityId
      this.recordActionStauts = status
      let exportService$;
      if (status === 'Initial Examination') {
        exportService$ = this.initialExamNoteService.exportPDF(noteId);
      } else if (status === 'Daily Note') {
        exportService$ = this.dailyNoteService.exportPDF(noteId);
      } else if (status === 'Progress Note') {
        exportService$ = this.progressNoteService.exportPDF(noteId);
      } else if (status === 'Quick Discharge' || status === 'Quick_Discharge') {
        exportService$ = this.quickDischargeNoteService.exportPDF(noteId);
      } else if (status === 'Discharge Note' || status === 'Discharge_Note' || status === 'Discharge') {
        exportService$ = this.dischargeNoteService.exportPDF(noteId);
      } else {
        exportService$ = this.initialExamNoteService.exportPDF(noteId);
      }
      exportService$.subscribe((blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `medical-note-${this.patientName}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
      });
    }
  }
  handleBackAction() {
    this.patientRecord = true;
    this.getRecords();
    this.findPatientCaseActions(this.case.uuid);
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
      this.findPatientCaseActions(this.case.uuid);
    })
  }
  private completeMedicalNote(id: number, status: string) {
    this.patientRecord = false
    this.medicalNoteId = id;
    if (status === 'Initial Examination')
      this.patientRecordAction = 'Initial_Examination';
    if (status === 'Daily Note')
      this.patientRecordAction = 'Daily_Note';
    if (status === 'Progress Note')
      this.patientRecordAction = 'Progress_Note';
    if (status === 'Quick Discharge' || status === 'Quick_Discharge')
      this.patientRecordAction = 'Quick_Discharge';
    if (status === 'Discharge Note' || status === 'Discharge_Note' || status === 'Discharge')
      this.patientRecordAction = 'Discharge';
  }

  // E-Document methods
  toggleEDocumentForm(): void {
    this.showEDocumentForm = !this.showEDocumentForm;
  }

  onDocumentSubmitted(formData: EDocumentFormData): void {
    if (!formData.file) {
      return;
    }

    this.isUploadingDocument = true;

    const uploadRequest: EDocumentUploadRequest = {
      documentType: formData.documentType,
      nameOfDocument: formData.nameOfDocument,
      dateOfReceipt: formData.dateOfReceipt,
      assignedCase: formData.assignedCase,
      patientId: this.patientId,
      caseId: this.case.uuid,
      file: formData.file
    };

    this.patientEDocumentService.upload(uploadRequest).subscribe({
      next: (response) => {
        const newDocument: EDocument = {
          ...formData,
          id: response.id,
          documentTypeName: this.getDocumentTypeName(formData.documentType),
          assignedCaseName: formData.assignedCase === 'all' ? 'All' : this.case.title,
          fileName: formData.file?.name
        };
        this.eDocuments = [...this.eDocuments, newDocument];
        this.showEDocumentForm = false;
        this.isUploadingDocument = false;
      },
      error: (error) => {
        console.error('Error uploading document:', error);
        this.isUploadingDocument = false;
      }
    });
  }

  private getDocumentTypeName(value: string): string {
    const typeMap: { [key: string]: string } = {
      'blood_work_results_labs': 'Blood Work Results/Labs',
      "driver's_license": "Driver's License",
      'hep': 'HEP',
      'insurance_card': 'Insurance Card',
      'medication_listing': 'Medication Listing',
      'mri': 'MRI',
      'other': 'Other',
      'past_medical_history': 'Past Medical History',
      'patient_intake': 'Patient Intake',
      "physician's_notes": "Physician's Notes",
      'plan_of_care': 'Plan of Care',
      'script': 'Script',
      'xray': 'XRay'
    };
    return typeMap[value] || value;
  }

  onCancelEDocument(): void {
    this.showEDocumentForm = false;
  }

  onViewDocument(document: EDocument): void {
    this.patientEDocumentService.download(document.id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error viewing document:', error);
      }
    });
  }

  onDeleteDocument(document: EDocument): void {
    this.patientEDocumentService.delete(document.id).subscribe({
      next: () => {
        this.eDocuments = this.eDocuments.filter(d => d.id !== document.id);
      },
      error: (error) => {
        console.error('Error deleting document:', error);
      }
    });
  }

  onDownloadDocument(doc: EDocument): void {
    this.patientEDocumentService.download(doc.id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = doc.fileName || doc.nameOfDocument;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error downloading document:', error);
      }
    });
  }
}
