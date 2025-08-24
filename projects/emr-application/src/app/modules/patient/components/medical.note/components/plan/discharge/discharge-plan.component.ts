import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'discharge-plan',
  templateUrl: './discharge-plan.component.html',
  styleUrls: ['./discharge-plan.component.css']
})
export class DischargePlanComponent implements OnInit {
  dischargePlanForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() planData: any
  @Input() noteId: number
  @Input() noteType: string
  @Input() stepper!: MatStepper
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.dischargePlanForm = this.fb.group({
      reason: ['D01'],
      discharge: ['DN1'],
      physicianSignature: [false]
    })
    if (this.planData && this.planData['reason']) {
      this.dischargePlanForm.get('reason').setValue(this.planData['reason'])
    }
    if (this.planData && this.planData['discharge']) {
      this.dischargePlanForm.get('discharge').setValue(this.planData['discharge'])
    }
    if (this.planData && this.planData['physicianSignature']) {
      this.dischargePlanForm.get('physicianSignature').setValue(this.planData['physicianSignature'])
    }
    this.formReady.emit(this.dischargePlanForm);
  }

}
