import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
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
  @Output() formReady = new EventEmitter<FormGroup>();
  visitedSteps: boolean[] = [];
  constructor(private fb: FormBuilder) {

  }
  ngOnInit(): void {
    this.visitedSteps = [true,false,false,false,false]
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
    event.selectedIndex
    this.visitedSteps[event.selectedIndex] = true;
  }
  setChildForm(section: string, formGroup: FormGroup) {
    this.initialExaminationForm.setControl(section, formGroup);
  }
}
