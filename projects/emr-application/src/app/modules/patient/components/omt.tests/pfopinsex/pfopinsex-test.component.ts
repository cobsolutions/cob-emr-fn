import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OmtTestService } from '../../medical.note/components/objective/service/omt-test/omt-test.service';

@Component({
  selector: 'pfopinsex-test',
  templateUrl: './pfopinsex-test.component.html',
  styleUrls: ['./pfopinsex-test.component.css']
})
export class PfopinsexTestComponent implements OnInit {
  pfopinsexForm: FormGroup;
  showInstructions = false;
  private testName: string = 'pfopinsex';
  @Input() noteId: string;
  @Output() getResult = new EventEmitter<any>();

  questions = [
    {
      key: 'q1',
      text: 'How frequently do you feel sexual desire? This feeling may include wanting to have sex, planning to have sex, feeling frustrated due to lack of sex, etc.',
      options: [
        { value: 'NT', text: 'Not Tested' },
        { value: 0, text: 'Always' },
        { value: 1, text: 'Usually' },
        { value: 2, text: 'Sometimes' },
        { value: 3, text: 'Seldom' },
        { value: 4, text: 'Never' }
      ]
    },
    {
      key: 'q2',
      text: 'Do you climax (have an orgasm) when having sexual intercourse with your partner?',
      options: [
        { value: 'NT', text: 'Not Tested' },
        { value: 0, text: 'Always' },
        { value: 1, text: 'Usually' },
        { value: 2, text: 'Sometimes' },
        { value: 3, text: 'Seldom' },
        { value: 4, text: 'Never' }
      ]
    },
    {
      key: 'q3',
      text: 'Do you feel sexually excited (turned on) when having sexual activity with your partner?',
      options: [
        { value: 'NT', text: 'Not Tested' },
        { value: 0, text: 'Always' },
        { value: 1, text: 'Usually' },
        { value: 2, text: 'Sometimes' },
        { value: 3, text: 'Seldom' },
        { value: 4, text: 'Never' }
      ]
    },
    {
      key: 'q4',
      text: 'How satisfied are you with the variety of sexual activities in your current sex life?',
      options: [
        { value: 'NT', text: 'Not Tested' },
        { value: 0, text: 'Always' },
        { value: 1, text: 'Usually' },
        { value: 2, text: 'Sometimes' },
        { value: 3, text: 'Seldom' },
        { value: 4, text: 'Never' }
      ]
    },
    {
      key: 'q5',
      text: 'Do you feel pain during sexual intercourse?',
      options: [
        { value: 'NT', text: 'Not Tested' },
        { value: 0, text: 'Never' },
        { value: 1, text: 'Seldom' },
        { value: 2, text: 'Sometimes' },
        { value: 3, text: 'Usually' },
        { value: 4, text: 'Always' }
      ]
    },
    {
      key: 'q6',
      text: 'Are you incontinent of urine (leak urine) with sexual activity?',
      options: [
        { value: 'NT', text: 'Not Tested' },
        { value: 0, text: 'Never' },
        { value: 1, text: 'Seldom' },
        { value: 2, text: 'Sometimes' },
        { value: 3, text: 'Usually' },
        { value: 4, text: 'Always' }
      ]
    },
    {
      key: 'q7',
      text: 'Does fear of incontinence (either stool or urine) restrict your sexual activity?',
      options: [
        { value: 'NT', text: 'Not Tested' },
        { value: 0, text: 'Never' },
        { value: 1, text: 'Seldom' },
        { value: 2, text: 'Sometimes' },
        { value: 3, text: 'Usually' },
        { value: 4, text: 'Always' }
      ]
    },
    {
      key: 'q8',
      text: 'Do you avoid sexual intercourse because of bulging in the vagina (either the bladder, rectum, or vagina falling out)?',
      options: [
        { value: 'NT', text: 'Not Tested' },
        { value: 0, text: 'Never' },
        { value: 1, text: 'Seldom' },
        { value: 2, text: 'Sometimes' },
        { value: 3, text: 'Usually' },
        { value: 4, text: 'Always' }
      ]
    },
    {
      key: 'q9',
      text: 'When you have sex with your partner, do you have negative emotional reactions such as fear, disgust, shame or guilt?',
      options: [
        { value: 'NT', text: 'Not Tested' },
        { value: 0, text: 'Never' },
        { value: 1, text: 'Seldom' },
        { value: 2, text: 'Sometimes' },
        { value: 3, text: 'Usually' },
        { value: 4, text: 'Always' }
      ]
    },
    {
      key: 'q10',
      text: 'Does your partner have a problem with erections that affects your sexual activity?',
      options: [
        { value: 'NT', text: 'Not Tested' },
        { value: 0, text: 'Never' },
        { value: 1, text: 'Seldom' },
        { value: 2, text: 'Sometimes' },
        { value: 3, text: 'Usually' },
        { value: 4, text: 'Always' }
      ]
    },
    {
      key: 'q11',
      text: 'Does your partner have a problem with premature ejaculation that affects your sexual activity?',
      options: [
        { value: 'NT', text: 'Not Tested' },
        { value: 0, text: 'Never' },
        { value: 1, text: 'Seldom' },
        { value: 2, text: 'Sometimes' },
        { value: 3, text: 'Usually' },
        { value: 4, text: 'Always' }
      ]
    },
    {
      key: 'q12',
      text: 'Compare to orgasms you\'ve had in the past, how intense are the orgasms you\'ve had in the past six months?',
      options: [
        { value: 'NT', text: 'Not Tested' },
        { value: 0, text: 'Much more intense' },
        { value: 1, text: 'More intense' },
        { value: 2, text: 'Same intensity' },
        { value: 3, text: 'Less intense' },
        { value: 4, text: 'Much less intense' }
      ]
    }
  ];

  constructor(private fb: FormBuilder, private omtTestService: OmtTestService) {
    this.pfopinsexForm = this.createForm();
  }

  createForm(): FormGroup {
    const formGroup: any = {
      painlevel: [null]
    };
    for (let i = 1; i <= 12; i++) {
      formGroup[`q${i}`] = ['NT', Validators.required];
    }
    return this.fb.group(formGroup);
  }

  ngOnInit(): void {
    if (this.noteId) {
      this.omtTestService.getAnswers(this.testName, this.noteId).subscribe(response => {
        if (response?.answers) {
          const formValues: { [key: string]: any } = {};
          Object.entries(response.answers).forEach(([key, value]) => {
            const formKey = key.toLowerCase();
            formValues[formKey] = value;
          });
          this.pfopinsexForm.patchValue(formValues);
        }
      });
    }
  }

  toggleInstructions(): void {
    this.showInstructions = !this.showInstructions;
  }

  calculateScore(): void {
    if (this.pfopinsexForm.invalid) {
      Object.keys(this.pfopinsexForm.controls).forEach(key => {
        this.pfopinsexForm.get(key)?.markAsTouched();
      });
      return;
    }

    const answers: { [key: string]: number } = {};
    if (this.pfopinsexForm.value.painlevel !== null) {
      answers['PAINLEVEL'] = parseInt(this.pfopinsexForm.value.painlevel, 10);
    }
    for (let i = 1; i <= 12; i++) {
      const value = this.pfopinsexForm.get(`q${i}`)?.value;
      if (value !== 'NT') {
        answers[`Q${i}`] = parseInt(value, 10);
      }
    }

    this.omtTestService.calculate(this.testName, this.noteId, answers).subscribe(val => {
      this.getResult.emit(val);
    });
  }

  resetForm(): void {
    const resetValues: { [key: string]: any } = { painlevel: null };
    for (let i = 1; i <= 12; i++) {
      resetValues[`q${i}`] = 'NT';
    }
    this.pfopinsexForm.patchValue(resetValues);
    this.pfopinsexForm.markAsUntouched();
  }

  getAnsweredCount(): number {
    let count = 0;
    for (let i = 1; i <= 12; i++) {
      const val = this.pfopinsexForm.get(`q${i}`)?.value;
      if (val !== null && val !== 'NT') {
        count++;
      }
    }
    return count;
  }

  getCompletionPercentage(): number {
    return (this.getAnsweredCount() / 12) * 100;
  }
}
