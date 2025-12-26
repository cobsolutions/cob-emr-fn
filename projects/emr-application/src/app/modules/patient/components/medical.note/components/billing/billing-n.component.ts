import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'billing-n',
  templateUrl: './billing-n.component.html',
  styleUrls: ['./billing-n.component.css']
})
export class BillingNComponent implements OnInit {
  @Input() parentForm: FormGroup
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() stepper!: MatStepper
  @Input() noteTypeId: string
  BillingForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.BillingForm = this.fb.group({
      dailyNoteIncluded: [true],
      precautions: [''],
      objective_findings: [''],
      pre_Treatment: [''],
      post_Treatment: [''],
      untimed_codes: this.fb.group({}),
      strapping: this.fb.group({}),
      directTimedCodes: this.fb.group({})
    });
  }
  setChildForm(section: string, formGroup: FormGroup) {
    // console.log('section ' + section);
    // console.log('formGroup.controls ' + JSON.stringify(formGroup.controls))
    // Object.keys(formGroup.controls).forEach(key => {
    //   console.log(key, formGroup.get(key));
    // });
    this.BillingForm.setControl(section, formGroup);
  }
}
