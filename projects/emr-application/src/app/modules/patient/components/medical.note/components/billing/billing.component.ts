import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { DotorUserService } from 'projects/emr-application/src/app/modules/administration/services/user/doctor.user/dotor-user.service';
import { LoggedInService } from 'projects/emr-application/src/app/modules/security/service/loggedIn/logged-in.service';
import { filter, switchMap } from 'rxjs';
import { MedicalNoteRequest } from '../../../../models/medical.note/medical.note.request';
import { MedialNoteService } from '../../../../services/medical.note/medial-note.service';

@Component({
  selector: 'billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {
  @Input() parentForm: FormGroup
  billingForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() stepper!: MatStepper
  @Input() billingData: any
  @Input() creator: string
  @Input() noteFinalizr: string
  fields: any
  instructions = [
    { label: 'Progressing Patient Next Visit', value: 'DN1' },
    { label: 'Progress Therapeutic Exercises', value: 'DN2' },
    { label: 'Progress Note Needed', value: 'DN3' },
    { label: 'Anticipate Discharging Patient Next Visit', value: 'DN4' },
    { label: '(Type Below)', value: 'DNTB' },
  ]

  constructor(private fb: FormBuilder
    , private medialNoteService: MedialNoteService
    , private loggedInService: LoggedInService
    , private dotorUserService:DotorUserService) { }

  ngOnInit(): void {
    this.loggedInService.selectedClinic$.pipe(
      filter(clinicId => clinicId !== null),
      switchMap(clinicId => {
        const logged: string = this.loggedInService.getLoggedUser().uuid;
        return this.dotorUserService.findAuthProviderToFinalize(clinicId,logged)
      })
    ).subscribe(doc=>{
      console.log(JSON.stringify(doc))
    })
    this.medialNoteService.find('billing').subscribe(fields => {
      this.fields = fields
      this.billingForm = this.fb.group({
        'dailyNoteIncluded': this.fb.control(null),
        'dn_nstructions': this.fb.control("DN1"),
        'precautions': this.fb.control(null),
        'instructionsTxt': this.fb.control(null),
        'objective_findings': this.fb.control(null),
        'pre_Treatment': this.fb.control(null),
        'post_Treatment': this.fb.control(null),
        untimedCodes: this.fb.group({}),
        calendarMonth: this.fb.group({}),
        respiratory: this.fb.group({}),
        nerveConduction: this.fb.group({}),
        otherTreatmentProcedures: this.fb.group({}),
        supplies: this.fb.group({}),
        splintsorthotics: this.fb.group({}),
        casts: this.fb.group({}),
        braces: this.fb.group({}),
        directTimedCodes: this.fb.group({})
      });
      if (this.billingData)
        setTimeout(() => {
          this.billingForm.patchValue(this.billingData);
        }, 10);
      this.formReady.emit(this.billingForm);
    })
  }
  next() {
    var createdNote: any = this.getAllFormValues(this.parentForm)
    console.log(JSON.stringify(createdNote))
    this.create(createdNote)
    this.stepper.next();
  }

  create(createdNote: any) {
    var medicalNoteRequest: MedicalNoteRequest = {
      caseId: 58,
      noteType: "INITIAL_EVALUATION",
      createdBy: "Mahmoud shalaby",
      subjective: createdNote.subjective,
      assessment: createdNote.assessment,
      planOfCare: createdNote.planOfCare,
      billing: createdNote.billing
    }
    // this.medialNoteService.create(medicalNoteRequest).subscribe(result => {
    //   console.log('created')
    // })
  }
  getAllFormValues(formGroup: FormGroup): any {
    const values: any = {};
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      if (control instanceof FormControl) {
        values[key] = control.value;
      } else if (control instanceof FormGroup) {
        values[key] = this.getAllFormValues(control); // Recursively get values from nested FormGroup
      } else if (control instanceof FormArray) {
        values[key] = control.controls.map(ctrl =>
          ctrl instanceof FormGroup ? this.getAllFormValues(ctrl) : ctrl.value
        );
      }
    });
    return values;
  }
  setChildForm(section: string, formGroup: FormGroup) {
    this.billingForm.setControl(section, formGroup);
  }
  isAuthorizthedToFinalize() {
    const logged: string = this.loggedInService.getLoggedUser().uuid;
    if (this.creator === logged && this.noteFinalizr === null)
      return true;
    if (this.noteFinalizr !== null && this.noteFinalizr === logged)
      return true;
    return false
  }
}
