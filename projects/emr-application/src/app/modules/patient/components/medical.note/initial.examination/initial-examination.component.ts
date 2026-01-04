import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { LoggedInService } from '../../../../security/service/loggedIn/logged-in.service';
import { FinalizeMedicalNoteRequest } from '../../../models/medical.note/finalize.medical.note.request';
import { MedicalNoteRequest } from '../../../models/medical.note/medical.note.request';
import { MedicalNoteType } from '../../../models/medical.note/medical.note.type';
import { InitialExamNoteService } from '../../../services/medical.note/initial.exam/initial-exam-note.service';
import { MedialNoteService } from '../../../services/medical.note/medial-note.service';
import { BillingMapperService } from '../components/billing/service/billing-mapper.service';
import { CPTBillingConverter } from '../components/billing/util/cpt.billing.code.converter';
import { ObjectiveComponent } from '../components/objective/objective.component';
import { SubjectiveMapperService } from '../components/subjective/services/subjective-mapper.service';
import { AssessmentMapperService } from '../components/assessment/service/assessment-mapper.service';
import { PlanOfCareMapperService } from '../components/plan/service/plan-of-care-mapper.service';


@Component({
  selector: 'initial-examination',
  templateUrl: './initial-examination.component.html',
  styleUrls: ['./initial-examination.component.css']
})
export class InitialExaminationComponent implements OnInit {

  stepperOrientation: 'horizontal' | 'vertical' = 'horizontal';
  activeStepIndex: number;
  initialExaminationForm: FormGroup
  @ViewChild('stepper') stepper!: MatStepper; // Get MatStepper reference
  @ViewChild(ObjectiveComponent) objectiveComponent: ObjectiveComponent;
  @Output() formReady = new EventEmitter<FormGroup>();
  visitedSteps: boolean[] = [];
  @Output() back = new EventEmitter<void>();
  @Input() medicalNoteId: number
  @Input() noteId: string
  noteCreator: string
  noteFinalizr: string
  @Input() caseId: number
  medicalNoteSOAP: any
  type: MedicalNoteType = MedicalNoteType.Initial_Examination;
  isLoaded: boolean = true;
  private finalizeSub!: Subscription;
  constructor(private fb: FormBuilder,
    private medialNoteService: MedialNoteService,
    private loggedInService: LoggedInService,
    private initialExamNoteService: InitialExamNoteService,
    private subjectiveMapper: SubjectiveMapperService,
    private billingMapperService: BillingMapperService,
    private assessmentMapper: AssessmentMapperService,
    private planOfCareMapper: PlanOfCareMapperService) {

  }
  ngOnInit(): void {
    this.visitedSteps = [true, false, false, false, false]
    this.initialExaminationForm = this.fb.group({
      subjective: this.fb.group({}),
      objective: this.fb.group({}),
      assessment: this.fb.group({}),
      planOfCare: this.fb.group({}),
      billing: this.fb.group({})
    });
    this.initialExamNoteService.get(this.noteId).subscribe((note: any) => {
      console.log('note : ' , note)
      if (note) {
        this.medicalNoteSOAP = note;

        // Use mappers to convert DTO to form values, then denormalize
        if (note.subjective) {
          const subjectiveFormGroup = this.initialExaminationForm.get('subjective') as FormGroup;
          let subjectiveFormValue = this.subjectiveMapper.fromDto(note.subjective, subjectiveFormGroup);

          // Set the date of service if available
          if (note.dateOfService && subjectiveFormValue.basic) {
            const dateOfService = moment(note.dateOfService);
            subjectiveFormValue.basic.dos_date = dateOfService.format('YYYY-MM-DD');
          }

          // Denormalize true/false to yes/no
          const denormalizedSubjective = this.denormalizeNote(subjectiveFormValue);
          this.initialExaminationForm.get('subjective')?.patchValue(denormalizedSubjective);
        }

        if (note.objective) {
          // Objective doesn't have a centralized mapper, so denormalize and patch directly
          const objectiveFormValue = this.denormalizeNote(note.objective);
          this.initialExaminationForm.get('objective')?.patchValue(objectiveFormValue);
        }

        if (note.assessment) {
          const assessmentFormValue = this.assessmentMapper.fromDto(note.assessment);
          // Denormalize true/false to yes/no
          const denormalizedAssessment = this.denormalizeNote(assessmentFormValue);
          this.initialExaminationForm.get('assessment')?.patchValue(denormalizedAssessment);
        }

        if (note.planOfCare) {
          const planOfCareFormValue = this.planOfCareMapper.fromDto(note.planOfCare);
          // Denormalize true/false to yes/no
          const denormalizedPlanOfCare = this.denormalizeNote(planOfCareFormValue);
          this.initialExaminationForm.get('planOfCare')?.patchValue(denormalizedPlanOfCare);
        }

        if (note.billing) {
          const billingFormValue = this.billingMapperService.fromDto(note.billing);
          // Denormalize true/false to yes/no
          const denormalizedBilling = this.denormalizeNote(billingFormValue);
          this.initialExaminationForm.get('billing')?.patchValue(denormalizedBilling);
        }
      }
    })
  }
  ngOnDestroy() {
    this.finalizeSub?.unsubscribe();
  }
  setFormValues(formGroup: FormGroup, data: any) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormControl) {
        control.setValue(data[key] ?? null);
      } else if (control instanceof FormGroup) {
        this.setFormValues(control, data[key] ?? {});
      } else if (control instanceof FormArray && Array.isArray(data[key])) {
        control.clear(); // Clear the existing FormArray
        data[key].forEach((item: any) => {
          if (control instanceof FormArray) {
            const group = this.fb.group({}); // Create a new FormGroup structure
            this.setFormValues(group, item);
            control.push(group);
          }
        });
      }
    });
  }
  onStepChange(event: StepperSelectionEvent): void {
    this.activeStepIndex = event.selectedIndex;
    event.selectedIndex
    this.visitedSteps[event.selectedIndex] = true;
  }
  setChildForm(section: string, formGroup: FormGroup) {
    this.initialExaminationForm.setControl(section, formGroup);
  }
  soapActions(action: string) {
    if (action === 'back')
      this.backtoPatientRecordActions()
    if (action === 'draft') {
      this.draft();
    }

  }
  backtoPatientRecordActions() {
    this.back.emit();
  }
  private buildMedicalNoteModel(): MedicalNoteRequest {

    var medicalNoteRequest: MedicalNoteRequest = {
      caseId: this.caseId,
      id: this.medicalNoteId,
      subjective: this.subjectiveMapper.toModel(this.initialExaminationForm.get('subjective') as FormGroup),
      objective: null,
      assessment: null,
      planOfCare: null,
      billing: null
    }
    medicalNoteRequest.dateOfService = moment(medicalNoteRequest.subjective.basic.dateOfInitialExamination).endOf('day').valueOf();
    //Normalize Yes , No to true or false
    this.normalizeYesNoInObject(medicalNoteRequest);
    return medicalNoteRequest;
  }
  draft() {
    this.draftAction().subscribe(data => {
      this.backtoPatientRecordActions();
    })
  }
  draftAction(): Observable<any> {
    var medicalNoteRequest: MedicalNoteRequest = this.buildMedicalNoteModel();
    console.log('medicalNoteRequest : ', medicalNoteRequest)
    return this.initialExamNoteService.draft(medicalNoteRequest, this.noteId);
  }
  getAllFormValues(formGroup: FormGroup): any {
    const values: any = {};

    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);

      if (control instanceof FormControl) {
        values[key] = this.normalizeValue(control.value);
      }

      else if (control instanceof FormGroup) {
        values[key] = this.getAllFormValues(control);
      }

      else if (control instanceof FormArray) {
        values[key] = control.controls.map(ctrl =>
          ctrl instanceof FormGroup
            ? this.getAllFormValues(ctrl)
            : this.normalizeValue(ctrl.value)
        );
      }
    });

    return values;
  }
  private normalizeValue(val: any): any {
    if (val === 'yes') return true;
    if (val === 'no') return false;
    if (val === 'na' || val === 'N/A') return null;
    return val;
  }

  private denormalizeValue(val: any): any {
    if (val === true) return 'yes';
    if (val === false) return 'no';
    if (val === null || val === undefined) return null;
    return val;
  }

  private denormalizeNote(note: any): any {
    if (note === null || note === undefined) {
      return note;
    }

    // Deep clone the note to avoid mutating the original
    const denormalized = JSON.parse(JSON.stringify(note));
    this.denormalizeTrueFalseInObject(denormalized);
    return denormalized;
  }

  private denormalizeTrueFalseInObject(obj: any): void {
    if (obj === null || obj === undefined) {
      return;
    }

    if (Array.isArray(obj)) {
      obj.forEach((item, index) => {
        if (typeof item === 'boolean') {
          obj[index] = this.denormalizeValue(item);
        } else if (typeof item === 'object') {
          this.denormalizeTrueFalseInObject(item);
        }
      });
    } else if (typeof obj === 'object') {
      Object.keys(obj).forEach(key => {
        const value = obj[key];
        if (typeof value === 'boolean') {
          obj[key] = this.denormalizeValue(value);
        } else if (typeof value === 'object') {
          this.denormalizeTrueFalseInObject(value);
        }
      });
    }
  }

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
        if (typeof value === 'string') {
          obj[key] = this.normalizeValue(value);
        } else if (typeof value === 'object') {
          this.normalizeYesNoInObject(value);
        }
      });
    }
  }

}
