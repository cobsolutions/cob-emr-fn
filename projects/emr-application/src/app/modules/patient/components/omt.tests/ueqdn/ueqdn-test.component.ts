import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OmtTestService } from '../../medical.note/components/objective/service/omt-test/omt-test.service';
import { dashValidator } from '../validator/not.selected';

@Component({
  selector: 'ueqdn-test',
  templateUrl: './ueqdn-test.component.html',
  styleUrls: ['./ueqdn-test.component.css']
})
export class UeqdnTestComponent implements OnInit {
  ueqdnForm: FormGroup;
  showInstructions = false;
  private testName: string = 'ueqdn';
  @Input() noteId: string;
  @Output() getResult = new EventEmitter<any>();

  questions = [
    { key: 'q1', text: 'Open a tight or new jar.', options: 'difficulty' },
    { key: 'q2', text: 'Do heavy household chores (e.g., wash walls, floors).', options: 'difficulty' },
    { key: 'q3', text: 'Carry a shopping bag or briefcase.', options: 'difficulty' },
    { key: 'q4', text: 'Wash your back.', options: 'difficulty' },
    { key: 'q5', text: 'Use a knife to cut food.', options: 'difficulty' },
    { key: 'q6', text: 'Recreational activities in which you take some force or impact through your arm, shoulder or hand (e.g., golf, hammering, tennis, etc.).', options: 'difficulty' },
    { key: 'q7', text: 'During the past week, to what extent has your arm, shoulder or hand problem interfered with your normal social activities with family, friends, neighbours or groups?', options: 'social' },
    { key: 'q8', text: 'During the past week, were you limited in your work or other regular daily activities as a result of your arm, shoulder or hand problem?', options: 'limited' },
    { key: 'q9', text: 'Arm, shoulder or hand pain.', options: 'severity' },
    { key: 'q10', text: 'Tingling (pins and needles) in your arm, shoulder or hand.', options: 'severity' },
    { key: 'q11', text: 'During the past week, how much difficulty have you had sleeping because of the pain in your arm, shoulder or hand?', options: 'sleep' }
  ];

  optionSets: { [key: string]: { value: string; text: string }[] } = {
    difficulty: [
      { value: '1', text: 'No Difficulty' },
      { value: '2', text: 'Mild Difficulty' },
      { value: '3', text: 'Moderate Difficulty' },
      { value: '4', text: 'Severe Difficulty' },
      { value: '5', text: 'Unable' }
    ],
    social: [
      { value: '1', text: 'Not At All' },
      { value: '2', text: 'Slightly' },
      { value: '3', text: 'Moderately' },
      { value: '4', text: 'Quite A Bit' },
      { value: '5', text: 'Extremely' }
    ],
    limited: [
      { value: '1', text: 'Not Limited At All' },
      { value: '2', text: 'Slightly Limited' },
      { value: '3', text: 'Moderately Limited' },
      { value: '4', text: 'Very Limited' },
      { value: '5', text: 'Unable' }
    ],
    severity: [
      { value: '1', text: 'None' },
      { value: '2', text: 'Mild' },
      { value: '3', text: 'Moderate' },
      { value: '4', text: 'Severe' },
      { value: '5', text: 'Extreme' }
    ],
    sleep: [
      { value: '1', text: 'No Difficulty' },
      { value: '2', text: 'Mild Difficulty' },
      { value: '3', text: 'Moderate Difficulty' },
      { value: '4', text: 'Severe Difficulty' },
      { value: '5', text: "So Much Difficulty That I Can't Sleep" }
    ]
  };

  constructor(private fb: FormBuilder, private omtTestService: OmtTestService) {
    this.ueqdnForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      painlevel: [null],
      q1: ['NT', [Validators.required, dashValidator()]],
      q2: ['NT', [Validators.required, dashValidator()]],
      q3: ['NT', [Validators.required, dashValidator()]],
      q4: ['NT', [Validators.required, dashValidator()]],
      q5: ['NT', [Validators.required, dashValidator()]],
      q6: ['NT', [Validators.required, dashValidator()]],
      q7: ['NT', [Validators.required, dashValidator()]],
      q8: ['NT', [Validators.required, dashValidator()]],
      q9: ['NT', [Validators.required, dashValidator()]],
      q10: ['NT', [Validators.required, dashValidator()]],
      q11: ['NT', [Validators.required, dashValidator()]]
    });
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
          this.ueqdnForm.patchValue(formValues);
        }
      });
    }
  }

  toggleInstructions(): void {
    this.showInstructions = !this.showInstructions;
  }

  calculateScore(): void {
    if (this.ueqdnForm.invalid) {
      Object.keys(this.ueqdnForm.controls).forEach(key => {
        this.ueqdnForm.get(key)?.markAsTouched();
      });
      return;
    }

    const answers: { [key: string]: number } = {};
    answers['PAINLEVEL'] = parseInt(this.ueqdnForm.value.painlevel, 10);
    for (let i = 1; i <= 11; i++) {
      const value = this.ueqdnForm.get(`q${i}`)?.value;
      answers[`Q${i}`] = parseInt(value, 10);
    }

    this.omtTestService.calculate(this.testName, this.noteId, answers).subscribe(val => {
      this.getResult.emit(val);
    });
  }

  resetForm(): void {
    this.ueqdnForm.reset({
      painlevel: null,
      q1: 'NT', q2: 'NT', q3: 'NT', q4: 'NT', q5: 'NT', q6: 'NT',
      q7: 'NT', q8: 'NT', q9: 'NT', q10: 'NT', q11: 'NT'
    });
    this.ueqdnForm.markAsUntouched();
  }

  getAnsweredCount(): number {
    let count = 0;
    for (let i = 1; i <= 11; i++) {
      const val = this.ueqdnForm.get(`q${i}`)?.value;
      if (val !== null && val !== 'NT') {
        count++;
      }
    }
    return count;
  }

  getCompletionPercentage(): number {
    return (this.getAnsweredCount() / 11) * 100;
  }
}
