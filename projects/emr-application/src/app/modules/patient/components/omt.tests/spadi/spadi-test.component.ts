import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InvalidFormControls } from 'projects/emr-application/src/app/util/invalid.form';
import { OmtTestService } from '../../../services/test/omt-test.service';

@Component({
  selector: 'spadi-test',
  templateUrl: './spadi-test.component.html',
  styleUrls: ['./spadi-test.component.css']
})
export class SpadiTestComponent implements OnInit {
  spadiForm: FormGroup;
  showInstructions = false;d
  @Output() getResult = new EventEmitter<any>()
  constructor(private fb: FormBuilder, private omtTestService: OmtTestService ) {
    this.spadiForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      // Pain Scale Questions (1-5)
      pain1: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      pain2: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      pain3: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      pain4: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      pain5: [null, [Validators.required, Validators.min(0), Validators.max(10)]],

      // Disability Scale Questions (6-13)
      disability1: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      disability2: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      disability3: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      disability4: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      disability5: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      disability6: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      disability7: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      disability8: [null, [Validators.required, Validators.min(0), Validators.max(10)]]
    });
  }
  toggleInstructions(): void {
    this.showInstructions = !this.showInstructions;
  }
  calculateScore(): void {
    if (this.spadiForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.spadiForm.controls).forEach(key => {
        this.spadiForm.get(key)?.markAsTouched();
      });
      console.log(InvalidFormControls.findInvalidControlsRecursive(this.spadiForm))
      return;
    }
    const result = {
      "pain": {
        "pain1": parseInt(this.spadiForm.value.pain1, 10),
        "pain2": parseInt(this.spadiForm.value.pain2, 10),
        "pain3": parseInt(this.spadiForm.value.pain3, 10),
        "pain4": parseInt(this.spadiForm.value.pain4, 10),
        "pain5": parseInt(this.spadiForm.value.pain5, 10)
      },
      "disability": {
        "disability1": parseInt(this.spadiForm.value.disability1, 10),
        "disability2": parseInt(this.spadiForm.value.disability2, 10),
        "disability3": parseInt(this.spadiForm.value.disability3, 10),
        "disability4": parseInt(this.spadiForm.value.disability4, 10),
        "disability5": parseInt(this.spadiForm.value.disability5, 10),
        "disability6": parseInt(this.spadiForm.value.disability6, 10),
        "disability7": parseInt(this.spadiForm.value.disability7, 10),
        "disability8": parseInt(this.spadiForm.value.disability8, 10)
      }
    }
    this.omtTestService.spadiTest(result).subscribe(val=>{
      console.log(JSON.stringify(val))
      this.getResult.emit(val)
    })
  }

  resetForm(): void {
    this.spadiForm.reset();
  }
  ngOnInit(): void {
  }

}
