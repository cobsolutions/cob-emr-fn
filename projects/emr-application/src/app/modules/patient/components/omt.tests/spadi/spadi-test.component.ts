import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OmtTestService } from '../../medical.note/components/objective/service/omt-test/omt-test.service';

@Component({
  selector: 'spadi-test',
  templateUrl: './spadi-test.component.html',
  styleUrls: ['./spadi-test.component.css']
})
export class SpadiTestComponent implements OnInit {
  spadiForm: FormGroup;
  showInstructions = false;
  private testName: string = 'spadi';
  @Input() noteId: string;
  @Output() getResult = new EventEmitter<any>()

  constructor(private fb: FormBuilder, private omtTestService: OmtTestService) {
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
      disability1: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      disability2: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      disability3: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      disability4: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      disability5: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      disability6: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      disability7: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      disability8: [null, [Validators.required, Validators.min(0), Validators.max(10)]]
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
          this.spadiForm.patchValue(formValues);
        }
      });
    }
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

    // Build answers object with uppercase keys for backend
    const answers: { [key: string]: number } = {};
    Object.keys(this.spadiForm.controls).forEach(key => {
      const value = this.spadiForm.get(key)?.value;
      if (value !== null) {
        // Convert key to uppercase (e.g., pain1 -> PAIN1)
        answers[key.toUpperCase()] = parseInt(value, 10);
      }
    });

    this.omtTestService.calculate(this.testName, this.noteId, answers).subscribe(val => {
      this.getResult.emit(val);
    });
  }

  resetForm(): void {
    this.spadiForm.reset();
    this.spadiForm.markAsUntouched();
  }

  getAnsweredCount(): number {
    const controls = Object.keys(this.spadiForm.controls);
    return controls.filter(key => this.spadiForm.get(key)?.value !== null).length;
  }

  getCompletionPercentage(): number {
    const totalQuestions = 13;
    return (this.getAnsweredCount() / totalQuestions) * 100;
  }
}
