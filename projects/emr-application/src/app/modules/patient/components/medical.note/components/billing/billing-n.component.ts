import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { MedicalNoteType } from '../../../../models/medical.note/medical.note.type';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'billing-n',
  templateUrl: './billing-n.component.html',
  styleUrls: ['./billing-n.component.css']
})
export class BillingNComponent implements OnInit {
  @Input() parentForm: FormGroup
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() stepper!: MatStepper
  @Input() noteTypeId: string
  @Input() caseId: number
  @Input() medicalNoteId: number
  BillingForm: FormGroup;
  finalizeNoteVisibility: boolean = false;
  forwardVisibility: boolean = false;
  noteType: MedicalNoteType = MedicalNoteType.Initial_Examination;
  constructor(private fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initForm();
    this.formReady.emit(this.BillingForm);
  }
  initForm() {
    this.BillingForm = this.fb.group({
      dailyNoteIncluded: [true],
      precautions: [''],
      objective_findings: [''],
      pre_Treatment: [''],
      post_Treatment: [''],
      untimedCodes: this.fb.group({}),
      strapping: this.fb.group({}),
      directTimedCodes: this.fb.group({}),
      calendarMonth: this.fb.group({}),
      nerveConductionStudies: this.fb.group({}),
      respiratory: this.fb.group({}),
      otherTreatmentProcedures: this.fb.group({}),
      supplies: this.fb.group({}),
      splintsorthotics: this.fb.group({}),
      casts: this.fb.group({}),
      braces: this.fb.group({}),
    });
  }
  setChildForm(section: string, formGroup: FormGroup) {
    // console.log('section ' + section);
    // console.log('formGroup.controls ' + JSON.stringify(formGroup.controls))
    // Object.keys(formGroup.controls).forEach(key => {
    //   console.log(key, formGroup.get(key));
    // });
    this.BillingForm.setControl(section, formGroup);
  }

  showForwardModal() {
    this.forwardVisibility = true;
  }

  changeForwardVisibility(event: string) {
    if (event === 'close') {
      this.forwardVisibility = false;
    }
  }

  showFinalizeNotePopup() {
    this.finalizeNoteVisibility = true;
  }

  changeFinalizeNoteVisibility(event: any) {
    if (event === 'no') {
      this.finalizeNoteVisibility = false;
    }
    if (event === 'yes') {
      this.finalizeNoteVisibility = false;
      this.toastr.success('Medical note has been finalized');
    }
  }
}
