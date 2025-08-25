import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OmtTestService } from '../../../../services/test/omt-test.service';

@Component({
  selector: 'spine-ndi-test',
  templateUrl: './ndi-test.component.html',
  styleUrls: ['./ndi-test.component.css']
})
export class NdiTestComponent implements OnInit {
  ndiForm: FormGroup;
  showInstructions = false;

  // Section titles for the form
  sections = [
    "Pain Intensity",
    "Personal Care (Washing, Dressing etc.)",
    "Lifting",
    "Reading",
    "Headache",
    "Concentration",
    "Work",
    "Driving",
    "Sleeping",
    "Recreation"
  ];

  constructor(private fb: FormBuilder, private omtTestService: OmtTestService) {
    this.ndiForm = this.createForm();
  }
  createForm(): FormGroup {
    return this.fb.group({
      // Patient Satisfaction - Pain Level
      painLevel: [null, [Validators.required, Validators.min(0), Validators.max(10)]],

      // NDI sections
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
    if (this.ndiForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.ndiForm.controls).forEach(key => {
        this.ndiForm.get(key)?.markAsTouched();
      });
      return;
    }

    const result = {
      "Q1": parseInt(this.ndiForm.value.q1, 10),
      "Q2": parseInt(this.ndiForm.value.q2, 10),
      "Q3": parseInt(this.ndiForm.value.q3, 10),
      "Q4": parseInt(this.ndiForm.value.q4, 10),
      "Q5": parseInt(this.ndiForm.value.q5, 10),
      "Q6": parseInt(this.ndiForm.value.q6, 10),
      "Q7": parseInt(this.ndiForm.value.q7, 10),
      "Q8": parseInt(this.ndiForm.value.q8, 10),
      "Q9": parseInt(this.ndiForm.value.q9, 10),
      "Q10": parseInt(this.ndiForm.value.q10, 10)
    };
    this.omtTestService.spine(result, "ndi").subscribe(result => {
      console.log(JSON.stringify(result))
    })
  }

  resetForm(): void {
    this.ndiForm.reset();
  }

  ngOnInit(): void {
  }

}
