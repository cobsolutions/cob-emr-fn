import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CheckboxHierarchy } from '../../subjective/common/hierarchy-checkbox/interface/checkbox-hierarchy';

interface ProcedureOption {
  label: string;
  value: string;
  formControlName: string;
  children?: ProcedureOption[];
  showChildren?: boolean;
}

@Component({
  selector: 'plan-procedures-n',
  templateUrl: './procedures-n.component.html',
  styleUrls: ['./procedures-n.component.css']
})
export class ProceduresNComponent implements OnInit {
  ProceduresForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();

  procedureOptions: ProcedureOption[] = [
    {
      label: 'Therapeutic Exercises',
      value: 'therapeutic_exercises',
      formControlName: 'procedure_therapeutic_exercises',
      showChildren: false,
      children: [{
        "label": "ROM",
        "value": "rom",
        "formControlName": "procedure_rom"
      },
      {
        "label": "Strength",
        "value": "strength",
        "formControlName": "procedure_strength"
      },
      {
        "label": "Endurance",
        "value": "endurance",
        "formControlName": "procedure_endurance"
      },
      {
        "label": "Stability",
        "value": "stability",
        "formControlName": "procedure_stability"
      }]
    },
    {
      label: 'Therapeutic Activity',
      value: 'therapeutic_activity',
      formControlName: 'procedure_therapeutic_activity',
      showChildren: false,
      children: [{
        "label": "Work Specific",
        "value": "work_specific",
        "formControlName": "procedure_work_specific"
      },
      {
        "label": "Sport Specific",
        "value": "sport_specific",
        "formControlName": "procedure_sport_specific"
      },
      {
        "label": "Transfers",
        "value": "transfers",
        "formControlName": "procedure_transfers"
      },
      {
        "label": "Bed Mobility",
        "value": "bed_mobility",
        "formControlName": "procedure_bed_mobility"
      },
      {
        "label": "ADL Specific",
        "value": "adl_specific",
        "formControlName": "procedure_adl_specific"
      }]
    },
    {
      label: 'Gait Training',
      value: 'gait_training',
      formControlName: 'procedure_gait_training',
      showChildren: false,
      children: [{
        "label": "4 Point Walker",
        "value": "4_point_walker",
        "formControlName": "procedure_4_point_walker"
      },
      {
        "label": "Front Wheel Walker",
        "value": "front_wheel_walker",
        "formControlName": "procedure_front_wheel_walker"
      },
      {
        "label": "4 Wheel Walker",
        "value": "4_wheel_walker",
        "formControlName": "procedure_4_wheel_walker"
      },
      {
        "label": "Hemi Walker",
        "value": "hemi_walker",
        "formControlName": "procedure_hemi_walker"
      },
      {
        "label": "Quad Cane",
        "value": "quad_cane",
        "formControlName": "procedure_quad_cane"
      },
      {
        "label": "1 Point Cane",
        "value": "1_point_cane",
        "formControlName": "procedure_1_point_cane"
      },
      {
        "label": "2 Axillary Crutches",
        "value": "2_axillary_crutches",
        "formControlName": "procedure_2_axillary_crutches"
      },
      {
        "label": "1 Axillary Crutch",
        "value": "1_axillary_crutch",
        "formControlName": "procedure_1_axillary_crutch"
      },
      {
        "label": "2 Forearm Crutches",
        "value": "2_forearm_crutches",
        "formControlName": "procedure_2_forearm_crutches"
      },
      {
        "label": "1 Forearm Crutches",
        "value": "1_forearm_crutches",
        "formControlName": "procedure_1_forearm_crutches"
      },
      {
        "label": "Even Surfaces",
        "value": "even_surfaces",
        "formControlName": "procedure_even_surfaces"
      },
      {
        "label": "Uneven Surfaces",
        "value": "uneven_surfaces",
        "formControlName": "procedure_uneven_surfaces"
      },
      {
        "label": "Stairs",
        "value": "stairs",
        "formControlName": "procedure_stairs"
      },
      {
        "label": "Curbs",
        "value": "curbs",
        "formControlName": "procedure_curbs"
      }]
    },
    {
      label: 'Neuromuscular Rehabilitation',
      value: 'neuromuscular_rehabilitation',
      formControlName: 'procedure_neuromuscular_rehabilitation',
      showChildren: false,
      children: [{
        "label": "Balance/Proprioception Training",
        "value": "balance_proprioception_training",
        "formControlName": "procedure_balance_proprioception_training"
      },
      {
        "label": "Muscle Re-Education",
        "value": "muscle_re_education",
        "formControlName": "procedure_muscle_re_education"
      },
      {
        "label": "Sequencing",
        "value": "sequencing",
        "formControlName": "procedure_sequencing"
      },
      {
        "label": "Coordination",
        "value": "coordination",
        "formControlName": "procedure_coordination"
      },
      {
        "label": "PNF",
        "value": "pnf",
        "formControlName": "procedure_pnf"
      },
      {
        "label": "Redcord Neurac (Neuromuscular-Activation)",
        "value": "redcord_neurac_neuromuscular_activation",
        "formControlName": "procedure_redcord_neurac_neuromuscular_activation"
      }]
    },
    {
      label: 'Manual Therapy',
      value: 'manual_therapy',
      formControlName: 'procedure_manual_therapy',
      showChildren: false,
      children: [{
        "label": "Soft Tissue Mobilization",
        "value": "soft_tissue_mobilization",
        "formControlName": "procedure_soft_tissue_mobilization"
      },
      {
        "label": "Joint Mobilization",
        "value": "joint_mobilization",
        "formControlName": "procedure_joint_mobilization"
      },
      {
        "label": "Spinal Mobilization",
        "value": "spinal_mobilization",
        "formControlName": "procedure_spinal_mobilization"
      },
      {
        "label": "Manual Traction",
        "value": "manual_traction",
        "formControlName": "procedure_manual_traction"
      },
      {
        "label": "Myofascial Release",
        "value": "myofascial_release",
        "formControlName": "procedure_myofascial_release"
      },
      {
        "label": "Muscle Energy Techniques",
        "value": "muscle_energy_techniques",
        "formControlName": "procedure_muscle_energy_techniques"
      },
      {
        "label": "Manual Resistive Exercise",
        "value": "manual_resistive_exercise",
        "formControlName": "procedure_manual_resistive_exercise"
      },
      {
        "label": "Patellar Mobs",
        "value": "patellar_mobs",
        "formControlName": "procedure_patellar_mobs"
      },
      {
        "label": "Cranio-Sacral",
        "value": "cranio_sacral",
        "formControlName": "procedure_cranio_sacral"
      },
      {
        "label": "Visceral Manipulation",
        "value": "visceral_manipulation",
        "formControlName": "procedure_visceral_manipulation"
      },
      {
        "label": "Dry Needling/Intramuscular Manual Therapy",
        "value": "dry_needling_intramuscular_manual_therapy",
        "formControlName": "procedure_dry_needling_intramuscular_manual_therapy"
      },
      {
        "label": "Graston or ASTYM Techniques",
        "value": "graston_or_astym_techniques",
        "formControlName": "procedure_graston_or_astym_techniques"
      },
      {
        "label": "Strain-Counterstrain",
        "value": "strain_counterstrain",
        "formControlName": "procedure_strain_counterstrain"
      }]
    },
    {
      label: 'Massage',
      value: 'massage',
      formControlName: 'procedure_massage',
      showChildren: false,
      children: []
    },
    {
      label: 'Aquatic Therapy',
      value: 'aquatic_therapy',
      formControlName: 'procedure_aquatic_therapy',
      showChildren: false,
      children: []
    },
    {
      label: 'Splinting/Taping',
      value: 'splinting_taping',
      formControlName: 'procedure_splinting_taping',
      showChildren: false,
      children: []
    },
    {
      label: 'Canalith Repositioning',
      value: 'canalith_repositioning',
      formControlName: 'procedure_canalith_repositioning',
      showChildren: false,
      children: []
    },
    {
      label: 'Wound Care/Debridement',
      value: 'wound_care_debridement',
      formControlName: 'procedure_wound_care_debridement',
      showChildren: false,
      children: []
    },
    {
      label: 'Iontophoresis',
      value: 'iontophoresis',
      formControlName: 'procedure_iontophoresis',
      showChildren: false,
      children: [{
        "label": "Dexamethasone",
        "value": "dexamethasone",
        "formControlName": "procedure_dexamethasone"
      },
      {
        "label": "Lidocaine",
        "value": "lidocaine",
        "formControlName": "procedure_lidocaine"
      },
      {
        "label": "Marcaine",
        "value": "marcaine",
        "formControlName": "procedure_marcaine"
      },
      {
        "label": "Acetic Acid",
        "value": "acetic_acid",
        "formControlName": "procedure_acetic_acid"
      },
      {
        "label": "Iodine",
        "value": "iodine",
        "formControlName": "procedure_iodine"
      }
      ]
    },
    {
      label: 'Group Therapy',
      value: 'group_therapy',
      formControlName: 'procedure_group_therapy',
      showChildren: false,
      children: []
    },
    {
      label: 'Lymphedema',
      value: 'lymphedema',
      formControlName: 'procedure_lymphedema',
      showChildren: false,
      children: []
    },
    {
      label: 'Cardiac Rehabilitation',
      value: 'cardiac_rehabilitation',
      formControlName: 'procedure_cardiac_rehabilitation',
      showChildren: false,
      children: []
    },
    {
      label: 'Vestibular Rehabilitation',
      value: 'vestibular_rehabilitation',
      formControlName: 'procedure_vestibular_rehabilitation',
      showChildren: false,
      children: []
    },
    {
      label: 'Patient Education',
      value: 'patient_education',
      formControlName: 'procedure_patient_education',
      showChildren: false,
      children: [{
        "label": "Home Exercise Program",
        "value": "home_exercise_program",
        "formControlName": "procedure_home_exercise_program"
      },
      {
        "label": "Postural Training",
        "value": "postural_training",
        "formControlName": "procedure_postural_training"
      },
      {
        "label": "Ergonomics",
        "value": "ergonomics",
        "formControlName": "procedure_ergonomics"
      },
      {
        "label": "Lifting Mechanics",
        "value": "lifting_mechanics",
        "formControlName": "procedure_lifting_mechanics"
      },
      {
        "label": "TENS Use",
        "value": "tens_use",
        "formControlName": "procedure_tens_use"
      },
      {
        "label": "Activity Modification",
        "value": "activity_modification",
        "formControlName": "procedure_activity_modification"
      },
      {
        "label": "Home Safety",
        "value": "home_safety",
        "formControlName": "procedure_home_safety"
      }]
    },
    {
      label: 'Self Care',
      value: 'self_care',
      formControlName: 'procedure_self_care',
      showChildren: false,
      children: []
    },
    {
      label: 'Cognition',
      value: 'cognition',
      formControlName: 'procedure_cognition',
      showChildren: false,
      children: []
    },
    {
      label: 'Remote Therapeutic Monitoring',
      value: 'remote_therapeutic_monitoring',
      formControlName: 'procedure_remote_therapeutic_monitoring',
      showChildren: false,
      children: []
    }
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.setupValueChangeListeners();
    this.formReady.emit(this.ProceduresForm);
  }

  initForm() {
    const formControls: any = {};

    this.procedureOptions.forEach(option => {
      formControls[option.formControlName] = [false];
      formControls[option.formControlName + '_notes'] = [''];

      if (option.children) {
        option.children.forEach(child => {
          formControls[child.formControlName] = [false];
        });
      }
    });

    this.ProceduresForm = this.fb.group(formControls);
  }

  setupValueChangeListeners() {
    this.procedureOptions.forEach(option => {
      this.ProceduresForm.get(option.formControlName)?.valueChanges.subscribe(checked => {
        option.showChildren = checked;

        if (!checked && option.children) {
          option.children.forEach(child => {
            this.ProceduresForm.get(child.formControlName)?.setValue(false);
          });
          this.ProceduresForm.get(option.formControlName + '_notes')?.setValue('');
        }
      });
    });
  }

}
