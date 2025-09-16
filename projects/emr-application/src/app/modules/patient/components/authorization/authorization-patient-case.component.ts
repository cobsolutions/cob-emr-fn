import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'authorization-patient-case',
  templateUrl: './authorization-patient-case.component.html',
  styleUrls: ['./authorization-patient-case.component.css']
})
export class AuthorizationPatientCaseComponent implements OnInit {

  authForm!: FormGroup;
  @Output() changeVisibility = new EventEmitter<string>()
  editingIndex: number | null = null;
  authList = [
    {
      authName: 'Test',
      authType: 'visit',
      authNumber: 30,
      effectiveStart: new Date('2025-09-01'),
      effectiveEnd: new Date('2025-09-20'),
      insurance: { name: 'Axa', id: 393 }
    }
  ];
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
 
  onAdd(): void {
    if (this.authForm.valid) {
      const newAuth = this.authForm.getRawValue();
  
      if (this.editingIndex !== null) {
        // Update existing
        this.authList[this.editingIndex] = newAuth;
        this.editingIndex = null;
      } else {
        // Add new
        this.authList.push(newAuth);
      }
  
      this.authForm.reset();
    } else {
      this.authForm.markAllAsTouched();
    }
  }
  onSave(): void {
    this.authForm.reset();
    this.changeVisibility.emit('close');
  }
  onCancel(): void {
    this.authForm.reset();
    this.changeVisibility.emit('close');
  }
  onEditAuth(auth: any, index: number): void {
    this.authForm.patchValue(auth);
    this.editingIndex = index;
  }
  
  onRemoveAuth(index: number): void {
    this.authList.splice(index, 1);
  }
}
