import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  @ViewChild(MatStepper, { static: true }) public initialExaminationStepper: MatStepper;
  constructor() { }

  ngOnInit(): void {
  }
  onStepChange(event: StepperSelectionEvent): void {
    this.activeStepIndex = event.selectedIndex;
  }
}
