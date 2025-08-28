import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OmtTestService } from '../../../../services/test/omt-test.service';

@Component({
  selector: 'spine-olbp-test',
  templateUrl: './olbp-test.component.html',
  styleUrls: ['./olbp-test.component.css']
})
export class OlbpTestComponent implements OnInit {
  oswestryForm: FormGroup;
  showInstructions = false;
  @Output() getResult = new EventEmitter<any>()
  sections = [
    "Pain Intensity",
    "Personal Care (Washing, Dressing, etc.)",
    "Lifting",
    "Walking",
    "Sitting",
    "Standing",
    "Sleeping",
    "Social Life",
    "Traveling",
    "Employment / Homemaking"
  ];
  constructor(private fb: FormBuilder, private omtTestService: OmtTestService) {
    this.oswestryForm = this.createForm();
  }

  ngOnInit(): void {
  }
  createForm(): FormGroup {
    return this.fb.group({
      // Patient Satisfaction - Pain Level
      painLevel: [null, [Validators.required, Validators.min(0), Validators.max(10)]],

      // Oswestry sections
      q1: [null, Validators.required],
      q2: [null, Validators.required],
      q3: [null, Validators.required],
      q4: [null, Validators.required],
      q5: [null, Validators.required],
      q6: [null, Validators.required],
      q7: [null, Validators.required],
      q8: [null, Validators.required],
      q9: [null, Validators.required],
      q10: [null, Validators.required]
    });
  }

  toggleInstructions(): void {
    this.showInstructions = !this.showInstructions;
  }

  calculateScore(): void {
    if (this.oswestryForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.oswestryForm.controls).forEach(key => {
        this.oswestryForm.get(key)?.markAsTouched();
      });
      return;
    }
    const result = {
      "Q1": parseInt(this.oswestryForm.value.q1, 10),
      "Q2": parseInt(this.oswestryForm.value.q2, 10),
      "Q3": parseInt(this.oswestryForm.value.q3, 10),
      "Q4": parseInt(this.oswestryForm.value.q4, 10),
      "Q5": parseInt(this.oswestryForm.value.q5, 10),
      "Q6": parseInt(this.oswestryForm.value.q6, 10),
      "Q7": parseInt(this.oswestryForm.value.q7, 10),
      "Q8": parseInt(this.oswestryForm.value.q8, 10),
      "Q9": parseInt(this.oswestryForm.value.q9, 10),
      "Q10": parseInt(this.oswestryForm.value.q10, 10)
    };
    this.omtTestService.spine(result, "olbp").subscribe(val => {
      this.getResult.emit(val)
    })
  }

  resetForm(): void {
    this.oswestryForm.reset();
  }
}
