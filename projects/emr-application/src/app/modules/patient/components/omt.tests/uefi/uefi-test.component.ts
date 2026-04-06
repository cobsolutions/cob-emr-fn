import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OmtTestService } from '../../medical.note/components/objective/service/omt-test/omt-test.service';

@Component({
  selector: 'uefi-test',
  templateUrl: './uefi-test.component.html',
  styleUrls: ['./uefi-test.component.css']
})
export class UefiTestComponent implements OnInit {

  uefiForm: FormGroup;
  showInstructions = false;
  private testName: string = 'uefi';
  @Input() noteId: string;
  @Output() getResult = new EventEmitter<any>();

  // Question labels for the form
  questions = [
    "Any of your usual work, housework, or school activities",
    "Your usual hobbies, recreational or sporting activities",
    "Lifting a bag of groceries to waist level",
    "Lifting a bag of groceries above your head",
    "Grooming your hair",
    "Pushing up on your hands (eg from bathtub or chair)",
    "Preparing food (eg peeling, cutting)",
    "Driving",
    "Vacuuming, sweeping or raking",
    "Dressing",
    "Doing up buttons",
    "Using tools or appliances",
    "Opening doors",
    "Cleaning",
    "Tying or lacing shoes",
    "Sleeping",
    "Laundering clothes (eg washing, ironing, folding)",
    "Opening a jar",
    "Throwing a ball",
    "Carrying a small suitcase with your affected limb"
  ];

  // Options for difficulty level
  difficultyOptions = [
    { value: '0', text: 'Extreme Difficulty or Unable to Perform Activity' },
    { value: '1', text: 'Quite a Bit of Difficulty' },
    { value: '2', text: 'Moderate Difficulty' },
    { value: '3', text: 'A Little Bit of Difficulty' },
    { value: '4', text: 'No Difficulty' }
  ];

  constructor(
    private fb: FormBuilder,
    private omtTestService: OmtTestService
  ) {
    this.uefiForm = this.createForm();
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
          this.uefiForm.patchValue(formValues);
        }
      });
    }
  }

  createForm(): FormGroup {
    const formGroup: any = {};

    // Create form controls for all 20 questions
    for (let i = 1; i <= 20; i++) {
      formGroup[`q${i}`] = [null, Validators.required];
    }

    return this.fb.group(formGroup);
  }

  toggleInstructions(): void {
    this.showInstructions = !this.showInstructions;
  }

  calculateScore(): void {
    if (this.uefiForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.uefiForm.controls).forEach(key => {
        this.uefiForm.get(key)?.markAsTouched();
      });
      return;
    }

    // Build answers object
    const answers: { [key: string]: number } = {};
    for (let i = 1; i <= 20; i++) {
      const value = this.uefiForm.get(`q${i}`)?.value;
      answers[`Q${i}`] = parseInt(value, 10);
    }

    this.omtTestService.calculate(this.testName, this.noteId, answers).subscribe(val => {
      this.getResult.emit(val);
    });
  }

  resetForm(): void {
    // Reset all controls to null
    const resetValues: { [key: string]: null } = {};
    for (let i = 1; i <= 20; i++) {
      resetValues[`q${i}`] = null;
    }
    this.uefiForm.patchValue(resetValues);
    this.uefiForm.markAsUntouched();
  }

  getAnsweredCount(): number {
    let count = 0;
    for (let i = 1; i <= 20; i++) {
      const value = this.uefiForm.get(`q${i}`)?.value;
      if (value !== null && value !== undefined && value !== '') {
        count++;
      }
    }
    return count;
  }

  getCompletionPercentage(): number {
    return (this.getAnsweredCount() / 20) * 100;
  }

  isAnswered(index: number): boolean {
    const value = this.uefiForm.get(`q${index}`)?.value;
    return value !== null && value !== undefined && value !== '';
  }

  findInvalidControlsRecursive(formToInvestigate: FormGroup | FormArray): string[] {
    const invalidControls: string[] = [];
    const recursiveFunc = (form: FormGroup | FormArray) => {
      Object.keys(form.controls).forEach(field => {
        const control = form.get(field);
        if (control instanceof FormGroup || control instanceof FormArray) {
          recursiveFunc(control);
        } else if (control instanceof FormControl && control.invalid) {
          invalidControls.push(field);
        }
      });
    };
    recursiveFunc(formToInvestigate);
    return invalidControls;
  }
}
