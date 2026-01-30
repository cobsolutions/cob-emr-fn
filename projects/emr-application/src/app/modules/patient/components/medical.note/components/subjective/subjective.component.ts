import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { SoapService } from '../../../../services/medical.note/soap/soap.service';
@Component({
  selector: 'subjective',
  templateUrl: './subjective.component.html',
  styleUrls: ['./subjective.component.css']
})
export class SubjectiveComponent implements OnInit {
  subjectiveForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() stepper!: MatStepper
  @Input() subjectiveData: any
  @Input() noteType: string
  isPelvicProfile = false;
  subjectiveFormFields: any
  constructor(private fb: FormBuilder,
    private soapService: SoapService) {

  }
  ngOnInit(): void {
    this.subjectiveForm = this.fb.group({
      basic: this.fb.group({}),
      priorFunction: this.fb.group({}),
      currentFunction: this.fb.group({}),
      pain: this.fb.group({}),
      medicalHistory: this.fb.group({})

    });
    this.formReady.emit(this.subjectiveForm);
    // this.soapService.findSoapFields('subjective', this.noteType).subscribe(fields => {
    //   this.subjectiveFormFields = fields;
    //   if (this.subjectiveData === undefined)
        
    //   else
    //     this.subjectiveForm = this.fb.group({
    //       basic: this.fb.group({}),
    //       priorFunction: this.fb.group({}),
    //       currentFunction: this.fb.group({}),
    //       pain: this.fb.group({}),
    //       medicalHistory: this.fb.group({})

    //     });
      
    // })
  }
  createFormGroup(obj: any): FormGroup {
    const group: any = {};
    Object.keys(obj).forEach((key) => {
      if (obj[key] !== null && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        // If the value is an object, recursively create a form group
        group[key] = this.createFormGroup(obj[key]);
      } else {
        // Otherwise, create a form control
        group[key] = new FormControl(obj[key]);
      }
    });
    var dd = this.fb.group(group);
    console.log(dd)
    return dd;
  }
  setChildForm(section: string, formGroup: FormGroup) {
    this.subjectiveForm.setControl(section, formGroup);
  }
  next() {
    this.stepper.next();
  }

}
