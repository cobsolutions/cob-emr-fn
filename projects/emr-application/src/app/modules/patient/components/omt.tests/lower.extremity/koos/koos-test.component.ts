import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OmtTestService } from '../../../medical.note/components/objective/service/omt-test/omt-test.service';

@Component({
  selector: 'lower-extremity-koos-test',
  templateUrl: './koos-test.component.html',
  styleUrls: ['./koos-test.component.css']
})
export class KoosTestComponent implements OnInit {
  koosForm: FormGroup;
  showInstructions = false;
  private testName: string = 'koos';
  @Input() noteId: string;
  @Output() getResult = new EventEmitter<any>();

  // Question options
  frequencyOptions = [
    { value: 0, text: 'Never' },
    { value: 1, text: 'Rarely' },
    { value: 2, text: 'Sometimes' },
    { value: 3, text: 'Often' },
    { value: 4, text: 'Always' }
  ];

  severityOptions = [
    { value: 0, text: 'None' },
    { value: 1, text: 'Mild' },
    { value: 2, text: 'Moderate' },
    { value: 3, text: 'Severe' },
    { value: 4, text: 'Extreme' }
  ];

  painFrequencyOptions = [
    { value: 0, text: 'Never' },
    { value: 1, text: 'Monthly' },
    { value: 2, text: 'Weekly' },
    { value: 3, text: 'Daily' },
    { value: 4, text: 'Always' }
  ];

  confidenceOptions = [
    { value: 0, text: 'Not at all' },
    { value: 1, text: 'Mildly' },
    { value: 2, text: 'Moderately' },
    { value: 3, text: 'Severely' },
    { value: 4, text: 'Totally' }
  ];

  // Section configurations
  symptoms = this.rangeKeys('S', 7);
  pain = this.rangeKeys('P', 9);
  dailyLiving = this.rangeKeys('A', 17);
  sports = this.rangeKeys('SP', 5);
  qol = this.rangeKeys('Q', 4);

  constructor(private fb: FormBuilder, private omtTestService: OmtTestService) {
    this.koosForm = this.createForm();
  }

  private rangeKeys(prefix: string, count: number): string[] {
    return Array.from({ length: count }, (_, i) => `${prefix}${i + 1}`);
  }

  createForm(): FormGroup {
    return this.fb.group({
      painlevel: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      ...this.buildControls(this.symptoms),
      ...this.buildControls(this.pain),
      ...this.buildControls(this.dailyLiving),
      ...this.buildControls(this.sports),
      ...this.buildControls(this.qol),
    });
  }

  private buildControls(keys: string[]): { [key: string]: any } {
    return keys.reduce((acc, key) => {
      acc[key] = [null, Validators.required];
      return acc;
    }, {} as { [key: string]: any });
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
          this.koosForm.patchValue(formValues);
        }
      });
    }
  }

  toggleInstructions(): void {
    this.showInstructions = !this.showInstructions;
  }

  calculateScore(): void {
    if (this.koosForm.invalid) {
      Object.keys(this.koosForm.controls).forEach(key => {
        this.koosForm.get(key)?.markAsTouched();
      });
      return;
    }

    // Build answers object with uppercase keys for backend
    const answers: { [key: string]: number } = {};
    Object.keys(this.koosForm.controls).forEach(key => {
      const value = this.koosForm.get(key)?.value;
      if (value !== null) {
        answers[key.toUpperCase()] = parseInt(value, 10);
      }
    });

    this.omtTestService.calculate(this.testName, this.noteId, answers).subscribe(val => {
      this.getResult.emit(val);
    });
  }

  resetForm(): void {
    this.koosForm.reset();
    this.koosForm.markAsUntouched();
  }

  getAnsweredCount(): number {
    const controls = Object.keys(this.koosForm.controls);
    return controls.filter(key => this.koosForm.get(key)?.value !== null).length;
  }

  getCompletionPercentage(): number {
    const totalQuestions = 43; // 7 symptoms + 9 pain + 17 ADL + 5 sports + 4 QOL + 1 pain level
    return (this.getAnsweredCount() / totalQuestions) * 100;
  }
}
