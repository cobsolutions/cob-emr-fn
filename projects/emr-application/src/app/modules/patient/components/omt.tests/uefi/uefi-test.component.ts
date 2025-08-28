import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OmtTestService } from '../../../services/test/omt-test.service';

@Component({
  selector: 'uefi-test',
  templateUrl: './uefi-test.component.html',
  styleUrls: ['./uefi-test.component.css']
})
export class UefiTestComponent implements OnInit {

  uefiForm: FormGroup;
  showInstructions = false;
  @Output() getResult = new EventEmitter<any>()
  constructor(private fb: FormBuilder, private omtTestService: OmtTestService) {
    this.uefiForm = this.createForm();
  }

  ngOnInit(): void {
  }
  createForm(): FormGroup {
    return this.fb.group({
      // Create form controls for all 20 questions
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

  toggleInstructions(): void {
    this.showInstructions = !this.showInstructions;
  }
  calculateScore(): void {
    if (this.uefiForm.invalid) {
      // Mark all fields as touched to show validation errors
      console.log(this.findInvalidControlsRecursive(this.uefiForm))
      Object.keys(this.uefiForm.controls).forEach(key => {
        this.uefiForm.get(key)?.markAsTouched();
      });
      return;
    }
    const result = {
      "Q1": parseInt(this.uefiForm.value.q1, 10),
      "Q2": parseInt(this.uefiForm.value.q2, 10),
      "Q3": parseInt(this.uefiForm.value.q3, 10),
      "Q4": parseInt(this.uefiForm.value.q4, 10),
      "Q5": parseInt(this.uefiForm.value.q5, 10),
      "Q6": parseInt(this.uefiForm.value.q6, 10),
      "Q7": parseInt(this.uefiForm.value.q7, 10),
      "Q8": parseInt(this.uefiForm.value.q8, 10),
      "Q9": parseInt(this.uefiForm.value.q9, 10),
      "Q10": parseInt(this.uefiForm.value.q10, 10),
      "Q11": parseInt(this.uefiForm.value.q11, 10),
      "Q12": parseInt(this.uefiForm.value.q12, 10),
      "Q13": parseInt(this.uefiForm.value.q13, 10),
      "Q14": parseInt(this.uefiForm.value.q14, 10),
      "Q15": parseInt(this.uefiForm.value.q15, 10),
      "Q16": parseInt(this.uefiForm.value.q16, 10),
      "Q17": parseInt(this.uefiForm.value.q17, 10),
      "Q18": parseInt(this.uefiForm.value.q18, 10),
      "Q19": parseInt(this.uefiForm.value.q19, 10),
      "Q20": parseInt(this.uefiForm.value.q20, 10),
    };
    this.omtTestService.uefiTest(result).subscribe(val => {
      //Finalize ueqd Test  
      this.getResult.emit(val)
    })
  }

  resetForm(): void {
    this.uefiForm.reset();
  }
  findInvalidControlsRecursive(formToInvestigate: FormGroup | FormArray): string[] {
    const invalidControls: string[] = [];
    const recursiveFunc = (form: FormGroup | FormArray) => {
      Object.keys(form.controls).forEach(field => {
        const control = form.get(field);
        if (control instanceof FormGroup || control instanceof FormArray) {
          recursiveFunc(control); // Recursively check nested forms/arrays
        } else if (control instanceof FormControl && control.invalid) {
          invalidControls.push(field);
        }
      });
    };
    recursiveFunc(formToInvestigate);
    return invalidControls;
  }

}
