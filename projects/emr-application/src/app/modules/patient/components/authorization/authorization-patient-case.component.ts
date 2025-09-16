import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'authorization-patient-case',
  templateUrl: './authorization-patient-case.component.html',
  styleUrls: ['./authorization-patient-case.component.css']
})
export class AuthorizationPatientCaseComponent implements OnInit {
  authForm!: FormGroup;
  @Output()  changeVisibility = new EventEmitter<string>()
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.authForm = this.fb.group({
      authName: ['test', [Validators.required]],
      authType: ['visit', [Validators.required]],
      authNumber: [30, [Validators.required, Validators.min(1)]],
      effectiveStart: ['2025-09-01', [Validators.required]],
      effectiveEnd: ['2025-09-20', [Validators.required]],
      insuranceCase: [{ value: 'Axa', disabled: true }]
    });
  }
  onSubmit(): void {
    if (this.authForm.valid) {
      console.log('Auth Data:', this.authForm.getRawValue());
      this.changeVisibility.emit('close');
    } else {
      this.authForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.authForm.reset();
    this.changeVisibility.emit('close');
  }
}
