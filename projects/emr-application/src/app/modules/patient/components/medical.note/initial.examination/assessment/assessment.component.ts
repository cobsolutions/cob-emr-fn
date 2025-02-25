import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit {
  assessmentForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() stepper!: MatStepper
  problemsArray: FormArray;
  goalsArray: FormArray;

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

    if (description) {
      this.goals.push(this.createGoal(description, term, period, met));
      descriptionInput.value = ''; // Clear description field
    }
  }

  removeGoal(index: number) {
    this.goals.removeAt(index);
  }
  getGoalFormGroup(index: number): FormGroup {
    return this.goals.at(index) as FormGroup; // Ensure each item is treated as FormGroup
  }
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm()
  }
  private buildForm() {
    this.assessmentForm = this.fb.group({
      'assessment_diagnosis': new FormControl(null),
      'patient_clinical_presentation': new FormControl(null),
      'parent_patient_education': new FormControl(null),
      'hep': new FormControl(null),
      'rehab_potential': new FormControl("excellent"),
      'contraindications_to_therapy': new FormControl(null),
      'patientAgreement': new FormControl(null),
      'consent_to_care': new FormControl(null),
      problems: this.fb.array([]),
      goals: this.fb.array([])
    })
    this.problemsArray = this.assessmentForm.get('problems') as FormArray;
    this.goalsArray = this.assessmentForm.get('goals') as FormArray;
  }
  next() {
    this.stepper.next();
  }
}
