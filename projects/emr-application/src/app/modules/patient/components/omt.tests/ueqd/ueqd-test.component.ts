import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { dashValidator } from '../validator/not.selected';

@Component({
  selector: 'ueqd-test',
  templateUrl: './ueqd-test.component.html',
  styleUrls: ['./ueqd-test.component.css']
})
export class UeqdTestComponent implements OnInit {
  quickDashForm: FormGroup;
  showInstructions = false;
  constructor(private fb: FormBuilder) {
    this.quickDashForm = this.createForm();
  }
  createForm(): FormGroup {
    return this.fb.group({
      // Patient Satisfaction - Pain Level
      painLevel: [null, [Validators.required, Validators.min(0), Validators.max(10)]],

      // Quick DASH questions
      q1: ['NT', [Validators.required, dashValidator()]],
      q2: ['NT', [Validators.required, dashValidator()]],
      q3: ['NT', [Validators.required, dashValidator()]],
      q4: ['NT', [Validators.required, dashValidator()]],
      q5: ['NT', [Validators.required, dashValidator()]],
      q6: ['NT', [Validators.required, dashValidator()]],
      q7: ['NT', [Validators.required, dashValidator()]],
      q8: ['NT', [Validators.required, dashValidator()]],
      q9: ['NT', [Validators.required, dashValidator()]],
      q10: ['NT', [Validators.required, dashValidator()]],
      q11: ['NT', [Validators.required, dashValidator()]]
    });
  }
  toggleInstructions(): void {
    this.showInstructions = !this.showInstructions;
  }
  calculateScore(): void {
    if (this.quickDashForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.quickDashForm.controls).forEach(key => {
        this.quickDashForm.get(key)?.markAsTouched();
      });
      return;
    }

    // Calculate QuickDASH score according to the official formula
    const values = [
      this.quickDashForm.value.q1,
      this.quickDashForm.value.q2,
      this.quickDashForm.value.q3,
      this.quickDashForm.value.q4,
      this.quickDashForm.value.q5,
      this.quickDashForm.value.q6,
      this.quickDashForm.value.q7,
      this.quickDashForm.value.q8,
      this.quickDashForm.value.q9,
      this.quickDashForm.value.q10,
      this.quickDashForm.value.q11
    ].map(val => parseInt(val, 10));

    // Filter out any "Not Tested" responses (if needed)
    const validValues = values.filter(val => !isNaN(val) && val >= 1 && val <= 5);

    if (validValues.length !== 11) {
      alert('Please answer all questions to calculate the score.');
      return;
    }

    // Calculate the score according to the QuickDASH formula
    const sum = validValues.reduce((acc, curr) => acc + curr, 0);
    const score = ((sum - 11) / 44) * 100;

    alert(`QuickDASH Score: ${score.toFixed(2)}`);
  }
  resetForm(): void {
    this.quickDashForm.reset({
      q1: 'NT',
      q2: 'NT',
      q3: 'NT',
      q4: 'NT',
      q5: 'NT',
      q6: 'NT',
      q7: 'NT',
      q8: 'NT',
      q9: 'NT',
      q10: 'NT',
      q11: 'NT'
    });
  }
  ngOnInit(): void {
  }
}
