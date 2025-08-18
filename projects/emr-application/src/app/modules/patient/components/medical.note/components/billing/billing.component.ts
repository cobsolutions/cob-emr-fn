import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { LoggedInService } from 'projects/emr-application/src/app/modules/security/service/loggedIn/logged-in.service';
import { MedicalNoteType } from '../../../../models/medical.note/medical.note.type';
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
  @Input() noteId: number
  @Input() noteType: MedicalNoteType
  fields: any
  forwardVisibility: boolean = false;
  finalizeNoteVisibility: boolean = false;
  instructions = [
    { label: 'Progressing Patient Next Visit', value: 'DN1' },
    { label: 'Progress Therapeutic Exercises', value: 'DN2' },
    { label: 'Progress Note Needed', value: 'DN3' },
    { label: 'Anticipate Discharging Patient Next Visit', value: 'DN4' },
    { label: '(Type Below)', value: 'DNTB' },
  ]
  authorizthedToFinalize: boolean = false
  constructor(private fb: FormBuilder
    , private medialNoteService: MedialNoteService
    , private loggedInService: LoggedInService) { }

  ngOnInit(): void {
    this.isAuthorizthedToFinalize()
    this.medialNoteService.find('billing').subscribe(fields => {
      this.fields = fields
      this.billingForm = this.fb.group({
        'dailyNoteIncluded': this.fb.control(false),
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
        this.billingForm.patchValue(this.billingData);
      // if(this.billingData && this.billingData['dailyNoteIncluded'])

      this.formReady.emit(this.billingForm);
    })
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
      this.authorizthedToFinalize = true;
    if (this.noteFinalizr !== null && this.noteFinalizr === logged)
      this.authorizthedToFinalize = true;
  }
  toggleFrowardModal() {
    this.forwardVisibility = !this.forwardVisibility
  }
  changeVisibility(event: string) {
    if (event === 'close') {
      this.forwardVisibility = false;
      this.authorizthedToFinalize = false
    }
  }
  finalize() {
    this.finalizeNoteVisibility = true;
  }
  togglefinalize() {
    this.finalizeNoteVisibility = !this.finalizeNoteVisibility
  }
  private onChangeIncludeDailyNote() {
    this.billingForm.get('dailyNoteIncluded').valueChanges.subscribe(val => {

    })
  }
  onNo() {
    this.finalizeNoteVisibility = false;
  }
  onYes() {
    throw new Error('Method not implemented.');
  }

}
