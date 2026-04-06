import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OmtTestService } from '../../../medical.note/components/objective/service/omt-test/omt-test.service';

@Component({
  selector: 'balance-abc-test',
  templateUrl: './abc-test.component.html',
  styleUrls: ['./abc-test.component.css']
})
export class AbcTestComponent implements OnInit {
  abcForm: FormGroup;
  showInstructions = false;
  private testName: string = 'abc';
  @Input() noteId: string;
  @Output() getResult = new EventEmitter<any>();
  questions = [
    { id: 'Q1', text: '1. walk around the house?' },
    { id: 'Q2', text: '2. walk up or down stairs?' },
    { id: 'Q3', text: '3. bend over and pick up a slipper from the front of a closet floor?' },
    { id: 'Q4', text: '4. reach for a small can off a shelf at eye level?' },
    { id: 'Q5', text: '5. stand on your tiptoes and reach for something above your head?' },
    { id: 'Q6', text: '6. stand on a chair and reach for something?' },
    { id: 'Q7', text: '7. sweep the floor?' },
    { id: 'Q8', text: '8. walk outside the house to a car parked in the driveway?' },
    { id: 'Q9', text: '9. get into or out of a car?' },
    { id: 'Q10', text: '10. walk across a parking lot to the mall?' },
    { id: 'Q11', text: '11. walk up or down a ramp?' },
    { id: 'Q12', text: '12. walk in a crowded mall where people rapidly walk past you?' },
    { id: 'Q13', text: '13. are bumped into by people as you walk through the mall?' },
    { id: 'Q14', text: '14. step onto or off an escalator while you are holding onto a railing?' },
    { id: 'Q15', text: '15. step onto or off an escalator while holding onto parcels such that you cannot hold onto the railing?' },
    { id: 'Q16', text: '16. walk outside on icy sidewalks?' }
  ];

  options = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  constructor(private fb: FormBuilder, private omtTestService: OmtTestService) {
    this.abcForm = this.createForm();
  }

  ngOnInit(): void {
    if (this.noteId) {
      this.omtTestService.getAnswers(this.testName, this.noteId).subscribe(response => {
        if (response?.answers) {
          const formValues: { [key: string]: number } = {};
          Object.entries(response.answers).forEach(([key, value]) => {
            formValues[key] = value as number;
          });
          this.abcForm.patchValue(formValues);
        }
      });
    }
  }

  toggleInstructions(): void {
    this.showInstructions = !this.showInstructions;
  }
  createForm(): FormGroup {
    const formGroup = this.fb.group({});

    this.questions.forEach(question => {
      formGroup.addControl(question.id, this.fb.control(null, Validators.required));
    });

    return formGroup;
  }

  calculateScore(): void {
    if (this.abcForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.abcForm.controls).forEach(key => {
        this.abcForm.get(key)?.markAsTouched();
      });
      return;
    }

    // Build answers object for backend
    const answers: { [key: string]: number } = {};
    Object.keys(this.abcForm.controls).forEach(key => {
      const value = this.abcForm.get(key)?.value;
      if (value !== null) {
        answers[key] = parseInt(value, 10);
      }
    });

    this.omtTestService.calculate(this.testName, this.noteId, answers).subscribe(val => {
      this.getResult.emit(val);
    });
  }

  resetForm(): void {
    this.abcForm.reset();
    this.abcForm.markAsUntouched();
  }

  getAnsweredCount(): number {
    const controls = Object.keys(this.abcForm.controls);
    return controls.filter(key => this.abcForm.get(key)?.value !== null).length;
  }

  getCompletionPercentage(): number {
    const totalQuestions = 16;
    return (this.getAnsweredCount() / totalQuestions) * 100;
  }
}
