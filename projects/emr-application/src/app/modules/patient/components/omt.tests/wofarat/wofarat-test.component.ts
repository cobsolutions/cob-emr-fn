import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OmtTestService } from '../../medical.note/components/objective/service/omt-test/omt-test.service';

@Component({
  selector: 'wofarat-test',
  templateUrl: './wofarat-test.component.html',
  styleUrls: ['./wofarat-test.component.css']
})
export class WofaratTestComponent implements OnInit {
  wofaratForm: FormGroup;
  showInstructions = false;
  private testName: string = 'wofarat';
  @Input() noteId: string;
  @Output() getResult = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private omtTestService: OmtTestService) {
    this.wofaratForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      painlevel: [null],
      q1: [null, Validators.required]
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
          this.wofaratForm.patchValue(formValues);
        }
      });
    }
  }

  toggleInstructions(): void {
    this.showInstructions = !this.showInstructions;
  }

  calculateScore(): void {
    if (this.wofaratForm.invalid) {
      Object.keys(this.wofaratForm.controls).forEach(key => {
        this.wofaratForm.get(key)?.markAsTouched();
      });
      return;
    }

    const answers: { [key: string]: number } = {};
    Object.keys(this.wofaratForm.controls).forEach(key => {
      const value = this.wofaratForm.get(key)?.value;
      if (value !== null) {
        answers[key.toUpperCase()] = parseInt(value, 10);
      }
    });

    this.omtTestService.calculate(this.testName, this.noteId, answers).subscribe(val => {
      this.getResult.emit(val);
    });
  }

  onFaceSelect(value: number): void {
    this.wofaratForm.patchValue({ q1: value });
    this.calculateScore();
  }

  resetForm(): void {
    this.wofaratForm.reset();
    this.wofaratForm.markAsUntouched();
  }

  getAnsweredCount(): number {
    const questionControls = ['q1'];
    return questionControls.filter(key => this.wofaratForm.get(key)?.value !== null).length;
  }

  getCompletionPercentage(): number {
    const totalQuestions = 1;
    return (this.getAnsweredCount() / totalQuestions) * 100;
  }
}
