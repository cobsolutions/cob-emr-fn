import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OmtTestService } from '../../../services/test/omt-test.service';
import { dashValidator } from '../validator/not.selected';

@Component({
  selector: 'dash-test',
  templateUrl: './dash-test.component.html',
  styleUrls: ['./dash-test.component.css']
})
export class DashTestComponent implements OnInit {
  dashForm: FormGroup;
  showInstructions = false;
  // Question labels for the form
  questions = [
    "Open a tight or new jar.",
    "Write.",
    "Turn a key.",
    "Prepare a meal.",
    "Push open a heavy door.",
    "Place an object on a shelf above your head.",
    "Do heavy household chores (e.g, wash walls, wash floors).",
    "Garden or do yard work.",
    "Make a bed.",
    "Carry a shopping bag or briefcase.",
    "Carry a heavy object (over 10 lbs).",
    "Change a light bulb overhead.",
    "Wash or blow dry your hair.",
    "Wash your back.",
    "Put on a pullover sweater.",
    "Use a knife to cut food.",
    "Recreational activities which require little effort (e.g, card playing, knitting, etc.).",
    "Recreational activities in which you take home force or impact through your arm, shoulder or hand (e.g, golf, hammering, tennis, etc.).",
    "Recreational activities in which you move your arm freely (e.g. playing frisbee, badminton, etc.)",
    "Manage transportation needs (getting from one place to another).",
    "Sexual activities.",
    "During the past week, to what extent has your arm, shoulder or hand problem interfered with your normal social activities with family, friends, neighbors or groups?",
    "During the past week, were you limited in your work or other regular daily activities as a result of your arm, shoulder or hand problem?",
    "Arm, shoulder or hand pain.",
    "Arm, shoulder or hand pain when you performed any specific activity.",
    "Tingling (pins and needles) in your arm, shoulder or hand.",
    "Weakness in your arm, shoulder or hand.",
    "Stiffness in your arm, shoulder or hand.",
    "During the past week, how much difficulty have you had sleeping because of the pain in your arm, shoulder or hand?",
    "I feel less capable, less confident or less useful because of my arm, shoulder or hand problem."
  ];
  // Options for different question types
  difficultyOptions = [
    { value: 'NT', text: 'Not Tested' },
    { value: '1', text: 'No Difficulty' },
    { value: '2', text: 'Mild Difficulty' },
    { value: '3', text: 'Moderate Difficulty' },
    { value: '4', text: 'Severe Difficulty' },
    { value: '5', text: 'Unable' }
  ];
  interferenceOptions = [
    { value: 'NT', text: 'Not Tested' },
    { value: '1', text: 'Not at All' },
    { value: '2', text: 'Slightly' },
    { value: '3', text: 'Moderately' },
    { value: '4', text: 'Quite a Bit' },
    { value: '5', text: 'Extremely' }
  ];

  limitationOptions = [
    { value: 'NT', text: 'Not Tested' },
    { value: '1', text: 'Not Limited at All' },
    { value: '2', text: 'Slightly Limited' },
    { value: '3', text: 'Moderately Limited' },
    { value: '4', text: 'Very Limited' },
    { value: '5', text: 'Unable' }
  ];

  severityOptions = [
    { value: 'NT', text: 'Not Tested' },
    { value: '1', text: 'None' },
    { value: '2', text: 'Mild' },
    { value: '3', text: 'Moderate' },
    { value: '4', text: 'Severe' },
    { value: '5', text: 'Extreme' }
  ];

  sleepOptions = [
    { value: 'NT', text: 'Not Tested' },
    { value: '1', text: 'No Difficulty' },
    { value: '2', text: 'Mild Difficulty' },
    { value: '3', text: 'Moderate Difficulty' },
    { value: '4', text: 'Severe Difficulty' },
    { value: '5', text: 'So Difficulty Can\'t Sleep' }
  ];

  agreementOptions = [
    { value: 'NT', text: 'Not Tested' },
    { value: '1', text: 'Strongly Disagree' },
    { value: '2', text: 'Disagree' },
    { value: '3', text: 'Neither Agree nor Disagree' },
    { value: '4', text: 'Agree' },
    { value: '5', text: 'Strongly Agree' }
  ];

  constructor(private fb: FormBuilder, private omtTestService: OmtTestService) {
    this.dashForm = this.createForm();
  }
  ngOnInit(): void {
  }
  createForm(): FormGroup {
    const formGroup: any = {};

    // Create form controls for all 30 questions
    for (let i = 1; i <= 30; i++) {
      formGroup[`q${i}`] = ['NT', [Validators.required, dashValidator()]];
    }

    return this.fb.group(formGroup);
  }

  toggleInstructions(): void {
    this.showInstructions = !this.showInstructions;
  }
  getOptionsForQuestion(index: number): any[] {
    // Questions 1-21: Difficulty options
    if (index >= 1 && index <= 21) {
      return this.difficultyOptions;
    }
    // Question 22: Interference options
    else if (index === 22) {
      return this.interferenceOptions;
    }
    // Question 23: Limitation options
    else if (index === 23) {
      return this.limitationOptions;
    }
    // Questions 24-28: Severity options
    else if (index >= 24 && index <= 28) {
      return this.severityOptions;
    }
    // Question 29: Sleep options
    else if (index === 29) {
      return this.sleepOptions;
    }
    // Question 30: Agreement options
    else if (index === 30) {
      return this.agreementOptions;
    }

    return this.difficultyOptions; // Default
  }
  calculateScore(): void {
    if (this.dashForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.dashForm.controls).forEach(key => {
        this.dashForm.get(key)?.markAsTouched();
      });
      return;
    }

    // Calculate DASH score
    const result: { [key: string]: number } = {};
    for (let i = 1; i <= 30; i++) {
      const value = this.dashForm.get(`q${i}`)?.value;
      // Only include if not "Not Tested"
      if (value !== 'NT') {
        result[`Q${i}`] = (parseInt(value, 10) - 1);
      }
    }
    this.omtTestService.dashTest(result).subscribe(re => {
      console.log(JSON.stringify(re))
    })
  }

  resetForm(): void {
    this.dashForm.reset();
  }
}
