import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OmtTestService } from '../../../medical.note/components/objective/service/omt-test/omt-test.service';

@Component({
  selector: 'lower-extremity-faam-test',
  templateUrl: './faam-test.component.html',
  styleUrls: ['./faam-test.component.css']
})
export class FaamTestComponent implements OnInit {
  faamForm: FormGroup;
  showInstructions = false;
  private testName: string = 'faam';
  @Input() noteId: string;
  @Output() getResult = new EventEmitter<any>();

  // Activity descriptions for the form
  activities = [
    "Running",
    "Jumping",
    "Landing",
    "Starting and stopping quickly",
    "Cutting/lateral movements",
    "Low impact activities",
    "Ability to perform activity with your normal technique",
    "Ability to participate in your desired sport as long as you would like"
  ];

  difficultyOptions = [
    { value: 4, text: 'No Difficulty' },
    { value: 3, text: 'Slight Difficulty' },
    { value: 2, text: 'Moderate Difficulty' },
    { value: 1, text: 'Extreme Difficulty' },
    { value: 0, text: 'Unable to Do' },
    { value: 5, text: 'N/A' }
  ];

  constructor(private fb: FormBuilder, private omtTestService: OmtTestService) {
    this.faamForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      painlevel: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      q1: [null, Validators.required],
      q2: [null, Validators.required],
      q3: [null, Validators.required],
      q4: [null, Validators.required],
      q5: [null, Validators.required],
      q6: [null, Validators.required],
      q7: [null, Validators.required],
      q8: [null, Validators.required]
    });
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
          this.faamForm.patchValue(formValues);
        }
      });
    }
  }

  toggleInstructions(): void {
    this.showInstructions = !this.showInstructions;
  }

  calculateScore(): void {
    if (this.faamForm.invalid) {
      Object.keys(this.faamForm.controls).forEach(key => {
        this.faamForm.get(key)?.markAsTouched();
      });
      return;
    }

    // Build answers object with uppercase keys for backend
    const answers: { [key: string]: number } = {};
    Object.keys(this.faamForm.controls).forEach(key => {
      const value = this.faamForm.get(key)?.value;
      if (value !== null) {
        answers[key.toUpperCase()] = parseInt(value, 10);
      }
    });

    this.omtTestService.calculate(this.testName, this.noteId, answers).subscribe(val => {
      this.getResult.emit(val);
    });
  }

  resetForm(): void {
    this.faamForm.reset();
    this.faamForm.markAsUntouched();
  }

  getAnsweredCount(): number {
    const controls = Object.keys(this.faamForm.controls);
    return controls.filter(key => this.faamForm.get(key)?.value !== null).length;
  }

  getCompletionPercentage(): number {
    const totalQuestions = 9; // 8 activities + 1 pain level
    return (this.getAnsweredCount() / totalQuestions) * 100;
  }
}
