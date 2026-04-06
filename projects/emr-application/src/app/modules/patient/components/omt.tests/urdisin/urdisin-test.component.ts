import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OmtTestService } from '../../medical.note/components/objective/service/omt-test/omt-test.service';

@Component({
  selector: 'urdisin-test',
  templateUrl: './urdisin-test.component.html',
  styleUrls: ['./urdisin-test.component.css']
})
export class UrdisinTestComponent implements OnInit {
  urdisinForm: FormGroup;
  showInstructions = false;
  private testName: string = 'urdisin';
  @Input() noteId: string;
  @Output() getResult = new EventEmitter<any>();

  questions = [
    { key: 'q1', text: 'Frequent Urination?' },
    { key: 'q2', text: 'Night time Urination?' },
    { key: 'q3', text: 'Urine leakage related to the feeling of urgency?' },
    { key: 'q4', text: 'Urine leakage related to physical activity, coughing or sneezing?' },
    { key: 'q5', text: 'General urine leak not related to urgency or activity?' },
    { key: 'q6', text: 'Small amounts of urine leakage (drops)?' },
    { key: 'q7', text: 'Large amounts of urine leakage?' },
    { key: 'q8', text: 'Difficulty emptying your bladder?' },
    { key: 'q9', text: 'Pain or discomfort in the lower abdominal or genital area?' }
  ];

  botherOptions = [
    { value: 0, text: 'Not At All' },
    { value: 1, text: 'Slightly' },
    { value: 2, text: 'Moderately' },
    { value: 3, text: 'Greatly' }
  ];

  constructor(private fb: FormBuilder, private omtTestService: OmtTestService) {
    this.urdisinForm = this.createForm();
  }

  createForm(): FormGroup {
    const formGroup: any = {
      painlevel: [null]
    };
    for (let i = 1; i <= 9; i++) {
      formGroup[`q${i}_presence`] = [null, Validators.required];
      formGroup[`q${i}_bother`] = [null];
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
          this.urdisinForm.patchValue(formValues);
        }
      });
    }
  }

  toggleInstructions(): void {
    this.showInstructions = !this.showInstructions;
  }

  calculateScore(): void {
    if (this.urdisinForm.invalid) {
      Object.keys(this.urdisinForm.controls).forEach(key => {
        this.urdisinForm.get(key)?.markAsTouched();
      });
      return;
    }

    const answers: { [key: string]: number } = {};
    if (this.urdisinForm.value.painlevel !== null) {
      answers['PAINLEVEL'] = parseInt(this.urdisinForm.value.painlevel, 10);
    }
    for (let i = 1; i <= 9; i++) {
      const presence = this.urdisinForm.get(`q${i}_presence`)?.value;
      answers[`Q${i}_PRESENCE`] = presence === 'Yes' ? 1 : 0;
      const bother = this.urdisinForm.get(`q${i}_bother`)?.value;
      answers[`Q${i}_BOTHER`] = bother !== null ? parseInt(bother, 10) : 0;
    }

    this.omtTestService.calculate(this.testName, this.noteId, answers).subscribe(val => {
      this.getResult.emit(val);
    });
  }

  resetForm(): void {
    const resetValues: { [key: string]: null } = { painlevel: null };
    for (let i = 1; i <= 9; i++) {
      resetValues[`q${i}_presence`] = null;
      resetValues[`q${i}_bother`] = null;
    }
    this.urdisinForm.patchValue(resetValues);
    this.urdisinForm.markAsUntouched();
  }

  getAnsweredCount(): number {
    let count = 0;
    for (let i = 1; i <= 9; i++) {
      const val = this.urdisinForm.get(`q${i}_presence`)?.value;
      if (val !== null) {
        count++;
      }
    }
    return count;
  }

  getCompletionPercentage(): number {
    return (this.getAnsweredCount() / 9) * 100;
  }
}
