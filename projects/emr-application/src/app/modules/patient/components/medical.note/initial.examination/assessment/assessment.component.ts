import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
      'consent_to_care': new FormControl(null)
    })
  }

}
