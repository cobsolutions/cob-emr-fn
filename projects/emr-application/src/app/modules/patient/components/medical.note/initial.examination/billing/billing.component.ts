import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
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
  fields: any
  untimedCodesText = [
    { name: "ROM Measurement", code: "95851" },
    { name: "Range of motion measurements and report (separate procedure); hand, with or without comparison with normal side", code: "95852" }
  ]

  strapping = [
    { name: "Thorax", cpt: "29200" },
    { name: "Low Back", cpt: "29799" },
    { name: "Shoulder (eg, Velpeau)", cpt: "29240" },
    { name: "Elbow or Wrist", cpt: "29260" },
    { name: "Hand or Finger", cpt: "29280" },
    { name: "Hip", cpt: "29520" },
    { name: "Knee", cpt: "29530" },
    { name: "Ankle or Foot", cpt: "29540" },
    { name: "Toes", cpt: "29550" },
    { name: "Unna Boot", cpt: "29580" },
    { name: "Application of multi-layer compression system; leg (below knee), including ankle and foot", cpt: "29581" },
    { name: "Application of multi-layer compression system; thigh and leg, including ankle and foot, when performed", cpt: "29582" },
    { name: "Application of multi-layer compression system; upper arm and forearm", cpt: "29583" },
    { name: "Application of multi-layer compression system; upper arm, forearm, hand, and fingers", cpt: "29584" }
  ]

  directTimedCodes = [
    { name: "E-Stim Manual", code: "97032" },
    { name: "Iontophoresis", code: "97033" },
    { name: "Ultrasound/Phonophoresis", code: "97035" },
    { name: "Therapeutic Exercise", code: "97110" },
    { name: "Neuromuscular Re-Education", code: "97112" },
    { name: "Aquatic Exercise", code: "97113" },
    { name: "Gait Training", code: "97116" },
    { name: "Massage", code: "97124" },
    { name: "Manual Therapy", code: "97140" },
    { name: "Therapeutic Activity/Kinetic", code: "97530" },
    { name: "Self Care - ADLs", code: "97535" },
    { name: "Education and training for patient self-management, each 30 minutes", code: "98960" },
    { name: "Orthotic management and training initial encounter", code: "97760" },
    { name: "Prosthetic training initial encounter", code: "97761" },
    { name: "Debridement Area Each Additional 20 sq cm", code: "97598" },
    { name: "Work hardening/conditioning; initial 2 hours", code: "97545" },
    { name: "Work hardening/conditioning; each additional hour", code: "97546" },
    { name: "FCE/Performance Test", code: "97750" },
    { name: "Assistive Tech Assessment", code: "97755" },
    { name: "Sensory Integrative Techniques", code: "97533" },
    { name: "Developmental Testing Per Hour", code: "96110" },
    { name: "Wheelchair Management Training", code: "97542" },
    { name: "Orthotic/prosthetic management and/or training subsequent encounter", code: "97763" },
    { name: "Community / work reintegration training direct, each 15 minutes", code: "97537" },
    { name: "Standardized cognitive performance testing - (eg, Ross Information Processing Assessment) per hour of a qualified health care professional's time, both face-to-face time administering tests to the patient and time interpreting these test results and preparing the report", code: "96125" },
    { name: "Biofeedback training, perineal muscles, anorectal or urethral sphincter, including EMG and/or manometry, when performed; initial 15 minutes", code: "90912" },
    { name: "Biofeedback training, perineal muscles, anorectal or urethral sphincter, including EMG and/or manometry, when performed; each additional 15 minutes", code: "90913" },
    { name: "Therapeutic interventions that focus on cognitive function (eg, attention, memory, executive function) and compensatory strategies to manage the performance of an activity (eg, managing time), direct (one-on-one) patient contact; initial 15 minutes", code: "97129" },

    { name: "Therapeutic interventions that focus on cognitive function (eg, attention, memory, reasoning, executive function) and compensatory strategies to manage the performance of an activity (eg, managing time), direct (one-on-one) patient contact; each additional 15 minutes", code: "97130" },
    { name: "Developmental test by qualified healthcare professional; first hour", code: "96112" },

    { name: "Developmental test by qualified healthcare professional; each add'l 30 min", code: "96113" },

    { name: "Remote therapeutic monitoring treatment management services by physician or other qualified health care professional, <b>first 20 minutes per calendar month", code: "98980" },

    { name: "Remote therapeutic monitoring treatment management services by physician or other qualified health care professional", code: "98981" }
  ]
  instructions = [
    { label: 'Progressing Patient Next Visit', value: 'DN1' },
    { label: 'Progress Therapeutic Exercises', value: 'DN2' },
    { label: 'Progress Note Needed', value: 'DN3' },
    { label: 'Anticipate Discharging Patient Next Visit', value: 'DN4' },
    { label: '(Type Below)', value: 'DNTB' },
  ]

  constructor(private fb: FormBuilder, private medialNoteService: MedialNoteService) { }

  ngOnInit(): void {
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
        casts:this.fb.group({}),
        braces:this.fb.group({}),
        directTimedCodes:this.fb.group({})
      });
      
      this.untimedCodesText.forEach(obj => this.billingForm.addControl(obj.code, this.fb.control(false)))
      this.strapping.forEach(obj => this.billingForm.addControl(obj.cpt, this.fb.control(false)));
      this.directTimedCodes.forEach(obj => this.billingForm.addControl(obj.code, this.fb.control(false)));
      
    })
    this.formReady.emit(this.billingForm);
  }
  next() {
    var dd: any = this.getAllFormValues(this.parentForm)
    console.log(JSON.stringify(dd))
    this.stepper.next();
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
}
