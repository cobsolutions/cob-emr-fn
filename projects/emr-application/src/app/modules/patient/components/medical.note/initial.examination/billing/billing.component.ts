import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

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
  untimedCodes = [
    { label: "PT Evaluation: Low Complexity", value: "97161" },
    { label: "PT Evaluation: Moderate Complexity", value: "97162" },
    { label: "PT Evaluation: High Complexity", value: "97163" },
    { label: "PT Re-Evaluation", value: "97164" },
    { label: "Hot/Cold Packs", value: "97010" },
    { label: "Mechanical Traction", value: "97012" },
    { label: "E-Stim Unattended", value: "97014" },
    { label: "E-Stim Medicare Non-Wound Unattended", value: "G0283" },
    { label: "E-Stim Medicare Wounds Unattended", value: "G0282" },
    { label: "E-Stim Medicare Chronic Wounds Unattended", value: "G0281" },
    { label: "Biofeedback Training", value: "90901" },
    { label: "Canalith Repositioning", value: "95992" },
    { label: "Vasopneumatic Device", value: "97016" },
    { label: "Paraffin Bath", value: "97018" },
    { label: "Whirlpool", value: "97022" },
    { label: "Diathermy", value: "97024" },
    { label: "Infrared Light", value: "97026" },
    { label: "Ultraviolet", value: "97028" },
    { label: "Ultrasound; low frequency, non-thermal, non-contact (per day)", value: "97610" },
    { label: "Group Therapy", value: "97150" },
    { label: "Club Foot Serial Casting", value: "29450" },
    { label: "Neg Press Wound Therapy", value: "97605" },
    { label: "Neg Press Wound Therapy >50 sq cm", value: "97606" },
    { label: "Neg press wound therapy, utilizing disposable, non-DME < 50 sq cm", value: "97607" },
    { label: "Neg press wound therapy, utilizing disposable, non-DME > 50 sq cm", value: "97608" },
    { label: "Debridement Area < 20 sq cm", value: "97597" },
    { label: "Laser/Other", value: "97039" },
    { label: "Light Therapy/Phototherapy", value: "96920" },
    { label: "Unlisted Physical Medicine/Rehab Service/Proc", value: "97799" },
    { label: "Needle insertion(s) without injection(s), 1-2 muscles", value: "20560" },
    { label: "Needle insertion(s) without injection(s), 3 or more muscles", value: "20561" },
    { label: "Neurobehavioral exam by qualified healthcare professional; first hour", value: "96116" },
    { label: "Basic vestibular evaluation", value: "92540" },
    { label: "Qualified non-physician healthcare professional online assessment and management, for an established patient, for up to seven days, cumulative time during the 7 days; 5–10 minutes", value: "G2061" },
    { label: "Qualified non-physician healthcare professional online assessment and management service, for an established patient, for up to seven days, cumulative time during the 7 days; 11–20 minutes", value: "G2062" },
    { label: "Qualified non-physician qualified healthcare professional assessment and management service, for an established patient, for up to seven days, cumulative time during the 7 days; 21 or more minutes", value: "G2063" },
    { label: "Qualified nonphysician healthcare professional online digital evaluation and management service, for an established patient, for up to 7 days, cumulative time during the 7 days; 5-10 minutes", value: "98970" },
    { label: "Qualified nonphysician healthcare professional online digital evaluation and management service, for an established patient, for up to 7 days, cumulative time during the 7 days; 11-20 minutes", value: "98971" },
    { label: "Qualified nonphysician healthcare professional online digital evaluation and management service, for an established patient, for up to 7 days, cumulative time during the 7 days; 21 or more minutes", value: "98972" },
    { label: "Telephone assessment and management service, 5-10 minutes of medical discussion", value: "98966" },
    { label: "Telephone assessment and management service, 11-20 minutes of medical discussion", value: "98967" },
    { label: "Telephone assessment and management service, 21-30 minutes of medical discussion", value: "98968" },
    { label: "Additional supplies, materials, and clinical staff time over and above those usually included in an office visit or other non-facility service(s), when performed during a Public Health Emergency as defined by law, due to respiratory-transmitted infectious disease", value: "99072" },
    { label: "Remote assessment of recorded video and/or images submitted by an established patient (e.g., store and forward), including interpretation with follow-up with the patient within 24 business hours", value: "G2250" },
    { label: "Brief communication technology-based service, e.g. virtual check-in, by a qualified health care professional, 5-10 minutes of medical discussion", value: "G2251" },
    { label: "Set-up and patient education on use of equipment for remote therapeutic monitoring", value: "98975" },
    { label: "Device supply for data access or data transmissions to support monitoring of respiratory system, each 30 days", value: "98976" },
    { label: "Device supply for data access or data transmissions to support monitoring of musculoskeletal system, each 30 days", value: "98977" },
    { label: "Group Caregiver Training", value: "97552" },
    { label: "Group Caregiver Training (Patient Not Present)", value: "G0543" }
  ];
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

  calendarMonth = [
    { name: "Caregiver Training - First 30 Minutes", code: "97550" },
    { name: "Caregiver Training - Additional 15 Minutes", code: "97551" },
    { name: "Caregiver Training (Patient Not Present) - First 30 Minutes", code: "G0541" },
    { name: "Virtual Reality facilitated Gait Training", code: "0791T" },
    { name: "Virtual Reality facilitated Gait Training", code: "0791T" }
  ]
  nerveConductionStudies = [
    { name: "Nerve conduction studies; 1-2 studies", code: "95907" },
    { name: "Nerve conduction studies, 3-4 studies", code: "95908" },
    { name: "Nerve conduction studies, 5-6 studies", code: "95909" },
    { name: "Nerve conduction studies, 7-8 studies", code: "95910" },
    { name: "Nerve conduction studies, 9-10 studies", code: "95911" },
    { name: "Nerve conduction studies, 11-12 studies", code: "95912" },
    { name: "Nerve conduction studies, 13 or more studies", code: "95913" },
  ]

  respiratory = [
    { name: "Therapeutic Procedure Resp Muscles", code: "G0237" },
    { name: "Other Therapeutic Procedures - Individual", code: "G0238" },
    { name: "Pulmonary Stress Testing - Simple", code: "94620" },
    { name: "Aero/PPB/MDI; Init Demo or Eval", code: "94664" },
    { name: "Manipulation Chest Wall - Subsequent", code: "94668" },
  ]
  otherTreatmentProcedures = [
    { "name": "Positional Nystagmus Test, Minimum, 4 Positions, w/Recording", "code": "92542" },
    { "name": "Spontaneous Nystagmus Test, w/ Gaze & Fixation Nystagmus, w/Recording", "code": "92541" },
    { "name": "Initial Acupuncture Without E-Stim (15 mins)*", "code": "97810" },
    { "name": "Acupuncture, each additional 15 minutes*", "code": "97811" },
    { "name": "Initial Acupuncture With E-Stim (15 mins)*", "code": "97813" },
    { "name": "Acupuncture with electrical stimulation, each additional 15 minutes*", "code": "97814" },
    { "name": "Unlisted procedure, musculoskeletal system, general", "code": "20999" }
  ];

  supplies = [
    { "name": "Sport Cord", "code": "A9300" },
    { "name": "Physioball", "code": "A9300" },
    { "name": "Theraband", "code": "A9300" },
    { "name": "Theraputty", "code": "A9300" },
    { "name": "Dressing < 16in", "code": "A6402" },
    { "name": "Otoform", "code": "A6025" },
    { "name": "Shoulder Pulley ROM", "code": "E0941" },
    { "name": "Electrodes", "code": "A4595" },
    { "name": "Gloves", "code": "A4927" },
    { "name": "Tens Unit", "code": "E0720" },
    { "name": "Educational Materials", "code": "99071" },
    { "name": "Collagen dressing <16 sq in", "code": "A6021" },
    { "name": "Collagen dressing > 16 sq in but ≤ 48 sq in", "code": "A6022" },
    { "name": "Collagen dressing > 48 sq in", "code": "A6023" },
    { "name": "Special Supplies PHYS/QHP", "code": "99070" },
    { "name": "Tape, non-waterproof, per 18 square inches", "code": "A4450" },
    { "name": "Composite dressing, sterile, pad size 16 sq. in. or less", "code": "A6203" },
    { "name": "Composite dressing, sterile, pad size more than 16 sq. in. but less than or equal to 48 sq. in.", "code": "A6204" },
    { "name": "Foam dressing, wound cover, sterile, pad size 16 sq. in. or less", "code": "A6209" },
    { "name": "Foam dressing, wound cover, sterile, pad size more than 16 sq. in. but less than or equal to 48 sq. in.", "code": "A6210" },
    { "name": "Foam dressing, wound cover, sterile, pad size more than 48 sq. in.", "code": "A6211" },

    { "name": "Padding bandage, non-elastic, non-woven/non-knitted, width greater than or equal to three inches and less than five inches, per yard", "code": "A6441" },
    { "name": "Conforming bandage, non-elastic, knitted/woven, non-sterile, width less than three inches, per yard", "code": "A6442" },
    { "name": "Light compression bandage, elastic, knitted/woven, width less than three inches, per yard", "code": "A6448" },
    { "name": "Light compression bandage, elastic, knitted/woven, width greater than or equal to three inches and less than five inches, per yard", "code": "A6449" },
    { "name": "Tubular dressing with or without elastic, any width, per linear yard", "code": "A6457" },
    { "name": "Gradient compression stocking, below knee, 18-30 mmhg, each", "code": "A6530" },
    { "name": "Gradient compression stocking, below knee, 30-40 mmhg, each", "code": "A6531" },
    { "name": "Gradient compression stocking, below knee, 40-50 mmhg, each", "code": "A6532" },
    { "name": "Gradient compression stocking, thigh length, 18-30 mmhg, each", "code": "A6533" },
    { "name": "Gradient compression stocking, thigh length, 40-50 mmhg, each", "code": "A6535" },
    { "name": "Gradient compression stocking, waist length, 18-30 mmhg, each", "code": "A6539" },
    { "name": "Gradient compression stocking, waist length, 30-40 mmhg, each", "code": "A6540" },

    { "name": "Gradient compression stocking, waist length, 40-50 mmhg, each", "code": "A6541" },
    { "name": "Gradient compression stocking/sleeve, not otherwise specified", "code": "A6549" },
    { "name": "Miscellaneous dme supply, accessory", "code": "A9900" },
    { "name": "Durable medical equipment, miscellaneous", "code": "E1399" },
    { "name": "Breast prosthesis, mastectomy sleeve", "code": "L8010" },
  ];

  splintsOrthotics = [
    { "name": "Ulnar Gutter MPS FRE", "code": "3982" },
    { "name": "WHFO Static - Custom", "code": "3808" },
    { "name": "Thumb Volar/Dorsal Dynamic", "code": "3908" },
    { "name": "WHFO, With 1 or More Nontorsion Joints", "code": "3931" },


    { "name": "Ortho Soft Insert", "code": "L3030" },
    { "name": "Foot Insert/UCB Type", "code": "L3000" },
    { "name": "AFO - Molded to Patient, Plastic or Other Material - Custom", "code": "L1940" },
    { "name": "AFO - Fracture Orthosis. Tibial Fracture Cast Orthosis - Custom", "code": "L2108" },
    { "name": "KAFO - Fracture Orthosis. Femoral Fracture Cast Orthosis - Custom", "code": "L2128" },
    { "name": "Foot Longitudinal/Metatarsal Support - Custom", "code": "L3020" },
    { "name": "SO Static - Shoulder or Humerus Orthosis - Custom", "code": "L3671" },
    { "name": "FO longitudinal arch suppo", "code": "L3010" },
    { "name": "SO Airplane Design - Custom", "code": "L3674" },
    { "name": "EO Static - Custom", "code": "L3702" },
    { "name": "EO Dynamic - With ADJ Locking Hinge - Custom", "code": "L3740" },
    { "name": "EWHO Static - Custom", "code": "L3764" },
    { "name": "EWHFO Static - Custom", "code": "L3765" },
    { "name": "EWHFO Dynamic - Custom", "code": "L3766" },
    { "name": "WHFO Dynamic - Custom", "code": "L3806" },
    { "name": "WHFO Tenodesis - Custom", "code": "L3900_2" },
    { "name": "WHO Dynamic - Custom", "code": "L3905" },
    { "name": "HFO Static - Custom", "code": "L3913" },

    { "name": "HO Static - Custom", "code": "L3919" },
    { "name": "HFO Dynamic - Custom", "code": "L3921" },
    { "name": "FO Static - Custom", "code": "L3933" },
    { "name": "FO Dynamic - Custom", "code": "L3935" },
    { "name": "SEWHO Cap Design - Custom", "code": "L3961" },
    { "name": "EO Static - Prefabricated", "code": "L3762" },

    { "name": "WHFO Static - Prefabricated", "code": "L3807" },
    { "name": "WHO Dynamic - Prefabricated", "code": "L3916" },
    { "name": "HFO Static - Prefabricated", "code": "L3923" },
    { "name": "HFO Dynamic - Prefabricated", "code": "L3929" },
    { "name": "HFO Dynamic - Prefabricated", "code": "L3929" },
  ]

  casts = [
    { "name": "Application, cast; shoulder to hand (long arm)", "code": "29065" },
    { "name": "Application, cast; elbow to finger (short arm)", "code": "29075" },
    { "name": "Application, cast; hand and lower forearm (gauntlet)", "code": "29085" },

    { "name": "Application of long arm splint (shoulder to hand)", "code": "29105" },
    { "name": "Application of short arm splint (forearm to hand); static", "code": "29125" },
    { "name": "Application of finger splint; static", "code": "29130" },
    { "name": "Application of long leg splint (thigh to ankle or toes)", "code": "29505" },
    { "name": "Application of short leg splint (calf to foot)", "code": "29515" },
    { "name": "Application of long leg cast (thigh to toes)", "code": "29345" },
    { "name": "Application of cylinder cast (thigh to ankle)", "code": "29365" },
    { "name": "Application of short leg cast (below knee to toes)", "code": "29405" },
    { "name": "Application of ambulatory short leg cast", "code": "29425" },

  ]
  braces = [
    { "name": "Patellofemoral Sleeve", "code": "1906" },
    { "name": "Wrist/Thumb Neoprene", "code": "3908" },
    { "name": "Knee Orthosis - Prefab", "code": "1810" },
    { "name": "Ankle Brace", "code": "1902" },
    { "name": "Clavicle Strap", "code": "L3670" },
  ]
  instructions = [
    { label: 'Progressing Patient Next Visit', value: 'DN1' },
    { label: 'Progress Therapeutic Exercises', value: 'DN2' },
    { label: 'Progress Note Needed', value: 'DN3' },
    { label: 'Anticipate Discharging Patient Next Visit', value: 'DN4' },
    { label: '(Type Below)', value: 'DNTB' },
  ]

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.billingForm = this.fb.group({
      'dailyNoteIncluded': this.fb.control(null),
      'dn_nstructions': this.fb.control("DN1"),
      'objective_findings': this.fb.control(null),
      'pre_Treatment': this.fb.control(null),
      'post_Treatment': this.fb.control(null),
      'precautions': this.fb.control(null),
    });
    this.untimedCodes.forEach(obj => this.billingForm.addControl(obj.value, this.fb.control(false)));
    this.untimedCodesText.forEach(obj => this.billingForm.addControl(obj.code, this.fb.control(false)));

    this.otherTreatmentProcedures.forEach(proc => this.billingForm.addControl(proc.code, this.fb.control(false)));

    this.strapping.forEach(obj => this.billingForm.addControl(obj.cpt, this.fb.control(false)));

    this.directTimedCodes.forEach(obj => this.billingForm.addControl(obj.code, this.fb.control(false)));
    this.calendarMonth.forEach(obj => this.billingForm.addControl(obj.code, this.fb.control(false)));
    this.nerveConductionStudies.forEach(obj => this.billingForm.addControl(obj.code, this.fb.control(false)));
    this.respiratory.forEach(obj => this.billingForm.addControl(obj.code, this.fb.control(false)));

    this.supplies.forEach(supply => this.billingForm.addControl(supply.code, this.fb.control(false)));
    this.splintsOrthotics.forEach(obj => this.billingForm.addControl(obj.code, this.fb.control(false)));
    this.casts.forEach(obj => this.billingForm.addControl(obj.code, this.fb.control(false)));
    this.braces.forEach(obj => this.billingForm.addControl(obj.code, this.fb.control(false)));

    this.formReady.emit(this.billingForm);
  }
  next() {
    var dd: any = this.getAllFormValues(this.parentForm)
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

}
