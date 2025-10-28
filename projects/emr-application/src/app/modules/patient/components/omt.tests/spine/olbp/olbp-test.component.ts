import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OMTTestValues } from '../../../../models/medical.note/omt.test/omt.test.values';
import { MedialNoteService } from '../../../../services/medical.note/medial-note.service';
import { OmtTestService } from '../../../../services/test/omt-test.service';

@Component({
  selector: 'spine-olbp-test',
  templateUrl: './olbp-test.component.html',
  styleUrls: ['./olbp-test.component.css']
})
export class OlbpTestComponent implements OnInit {
  oswestryForm: FormGroup;
  showInstructions = false;
  private testName: string = 'spine-olbp';
  @Output() getResult = new EventEmitter<any>()
  medicalNoteId: number;
  id: number
  sections = [
    "Pain Intensity",
    "Personal Care (Washing, Dressing, etc.)",
    "Lifting",
    "Walking",
    "Sitting",
    "Standing",
    "Sleeping",
    "Social Life",
    "Traveling",
    "Changing Degree of Pain"
  ];
  constructor(private fb: FormBuilder
    , private omtTestService: OmtTestService
    , private medicalNotService: MedialNoteService) {
    this.oswestryForm = this.createForm();
  }

  ngOnInit(): void {
    this.medicalNotService.medicalNoteID$.subscribe(id => {
      this.medicalNoteId = id
      this.omtTestService.findValues(this.medicalNoteId, this.testName).subscribe((data: any) => {
        this.id = data?.id
        setTimeout(() => {
          this.oswestryForm.patchValue(data.values);
        }, 10);

      })
    })
  }
  createForm(): FormGroup {
    return this.fb.group({  
      // Oswestry sections
      q1: [null, Validators.required],
      q2: [null, Validators.required],
      q3: [null, Validators.required],
      q4: [null, Validators.required],
      q5: [null, Validators.required],
      q6: [null, Validators.required],
      q7: [null, Validators.required],
      q8: [null, Validators.required],
      q9: [null, Validators.required],
      q10: [null, Validators.required]
    });
  }

  toggleInstructions(): void {
    this.showInstructions = !this.showInstructions;
  }

  calculateScore(): void {
    if (this.oswestryForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.oswestryForm.controls).forEach(key => {
        this.oswestryForm.get(key)?.markAsTouched();
      });
      return;
    }
    const result = {
      "Q1": parseInt(this.oswestryForm.value.q1, 10),
      "Q2": parseInt(this.oswestryForm.value.q2, 10),
      "Q3": parseInt(this.oswestryForm.value.q3, 10),
      "Q4": parseInt(this.oswestryForm.value.q4, 10),
      "Q5": parseInt(this.oswestryForm.value.q5, 10),
      "Q6": parseInt(this.oswestryForm.value.q6, 10),
      "Q7": parseInt(this.oswestryForm.value.q7, 10),
      "Q8": parseInt(this.oswestryForm.value.q8, 10),
      "Q9": parseInt(this.oswestryForm.value.q9, 10),
      "Q10": parseInt(this.oswestryForm.value.q10, 10)
    };
    this.omtTestService.spine(result, "olbp").subscribe(val => {
      var omtTestValues: OMTTestValues = {
        id: this.id,
        medicalNoteId: this.medicalNoteId,
        testName: this.testName,
        values: this.oswestryForm.getRawValue()
      };
      this.omtTestService.saveValues(omtTestValues).subscribe(val => {
      })
      this.getResult.emit(val)
    })
  }

  resetForm(): void {
    this.oswestryForm.reset();
  }
}
