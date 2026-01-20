import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OmtTestService } from '../../../medical.note/components/objective/service/omt-test/omt-test.service';

@Component({
  selector: 'spine-molbp-test',
  templateUrl: './molbp-test.component.html',
  styleUrls: ['./molbp-test.component.css']
})
export class MolbpTestComponent implements OnInit {
  oswestryForm: FormGroup;
  showInstructions = false;
  private testName: string = 'molbp';
  @Input() noteId: string;
  @Output() getResult = new EventEmitter<any>();

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
    if (this.noteId) {
      this.omtTestService.getAnswers(this.testName, this.noteId).subscribe(response => {
        if (response?.answers) {
          const formValues: { [key: string]: number } = {};
          Object.entries(response.answers).forEach(([key, value]) => {
            const formKey = key.toLowerCase();
            formValues[formKey] = value as number;
          });
          this.oswestryForm.patchValue(formValues);
        }
      });
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      // Patient Satisfaction - Pain Level
      painlevel: [null, [Validators.required, Validators.min(0), Validators.max(10)]],

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

    // Build answers object with uppercase keys for backend
    const answers: { [key: string]: number } = {};
    Object.keys(this.oswestryForm.controls).forEach(key => {
      const value = this.oswestryForm.get(key)?.value;
      if (value !== null) {
        // Convert key to uppercase (e.g., q1 -> Q1, painLevel -> PAINLEVEL)
        answers[key.toUpperCase()] = parseInt(value, 10);
      }
    });

    this.omtTestService.calculate(this.testName, this.noteId, answers).subscribe(val => {
      this.getResult.emit(val);
    });
  }

  resetForm(): void {
    this.oswestryForm.reset();
    this.oswestryForm.markAsUntouched();
  }

  getAnsweredCount(): number {
    const controls = Object.keys(this.oswestryForm.controls);
    return controls.filter(key => this.oswestryForm.get(key)?.value !== null).length;
  }

  getCompletionPercentage(): number {
    const totalQuestions = 11; // 10 sections + 1 pain level
    return (this.getAnsweredCount() / totalQuestions) * 100;
  }
}
