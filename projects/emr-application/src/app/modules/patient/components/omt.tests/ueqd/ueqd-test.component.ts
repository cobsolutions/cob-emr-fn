import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      q1: ['4', Validators.required],
      q2: ['3', Validators.required],
      q3: ['5', Validators.required],
      q4: ['2', Validators.required],
      q5: ['4', Validators.required],
      q6: ['3', Validators.required],
      q7: ['5', Validators.required],
      q8: ['2', Validators.required],
      q9: ['4', Validators.required],
      q10: ['3', Validators.required],
      q11: ['5', Validators.required]
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
      q1: '4',
      q2: '3',
      q3: '5',
      q4: '2',
      q5: '4',
      q6: '3',
      q7: '5',
      q8: '2',
      q9: '4',
      q10: '3',
      q11: '5'
    });
  }
  ngOnInit(): void {
  }

}
