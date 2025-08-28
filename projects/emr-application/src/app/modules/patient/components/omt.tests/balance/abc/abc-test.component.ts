import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OmtTestService } from '../../../../services/test/omt-test.service';

@Component({
  selector: 'balance-abc-test',
  templateUrl: './abc-test.component.html',
  styleUrls: ['./abc-test.component.css']
})
export class AbcTestComponent implements OnInit {
  abcForm: FormGroup;
  totalScore: number | null = null;
  interpretation: string = '';
  showInstructions = false;
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
  toggleInstructions(): void {
    this.showInstructions = !this.showInstructions;
  }
  ngOnInit(): void {

  }
  createForm(): FormGroup {
    const formGroup = this.fb.group({});

    this.questions.forEach(question => {
      formGroup.addControl(question.id, this.fb.control(null, Validators.required));
    });

    return formGroup;
  }

  isFormComplete(): boolean {
    return this.questions.every(question =>
      this.abcForm.get(question.id)?.value !== null
    );
  }
  calculateScore(): void {
    if (this.abcForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.abcForm.controls).forEach(key => {
        this.abcForm.get(key)?.markAsTouched();
      });
      return;
    }
    const result = this.fillAnswers()
    this.omtTestService.balance(result).subscribe(rr => {
      console.log(JSON.stringify(rr))
    })
  }

  private fillAnswers() {
    const answers: Record<string, number> = {};
    for (var i = 1; i <= 16; i++) {
      const key = `${'Q' + i}`
      const value = this.abcForm.value[key];
      answers[key] = value !== null && value !== undefined ? parseInt(value, 10) : null;
    }
    return { answers, "testType": "abc" };
  }
  onSubmit(): void {
    if (this.abcForm.valid) {
      this.calculateScore();
    } else {
      // Mark all fields as touched to show validation messages
      Object.keys(this.abcForm.controls).forEach(key => {
        this.abcForm.get(key)?.markAsTouched();
      });
    }
  }

  resetForm(): void {
    this.abcForm.reset();
    this.totalScore = null;
    this.interpretation = '';
  }

}
