import { Component, EventEmitter, Input, OnInit, Output, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { MedicalNoteRequest } from '../../../../models/medical.note/medical.note.request';
import { MedicalNoteType } from '../../../../models/medical.note/medical.note.type';
import { SubjectiveMapperService } from '../../components/subjective/services/subjective-mapper.service';
import { ObjectiveMapperService } from '../../components/objective/service/objective-mapper.service';
import { AssessmentMapperService } from '../../components/assessment/service/assessment-mapper.service';
import { BillingMapperService } from '../../components/billing/service/billing-mapper.service';
import { DailyNotePlanMapperService } from './service/daily-note-plan-mapper.service';

@Component({
  selector: 'daily-plan-n',
  templateUrl: './daily-plan-n.component.html',
  styleUrls: ['./daily-plan-n.component.css']
})
export class DailyPlanNComponent implements OnInit, AfterViewInit, OnChanges {
  planForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Output() backToRecords = new EventEmitter<void>();
  @Input() stepper!: MatStepper;
  @Input() planData: any;
  @Input() noteType: MedicalNoteType;
  @Input() parentForm: FormGroup;
  @Input() caseId: string;
  @Input() medicalNoteId: number;
  @Input() noteId: string;

  finalizeNoteVisibility: boolean = false;
  forwardVisibility: boolean = false;
  medicalNoteType: MedicalNoteType = MedicalNoteType.Daily_Note;
  medicalNoteRequest: MedicalNoteRequest;

  instructionsList = [
    { label: 'Progressing Patient Next Visit', value: 'progressing_patient_next_visit' },
    { label: 'Progress Therapeutic Exercises', value: 'progress_therapeutic_exercises' },
    { label: 'Progress Note Needed', value: 'progress_note_needed' },
    { label: 'Anticipate Discharging Patient Next Visit', value: 'anticipate_discharging' }
  ];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private subjectiveMapper: SubjectiveMapperService,
    private objectiveMapperService: ObjectiveMapperService,
    private assessmentMapper: AssessmentMapperService,
    private billingMapperService: BillingMapperService,
    private dailyNotePlanMapper: DailyNotePlanMapperService
  ) { }

  ngOnInit(): void {
    this.planForm = this.fb.group({
      instructions: [''],
      free_area_text: ['']
    });

    if (this.planData) {
      this.fillFormWithData();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['planData'] && changes['planData'].currentValue && this.planForm) {
      this.fillFormWithData();
    }
  }

  ngAfterViewInit(): void {
    this.formReady.emit(this.planForm);
  }

  private fillFormWithData(): void {
    if (!this.planData) {
      return;
    }

    this.planForm.patchValue({
      instructions: this.planData.instructions || '',
      free_area_text: this.planData.free_area_text || ''
    });
  }

  showForwardModal() {
    this.forwardVisibility = true;
  }

  changeForwardVisibility(event: string) {
    if (event === 'close') {
      this.forwardVisibility = false;
    }
  }

  showFinalizeNotePopup() {
    this.medicalNoteRequest = this.buildMedicalNoteModel();
    this.finalizeNoteVisibility = true;
  }

  changeFinalizeNoteVisibility(event: any) {
    if (event === 'no') {
      this.finalizeNoteVisibility = false;
    }
    if (event === 'yes') {
      this.finalizeNoteVisibility = false;
      this.toastr.success('Medical note has been finalized');
      // Delay navigation to allow the modal to properly clean up and remove body scroll lock
      setTimeout(() => {
        this.backToRecords.emit();
      }, 100);
    }
  }

  private buildMedicalNoteModel(): MedicalNoteRequest {
    const subjectiveGroup = this.parentForm.get('subjective') as FormGroup;
    const objectiveGroup = this.parentForm.get('objective') as FormGroup;
    const assessmentGroup = this.parentForm.get('assessment') as FormGroup;
    const planOfCareGroup = this.parentForm.get('planOfCare') as FormGroup;
    const billingGroup = this.parentForm.get('billing') as FormGroup;

    var medicalNoteRequest: MedicalNoteRequest = {
      patientCaseId: this.caseId,
      id: this.medicalNoteId,
      subjective: (subjectiveGroup && !this.isFormGroupEmpty(subjectiveGroup))
        ? this.subjectiveMapper.toModel(subjectiveGroup)
        : null,
      objective: (objectiveGroup && !this.isFormGroupEmpty(objectiveGroup))
        ? this.objectiveMapperService.toModel(objectiveGroup)
        : null,
      assessment: (assessmentGroup && !this.isFormGroupEmpty(assessmentGroup))
        ? this.assessmentMapper.toModel(assessmentGroup)
        : null,
      planOfCare: null,
      billing: (billingGroup && !this.isFormGroupEmpty(billingGroup))
        ? this.billingMapperService.toModel(billingGroup)
        : null,
      dailyNotePlan: (planOfCareGroup && !this.isFormGroupEmpty(planOfCareGroup))
        ? this.dailyNotePlanMapper.toModel(planOfCareGroup)
        : null
    }

    if (medicalNoteRequest.subjective?.basic?.dateOfInitialExamination) {
      medicalNoteRequest.dateOfService = moment(medicalNoteRequest.subjective.basic.dateOfInitialExamination).endOf('day').valueOf();
    }

    this.normalizeYesNoInObject(medicalNoteRequest);
    return medicalNoteRequest;
  }

  private isFormGroupEmpty(formGroup: FormGroup): boolean {
    if (!formGroup) {
      return true;
    }
    const values = formGroup.value;
    return Object.values(values).every(val => {
      if (val && typeof val === 'object') {
        if (Array.isArray(val)) {
          return val.length === 0 || val.every(item =>
            item === null || item === '' || item === undefined
          );
        }
        return Object.values(val).every(nestedVal =>
          nestedVal === null || nestedVal === '' || nestedVal === undefined
        );
      }
      return val === null || val === '' || val === undefined;
    });
  }

  private readonly triStateFields = new Set([
    'complaintsOfAnyRadicularSymptomsInEitherExtremity',
    'extremityReflexesEqualNormalBilateral',
    'sensoryOrVascularDeficitsNoted',
    'vertebralArteryDetails'
  ]);

  private normalizeYesNoInObject(obj: any): void {
    if (obj === null || obj === undefined) {
      return;
    }

    if (Array.isArray(obj)) {
      obj.forEach((item, index) => {
        if (typeof item === 'string') {
          obj[index] = this.normalizeValue(item);
        } else if (typeof item === 'object') {
          this.normalizeYesNoInObject(item);
        }
      });
    } else if (typeof obj === 'object') {
      Object.keys(obj).forEach(key => {
        const value = obj[key];
        if (this.triStateFields.has(key)) {
          return;
        }
        if (typeof value === 'string') {
          obj[key] = this.normalizeValue(value);
        } else if (typeof value === 'object') {
          this.normalizeYesNoInObject(value);
        }
      });
    }
  }

  private normalizeValue(val: any): any {
    if (val === 'na' || val === 'N/A') return val;
    if (val === 'yes') return true;
    if (val === 'no') return false;
    return val;
  }
}
