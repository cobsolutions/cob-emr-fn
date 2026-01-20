import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OmtTestService } from '../../../medical.note/components/objective/service/omt-test/omt-test.service';

@Component({
  selector: 'lefs-test',
  templateUrl: './lefs-test.component.html',
  styleUrls: ['./lefs-test.component.css']
})
export class LefsTestComponent implements OnInit {
  lefsForm: FormGroup;
  showInstructions = false;
  private testName: string = 'lefs';
  @Input() noteId: string;
  @Output() getResult = new EventEmitter<any>();

  // Activity descriptions for the form
  activities = [
    "Any of your usual work, housework or school activities",
    "Your usual hobbies, recreational or sporting activities",
    "Getting into or out of the bath",
    "Walking between rooms",
    "Putting on your shoes or socks",
    "Squatting",
    "Lifting an object, like a bag of groceries from the floor",
    "Performing light activities around your home",
    "Performing heavy activities around your home",
    "Getting into or out of a car",
    "Walking 2 blocks",
    "Walking a mile",
    "Going up or down 10 stairs (about 1 flight of stairs)",
    "Standing for 1 hour",
    "Sitting for 1 hour",
    "Running on even ground",
    "Running on uneven ground",
    "Making sharp turns while running fast",
    "Hopping",
    "Rolling over in bed"
  ];

  difficultyOptions = [
    { value: 0, text: 'Extreme Difficulty or Unable to Perform Activity' },
    { value: 1, text: 'Quite a bit of difficulty' },
    { value: 2, text: 'Moderate difficulty' },
    { value: 3, text: 'A little bit of difficulty' },
    { value: 4, text: 'No difficulty' }
  ];

  constructor(private fb: FormBuilder, private omtTestService: OmtTestService) {
    this.lefsForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      // Patient Satisfaction - Pain Level
      painlevel: [null, [Validators.required, Validators.min(0), Validators.max(10)]],

      // LEFS sections (20 questions)
      q1: [null, Validators.required],
      q2: [null, Validators.required],
      q3: [null, Validators.required],
      q4: [null, Validators.required],
      q5: [null, Validators.required],
      q6: [null, Validators.required],
      q7: [null, Validators.required],
      q8: [null, Validators.required],
      q9: [null, Validators.required],
      q10: [null, Validators.required],
      q11: [null, Validators.required],
      q12: [null, Validators.required],
      q13: [null, Validators.required],
      q14: [null, Validators.required],
      q15: [null, Validators.required],
      q16: [null, Validators.required],
      q17: [null, Validators.required],
      q18: [null, Validators.required],
      q19: [null, Validators.required],
      q20: [null, Validators.required]
    });
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
          this.lefsForm.patchValue(formValues);
        }
      });
    }
  }

  toggleInstructions(): void {
    this.showInstructions = !this.showInstructions;
  }

  calculateScore(): void {
    if (this.lefsForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.lefsForm.controls).forEach(key => {
        this.lefsForm.get(key)?.markAsTouched();
      });
      return;
    }

    // Build answers object with uppercase keys for backend
    const answers: { [key: string]: number } = {};
    Object.keys(this.lefsForm.controls).forEach(key => {
      const value = this.lefsForm.get(key)?.value;
      if (value !== null) {
        // Convert key to uppercase (e.g., q1 -> Q1, painlevel -> PAINLEVEL)
        answers[key.toUpperCase()] = parseInt(value, 10);
      }
    });

    this.omtTestService.calculate(this.testName, this.noteId, answers).subscribe(val => {
      this.getResult.emit(val);
    });
  }

  resetForm(): void {
    this.lefsForm.reset();
    this.lefsForm.markAsUntouched();
  }

  getAnsweredCount(): number {
    const controls = Object.keys(this.lefsForm.controls);
    return controls.filter(key => this.lefsForm.get(key)?.value !== null).length;
  }

  getCompletionPercentage(): number {
    const totalQuestions = 21; // 20 sections + 1 pain level
    return (this.getAnsweredCount() / totalQuestions) * 100;
  }
}
