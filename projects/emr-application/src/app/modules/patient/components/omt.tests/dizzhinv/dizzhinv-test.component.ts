import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OmtTestService } from '../../medical.note/components/objective/service/omt-test/omt-test.service';

@Component({
  selector: 'dizzhinv-test',
  templateUrl: './dizzhinv-test.component.html',
  styleUrls: ['./dizzhinv-test.component.css']
})
export class DizzhinvTestComponent implements OnInit {
  dizzhinvForm: FormGroup;
  showInstructions = false;
  private testName: string = 'dizzhinv';
  @Input() noteId: string;
  @Output() getResult = new EventEmitter<any>();

  questions = [
    { key: 'q1', prefix: 'P1', text: 'Does looking up increase your problem?' },
    { key: 'q2', prefix: 'E2', text: 'Because of your problem, do you feel frustrated?' },
    { key: 'q3', prefix: 'F3', text: 'Because of your problem, do you restrict your travel for business or recreation?' },
    { key: 'q4', prefix: 'P4', text: 'Does walking down the aisle of a supermarket increase your problem?' },
    { key: 'q5', prefix: 'F5', text: 'Because of your problem, do you have difficulty getting into or out of bed?' },
    { key: 'q6', prefix: 'F6', text: 'Does your problem significantly restrict your participation in social activities such as going out to dinner, going to the movies, dancing, or to parties?' },
    { key: 'q7', prefix: 'F7', text: 'Because of your problem, do you have difficulty reading?' },
    { key: 'q8', prefix: 'P8', text: 'Does performing more ambitious activities like sports, dancing, household chores such as sweeping or putting away dishes increase your problem?' },
    { key: 'q9', prefix: 'E9', text: 'Because of your problem, are you afraid to leave your home without having someone accompany you?' },
    { key: 'q10', prefix: 'E10', text: 'Because of your problem, have you been embarrassed in front of others?' },
    { key: 'q11', prefix: 'P11', text: 'Do quick movements of your head increase your problem?' },
    { key: 'q12', prefix: 'F12', text: 'Because of your problem, do you avoid heights?' },
    { key: 'q13', prefix: 'P13', text: 'Does turning over in bed increase your problem?' },
    { key: 'q14', prefix: 'F14', text: 'Because of your problem, is it difficult for you to do strenuous housework or yard work?' },
    { key: 'q15', prefix: 'E15', text: 'Because of your problem, are you afraid people might think you are intoxicated?' },
    { key: 'q16', prefix: 'F16', text: 'Because of your problem, is it difficult for you to go for a walk by yourself?' },
    { key: 'q17', prefix: 'P17', text: 'Does walking down a sidewalk increase your problem?' },
    { key: 'q18', prefix: 'E18', text: 'Because of your problem, is it difficult for you to concentrate?' },
    { key: 'q19', prefix: 'F19', text: 'Because of your problem, is it difficult for you walk around the house in the dark?' },
    { key: 'q20', prefix: 'E20', text: 'Because of your problem, are you afraid to stay home alone?' },
    { key: 'q21', prefix: 'E21', text: 'Because of your problem, do you feel handicapped?' },
    { key: 'q22', prefix: 'E22', text: 'Has your problem placed stress on your relationships with members of your family or friends?' },
    { key: 'q23', prefix: 'E23', text: 'Because of your problem, are you depressed?' },
    { key: 'q24', prefix: 'F24', text: 'Does your problem interfere with your job or household responsibilities?' },
    { key: 'q25', prefix: 'P25', text: 'Does bending over increase your problem?' }
  ];

  answerOptions = [
    { value: 'Yes', text: 'Yes' },
    { value: 'Sometimes', text: 'Sometimes' },
    { value: 'No', text: 'No' }
  ];

  constructor(private fb: FormBuilder, private omtTestService: OmtTestService) {
    this.dizzhinvForm = this.createForm();
  }

  createForm(): FormGroup {
    const formGroup: any = {
      painlevel: [null]
    };
    for (let i = 1; i <= 25; i++) {
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
          this.dizzhinvForm.patchValue(formValues);
        }
      });
    }
  }

  toggleInstructions(): void {
    this.showInstructions = !this.showInstructions;
  }

  calculateScore(): void {
    if (this.dizzhinvForm.invalid) {
      Object.keys(this.dizzhinvForm.controls).forEach(key => {
        this.dizzhinvForm.get(key)?.markAsTouched();
      });
      return;
    }

    const answers: { [key: string]: number } = {};
    if (this.dizzhinvForm.value.painlevel !== null) {
      answers['PAINLEVEL'] = parseInt(this.dizzhinvForm.value.painlevel, 10);
    }
    for (let i = 1; i <= 25; i++) {
      const value = this.dizzhinvForm.get(`q${i}`)?.value;
      // Yes=4, Sometimes=2, No=0
      answers[`Q${i}`] = value === 'Yes' ? 4 : value === 'Sometimes' ? 2 : 0;
    }

    this.omtTestService.calculate(this.testName, this.noteId, answers).subscribe(val => {
      this.getResult.emit(val);
    });
  }

  resetForm(): void {
    const resetValues: { [key: string]: null } = { painlevel: null };
    for (let i = 1; i <= 25; i++) {
      resetValues[`q${i}`] = null;
    }
    this.dizzhinvForm.patchValue(resetValues);
    this.dizzhinvForm.markAsUntouched();
  }

  getAnsweredCount(): number {
    let count = 0;
    for (let i = 1; i <= 25; i++) {
      const val = this.dizzhinvForm.get(`q${i}`)?.value;
      if (val !== null) {
        count++;
      }
    }
    return count;
  }

  getCompletionPercentage(): number {
    return (this.getAnsweredCount() / 25) * 100;
  }
}
