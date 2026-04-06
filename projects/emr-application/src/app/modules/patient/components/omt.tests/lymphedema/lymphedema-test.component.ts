import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OmtTestService } from '../../medical.note/components/objective/service/omt-test/omt-test.service';

@Component({
  selector: 'lymphedema-test',
  templateUrl: './lymphedema-test.component.html',
  styleUrls: ['./lymphedema-test.component.css']
})
export class LymphedemaTestComponent implements OnInit {
  lymphedemaForm: FormGroup;
  showInstructions = false;
  private testName: string = 'lymphedema';
  @Input() noteId: string;
  @Output() getResult = new EventEmitter<any>();

  sections = [
    {
      title: 'I. Physical concerns',
      subtitle: 'NOTE: If swelling and symptoms are the same in both limbs, rate them the same; rate only the worst limb',
      icon: 'I',
      questions: [
        { key: 'q1', text: 'The amount of pain associated with my lymphedema is:', low: 'No Pain', high: 'Severe Pain' },
        { key: 'q2', text: 'The amount of limb heaviness associated with my lymphedema is:', low: 'No Heaviness', high: 'Extremely Heavy' },
        { key: 'q3', text: 'The amount of skin tightness associated with my lymphedema is:', low: 'No Tightness', high: 'Extremely Tight' },
        { key: 'q4', text: 'The size of my swollen limb(s) seems:', low: 'Normal Size', high: 'Extremely Large' },
        { key: 'q5', text: 'Lymphedema affects the movement of my swollen limb(s):', low: 'Normal Movement', high: 'Extremely Limited' },
        { key: 'q6', text: 'The strength in my swollen limb(s) is:', low: 'Normal Strength', high: 'Extremely Weak' }
      ]
    },
    {
      title: 'II. Psychosocial concerns',
      subtitle: '',
      icon: 'II',
      questions: [
        { key: 'q7', text: 'Lymphedema affects my body image (how I think I look):', low: 'Not At All', high: 'Completely' },
        { key: 'q8', text: 'Lymphedema affects my socializing with others.', low: 'No Interference', high: 'Interferes Completely' },
        { key: 'q9', text: 'Lymphedema affects my intimate relations with spouse or partner (rate 0 if not applicable).', low: 'No Interference', high: 'Interferes Completely' },
        { key: 'q10', text: 'Lymphedema "gets me down" (i.e., I have feelings of depression, frustration, or anger due to the lymphedema).', low: 'Never', high: 'Constantly' },
        { key: 'q11', text: 'I must rely on others for help due to my lymphedema.', low: 'Not At All', high: 'Completely' },
        { key: 'q12', text: 'I know what to do to manage my lymphedema.', low: 'Good Understanding', high: 'No Understanding' }
      ]
    },
    {
      title: 'III. Functional concerns',
      subtitle: '',
      icon: 'III',
      questions: [
        { key: 'q13', text: 'Lymphedema affects my ability to perform self-care activities (i.e., eating, dressing, hygiene).', low: 'No Interference', high: 'Interferes Completely' },
        { key: 'q14', text: 'Lymphedema affects my ability to perform routine home or work-related activities.', low: 'No Interference', high: 'Interferes Completely' },
        { key: 'q15', text: 'Lymphedema affects my performance of preferred leisure activities.', low: 'No Interference', high: 'Interferes Completely' },
        { key: 'q16', text: 'Lymphedema affects the proper fit of clothing/shoes.', low: 'Fits Normally', high: 'Unable To Wear' },
        { key: 'q17', text: 'Lymphedema affects my sleep.', low: 'No Interference', high: 'Interferes Completely' }
      ]
    },
    {
      title: 'IV. Infection Occurrence',
      subtitle: '',
      icon: 'IV',
      questions: [
        { key: 'q18', text: 'In the past year, I have become ill with an infection in my swollen limb requiring oral antibiotics or hospitalization.', low: '0', high: '4+' }
      ]
    }
  ];

  constructor(private fb: FormBuilder, private omtTestService: OmtTestService) {
    this.lymphedemaForm = this.createForm();
  }

  createForm(): FormGroup {
    const formGroup: any = {
      painlevel: [null]
    };
    for (let i = 1; i <= 18; i++) {
      formGroup[`q${i}`] = [null, Validators.required];
    }
    return this.fb.group(formGroup);
  }

  ngOnInit(): void {
    if (this.noteId) {
      this.omtTestService.getAnswers(this.testName, this.noteId).subscribe(response => {
        if (response?.answers) {
          const formValues: { [key: string]: number } = {};
          Object.entries(response.answers).forEach(([key, value]) => {
            const formKey = key.toLowerCase();
            formValues[formKey] = value as number;
          });
          this.lymphedemaForm.patchValue(formValues);
        }
      });
    }
  }

  toggleInstructions(): void {
    this.showInstructions = !this.showInstructions;
  }

  calculateScore(): void {
    if (this.lymphedemaForm.invalid) {
      Object.keys(this.lymphedemaForm.controls).forEach(key => {
        this.lymphedemaForm.get(key)?.markAsTouched();
      });
      return;
    }

    const answers: { [key: string]: number } = {};
    if (this.lymphedemaForm.value.painlevel !== null) {
      answers['PAINLEVEL'] = parseInt(this.lymphedemaForm.value.painlevel, 10);
    }
    for (let i = 1; i <= 18; i++) {
      const value = this.lymphedemaForm.get(`q${i}`)?.value;
      answers[`Q${i}`] = parseInt(value, 10);
    }

    this.omtTestService.calculate(this.testName, this.noteId, answers).subscribe(val => {
      this.getResult.emit(val);
    });
  }

  resetForm(): void {
    this.lymphedemaForm.reset();
    this.lymphedemaForm.markAsUntouched();
  }

  getAnsweredCount(): number {
    let count = 0;
    for (let i = 1; i <= 18; i++) {
      if (this.lymphedemaForm.get(`q${i}`)?.value !== null) {
        count++;
      }
    }
    return count;
  }

  getCompletionPercentage(): number {
    return (this.getAnsweredCount() / 18) * 100;
  }
}
