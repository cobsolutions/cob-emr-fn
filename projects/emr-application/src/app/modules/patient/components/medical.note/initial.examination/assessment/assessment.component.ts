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

  get problems(): FormArray {
    return this.assessmentForm.get('problems') as FormArray;
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
      problems: this.fb.array([])
    })
    this.problemsArray = this.assessmentForm.get('problems') as FormArray;

  }

}
