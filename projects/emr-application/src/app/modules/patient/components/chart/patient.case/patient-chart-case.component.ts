import { Component, Input, Output, EventEmitter, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { BehaviorSubject, map, Observable, retry, Subscription, take, tap } from 'rxjs';
import { IApiParams } from '../../../../common/interfaces/api.params';
import { ListTemplate } from '../../../../common/template/list.template';
import { Appointment } from '../../../../scheduler/models/appointment';
import { AppointmentCancelNoShowReason } from '../../../../scheduler/models/appointment.cancel.no.show.reason';
import { AppointmentService } from '../../../../scheduler/service/appointment.service';
import { ProviderInfo } from '../../../../security/model/provider-info';
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
import { EDocumentFormData, DocumentTypeOption, CaseOption } from './e-document/patient-case-e-document.component';
import { PatientEDocumentService, EDocumentUploadRequest, EDocumentRecord } from '../../../services/patient/e-document/patient-e-document.service';

@Component({
  selector: 'app-patient-chart-case',
  templateUrl: './patient-chart-case.component.html',
  styleUrls: ['./patient-chart-case.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
  @Output() noteVisibilityChange = new EventEmitter<boolean>();
  appointments$!: Observable<Appointment[]>;
  patientRecords$!: Observable<PatientRecord[]>
  reasonVisibility = false;
  patientRecordAction: string;
  patientRecord: boolean = true;
  appointmentCancelNoShowReason: AppointmentCancelNoShowReason
  medicalNoteId: number
  noteId: string
  noteIsForwarded: boolean
  noteCoSigner: string
  errorMessage: string;
  showTest: boolean = false;
  componentRole: string[] = [Role.INITIALIZE_MEDICAL_NOTE_ROLE];
  viewPDFVisibility: boolean = false;
  activeSection: string = 'records';
  patientCaseActions: PatientCaseAction[]
  filteredPatientCaseActions: PatientCaseAction[] = []
  isClinicalUser: boolean = false;
  canInitializeMedicalNote: boolean = false;
  private draftSub!: Subscription;
  private allRecordsParams$ = new BehaviorSubject<IApiParams>({ limit: 1000, offset: 0 });

  // E-Document properties
  showEDocumentForm: boolean = false;
  caseDocuments: EDocumentRecord[] = [];
  allCasesDocuments: EDocumentRecord[] = [];
  isUploadingDocument: boolean = false;
  // Edit E-Document properties
  editVisible: boolean = false;
  editForm: FormGroup;
  editingDocument: EDocumentRecord | null = null;
  isSavingEdit: boolean = false;
  documentTypes: DocumentTypeOption[] = [
    { name: 'Blood Work Results/Labs', value: 'blood_work_results_labs' },
    { name: "Driver's License", value: "driver's_license" },
    { name: 'HEP', value: 'hep' },
    { name: 'Insurance Card', value: 'insurance_card' },
    { name: 'Medication Listing', value: 'medication_listing' },
    { name: 'MRI', value: 'mri' },
    { name: 'Other', value: 'other' },
    { name: 'Past Medical History', value: 'past_medical_history' },
    { name: 'Patient Intake', value: 'patient_intake' },
    { name: "Physician's Notes", value: "physician's_notes" },
    { name: 'Plan of Care', value: 'plan_of_care' },
    { name: 'Script', value: 'script' },
    { name: 'XRay', value: 'xray' }
  ];

  previewVisible: boolean = false;
  previewUrl: string = '';
  previewSafeUrl: SafeResourceUrl = '';
  previewFileName: string = '';
  previewContentType: string = '';
  isLoadingPreview: boolean = false;

  // Chart Note properties
  chartNote: string = '';
  isSavingChartNote: boolean = false;

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
    private patientEDocumentService: PatientEDocumentService,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef) { super() }

  setActive(section: string) {
    this.activeSection = section;
    this.cdr.markForCheck();
  }

  isActive(section: string): boolean {
    return this.activeSection === section;
  }
  onAuthVisibilityChange(event: string): void {
    if (event === 'close') {
      this.setActive('records');
    }
  }
  formatInfo(info: string): string {
    return info ? info.replace(/\n/g, '<br/>') : '';
  }

  // TrackBy functions for better ngFor performance
  trackByDiagnosis(index: number, diagnosis: any): string {
    return diagnosis.diagnosisCode;
  }

  trackByAction(index: number, action: PatientCaseAction): string {
    return action.key;
  }

  trackByRecord(index: number, record: PatientRecord): number {
    return record.entityId;
  }

  trackByDocType(index: number, docType: DocumentTypeOption): string {
    return docType.value;
  }
  ngOnInit(): void {
    console.log('provider', this.loggedInService.getLoggedUser)
    this.initListComponent();
    this.checkClinicalUserRole();
    this.initPatientCaseActions();
    this.getReferringCaseData();
    this.getRecords();
    this.refreshRecordActions();
    this.checkAuthExpiration()
    this.patient.patientCaseId = this.case.uuid
    this.chartNote = this.case.chartNote || '';
    console.log('patient', this.patient)
    this.loadEDocuments();

    this.draftSub = this.medialNoteService.draft$.subscribe(() => {
      console.log('draftSub')
      this.getRecords();
      this.refreshRecordActions();
    });
  }

  ngOnDestroy(): void {
    this.draftSub?.unsubscribe();
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

  private initPatientCaseActions() {
    this.patientCaseActions = [
      { key: 'Initial_Examination', label: 'Initial Examination' },
      { key: 'Daily_Note', label: 'Daily Note' },
      { key: 'Progress_Note', label: 'Progress Note' },
      { key: 'Quick_Discharge', label: 'Quick Discharge' },
      { key: 'Discharge', label: 'Discharge' }
    ];
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
    this.cdr.markForCheck();
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
  private refreshRecordActions() {
    const patientRecordRequest: PatientRecordRequest = {
      patientId: this.patientId,
      caseId: this.case.uuid,
      loggedIn: this.loggedInService.getLoggedUser().uuid
    };
    this.patientRecordService.find(this.allRecordsParams$, patientRecordRequest).pipe(
      take(1)
    ).subscribe((response: any) => {
      this.filterActionsByRecords(response.records);
    });
  }

  private filterActionsByRecords(records: PatientRecord[]) {
    const statuses = records.map(r => r.status);
    const hasInitialExam = statuses.some(s => s === 'Initial Examination' || s === 'Initial_Examination');
    const hasDischarged = statuses.some(s => s === 'Discharge' || s === 'Discharge Note' || s === 'Discharge_Note');
    const hasQuickDischarged = statuses.some(s => s === 'Quick Discharge' || s === 'Quick_Discharge');

    this.filteredPatientCaseActions = this.patientCaseActions.filter(action => {
      // If patient is discharged, no more actions allowed
      if (hasDischarged || hasQuickDischarged) {
        return false;
      }
      // Initial Examination can only be created once
      if (action.key === 'Initial_Examination' && hasInitialExam) {
        return false;
      }
      // Daily Note and Progress Note require Initial Examination first
      if ((action.key === 'Daily_Note' || action.key === 'Progress_Note') && !hasInitialExam) {
        return false;
      }
      // Quick Discharge and Discharge require Initial Examination first
      if ((action.key === 'Quick_Discharge' || action.key === 'Discharge') && !hasInitialExam) {
        return false;
      }
      return true;
    });
    this.cdr.markForCheck();
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
  private buildCreatedBy(): ProviderInfo {
    const loggedUser = this.loggedInService.getLoggedUser();
    return {
      providerId: loggedUser.uuid,
      providerName: `${loggedUser.lastName}, ${loggedUser.firstName}`,
      npi: loggedUser.providerInfo?.npi,
      credential: loggedUser.providerInfo?.credential,
      license: loggedUser.providerInfo?.license,
      speciality: loggedUser.providerInfo?.speciality
    };
  }
  private createInitialExamNote() {
    var request: CreateNodeRequest = {
      patient: this.patient,
      patientCaseId: this.case.uuid,
      noteType: 'INITIAL_EXAM',
      providerId: this.loggedInService.getLoggedUser().uuid,
      encounterDate: moment().toDate(),
      createdBy: this.buildCreatedBy(),
      caseDiagnosis: this.case.caseDiagnosis?.map(d => ({ code: d.diagnosisCode, description: d.diagnosisDescription }))
    }
    this.initialExamNoteService.create(request).subscribe((response: any) => {
      console.log(JSON.stringify(response))
      this.setNoteOpen(true);
      this.noteId = response.noteId.value;
      this.medicalNoteId = response.id;
      this.errorMessage = undefined
      this.medialNoteService.medicalNoteID$.next(response.medicalNotId)
      this.cdr.markForCheck();
    }, error => {
      this.setNoteOpen(true);
      this.patientRecordAction = 'ERROR_FINALIZE';
      this.errorMessage = error.error?.message || error.message || 'An error occurred while creating the initial examination note';
      this.cdr.markForCheck();
    })
  }
  private createDailyNote() {
    var request: CreateNodeRequest = {
      patient: this.patient,
      patientCaseId: this.case.uuid,
      noteType: 'DAILY',
      providerId: this.loggedInService.getLoggedUser().uuid,
      encounterDate: moment().toDate(),
      createdBy: this.buildCreatedBy(),
      caseDiagnosis: this.case.caseDiagnosis?.map(d => ({ code: d.diagnosisCode, description: d.diagnosisDescription })),
      clinicIds: this.patient?.clinicIds
    }
    this.dailyNoteService.create(request).subscribe((response: any) => {
      this.setNoteOpen(true);
      this.noteId = response.noteId;
      this.medicalNoteId = response.id;
      this.errorMessage = undefined
      this.medialNoteService.medicalNoteID$.next(response.medicalNotId)
      this.cdr.markForCheck();
    }, error => {
      this.setNoteOpen(true);
      this.patientRecordAction = 'ERROR_FINALIZE';
      this.errorMessage = error.error?.message || error.message || 'An error occurred while creating the daily note';
      this.cdr.markForCheck();
    })
  }
  private createProgressNote() {
    var request: CreateNodeRequest = {
      patient: this.patient,
      patientCaseId: this.case.uuid,
      noteType: 'PROGRESS',
      providerId: this.loggedInService.getLoggedUser().uuid,
      encounterDate: moment().toDate(),
      createdBy: this.buildCreatedBy(),
      caseDiagnosis: this.case.caseDiagnosis?.map(d => ({ code: d.diagnosisCode, description: d.diagnosisDescription })),
      clinicIds: this.patient?.clinicIds
    }
    this.progressNoteService.create(request).subscribe((response: any) => {
      console.log(JSON.stringify(response))
      this.setNoteOpen(true);
      this.noteId = response.noteId.value;
      this.medicalNoteId = response.id;
      this.errorMessage = undefined
      this.medialNoteService.medicalNoteID$.next(response.medicalNotId)
      this.cdr.markForCheck();
    }, error => {
      this.setNoteOpen(true);
      this.patientRecordAction = 'ERROR_FINALIZE';
      this.errorMessage = error.error?.message || error.message || 'An error occurred while creating the progress note';
      this.cdr.markForCheck();
    })
  }
  private createQuickDischargeNote() {
    var request = {
      patientCaseId: this.case.uuid,
      createdBy: this.buildCreatedBy(),
      caseDiagnosis: this.case.caseDiagnosis?.map(d => ({ code: d.diagnosisCode, description: d.diagnosisDescription })),
      clinicIds: this.patient?.clinicIds
    }
    this.quickDischargeNoteService.create(request).subscribe((response: any) => {
      this.setNoteOpen(true);
      this.noteId = response.noteId.value;
      this.medicalNoteId = response.id;
      this.errorMessage = undefined;
      this.medialNoteService.medicalNoteID$.next(response.medicalNotId);
      this.cdr.markForCheck();
    }, error => {
      this.setNoteOpen(true);
      this.patientRecordAction = 'ERROR_FINALIZE';
      this.errorMessage = error.error?.message || error.message || 'An error occurred while creating the quick discharge note';
      this.cdr.markForCheck();
    })
  }
  private createDischargeNote() {
    var request: CreateNodeRequest = {
      patient: this.patient,
      patientCaseId: this.case.uuid,
      noteType: 'DISCHARGE',
      providerId: this.loggedInService.getLoggedUser().uuid,
      encounterDate: moment().toDate(),
      createdBy: this.buildCreatedBy(),
      caseDiagnosis: this.case.caseDiagnosis?.map(d => ({ code: d.diagnosisCode, description: d.diagnosisDescription })),
      clinicIds: this.patient?.clinicIds
    }
    this.dischargeNoteService.create(request).subscribe((response: any) => {
      console.log(JSON.stringify(response))
      this.setNoteOpen(true);
      this.noteId = response.noteId.value;
      this.medicalNoteId = response.id;
      this.errorMessage = undefined
      this.medialNoteService.medicalNoteID$.next(response.medicalNotId)
      this.cdr.markForCheck();
    }, error => {
      this.setNoteOpen(true);
      this.patientRecordAction = 'ERROR_FINALIZE';
      this.errorMessage = error.error?.message || error.message || 'An error occurred while creating the discharge note';
      this.cdr.markForCheck();
    })
  }
  executeRecordLineAction(val: string, entityId: number, status?: string, noteId?: string, isForwarded?: boolean, coSigner?: string) {
    if (val === 'View Reason')
      this.getAppointment(entityId)
    if (val === 'Remove')
      this.removeMedicalNote(noteId);
    if (val === 'Complete') {
      this.noteId = noteId;
      this.noteIsForwarded = isForwarded;
      this.noteCoSigner = coSigner;
      this.completeMedicalNote(entityId, status)
      this.medialNoteService.medicalNoteID$.next(this.medicalNoteId)
    }
    if (val === 'View Pdf') {
      this.recordActionEntityId = entityId
      this.recordActionStauts = status
      let exportService$;
      if (status === 'Initial Examination') {
        exportService$ = this.initialExamNoteService.exportPDF(noteId);
      } else if (status === 'Initial Exam Plan') {
        exportService$ = this.initialExamNoteService.exportPlanOfCarePDF(noteId);
      } else if (status === 'Initial Exam Score') {
        exportService$ = this.initialExamNoteService.exportScoreTestPDF(noteId);
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
        const noteType = (status || 'medical-note').toLowerCase().replace(/[\s_]+/g, '-');
        link.download = `${noteType}_${noteId}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
      });
    }
  }
  private setNoteOpen(open: boolean) {
    this.patientRecord = !open;
    this.noteVisibilityChange.emit(open);
    if (open) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  handleBackAction() {
    this.setNoteOpen(false);
    this.getRecords();
    this.refreshRecordActions();
    this.cdr.markForCheck();
  }
  private getAppointment(id: number) {
    this.appointmentService.getAppointmentCancelNoShow(id).subscribe((appointmentCancelNoShowReason: any) => {
      this.appointmentCancelNoShowReason = appointmentCancelNoShowReason
      this.reasonVisibility = true;
      this.cdr.markForCheck();
    })
  }
  private removeMedicalNote(noteId: string) {
    this.initialExamNoteService.remove(noteId).subscribe(() => {
      this.getRecords();
      this.refreshRecordActions();
    })
  }
  private completeMedicalNote(id: number, status: string) {
    this.setNoteOpen(true);
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
    this.cdr.markForCheck();
  }

  // E-Document methods
  private loadEDocuments(): void {
    this.patientEDocumentService.find(this.patientId, this.case.uuid).subscribe({
      next: (response) => {
        this.caseDocuments = response.records.caseList;
        this.allCasesDocuments = response.records.allList;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading e-documents:', error);
        this.cdr.markForCheck();
      }
    });
  }

  toggleEDocumentForm(): void {
    this.showEDocumentForm = !this.showEDocumentForm;
    this.cdr.markForCheck();
  }

  onDocumentSubmitted(formData: EDocumentFormData): void {
    if (!formData.file) {
      return;
    }

    this.isUploadingDocument = true;
    this.cdr.markForCheck();

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
      next: () => {
        this.showEDocumentForm = false;
        this.isUploadingDocument = false;
        this.loadEDocuments();
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error uploading document:', error);
        this.isUploadingDocument = false;
        this.cdr.markForCheck();
      }
    });
  }

  onCancelEDocument(): void {
    this.showEDocumentForm = false;
    this.cdr.markForCheck();
  }

  onViewDocument(doc: EDocumentRecord): void {
    this.isLoadingPreview = true;
    this.previewFileName = doc.fileName;
    this.previewContentType = doc.contentType;
    this.previewVisible = true;
    this.cdr.markForCheck();

    this.patientEDocumentService.download(doc.id).subscribe({
      next: (blob) => {
        if (this.previewUrl) {
          window.URL.revokeObjectURL(this.previewUrl);
        }
        this.previewUrl = window.URL.createObjectURL(blob);
        this.previewSafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.previewUrl);
        this.isLoadingPreview = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error viewing document:', error);
        this.isLoadingPreview = false;
        this.previewVisible = false;
        this.cdr.markForCheck();
      }
    });
  }

  closePreview(): void {
    this.previewVisible = false;
    if (this.previewUrl) {
      window.URL.revokeObjectURL(this.previewUrl);
      this.previewUrl = '';
    }
    this.previewFileName = '';
    this.previewContentType = '';
    this.cdr.markForCheck();
  }

  get isPreviewImage(): boolean {
    return this.previewContentType?.startsWith('image/');
  }

  get isPreviewPdf(): boolean {
    return this.previewContentType === 'application/pdf';
  }

  // Edit E-Document methods
  onEditDocument(doc: EDocumentRecord): void {
    this.editingDocument = doc;
    this.editForm = this.fb.group({
      documentType: [doc.documentType, Validators.required],
      nameOfDocument: [doc.nameOfDocument, Validators.required],
      dateOfReceipt: [doc.dateOfReceipt, Validators.required],
      assignedCase: [doc.assignedCase, Validators.required]
    });
    this.editVisible = true;
    this.cdr.markForCheck();
  }

  get editAssignedCaseOptions(): CaseOption[] {
    return [
      { name: this.case.title || 'Current Case', value: this.case.uuid },
      { name: 'All', value: 'all' }
    ];
  }

  onSaveEdit(): void {
    if (this.editForm.valid && this.editingDocument) {
      this.isSavingEdit = true;
      this.cdr.markForCheck();
      this.patientEDocumentService.updateDocument(this.editingDocument.id, this.editForm.value).subscribe({
        next: () => {
          this.isSavingEdit = false;
          this.editVisible = false;
          this.editingDocument = null;
          this.loadEDocuments();
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('Error updating document:', error);
          this.isSavingEdit = false;
          this.cdr.markForCheck();
        }
      });
    }
  }

  closeEdit(): void {
    this.editVisible = false;
    this.editingDocument = null;
    this.cdr.markForCheck();
  }

  onDeleteDocument(doc: EDocumentRecord): void {
    this.patientEDocumentService.delete(doc.id).subscribe({
      next: () => {
        this.loadEDocuments();
      },
      error: (error) => {
        console.error('Error deleting document:', error);
      }
    });
  }

  onDownloadDocument(doc: EDocumentRecord): void {
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

  // Chart Note methods
  saveChartNote(): void {
    if (!this.chartNote?.trim()) {
      return;
    }

    this.isSavingChartNote = true;
    this.cdr.markForCheck();

    this.patientChartNoteService.saveChartNote(this.case.id, this.chartNote.trim()).subscribe({
      next: () => {
        this.isSavingChartNote = false;
        this.toastr.success('Chart note saved');
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error saving chart note:', error);
        this.isSavingChartNote = false;
        this.toastr.error('Error saving chart note');
        this.cdr.markForCheck();
      }
    });
  }

  clearChartNote(): void {
    this.chartNote = '';
    this.cdr.markForCheck();
  }
}
