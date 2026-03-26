import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import * as moment from 'moment';
import { MedicalNoteRequest } from '../../../../models/medical.note/medical.note.request';
import { MedicalNoteType } from '../../../../models/medical.note/medical.note.type';
import { ToastrService } from 'ngx-toastr';
import { SubjectiveMapperService } from '../subjective/services/subjective-mapper.service';
import { ObjectiveMapperService } from '../objective/service/objective-mapper.service';
import { AssessmentMapperService } from '../assessment/service/assessment-mapper.service';
import { PlanOfCareMapperService } from '../plan/service/plan-of-care-mapper.service';
import { BillingMapperService } from './service/billing-mapper.service';

@Component({
  selector: 'billing-n',
  templateUrl: './billing-n.component.html',
  styleUrls: ['./billing-n.component.css']
})
export class BillingNComponent implements OnInit {
  @Input() parentForm: FormGroup
  @Output() formReady = new EventEmitter<FormGroup>();
  @Output() backToRecords = new EventEmitter<void>();
  @Input() stepper!: MatStepper
  @Input() noteTypeId: string
  @Input() caseId: string
  @Input() medicalNoteId: number
  @Input() noteId: string
  @Input() billingData: any;
  BillingForm: FormGroup;
  finalizeNoteVisibility: boolean = false;
  forwardVisibility: boolean = false;
  @Input() noteType: MedicalNoteType;
  medicalNoteRequest: MedicalNoteRequest;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private subjectiveMapper: SubjectiveMapperService,
    private objectiveMapperService: ObjectiveMapperService,
    private assessmentMapper: AssessmentMapperService,
    private planOfCareMapper: PlanOfCareMapperService,
    private billingMapperService: BillingMapperService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.formReady.emit(this.BillingForm);
  }
  initForm() {
    this.BillingForm = this.fb.group({
      dailyNoteIncluded: [true],
      precautions: [''],
      objective_findings: [''],
      pre_treatment: [''],
      post_treatment: [''],
      untimedCodes: this.fb.group({}),
      strapping: this.fb.group({}),
      directTimedCodes: this.fb.group({}),
      calendarMonth: this.fb.group({}),
      nerveConductionStudies: this.fb.group({}),
      respiratory: this.fb.group({}),
      otherTreatmentProcedures: this.fb.group({}),
      supplies: this.fb.group({}),
      splintsorthotics: this.fb.group({}),
      casts: this.fb.group({}),
      braces: this.fb.group({}),
    });
  }
  setChildForm(section: string, formGroup: FormGroup) {
    // console.log('section ' + section);
    // console.log('formGroup.controls ' + JSON.stringify(formGroup.controls))
    // Object.keys(formGroup.controls).forEach(key => {
    //   console.log(key, formGroup.get(key));
    // });
    this.BillingForm.setControl(section, formGroup);  
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
      planOfCare: (planOfCareGroup && !this.isFormGroupEmpty(planOfCareGroup))
        ? this.planOfCareMapper.toModel(planOfCareGroup)
        : null,
      billing: (billingGroup && !this.isFormGroupEmpty(billingGroup))
        ? this.billingMapperService.toModel(billingGroup)
        : null,
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
    'vertebralArteryDetails',
    'isHistoryOfFalls',
    'weightLoss'
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
