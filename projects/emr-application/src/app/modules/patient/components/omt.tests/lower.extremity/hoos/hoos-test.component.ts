// hoos-survey.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OmtTestService } from '../../../../services/test/omt-test.service';

@Component({
  selector: 'lower-extremity-hoos-test',
  templateUrl: './hoos-test.component.html',
  styleUrls: ['./hoos-test.component.css']
})
export class HoosTestComponent implements OnInit {
  hoosForm: FormGroup;
  showInstructions = false;
  calculatedScores: any = null;
  showCompletionError = false;

  // Question options
  painLevelOptions = Array.from({ length: 11 }, (_, i) => i);
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

  constructor(private fb: FormBuilder, private omtTestService: OmtTestService) {
    this.hoosForm = this.createForm();
  }
  symptoms = this.rangeKeys('S', 5);
  pain = this.rangeKeys('P', 10);
  dailyLiving = this.rangeKeys('A', 17);
  sports = this.rangeKeys('SP', 4);
  qol = this.rangeKeys('Q', 4);

  createForm(): FormGroup {
    return this.fb.group({
      T745PatientSatisfaction1: [null, Validators.required],
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

  // Helper to generate S1..Sn, A1..An, etc.
  private rangeKeys(prefix: string, count: number): string[] {
    return Array.from({ length: count }, (_, i) => `${prefix}${i + 1}`);
  }

  toggleInstructions(): void {
    this.showInstructions = !this.showInstructions;
  }

  ngOnInit(): void {
  }

  calculateScore(): void {
    if (this.hoosForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.hoosForm.controls).forEach(key => {
        this.hoosForm.get(key)?.markAsTouched();
      });
      this.showCompletionError = true;
      return;
    }

    this.showCompletionError = false;
    const result = this.fillAnswers()
    console.log(JSON.stringify(result))

    
    this.omtTestService.lowerExtremity(result, 'hoos').subscribe(rr => {
      console.log(JSON.stringify(rr))
    })
  }

  private fillAnswers(): any {
    // Define your keys consistently (reuse the ones from the component if possible)
    const sections = {
      S: this.rangeKeys('S', 5),
      A: this.rangeKeys('A', 17),
      P: this.rangeKeys('P', 10),
      SP: this.rangeKeys('SP', 4),
      Q: this.rangeKeys('Q', 4),
    };
    const answers: Record<string, number> = {};

    // Loop through all sections
    Object.values(sections).forEach(keys => {
      keys.forEach(key => {
        const value = this.hoosForm.value[key];
        answers[key] = value !== null && value !== undefined ? parseInt(value, 10) : null;
      });
    });

    return { answers };
  }
  resetForm(): void {
    this.hoosForm.reset();
    this.calculatedScores = null;
    this.showCompletionError = false;
  }
}