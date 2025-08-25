import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'uefi-test',
  templateUrl: './uefi-test.component.html',
  styleUrls: ['./uefi-test.component.css']
})
export class UefiTestComponent implements OnInit {

  uefiForm: FormGroup;
  showInstructions = false;

  constructor(private fb: FormBuilder) {
    this.uefiForm = this.createForm();
  }

  ngOnInit(): void {
  }
  createForm(): FormGroup {
    return this.fb.group({
      // Create form controls for all 20 questions
      q1: [null, Validators.required],
      q2: [null, Validators.required],
      q3: [null, Validators.required],
      q4: [null, Validators.required],
      q5: [null, Validators.required],
      q6: [null, Validators.required],
      q7: [null, Validators.required],
      q8: [null, Validators.required],
      q9: [null, Validators.required],
      q10: [null, Validators.required],
      q11: [null, Validators.required],
      q12: [null, Validators.required],
      q13: [null, Validators.required],
      q14: [null, Validators.required],
      q15: [null, Validators.required],
      q16: [null, Validators.required],
      q17: [null, Validators.required],
      q18: [null, Validators.required],
      q19: [null, Validators.required],
      q20: [null, Validators.required],
      q21: [null, Validators.required],
      q22: [null, Validators.required]
    });
  }

  toggleInstructions(): void {
    this.showInstructions = !this.showInstructions;
  }
  calculateScore(): void {
    if (this.uefiForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.uefiForm.controls).forEach(key => {
        this.uefiForm.get(key)?.markAsTouched();
      });
      return;
    }

    // Calculate UEFI score
    const values = [
      this.uefiForm.value.q1,
      this.uefiForm.value.q2,
      this.uefiForm.value.q3,
      this.uefiForm.value.q4,
      this.uefiForm.value.q5,
      this.uefiForm.value.q6,
      this.uefiForm.value.q7,
      this.uefiForm.value.q8,
      this.uefiForm.value.q9,
      this.uefiForm.value.q10,
      this.uefiForm.value.q11,
      this.uefiForm.value.q12,
      this.uefiForm.value.q13,
      this.uefiForm.value.q14,
      this.uefiForm.value.q15,
      this.uefiForm.value.q16,
      this.uefiForm.value.q17,
      this.uefiForm.value.q18,
      this.uefiForm.value.q19,
      this.uefiForm.value.q20
    ].map(val => parseInt(val, 10));

    // Calculate total score (0-80)
    const totalScore = values.reduce((sum, score) => sum + score, 0);
    
    // Calculate percentage score
    const percentageScore = (totalScore / 80) * 100;
    
    alert(`UEFI Score: ${totalScore}/80 (${percentageScore.toFixed(1)}%)`);
  }

  resetForm(): void {
    this.uefiForm.reset();
  }
}
