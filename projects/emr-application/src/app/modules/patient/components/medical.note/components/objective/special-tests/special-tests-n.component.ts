import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SpecialTestConfig } from './config';

@Component({
  selector: 'special-tests-n',
  templateUrl: './special-tests-n.component.html',
  styleUrls: ['./special-tests-n.component.css']
})
export class SpecialTestsNComponent implements OnInit {
  specialTestForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  showFlexibilityFields: boolean = false;
  showFlexibilityoberFields: boolean = false;
  showFlexibilityHamstringFlexibilityFields : boolean = false

  showStructuralFields: boolean = false;
  showLigamentIntegrityKneeFields: boolean = false;
  showStorkStandSiMobilityTestFields: boolean = false;
  showPatellofemoralFields: boolean = false;
  showFunctionalFields: boolean = false;
  showAlarLigamentTestFields: boolean = false;
  showAlarLigamentStressFields: boolean = false;
  showWorkConditioningFields: boolean = false;
  showTmrFab4WorksheetFields: boolean = false;
  additionalCommentsFields: boolean = false;

  readonly specialTestConfig = SpecialTestConfig;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.setupValueChangeListeners();
  }
  initForm() {
    this.specialTestForm = this.fb.group({
      flexibility: ['no'],
      thomas_test: ['no'],
      ober: ['no'],
      _90_90_hamstring_flexibility: ['no'],
      gastrocnemius_length: ['no'],
      soleus_muscle_length: ['no'],

      ligament_integrity_knee: ['no'],
      valgus_stress_at_0_knee_flex: ['no'],
      valgus_stress_at_30_knee_flex: ['no'],
      varus_stress_at_0_knee_flex: ['no'],
      varus_stress_at_30_knee_flex: ['no'],
      anterior_drawer: ['no'],
      posterior_drawer: ['no'],
      lachmans: ['no'],
      pivot_shift: ['no'],
      sag_sign: ['no'],


      structural: ['no'],
      craigs_test: ['no'],

      tibial_torsion: ['no'],


      stork_stand_si_mobility_test: ['no'],


      patellofemoral: ['no'],
      j_sign: ['no'],
      patellar_ballottement: ['no'],
      patellar_compression: ['no'],
      patellar_passive_mobility: ['no'],

      functional: ['no'],
      core_stabilization: ['no'],
      selective_functional_movement_assessment: ['no'],
      _30_second_chair_stand: ['no'],
      side_bridge_plank: ['no'],
      prone_plank: ['no'],
      single_leg_bridge_hold: ['no'],
      single_leg_hop_test_for_distance: ['no'],
      _2_leg_squat_with_overhead_reach: ['no'],
      _1_leg_squat_with_overhead_reach: ['no'],
      running_mechanics: ['no'],
      back_extension: ['no'],


      alar_ligament_test: ['no'],
      alar_ligament_stress: ['no'],

      work_conditioning: ['no'],
      material_handling_bilateral_lifting: ['no'],
      non_material_handling: ['no'],

      tmr_fab_4_worksheet: ['no'],
      additional_comments: ['no'],
      additional_comments_text: ['']
    })
  }
  setupValueChangeListeners() {
    this.specialTestForm.get('flexibility')?.valueChanges.subscribe(value => {
      this.showFlexibilityFields = value === 'yes';
    });
    this.specialTestForm.get('ober')?.valueChanges.subscribe(value => {
      this.showFlexibilityoberFields = value === 'yes';
    });
    this.specialTestForm.get('_90_90_hamstring_flexibility')?.valueChanges.subscribe(value => {
      this.showFlexibilityHamstringFlexibilityFields = value === 'yes';
    });





    this.specialTestForm.get('structural')?.valueChanges.subscribe(value => {
      this.showStructuralFields = value === 'yes';
    });

    this.specialTestForm.get('ligament_integrity_knee')?.valueChanges.subscribe(value => {
      this.showLigamentIntegrityKneeFields = value === 'yes';
    });

    this.specialTestForm.get('stork_stand_si_mobility_test')?.valueChanges.subscribe(value => {
      this.showStorkStandSiMobilityTestFields = value === 'yes';
    });

    this.specialTestForm.get('patellofemoral')?.valueChanges.subscribe(value => {
      this.showPatellofemoralFields = value === 'yes';
    });

    this.specialTestForm.get('functional')?.valueChanges.subscribe(value => {
      this.showFunctionalFields = value === 'yes';
    });

    this.specialTestForm.get('alar_ligament_test')?.valueChanges.subscribe(value => {
      this.showAlarLigamentTestFields = value === 'yes';
    });

    this.specialTestForm.get('alar_ligament_stress')?.valueChanges.subscribe(value => {
      this.showAlarLigamentStressFields = value === 'yes';
    });

    this.specialTestForm.get('work_conditioning')?.valueChanges.subscribe(value => {
      this.showWorkConditioningFields = value === 'yes';
    });

    this.specialTestForm.get('tmr_fab_4_worksheet')?.valueChanges.subscribe(value => {
      this.showTmrFab4WorksheetFields = value === 'yes';
    });
    
    this.specialTestForm.get('additional_comments')?.valueChanges.subscribe(value => {
      this.additionalCommentsFields = value === 'yes';
    });
  }

}
