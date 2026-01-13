import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { LoggedInService } from '../../../../security/service/loggedIn/logged-in.service';
import { MedicalNoteRequest } from '../../../models/medical.note/medical.note.request';
import { MedicalNoteType } from '../../../models/medical.note/medical.note.type';
import { InitialExamNoteService } from '../../../services/medical.note/initial.exam/initial-exam-note.service';
import { MedialNoteService } from '../../../services/medical.note/medial-note.service';
import { AssessmentMapperService } from '../components/assessment/service/assessment-mapper.service';
import { BillingMapperService } from '../components/billing/service/billing-mapper.service';
import { ObjectiveComponent } from '../components/objective/objective.component';
import { ObjectiveMapperService } from '../components/objective/service/objective-mapper.service';
import { PlanOfCareMapperService } from '../components/plan/service/plan-of-care-mapper.service';
import { SubjectiveMapperService } from '../components/subjective/services/subjective-mapper.service';


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
  showScrollArrow: boolean = false;
  showUpArrow: boolean = false;
  showDownArrow: boolean = false;
  constructor(private fb: FormBuilder,
    private medialNoteService: MedialNoteService,
    private loggedInService: LoggedInService,
    private initialExamNoteService: InitialExamNoteService,
    private subjectiveMapper: SubjectiveMapperService,
    private objectiveMapperService: ObjectiveMapperService,
    private billingMapperService: BillingMapperService,
    private assessmentMapper: AssessmentMapperService,
    private planOfCareMapper: PlanOfCareMapperService) {

  }
  private pendingObjectiveData: any = null;
  private pendingSubjectiveData: any = null;
  private pendingAssessmentData: any = null;
  private pendingPlanOfCareData: any = null;
  private pendingBillingData: any = null;

  ngOnInit(): void {
    this.visitedSteps = [true, false, false, false, false]
    this.initialExaminationForm = this.fb.group({
      subjective: this.fb.group({}),
      objective: this.fb.group({}),
      assessment: this.fb.group({}),
      planOfCare: this.fb.group({}),
      billing: this.fb.group({})
    });

    // Add scroll event listener
    window.addEventListener('scroll', this.onScroll.bind(this));

    this.initialExamNoteService.get(this.noteId).subscribe((note: any) => {
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
          const denormalizedSubjective = this.denormalizeNote(subjectiveFormValue, subjectiveFormGroup);
          this.pendingSubjectiveData = denormalizedSubjective;
          // Patch now if form is already set, otherwise wait for formReady
          if (this.initialExaminationForm.get('subjective')?.get('basic')) {
            this.initialExaminationForm.get('subjective')?.patchValue(denormalizedSubjective);
            this.pendingSubjectiveData = null;
          }
        }

        if (note.objective) {
          const objectiveFormGroup = this.initialExaminationForm.get('objective') as FormGroup;
          let objectiveFormValue = this.objectiveMapperService.fromDto(note.objective, objectiveFormGroup)
          const denormalizedObjective = this.denormalizeNote(objectiveFormValue, objectiveFormGroup);
          this.pendingObjectiveData = denormalizedObjective;
          // Patch now if form is already set, otherwise wait for formReady
          // Check if both profile AND inspection forms are initialized
          const profileExists = this.initialExaminationForm.get('objective')?.get('profile');
          const inspectionInitialized = this.initialExaminationForm.get('objective')?.get('inspection')?.get('patient_consent');
          if (profileExists && inspectionInitialized) {
            this.initialExaminationForm.get('objective')?.patchValue(denormalizedObjective);
            this.pendingObjectiveData = null;
          }
        }

        if (note.assessment) {
          const assessmentFormValue = this.assessmentMapper.fromDto(note.assessment);
          // Denormalize true/false to yes/no
          const assessmentFormGroup = this.initialExaminationForm.get('assessment') as FormGroup;
          const denormalizedAssessment = this.denormalizeNote(assessmentFormValue, assessmentFormGroup);
          this.pendingAssessmentData = denormalizedAssessment;
          // Check if form is already set up
          if (Object.keys((this.initialExaminationForm.get('assessment') as FormGroup).controls).length > 0) {
            this.initialExaminationForm.get('assessment')?.patchValue(denormalizedAssessment);
            this.pendingAssessmentData = null;
          }
        }

        if (note.planOfCare) {
          const planOfCareFormValue = this.planOfCareMapper.fromDto(note.planOfCare);
          // Denormalize true/false to yes/no
          const planOfCareFormGroup = this.initialExaminationForm.get('planOfCare') as FormGroup;
          const denormalizedPlanOfCare = this.denormalizeNote(planOfCareFormValue, planOfCareFormGroup);
          this.pendingPlanOfCareData = denormalizedPlanOfCare;
          // Check if form is already set up
          if (Object.keys((this.initialExaminationForm.get('planOfCare') as FormGroup).controls).length > 0) {
            this.initialExaminationForm.get('planOfCare')?.patchValue(denormalizedPlanOfCare);
            this.pendingPlanOfCareData = null;
          }
        }

        if (note.billing) {
          const billingFormValue = this.billingMapperService.fromDto(note.billing);
          // Denormalize true/false to yes/no
          const billingFormGroup = this.initialExaminationForm.get('billing') as FormGroup;
          const denormalizedBilling = this.denormalizeNote(billingFormValue, billingFormGroup);
          this.pendingBillingData = denormalizedBilling;
          // Check if form is already set up
          if (Object.keys((this.initialExaminationForm.get('billing') as FormGroup).controls).length > 0) {
            this.initialExaminationForm.get('billing')?.patchValue(denormalizedBilling);
            this.pendingBillingData = null;
          }
        }
      }
    })
  }
  ngOnDestroy() {
    this.finalizeSub?.unsubscribe();
    window.removeEventListener('scroll', this.onScroll.bind(this));
  }

  onScroll(): void {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    // Show arrow container if page is scrollable
    this.showScrollArrow = scrollHeight > clientHeight + 100;

    // Show up arrow if scrolled down more than 200px
    this.showUpArrow = scrollTop > 200;

    // Show down arrow if there's more content below (not near bottom)
    const isNearBottom = (scrollTop + clientHeight) >= (scrollHeight - 150);
    this.showDownArrow = !isNearBottom && this.showScrollArrow;
  }

  scrollPageUp(): void {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const viewportHeight = window.innerHeight;
    const targetScroll = Math.max(0, currentScroll - viewportHeight * 0.8);

    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  }

  scrollPageDown(): void {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const viewportHeight = window.innerHeight;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const targetScroll = Math.min(maxScroll, currentScroll + viewportHeight * 0.8);

    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToBottom(): void {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
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

    // Patch pending data if available
    if (section === 'objective' && this.pendingObjectiveData) {
      this.initialExaminationForm.get('objective')?.patchValue(this.pendingObjectiveData);
      this.pendingObjectiveData = null;
    } else if (section === 'subjective' && this.pendingSubjectiveData) {
      this.initialExaminationForm.get('subjective')?.patchValue(this.pendingSubjectiveData);
      this.pendingSubjectiveData = null;
    } else if (section === 'assessment' && this.pendingAssessmentData) {
      this.initialExaminationForm.get('assessment')?.patchValue(this.pendingAssessmentData);
      this.pendingAssessmentData = null;
    } else if (section === 'planOfCare' && this.pendingPlanOfCareData) {
      this.initialExaminationForm.get('planOfCare')?.patchValue(this.pendingPlanOfCareData);
      this.pendingPlanOfCareData = null;
    } else if (section === 'billing' && this.pendingBillingData) {
      this.initialExaminationForm.get('billing')?.patchValue(this.pendingBillingData);
      this.pendingBillingData = null;
    }
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
    const formRawData = this.initialExaminationForm as FormGroup
    console.log('formRawData  ', formRawData.getRawValue())
    var medicalNoteRequest: MedicalNoteRequest = {
      caseId: this.caseId,
      id: this.medicalNoteId,
      subjective: this.subjectiveMapper.toModel(this.initialExaminationForm.get('subjective') as FormGroup),
      objective: this.objectiveMapperService.toModel(this.initialExaminationForm.get('objective') as FormGroup),
      assessment: this.assessmentMapper.toModel(this.initialExaminationForm.get('assessment') as FormGroup),
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

  private denormalizeNote(note: any, formGroup?: FormGroup): any {
    if (note === null || note === undefined) {
      return note;
    }

    // Deep clone the note to avoid mutating the original
    const denormalized = JSON.parse(JSON.stringify(note));
    this.denormalizeTrueFalseInObject(denormalized, formGroup);
    return denormalized;
  }

  private denormalizeTrueFalseInObject(obj: any, formGroup?: FormGroup): void {
    if (obj === null || obj === undefined) {
      return;
    }

    if (Array.isArray(obj)) {
      obj.forEach((item, index) => {
        if (typeof item === 'boolean') {
          obj[index] = this.denormalizeValue(item);
        } else if (typeof item === 'object') {
          this.denormalizeTrueFalseInObject(item, undefined);
        }
      });
    } else if (typeof obj === 'object') {
      Object.keys(obj).forEach(key => {
        const value = obj[key];

        if (typeof value === 'boolean') {
          // Check if this field exists in the form and if it's initialized with a boolean
          const shouldKeepBoolean = this.shouldKeepAsBoolean(key, formGroup);

          if (!shouldKeepBoolean) {
            obj[key] = this.denormalizeValue(value);
          }
        } else if (typeof value === 'object') {
          // Navigate deeper into nested FormGroups if available
          const nestedFormGroup = formGroup?.get(key) as FormGroup;
          this.denormalizeTrueFalseInObject(value, nestedFormGroup);
        }
      });
    }
  }

  private shouldKeepAsBoolean(key: string, formGroup?: FormGroup): boolean {
    if (!formGroup) {
      return false;
    }

    // Try to get the form control for this key
    const control = formGroup.get(key);

    if (control) {
      // If the control exists and its initial value is boolean, keep it as boolean (checkbox)
      // This works because checkboxes are initialized with boolean values (true/false)
      // while radio buttons are initialized with null or string values ('yes'/'no')
      const initialValue = control.value;
      return typeof initialValue === 'boolean';
    }

    return false;
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
