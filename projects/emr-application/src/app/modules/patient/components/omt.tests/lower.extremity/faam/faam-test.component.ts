import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OMTTestValues } from '../../../../models/medical.note/omt.test/omt.test.values';
import { MedialNoteService } from '../../../../services/medical.note/medial-note.service';
import { OmtTestService } from '../../../../services/test/omt-test.service';

@Component({
  selector: 'lower-extremity-faam-test',
  templateUrl: './faam-test.component.html',
  styleUrls: ['./faam-test.component.css']
})
export class FaamTestComponent implements OnInit {
  faamSportsForm: FormGroup;
  showInstructions = false;
  @Output() getResult = new EventEmitter<any>()
  medicalNoteId: number;
  id: number
  testName: string = 'lower-extremity-faam'
  // Activity descriptions for the form
  activities = [
    "Running",
    "Jumping",
    "Landing",
    "Starting and stopping quickly",
    "Cutting/lateral movements",
    "Low impact activities",
    "Ability to perform activity with your normal technique",
    "Ability to participate in your desired sport as long as you would like"
  ];
  difficultyOptions = [
    { value: 4, text: 'No Difficulty' },
    { value: 3, text: 'Slight Difficulty' },
    { value: 2, text: 'Moderate Difficulty' },
    { value: 1, text: 'Extreme Difficulty' },
    { value: 0, text: 'Unable to Do' },
    { value: 5, text: 'N/A' }
  ];
  constructor(private fb: FormBuilder
    , private omtTestService: OmtTestService
    , private medicalNotService: MedialNoteService) {
    this.faamSportsForm = this.createForm();
  }

  createForm(): FormGroup {
    const formGroup: any = {
      // Patient Satisfaction - Pain Level
      painLevel: [null, [Validators.required, Validators.min(0), Validators.max(10)]]
    };

    // Create form controls for all 8 activities
    for (let i = 1; i <= 8; i++) {
      formGroup[`q${i}`] = [null, Validators.required];
    }

    return this.fb.group(formGroup);
  }
  toggleInstructions(): void {
    this.showInstructions = !this.showInstructions;
  }
  ngOnInit(): void {
    this.medicalNotService.medicalNoteID$.subscribe(id => {
      this.medicalNoteId = id
      this.omtTestService.findValues(this.medicalNoteId, this.testName).subscribe((data: any) => {
        this.id = data?.id
        setTimeout(() => {
          this.faamSportsForm.patchValue(data.values);
        }, 10);

      })
    })
  }
  calculateScore(): void {
    if (this.faamSportsForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.faamSportsForm.controls).forEach(key => {
        this.faamSportsForm.get(key)?.markAsTouched();
      });
      return;
    }
    const result = this.fillAnswers();
    this.omtTestService.lowerExtremity(result, 'faam').subscribe(val => {

      var omtTestValues: OMTTestValues = {
        id: this.id,
        medicalNoteId: this.medicalNoteId,
        testName: this.testName,
        values: this.faamSportsForm.getRawValue()
      };
      this.omtTestService.saveValues(omtTestValues).subscribe(val => {
      })
      this.getResult.emit(val)
    })
  }

  resetForm(): void {
    this.faamSportsForm.reset();
  }
  private fillAnswers(): any {
    var faamResult = {
      "answers": {
        "Q1": parseInt(this.faamSportsForm.value.q1, 10),
        "Q2": parseInt(this.faamSportsForm.value.q2, 10),
        "Q3": parseInt(this.faamSportsForm.value.q3, 10),
        "Q4": parseInt(this.faamSportsForm.value.q4, 10),
        "Q5": parseInt(this.faamSportsForm.value.q5, 10),
        "Q6": parseInt(this.faamSportsForm.value.q6, 10),
        "Q7": parseInt(this.faamSportsForm.value.q7, 10),
        "Q8": parseInt(this.faamSportsForm.value.q8, 10)
      }
    };
    // Filter out N/A values (value 5)
    const filteredResult = {
      answers: Object.fromEntries(
        Object.entries(faamResult.answers).filter(([_, value]) => value !== 5)
      )
    };
    return filteredResult;
  }
}
