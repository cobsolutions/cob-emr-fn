import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
@Component({
  selector: 'subjective',
  templateUrl: './subjective.component.html',
  styleUrls: ['./subjective.component.css']
})
export class SubjectiveComponent implements OnInit {
  subjectiveForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() stepper!: MatStepper
  constructor(private fb: FormBuilder) {
    
  }

  ngOnInit(): void {
    this.subjectiveForm = this.fb.group({
      basic: this.fb.group({}),
      priorFunction: this.fb.group({}),
      currentFunction: this.fb.group({}),
      pain: this.fb.group({}),
      medicalHistory: this.fb.group({})

    });
    this.formReady.emit(this.subjectiveForm);
  }
  setChildForm(section: string, formGroup: FormGroup) {
    this.subjectiveForm.setControl(section, formGroup);
  }
  next() {
    this.stepper.next();
  }

}
