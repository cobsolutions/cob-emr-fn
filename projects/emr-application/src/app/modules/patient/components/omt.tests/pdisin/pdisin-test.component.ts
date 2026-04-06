import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OmtTestService } from '../../medical.note/components/objective/service/omt-test/omt-test.service';

@Component({
  selector: 'pdisin-test',
  templateUrl: './pdisin-test.component.html',
  styleUrls: ['./pdisin-test.component.css']
})
export class PdisinTestComponent implements OnInit {
  pdisinForm: FormGroup;
  showInstructions = false;
  private testName: string = 'pdisin';
  @Input() noteId: string;
  @Output() getResult = new EventEmitter<any>();

  questions = [
    { key: 'q1', text: 'Family/Home Responsibilities' },
    { key: 'q2', text: 'Recreation' },
    { key: 'q3', text: 'Social Activity' },
    { key: 'q4', text: 'Occupation' },
    { key: 'q5', text: 'Sexual Behavior' },
    { key: 'q6', text: 'Self-Care' },
    { key: 'q7', text: 'Life-Support Activity' }
  ];

  disabilityOptions = [
    { value: '0', text: '0 - No Disability' },
    { value: '1', text: '1 - Mild Disability' },
    { value: '2', text: '2 - Moderate Disability' },
    { value: '3', text: '3 - Severe Disability' },
    { value: '4', text: '4 - Total Disability' }
  ];

  constructor(private fb: FormBuilder, private omtTestService: OmtTestService) {
    this.pdisinForm = this.createForm();
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
          this.pdisinForm.patchValue(formValues);
        }
      });
    }
  }

  toggleInstructions(): void {
    this.showInstructions = !this.showInstructions;
  }

  calculateScore(): void {
    if (this.pdisinForm.invalid) {
      Object.keys(this.pdisinForm.controls).forEach(key => {
        this.pdisinForm.get(key)?.markAsTouched();
      });
      return;
    }

    const answers: { [key: string]: number } = {};
    if (this.pdisinForm.value.painlevel !== null) {
      answers['PAINLEVEL'] = parseInt(this.pdisinForm.value.painlevel, 10);
    }
    for (let i = 1; i <= 7; i++) {
      const value = this.pdisinForm.get(`q${i}`)?.value;
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
    this.pdisinForm.patchValue(resetValues);
    this.pdisinForm.markAsUntouched();
  }

  getAnsweredCount(): number {
    let count = 0;
    for (let i = 1; i <= 7; i++) {
      const val = this.pdisinForm.get(`q${i}`)?.value;
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
