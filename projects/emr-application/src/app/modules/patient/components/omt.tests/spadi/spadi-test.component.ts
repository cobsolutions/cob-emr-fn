import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'spadi-test',
  templateUrl: './spadi-test.component.html',
  styleUrls: ['./spadi-test.component.css']
})
export class SpadiTestComponent implements OnInit {
  spadiForm: FormGroup;
  showInstructions = false;

  constructor(private fb: FormBuilder) {
    this.spadiForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      // Pain Scale Questions (1-5)
      pain1: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      pain2: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      pain3: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      pain4: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      pain5: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      
      // Disability Scale Questions (6-13)
      disability6: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      disability7: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      disability8: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      disability9: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      disability10: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      disability11: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      disability12: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      disability13: [null, [Validators.required, Validators.min(0), Validators.max(10)]]
    });
  }
  toggleInstructions(): void {
    this.showInstructions = !this.showInstructions;
  }
  calculateScore(): void {
    if (this.spadiForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.spadiForm.controls).forEach(key => {
        this.spadiForm.get(key)?.markAsTouched();
      });
      return;
    }

    // Calculate SPADI score
    const painValues = [
      this.spadiForm.value.pain1,
      this.spadiForm.value.pain2,
      this.spadiForm.value.pain3,
      this.spadiForm.value.pain4,
      this.spadiForm.value.pain5
    ].map(val => parseInt(val, 10));

    const disabilityValues = [
      this.spadiForm.value.disability6,
      this.spadiForm.value.disability7,
      this.spadiForm.value.disability8,
      this.spadiForm.value.disability9,
      this.spadiForm.value.disability10,
      this.spadiForm.value.disability11,
      this.spadiForm.value.disability12,
      this.spadiForm.value.disability13
    ].map(val => parseInt(val, 10));

    // Calculate pain subscore (0-50)
    const painScore = painValues.reduce((sum, score) => sum + score, 0);
    
    // Calculate disability subscore (0-80)
    const disabilityScore = disabilityValues.reduce((sum, score) => sum + score, 0);
    
    // Calculate total score (0-130)
    const totalScore = painScore + disabilityScore;
    
    // Calculate percentage scores
    const painPercentage = (painScore / 50) * 100;
    const disabilityPercentage = (disabilityScore / 80) * 100;
    const totalPercentage = (totalScore / 130) * 100;
    
    alert(`SPADI Score:
      Pain: ${painScore}/50 (${painPercentage.toFixed(1)}%)
      Disability: ${disabilityScore}/80 (${disabilityPercentage.toFixed(1)}%)
      Total: ${totalScore}/130 (${totalPercentage.toFixed(1)}%)`);
  }

  resetForm(): void {
    this.spadiForm.reset();
  }
  ngOnInit(): void {
  }

}
