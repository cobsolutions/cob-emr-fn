import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OmtTestService } from '../../medical.note/components/objective/service/omt-test/omt-test.service';

@Component({
  selector: 'pregmobindx-test',
  templateUrl: './pregmobindx-test.component.html',
  styleUrls: ['./pregmobindx-test.component.css']
})
export class PregmobindxTestComponent implements OnInit {
  pregmobindxForm: FormGroup;
  showInstructions = false;
  private testName: string = 'pregmobindx';
  @Input() noteId: string;
  @Output() getResult = new EventEmitter<any>();

  sections = [
    {
      title: 'Section I: Daily Mobility in the House',
      icon: 'I',
      questions: [
        { key: 'q1', text: 'Standing up from a hard chair' },
        { key: 'q2', text: 'Standing up from a soft chair' },
        { key: 'q3', text: 'Standing up from the bed' },
        { key: 'q4', text: 'Getting things from the floor' },
        { key: 'q5', text: 'Putting on shoes' },
        { key: 'q6', text: 'Turning around in bed' },
        { key: 'q7', text: 'Standing up from the floor' }
      ]
    },
    {
      title: 'Section II: Household Activities',
      icon: 'II',
      questions: [
        { key: 'q8', text: 'Vacuum Cleaning' },
        { key: 'q9', text: 'Doing laundry' },
        { key: 'q10', text: 'Hanging wash to dry' },
        { key: 'q11', text: 'Working on the knees' },
        { key: 'q12', text: 'Sitting in squatted position' },
        { key: 'q13', text: 'Working standing up' },
        { key: 'q14', text: 'Lifting 5 kilograms' },
        { key: 'q15', text: 'Lifting 10 kilograms' },
        { key: 'q16', text: 'Walking stairs' }
      ]
    },
    {
      title: 'Section III: Mobility Outdoors',
      icon: 'III',
      questions: [
        { key: 'q17', text: 'Traveling by train' },
        { key: 'q18', text: 'Traveling by car' },
        { key: 'q19', text: 'Traveling by bicycle' },
        { key: 'q20', text: 'Traveling by bus' },
        { key: 'q21', text: 'Walking 50 meters' },
        { key: 'q22', text: 'Walking 200 meters' },
        { key: 'q23', text: 'Walking 500 meters' },
        { key: 'q24', text: 'Walking on uneven area' }
      ]
    }
  ];

  difficultyOptions = [
    { value: '0', text: '0: No problems performing this task.' },
    { value: '1', text: '1: Slight problems performing this task.' },
    { value: '2', text: '2: Moderate problems performing this task.' },
    { value: '3', text: '3: Severe problems performing this task.' },
    { value: '4', text: '4: Unable to perform this task.' }
  ];

  constructor(private fb: FormBuilder, private omtTestService: OmtTestService) {
    this.pregmobindxForm = this.createForm();
  }

  createForm(): FormGroup {
    const formGroup: any = {
      painlevel: [null]
    };
    for (let i = 1; i <= 24; i++) {
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
          this.pregmobindxForm.patchValue(formValues);
        }
      });
    }
  }

  toggleInstructions(): void {
    this.showInstructions = !this.showInstructions;
  }

  calculateScore(): void {
    if (this.pregmobindxForm.invalid) {
      Object.keys(this.pregmobindxForm.controls).forEach(key => {
        this.pregmobindxForm.get(key)?.markAsTouched();
      });
      return;
    }

    const answers: { [key: string]: number } = {};
    if (this.pregmobindxForm.value.painlevel !== null) {
      answers['PAINLEVEL'] = parseInt(this.pregmobindxForm.value.painlevel, 10);
    }
    for (let i = 1; i <= 24; i++) {
      const value = this.pregmobindxForm.get(`q${i}`)?.value;
      answers[`Q${i}`] = parseInt(value, 10);
    }

    this.omtTestService.calculate(this.testName, this.noteId, answers).subscribe(val => {
      this.getResult.emit(val);
    });
  }

  resetForm(): void {
    const resetValues: { [key: string]: null } = { painlevel: null };
    for (let i = 1; i <= 24; i++) {
      resetValues[`q${i}`] = null;
    }
    this.pregmobindxForm.patchValue(resetValues);
    this.pregmobindxForm.markAsUntouched();
  }

  getAnsweredCount(): number {
    let count = 0;
    for (let i = 1; i <= 24; i++) {
      const val = this.pregmobindxForm.get(`q${i}`)?.value;
      if (val !== null) {
        count++;
      }
    }
    return count;
  }

  getCompletionPercentage(): number {
    return (this.getAnsweredCount() / 24) * 100;
  }
}
