import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { OmtTestService } from '../../../services/test/omt-test.service';
import { dashValidator } from '../validator/not.selected';

@Component({
  selector: 'ueqd-test',
  templateUrl: './ueqd-test.component.html',
  styleUrls: ['./ueqd-test.component.css']
})
export class UeqdTestComponent implements OnInit {
  quickDashForm: FormGroup;
  showInstructions = false;
  constructor(private fb: FormBuilder
    ,private omtTestService:OmtTestService) {
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
    const result = {
      "Q1": parseInt(this.quickDashForm.value.q1, 10),
      "Q2": parseInt(this.quickDashForm.value.q2, 10),
      "Q3": parseInt(this.quickDashForm.value.q3, 10),
      "Q4": parseInt(this.quickDashForm.value.q4, 10),
      "Q5": parseInt(this.quickDashForm.value.q5, 10),
      "Q6": parseInt(this.quickDashForm.value.q6, 10),
      "Q7": parseInt(this.quickDashForm.value.q7, 10),
      "Q8": parseInt(this.quickDashForm.value.q8, 10),
      "Q9": parseInt(this.quickDashForm.value.q9, 10),
      "Q10": parseInt(this.quickDashForm.value.q10, 10),
      "Q11": parseInt(this.quickDashForm.value.q11, 10)
    };
    this.omtTestService.ueqdTest(result).subscribe(d=>{
      //Finalize ueqd Test  
    })
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
