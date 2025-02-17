import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'initial-examination',
  templateUrl: './initial-examination.component.html',
  styleUrls: ['./initial-examination.component.css']
})
export class InitialExaminationComponent implements OnInit {
  stepperOrientation: 'horizontal' | 'vertical' = 'horizontal';
  activeStepIndex: number;
  initialExaminationForm: FormGroup
  constructor() { }

  ngOnInit(): void {
    this.initialExaminationForm = new FormGroup({
      'subjective': new FormGroup({}),
      'objective': new FormGroup({}),
      'assessment': new FormGroup({}),
      'plan': new FormGroup({}),
      'billing': new FormGroup({}),
    });
  }
  onStepChange(event: StepperSelectionEvent): void {
    this.activeStepIndex = event.selectedIndex;
  }
}
