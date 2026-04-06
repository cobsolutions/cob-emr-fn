import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OmtTestService } from '../../medical.note/components/objective/service/omt-test/omt-test.service';

@Component({
  selector: 'pfimqsf-test',
  templateUrl: './pfimqsf-test.component.html',
  styleUrls: ['./pfimqsf-test.component.css']
})
export class PfimqsfTestComponent implements OnInit {
  pfimqsfForm: FormGroup;
  showInstructions = false;
  private testName: string = 'pfimqsf';
  @Input() noteId: string;
  @Output() getResult = new EventEmitter<any>();

  questions = [
    { key: 'q1', text: 'Ability to do household chores (cooking housecleaning, laundry)?' },
    { key: 'q2', text: 'Ability to do physical activities such as walking, swimming, or other exercise?' },
    { key: 'q3', text: 'Entertainment activities such as going to a movie or concert?' },
    { key: 'q4', text: 'Ability to travel by car or bus for a distance greater than 30 minutes away from home?' },
    { key: 'q5', text: 'Participating in social activities outside your home?' },
    { key: 'q6', text: 'Emotional health (nervousness, depression, etc.)?' },
    { key: 'q7', text: 'Feeling frustrated?' }
  ];

  columns = ['bladder', 'bowel', 'vagina'];

  columnLabels: { [key: string]: string } = {
    bladder: 'Bladder or Urine',
    bowel: 'Bowel or Rectum',
    vagina: 'Vagina or Pelvis'
  };

  answerOptions = [
    { value: 0, text: 'Not At All' },
    { value: 1, text: 'Somewhat' },
    { value: 2, text: 'Moderately' },
    { value: 3, text: 'Quite A Bit' }
  ];

  constructor(private fb: FormBuilder, private omtTestService: OmtTestService) {
    this.pfimqsfForm = this.createForm();
  }

  createForm(): FormGroup {
    const formGroup: any = {
      painlevel: [null]
    };
    for (let i = 1; i <= 7; i++) {
      for (const col of this.columns) {
        formGroup[`q${i}_${col}`] = [null, Validators.required];
      }
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
          this.pfimqsfForm.patchValue(formValues);
        }
      });
    }
  }

  toggleInstructions(): void {
    this.showInstructions = !this.showInstructions;
  }

  calculateScore(): void {
    if (this.pfimqsfForm.invalid) {
      Object.keys(this.pfimqsfForm.controls).forEach(key => {
        this.pfimqsfForm.get(key)?.markAsTouched();
      });
      return;
    }

    const answers: { [key: string]: number } = {};
    if (this.pfimqsfForm.value.painlevel !== null) {
      answers['PAINLEVEL'] = parseInt(this.pfimqsfForm.value.painlevel, 10);
    }
    for (let i = 1; i <= 7; i++) {
      for (const col of this.columns) {
        const controlKey = `q${i}_${col}`;
        const value = this.pfimqsfForm.get(controlKey)?.value;
        answers[controlKey.toUpperCase()] = parseInt(value, 10);
      }
    }

    this.omtTestService.calculate(this.testName, this.noteId, answers).subscribe(val => {
      this.getResult.emit(val);
    });
  }

  resetForm(): void {
    const resetValues: { [key: string]: null } = { painlevel: null };
    for (let i = 1; i <= 7; i++) {
      for (const col of this.columns) {
        resetValues[`q${i}_${col}`] = null;
      }
    }
    this.pfimqsfForm.patchValue(resetValues);
    this.pfimqsfForm.markAsUntouched();
  }

  getAnsweredCount(): number {
    let count = 0;
    for (let i = 1; i <= 7; i++) {
      for (const col of this.columns) {
        const val = this.pfimqsfForm.get(`q${i}_${col}`)?.value;
        if (val !== null) {
          count++;
        }
      }
    }
    return count;
  }

  getCompletionPercentage(): number {
    return (this.getAnsweredCount() / 21) * 100;
  }
}
