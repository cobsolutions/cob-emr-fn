import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { FieldDependentsService } from '../../../../services/medical.note/field.dependents.builder/field-dependents.service';
import { MedialNoteService } from '../../../../services/medical.note/medial-note.service';
import { SoapService } from '../../../../services/medical.note/soap/soap.service';
import { FieldControlStyles } from '../../filed.control.style.selector/field.control.style';
import { AssessmentStyles } from './styles/assessment';

@Component({
  selector: 'assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit {
  assessmentForm: FormGroup;
  fields: any
  styles: FieldControlStyles[] = AssessmentStyles;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() stepper!: MatStepper
  @Input() assessmentData: any
  @Input() noteType: string
  problemsArray: FormArray;
  goalsArray: FormArray;
  showPatientComplianceHEP: boolean
  showPatientConsultationMaintain: boolean
  showPatientConsultationbedRest: boolean

  constructor(private fb: FormBuilder
    , private fieldDependentsService: FieldDependentsService
    , private soapService: SoapService) { }
  ngOnInit(): void {
    this.buildForm();
    this.setupValueChangeListeners();
    this.formReady.emit(this.assessmentForm);
    // this.soapService.findSoapFields('assessment', this.noteType).subscribe(fields => {
    //   this.fields = fields['assessment']
    //   this.fields = this.fieldDependentsService.buildHierarchyRecursive(this.fields);
    // });
  }
  private setupValueChangeListeners() {
    this.assessmentForm.get('patient_compliance_hep')?.valueChanges.subscribe(value => {
      this.showPatientComplianceHEP = value
      if (value === false) {
        this.assessmentForm.patchValue({
          patient_consultation_maintain_or_resume: false,
          patient_consultation_against_bed_rest: false
        })
      }
    })
    this.assessmentForm.get('patient_consultation_maintain_or_resume')?.valueChanges.subscribe(value => {
      this.showPatientConsultationMaintain = value
      if (value === false) {
        this.assessmentForm.patchValue({
          patient_consultation_maintain_or_resume_txt: null
        })
      }
    })
    this.assessmentForm.get('patient_consultation_against_bed_rest')?.valueChanges.subscribe(value => {
      this.showPatientConsultationbedRest = value
      if (value === false) {
        this.assessmentForm.patchValue({
          patient_consultation_against_bed_rest_txt: null
        })
      }
    })
  }
  get problems(): FormArray {
    return this.assessmentForm.get('problems') as FormArray;
  }
  get goals(): FormArray {
    return this.assessmentForm.get('goals') as FormArray;
  }

  addProblem(input: HTMLInputElement) {
    const problemValue = input.value.trim();
    if (problemValue) {
      this.problems.push(new FormControl(problemValue)); // Add value to FormArray
      input.value = ''; // Clear input after adding
    }
  }
  onProblemAdded(problemValue: string) {
    this.problems.push(new FormControl(problemValue));
    console.log('✅ Problem added:', problemValue);
  }

  /** Handle when a problem is edited in child */
  onProblemEdited(event: { index: number; value: string }) {
    this.problems.at(event.index).setValue(event.value);
    console.log(`✏️ Problem #${event.index} updated to:`, event.value);
  }

  /** Handle when a problem is removed in child */
  onProblemRemoved(index: number) {
    this.problems.removeAt(index);
    console.log(`🗑 Problem #${index} removed`);
  }

  onGoalAdded(goalValue: any) {
    // goalValue = { description, term, period, met }
    this.goals.push(this.fb.group(goalValue));
  }

  onGoalEdited(event: { index: number; value: any }) {
    const goalGroup = this.goals.at(event.index);
    if (goalGroup) {
      goalGroup.setValue(event.value);
    }
  }

  onGoalRemoved(index: number) {
    this.goals.removeAt(index);
  }
  removeProblem(index: number) {
    this.problems.removeAt(index); // Remove value from FormArray
  }
  createGoal(description = '', term = 'Short Term', period = '1 Visit', met = 'N/A'): FormGroup {
    return this.fb.group({
      description: new FormControl(description),
      term: new FormControl(term),
      period: new FormControl(period),
      met: new FormControl(met)
    });
  }
  addGoal(descriptionInput: HTMLTextAreaElement, termInput: HTMLSelectElement, periodInput: HTMLSelectElement, metInput: HTMLSelectElement) {
    const description = descriptionInput.value.trim();
    const term = termInput.value;
    const period = periodInput.value;
    const met = metInput.value;

    this.goals.push(this.createGoal(description, term, period, met));
    descriptionInput.value = ''; // Clear description field
    termInput.value = 'Short Term';
    periodInput.value = '1-visit';
    metInput.value = 'N/A'
  }

  removeGoal(index: number) {
    this.goals.removeAt(index);
  }
  getGoalFormGroup(index: number): FormGroup {
    return this.goals.at(index) as FormGroup; // Ensure each item is treated as FormGroup
  }


  private buildForm() {
    this.assessmentForm = this.fb.group({
      assessment_diagnosis: [''],
      patient_clinical_presentation: [],
      parent_patient_education: [],
      rehab_potential: [''],
      contraindications_to_therapy: ['no'],
      consent_to_care: [],
      patient_compliance_hep: [false],
      patient_consultation_maintain_or_resume: [false],
      patient_consultation_maintain_or_resume_txt: null,
      patient_consultation_against_bed_rest: [false],
      patient_consultation_against_bed_rest_txt: null,
      problems: this.fb.array([]),
      goals: this.fb.array([])
    })

    setTimeout(() => {
      this.assessmentForm.patchValue(this.assessmentData);
      this.fillGoals();
      this.fillProblems();
    }, 10);

    this.problemsArray = this.assessmentForm.get('problems') as FormArray;
    this.goalsArray = this.assessmentForm.get('goals') as FormArray;
  }
  next() {
    this.stepper.next();
  }
  getstyleFieldControl(fieldName: string): FieldControlStyles {
    return this.styles.find(obj => obj.name === fieldName);
  }
  fillProblems() {
    if (this.assessmentData?.problems) {
      for (let i = 0; i < this.assessmentData?.problems.length; i++) {
        this.problems.push(new FormControl(this.assessmentData?.problems[i]))
      }
    }
  }
  fillGoals() {
    if (this.assessmentData?.goals)
      for (let i = 0; i < this.assessmentData?.goals.length; i++) {
        this.goals.push(new FormControl(this.assessmentData?.goals[i]))
      }
  }

}
