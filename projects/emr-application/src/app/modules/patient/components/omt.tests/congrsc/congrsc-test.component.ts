import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OmtTestService } from '../../medical.note/components/objective/service/omt-test/omt-test.service';

@Component({
  selector: 'congrsc-test',
  templateUrl: './congrsc-test.component.html',
  styleUrls: ['./congrsc-test.component.css']
})
export class CongrscTestComponent implements OnInit {
  congrscForm: FormGroup;
  showInstructions = false;
  private testName: string = 'congrsc';
  @Input() noteId: string;
  @Output() getResult = new EventEmitter<any>();

  questions = [
    { key: 'q1', text: 'Incontinence For Solids Stool', options: 'frequency' },
    { key: 'q2', text: 'Incontinence For Liquids Stool', options: 'frequency' },
    { key: 'q3', text: 'Incontinence For Gas', options: 'frequency' },
    { key: 'q4', text: 'Alteration In Lifestyle', options: 'frequency' },
    { key: 'q5', text: 'Need To Wear Pad Or Plug', options: 'yesno' },
    { key: 'q6', text: 'Taking Constipation Medicines', options: 'yesno' },
    { key: 'q7', text: 'Lacking The Ability To Defer Defection For 15 Minutes', options: 'yesno' }
  ];

  optionSets: { [key: string]: { value: string; text: string }[] } = {
    frequency: [
      { value: '0', text: '0: Never (No episodes in the past 4 weeks)' },
      { value: '1', text: '1: Rarely (1 episode in the past 4 weeks)' },
      { value: '2', text: '2: Sometimes (>1 episode in the past 4 weeks but <1 a week)' },
      { value: '3', text: '3: Weekly (1 or more episodes a week but <1 a day)' },
      { value: '4', text: '4: Daily (1 or more episodes a day)' }
    ],
    yesno: [
      { value: '0', text: '0: No' },
      { value: '1', text: '1: Yes' }
    ]
  };

  constructor(private fb: FormBuilder, private omtTestService: OmtTestService) {
    this.congrscForm = this.createForm();
  }

  createForm(): FormGroup {
    const formGroup: any = {
      painlevel: [null]
    };
    for (let i = 1; i <= 7; i++) {
      formGroup[`q${i}`] = [null, Validators.required];
    }
    return this.fb.group(formGroup);
  }

  ngOnInit(): void {
    if (this.noteId) {
      this.omtTestService.getAnswers(this.testName, this.noteId).subscribe(response => {
        if (response?.answers) {
          const formValues: { [key: string]: string } = {};
          Object.entries(response.answers).forEach(([key, value]) => {
            const formKey = key.toLowerCase();
            formValues[formKey] = String(value);
          });
          this.congrscForm.patchValue(formValues);
        }
      });
    }
  }

  toggleInstructions(): void {
    this.showInstructions = !this.showInstructions;
  }

  calculateScore(): void {
    if (this.congrscForm.invalid) {
      Object.keys(this.congrscForm.controls).forEach(key => {
        this.congrscForm.get(key)?.markAsTouched();
      });
      return;
    }

    const answers: { [key: string]: number } = {};
    if (this.congrscForm.value.painlevel !== null) {
      answers['PAINLEVEL'] = parseInt(this.congrscForm.value.painlevel, 10);
    }
    for (let i = 1; i <= 7; i++) {
      const value = this.congrscForm.get(`q${i}`)?.value;
      answers[`Q${i}`] = parseInt(value, 10);
    }

    this.omtTestService.calculate(this.testName, this.noteId, answers).subscribe(val => {
      this.getResult.emit(val);
    });
  }

  resetForm(): void {
    const resetValues: { [key: string]: null } = { painlevel: null };
    for (let i = 1; i <= 7; i++) {
      resetValues[`q${i}`] = null;
    }
    this.congrscForm.patchValue(resetValues);
    this.congrscForm.markAsUntouched();
  }

  getAnsweredCount(): number {
    let count = 0;
    for (let i = 1; i <= 7; i++) {
      const val = this.congrscForm.get(`q${i}`)?.value;
      if (val !== null) {
        count++;
      }
    }
    return count;
  }

  getCompletionPercentage(): number {
    return (this.getAnsweredCount() / 7) * 100;
  }
}
