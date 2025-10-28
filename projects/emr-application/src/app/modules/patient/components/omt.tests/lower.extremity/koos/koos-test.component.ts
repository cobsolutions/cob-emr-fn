import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OMTTestValues } from '../../../../models/medical.note/omt.test/omt.test.values';
import { MedialNoteService } from '../../../../services/medical.note/medial-note.service';
import { OmtTestService } from '../../../../services/test/omt-test.service';

@Component({
  selector: 'lower-extremity-koos-test',
  templateUrl: './koos-test.component.html',
  styleUrls: ['./koos-test.component.css']
})
export class KoosTestComponent implements OnInit {
  koosForm: FormGroup;
  showInstructions = false;
  calculatedScores: any = null;
  showCompletionError = false;
  @Output() getResult = new EventEmitter<any>()
  medicalNoteId: number;
  id: number
  testName: string = 'lower-extremity-koos'
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
  constructor(private fb: FormBuilder
    , private omtTestService: OmtTestService
    , private medicalNotService: MedialNoteService) {
    this.koosForm = this.createForm();
  }

  private rangeKeys(prefix: string, count: number): string[] {
    return Array.from({ length: count }, (_, i) => `${prefix}${i + 1}`);
  }

  toggleInstructions(): void {
    this.showInstructions = !this.showInstructions;
  }
  ngOnInit(): void {
    this.medicalNotService.medicalNoteID$.subscribe(id => {
      this.medicalNoteId = id
      this.omtTestService.findValues(this.medicalNoteId, this.testName).subscribe((data: any) => {
        this.id = data?.id
        setTimeout(() => {
          this.koosForm.patchValue(data.values);
        }, 10);

      })
    })
  }
  symptoms = this.rangeKeys('S', 7);
  pain = this.rangeKeys('P', 9);
  dailyLiving = this.rangeKeys('A', 17);
  sports = this.rangeKeys('SP', 5);
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
  calculateScore(): void {
    if (this.koosForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.koosForm.controls).forEach(key => {
        this.koosForm.get(key)?.markAsTouched();
      });
      this.showCompletionError = true;
      return;
    }

    this.showCompletionError = false;
    const result = this.fillAnswers()
    console.log(JSON.stringify(result))


    this.omtTestService.lowerExtremity(result, 'oos').subscribe(val => {
      var omtTestValues: OMTTestValues = {
        id: this.id,
        medicalNoteId: this.medicalNoteId,
        testName: this.testName,
        values: this.koosForm.getRawValue()
      };
      this.omtTestService.saveValues(omtTestValues).subscribe(val => {
      })
      this.getResult.emit(val)
    })
  }
  private fillAnswers(): any {
    // Define your keys consistently (reuse the ones from the component if possible)
    const sections = {
      S: this.rangeKeys('S', 7),
      A: this.rangeKeys('A', 17),
      P: this.rangeKeys('P', 9),
      SP: this.rangeKeys('SP', 5),
      Q: this.rangeKeys('Q', 4),
    };
    const answers: Record<string, number> = {};

    // Loop through all sections
    Object.values(sections).forEach(keys => {
      keys.forEach(key => {
        const value = this.koosForm.value[key];
        answers[key] = value !== null && value !== undefined ? parseInt(value, 10) : null;
      });
    });

    return { answers, "oosType": "koos" };
  }
  resetForm(): void {
    this.koosForm.reset();
    this.calculatedScores = null;
    this.showCompletionError = false;
  }
}
