import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

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
  constructor(private fb: FormBuilder) {
   
  }
  ngOnInit(): void {
    this.initialExaminationForm = this.fb.group({
      subjective: this.fb.group({}),
      objective: this.fb.group({}),
      assessment: this.fb.group({}),
      planOfCare: this.fb.group({}),
      billing: this.fb.group({})
    });
  }
  onStepChange(event: StepperSelectionEvent): void {
    this.activeStepIndex = event.selectedIndex;
  }
}
