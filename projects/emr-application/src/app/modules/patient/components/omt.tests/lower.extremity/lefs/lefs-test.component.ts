import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OmtTestService } from '../../../../services/test/omt-test.service';

@Component({
  selector: 'lower-extremity-lefs-test',
  templateUrl: './lefs-test.component.html',
  styleUrls: ['./lefs-test.component.css']
})
export class LefsTestComponent implements OnInit {
  lefsForm: FormGroup;
  showInstructions = false;

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

  ngOnInit(): void {
  }
  createForm(): FormGroup {
    const formGroup: any = {
      // Patient Satisfaction - Pain Level
      painLevel: [null, [Validators.required, Validators.min(0), Validators.max(10)]]
    };

    // Create form controls for all 20 activities
    for (let i = 1; i <= 20; i++) {
      formGroup[`q${i}`] = [0, Validators.required];
    }

    return this.fb.group(formGroup);
  }
  calculateScore(): void {
    if (this.lefsForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.lefsForm.controls).forEach(key => {
        this.lefsForm.get(key)?.markAsTouched();
      });
      return;
    }
    const result = this.fillAnswers();
    this.omtTestService.lowerExtremity(result, 'lefs').subscribe(res => {
      console.log(JSON.stringify(res))
    })
  }
  resetForm(): void {
    this.lefsForm.reset();
  }
  toggleInstructions(): void {
    this.showInstructions = !this.showInstructions;
  }
  private fillAnswers() {
    return {
      "answers": {
        "Q1": parseInt(this.lefsForm.value.q1, 10),
        "Q2": parseInt(this.lefsForm.value.q2, 10),
        "Q3": parseInt(this.lefsForm.value.q3, 10),
        "Q4": parseInt(this.lefsForm.value.q4, 10),
        "Q5": parseInt(this.lefsForm.value.q5, 10),
        "Q6": parseInt(this.lefsForm.value.q6, 10),
        "Q7": parseInt(this.lefsForm.value.q7, 10),
        "Q8": parseInt(this.lefsForm.value.q8, 10),
        "Q9": parseInt(this.lefsForm.value.q9, 10),
        "Q10": parseInt(this.lefsForm.value.q10, 10),
        "Q11": parseInt(this.lefsForm.value.q11, 10),
        "Q12": parseInt(this.lefsForm.value.q12, 10),
        "Q13": parseInt(this.lefsForm.value.q13, 10),
        "Q14": parseInt(this.lefsForm.value.q14, 10),
        "Q15": parseInt(this.lefsForm.value.q15, 10),
        "Q16": parseInt(this.lefsForm.value.q16, 10),
        "Q17": parseInt(this.lefsForm.value.q17, 10),
        "Q18": parseInt(this.lefsForm.value.q18, 10),
        "Q19": parseInt(this.lefsForm.value.q19, 10),
        "Q20": parseInt(this.lefsForm.value.q20, 10),
      }
    };
  }
}
