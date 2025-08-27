import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    { id: 'ABC01', text: '1. walk around the house?' },
    { id: 'ABC02', text: '2. walk up or down stairs?' },
    { id: 'ABC03', text: '3. bend over and pick up a slipper from the front of a closet floor?' },
    { id: 'ABC04', text: '4. reach for a small can off a shelf at eye level?' },
    { id: 'ABC05', text: '5. stand on your tiptoes and reach for something above your head?' },
    { id: 'ABC06', text: '6. stand on a chair and reach for something?' },
    { id: 'ABC07', text: '7. sweep the floor?' },
    { id: 'ABC08', text: '8. walk outside the house to a car parked in the driveway?' },
    { id: 'ABC09', text: '9. get into or out of a car?' },
    { id: 'ABC10', text: '10. walk across a parking lot to the mall?' },
    { id: 'ABC11', text: '11. walk up or down a ramp?' },
    { id: 'ABC12', text: '12. walk in a crowded mall where people rapidly walk past you?' },
    { id: 'ABC13', text: '13. are bumped into by people as you walk through the mall?' },
    { id: 'ABC14', text: '14. step onto or off an escalator while you are holding onto a railing?' },
    { id: 'ABC15', text: '15. step onto or off an escalator while holding onto parcels such that you cannot hold onto the railing?' },
    { id: 'ABC16', text: '16. walk outside on icy sidewalks?' }
  ];

  options = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  constructor(private fb: FormBuilder) {
    this.abcForm = this.createForm();
  }
  toggleInstructions(): void {
    this.showInstructions = !this.showInstructions;
  }
  ngOnInit(): void {
    this.abcForm.valueChanges.subscribe(() => {
      if (this.isFormComplete()) {
        this.calculateScore();
      } else {
        this.totalScore = null;
        this.interpretation = '';
      }
    });
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
    let total = 0;
    
    this.questions.forEach(question => {
      const value = this.abcForm.get(question.id)?.value;
      if (value !== null) {
        total += parseInt(value);
      }
    });
    
    this.totalScore = total / 16;
    this.setInterpretation();
  }

  setInterpretation(): void {
    if (this.totalScore === null) return;
    
    if (this.totalScore >= 80) {
      this.interpretation = 'High level of physical functioning';
    } else if (this.totalScore >= 50) {
      this.interpretation = 'Moderate level of physical functioning';
    } else {
      this.interpretation = 'Low level of physical functioning';
    }
    
    if (this.totalScore < 67) {
      this.interpretation += '. Older adults at risk for falling; predictive of future fall';
    }
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
