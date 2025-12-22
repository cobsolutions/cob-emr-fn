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
  showFlexibilityHamstringFlexibilityFields: boolean = false
  showFlexibilityGastrocnemiusLengthFields: boolean = false
  showFlexibilitySoleusMuscleLengthFields: boolean = false
  showFlexibilityThomasTestFields: boolean = false

  showStructuralFields: boolean = false;
  showFlexibilityCraigTestFields: boolean = false
  showFlexibilityTibialTorsionFields: boolean = false

  showLigamentIntegrityKneeFields: boolean = false;
  showLigamentIntegrityKneeValgusStressAt0KneeFlexFields: boolean = false;
  showLigamentIntegrityKneeValgusStressAt30KneeFlexFields: boolean = false;
  showLigamentIntegrityKneeVarusStressat0KneeFlexFields: boolean = false;
  showLigamentIntegrityKneeVarusStressat30KneeFlexFields: boolean = false;
  showLigamentIntegrityKneeAnteriorDrawerFields: boolean = false;
  showLigamentIntegrityKneePosteriorDrawerFields: boolean = false;
  showLigamentIntegrityKneeLachmansFields: boolean = false;
  showLigamentIntegrityKneePivotShiftFields: boolean = false;
  showLigamentIntegrityKneeSagSignFields: boolean = false;


  showStorkStandSiMobilityTestFields: boolean = false;

  showPatellofemoralFields: boolean = false;
  showPatellofemoralJSignFields: boolean = false;
  showPatellofemoralPatellarBallottementFields: boolean = false;
  showPatellofemoralPatellarCompressionFields: boolean = false;
  showPatellofemoralPatellarPassiveMobilityFields: boolean = false;




  showFunctionalFields: boolean = false;
  showFunctionalCoreStabilizationFields: boolean = false
  showFunctionalSelectiveFunctionalMovementAssessmentFields: boolean = false
  showFunctional30SecondChairStandFields: boolean = false
  showFunctionalSideBridgePlankFields: boolean = false
  showFunctionalPronePlankFields: boolean = false
  showFunctionalSingleLegBridgeHoldFields: boolean = false
  showFunctionalSingleLegHopTestForDistanceFields: boolean = false
  showFunctional2LegSquatWithOverheadReachFields: boolean = false
  showFunctional1LegSquatWithOverheadReachFields: boolean = false
  showFunctionalRunningMechanicsFields: boolean = false
  showFunctionalBackExtensionFields: boolean = false

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

      structural: ['no'],
      craigs_test: ['no'],
      tibial_torsion: ['no'],

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





      stork_stand_si_mobility_test: ['no'],

      patellofemoral: ['no'],
      j_sign: ['no'],
      patellar_ballottement: ['no'],
      patellar_compression: ['no'],
      patellar_passive_mobility: ['no'],

      functional: ['no'],
      core_stabilization: ['no'],
      hold_duration_comments_text: [''],

      selective_functional_movement_assessment: ['no'],

      _30_second_chair_stand: ['no'],
      number_of_stands_30_second_chair_stand:[''],
      comment_30_second_chair_stand:[''],
      side_bridge_plank: ['no'],
      prone_plank: ['no'],
      single_leg_bridge_hold: ['no'],
      single_leg_hop_test_for_distance: ['no'],
      _2_leg_squat_with_overhead_reach: ['no'],
      _1_leg_squat_with_overhead_reach: ['no'],
      running_mechanics: ['no'],
      running_mechanics_comments_text: [''],
      back_extension: ['no'],
      back_extension_comments_text: [''],


      alar_ligament_test: ['no'],

      alar_ligament_stress: ['no'],
      alar_ligament_stress_comments_text: [''],

      work_conditioning: ['no'],
      material_handling_bilateral_lifting: ['no'],
      non_material_handling: ['no'],

      tmr_fab_4_worksheet: ['no'],
      tmr_fab_4_worksheet_comments_text: [''],
      additional_comments: ['no'],
      additional_comments_text: ['']
    })
  }
  setupValueChangeListeners() {
    this.specialTestForm.get('flexibility')?.valueChanges.subscribe(value => {
      this.showFlexibilityFields = value === 'yes';
    });
    this.specialTestForm.get('thomas_test')?.valueChanges.subscribe(value => {
      this.showFlexibilityThomasTestFields = value === 'yes';
    });
    this.specialTestForm.get('gastrocnemius_length')?.valueChanges.subscribe(value => {
      this.showFlexibilityGastrocnemiusLengthFields = value === 'yes';
    });
    this.specialTestForm.get('soleus_muscle_length')?.valueChanges.subscribe(value => {
      this.showFlexibilitySoleusMuscleLengthFields = value === 'yes';
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
    this.specialTestForm.get('craigs_test')?.valueChanges.subscribe(value => {
      this.showFlexibilityCraigTestFields = value === 'yes';
    });
    this.specialTestForm.get('tibial_torsion')?.valueChanges.subscribe(value => {
      this.showFlexibilityTibialTorsionFields = value === 'yes';
    });



    this.specialTestForm.get('ligament_integrity_knee')?.valueChanges.subscribe(value => {
      this.showLigamentIntegrityKneeFields = value === 'yes';
    });
    this.specialTestForm.get('valgus_stress_at_0_knee_flex')?.valueChanges.subscribe(value => {
      this.showLigamentIntegrityKneeValgusStressAt0KneeFlexFields = value === 'yes';
    });
    this.specialTestForm.get('valgus_stress_at_30_knee_flex')?.valueChanges.subscribe(value => {
      this.showLigamentIntegrityKneeValgusStressAt30KneeFlexFields = value === 'yes';
    });
    this.specialTestForm.get('varus_stress_at_0_knee_flex')?.valueChanges.subscribe(value => {
      this.showLigamentIntegrityKneeVarusStressat0KneeFlexFields = value === 'yes';
    });
    this.specialTestForm.get('varus_stress_at_30_knee_flex')?.valueChanges.subscribe(value => {
      this.showLigamentIntegrityKneeVarusStressat30KneeFlexFields = value === 'yes';
    });
    this.specialTestForm.get('anterior_drawer')?.valueChanges.subscribe(value => {
      this.showLigamentIntegrityKneeAnteriorDrawerFields = value === 'yes';
    });
    this.specialTestForm.get('posterior_drawer')?.valueChanges.subscribe(value => {
      this.showLigamentIntegrityKneePosteriorDrawerFields = value === 'yes';
    });
    this.specialTestForm.get('lachmans')?.valueChanges.subscribe(value => {
      this.showLigamentIntegrityKneeLachmansFields = value === 'yes';
    });
    this.specialTestForm.get('pivot_shift')?.valueChanges.subscribe(value => {
      this.showLigamentIntegrityKneePivotShiftFields = value === 'yes';
    });
    this.specialTestForm.get('sag_sign')?.valueChanges.subscribe(value => {
      this.showLigamentIntegrityKneeSagSignFields = value === 'yes';
    });





    this.specialTestForm.get('stork_stand_si_mobility_test')?.valueChanges.subscribe(value => {
      this.showStorkStandSiMobilityTestFields = value === 'yes';
    });


    this.specialTestForm.get('patellofemoral')?.valueChanges.subscribe(value => {
      this.showPatellofemoralFields = value === 'yes';
    });
    this.specialTestForm.get('j_sign')?.valueChanges.subscribe(value => {
      this.showPatellofemoralJSignFields = value === 'yes';
    });
    this.specialTestForm.get('patellar_ballottement')?.valueChanges.subscribe(value => {
      this.showPatellofemoralPatellarBallottementFields = value === 'yes';
    });
    this.specialTestForm.get('patellar_compression')?.valueChanges.subscribe(value => {
      this.showPatellofemoralPatellarCompressionFields = value === 'yes';
    });
    this.specialTestForm.get('patellar_passive_mobility')?.valueChanges.subscribe(value => {
      this.showPatellofemoralPatellarPassiveMobilityFields = value === 'yes';
    });


    this.specialTestForm.get('functional')?.valueChanges.subscribe(value => {
      this.showFunctionalFields = value === 'yes';
    });
    this.specialTestForm.get('core_stabilization')?.valueChanges.subscribe(value => {
      this.showFunctionalCoreStabilizationFields = value === 'yes';
    });
    this.specialTestForm.get('selective_functional_movement_assessment')?.valueChanges.subscribe(value => {
      this.showFunctionalSelectiveFunctionalMovementAssessmentFields = value === 'yes';
    });
    this.specialTestForm.get('_30_second_chair_stand')?.valueChanges.subscribe(value => {
      this.showFunctional30SecondChairStandFields = value === 'yes';
    });
    this.specialTestForm.get('side_bridge_plank')?.valueChanges.subscribe(value => {
      this.showFunctionalSideBridgePlankFields = value === 'yes';
    });
    this.specialTestForm.get('prone_plank')?.valueChanges.subscribe(value => {
      this.showFunctionalPronePlankFields = value === 'yes';
    });
    this.specialTestForm.get('single_leg_bridge_hold')?.valueChanges.subscribe(value => {
      this.showFunctionalSingleLegBridgeHoldFields = value === 'yes';
    });
    this.specialTestForm.get('single_leg_hop_test_for_distance')?.valueChanges.subscribe(value => {
      this.showFunctionalSingleLegHopTestForDistanceFields = value === 'yes';
    });
    this.specialTestForm.get('_2_leg_squat_with_overhead_reach')?.valueChanges.subscribe(value => {
      this.showFunctional2LegSquatWithOverheadReachFields = value === 'yes';
    });
    this.specialTestForm.get('_1_leg_squat_with_overhead_reach')?.valueChanges.subscribe(value => {
      this.showFunctional1LegSquatWithOverheadReachFields = value === 'yes';
    });
    this.specialTestForm.get('running_mechanics')?.valueChanges.subscribe(value => {
      this.showFunctionalRunningMechanicsFields = value === 'yes';
    });
    this.specialTestForm.get('back_extension')?.valueChanges.subscribe(value => {
      this.showFunctionalBackExtensionFields = value === 'yes';
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
