import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SpecialTestConfig } from './config';
import { SpecialTest } from './model/SpecialTest';
import { SpecialTestsMapperService } from './service/special-tests-mapper.service';

@Component({
  selector: 'special-tests-n',
  templateUrl: './special-tests-n.component.html',
  styleUrls: ['./special-tests-n.component.css']
})
export class SpecialTestsNComponent implements OnInit {
  specialTestForm: FormGroup;
  @Output() formReady = new EventEmitter<FormGroup>();
  showFlexibilityFields: boolean = false;
  @Input() specialTestData?: SpecialTest;
  formData: any = {};
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
  showWorkConditioningMaterialHandlingFields: boolean = false;
  showWorkConditioningNonMaterialHandlingFields: boolean = false;

  showTmrFab4WorksheetFields: boolean = false;

  showCervicalPassiveVertebralMobilityFields: boolean = false;
  showCpvmC2_3Fields: boolean = false;
  showCpvmC3_4Fields: boolean = false;
  showCpvmC4_5Fields: boolean = false;
  showCpvmC5_6Fields: boolean = false;
  showCpvmC6_7Fields: boolean = false;
  showCpvmC7T1Fields: boolean = false;
  cpvmOptions: string[] = ['Not Tested', 'Normal', 'Hypomobile', 'Hypermobile', 'Ankylosed', 'Unstable'];

  showPassiveVertebralMobilityThoracicFields: boolean = false;
  showPvmtT1T2Fields: boolean = false;
  showPvmtT2T3Fields: boolean = false;
  showPvmtT3T4Fields: boolean = false;
  showPvmtT4T5Fields: boolean = false;
  showPvmtT5T6Fields: boolean = false;
  showPvmtT6T7Fields: boolean = false;
  showPvmtT7T8Fields: boolean = false;
  showPvmtT8T9Fields: boolean = false;
  showPvmtT9T10Fields: boolean = false;
  showPvmtT10T11Fields: boolean = false;
  showPvmtT11T12Fields: boolean = false;
  showPvmtT12L1Fields: boolean = false;

  showCervicalQuadrantFields: boolean = false;
  showCervicalCompDistFields: boolean = false;
  cervicalCompDistOptions: string[] = ['Not Tested', 'Positive', 'Negative'];
  showJawCrepitusFields: boolean = false;
  showSpurlingsManeuverFields: boolean = false;
  showAlarLigamentTestManualFields: boolean = false;
  showAlarLigamentStressManualFields: boolean = false;
  showSubcranialPassiveVertebralMobilityFields: boolean = false;
  showSpvmOaFields: boolean = false;
  showSpvmAaFields: boolean = false;
  showPassiveJointMobilityShoulderFields: boolean = false;
  showScJointFields: boolean = false;
  showAcJointFields: boolean = false;
  showImpingementFields: boolean = false;
  showGhjStabilityFields: boolean = false;
  showLabrumFields: boolean = false;
  showRotatorCuffFields: boolean = false;
  showSpeedsTestFields: boolean = false;
  showLigamentIntegrityElbowFields: boolean = false;
  showUlnarNerveSubluxationFields: boolean = false;
  showKempsTestFields: boolean = false;
  kempsTestOptions: string[] = ['Negative', 'Positive Right', 'Positive Left', 'Positive Bilateral'];
  showSiCompressionFields: boolean = false;
  showSiDistractionFields: boolean = false;
  showLegLengthFields: boolean = false;
  showProprioceptionBalanceFields: boolean = false;
  showPelvicClockIntroitusClockFields: boolean = false;
  showLaseguesSlrFields: boolean = false;

  additionalCommentsFields: boolean = false;

  readonly specialTestConfig = SpecialTestConfig;
  constructor(private fb: FormBuilder,
    private specialTestsMapperService: SpecialTestsMapperService) { }

  ngOnInit(): void {
    this.initForm();
    this.setupValueChangeListeners();
    if (this.specialTestData) {
      this.formData = this.specialTestsMapperService.fromDto(this.specialTestData);
      this.specialTestForm.patchValue(this.formData); // Single patch - child components will use formData
    }
    this.formReady.emit(this.specialTestForm);
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
      patellar_compression_right_normal: [false],
      patellar_compression_right_crepitus: [false],
      patellar_compression_right_painful: [false],
      patellar_compression_left_normal: [false],
      patellar_compression_left_crepitus: [false],
      patellar_compression_left_painful: [false],
      patellar_passive_mobility: ['no'],
      patellar_passive_mobility_medial_right: ['not_tested'],
      patellar_passive_mobility_medial_left: ['not_tested'],
      patellar_passive_mobility_lateral_right: ['not_tested'],
      patellar_passive_mobility_lateral_left: ['not_tested'],
      patellar_passive_mobility_superior_right: ['not_tested'],
      patellar_passive_mobility_superior_left: ['not_tested'],

      functional: ['no'],
      core_stabilization: ['no'],
      hold_duration_comments_text: [''],

      selective_functional_movement_assessment: ['no'],

      _30_second_chair_stand: ['no'],
      number_of_stands_30_second_chair_stand: [''],
      comment_30_second_chair_stand: [''],
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

      cervical_passive_vertebral_mobility: ['no'],
      cpvm_c2_3: ['no'],
      cpvm_c2_3_forward_bending: ['Not Tested'],
      cpvm_c2_3_backward_bending: ['Not Tested'],
      cpvm_c2_3_right_side_bending: ['Not Tested'],
      cpvm_c2_3_left_side_bending: ['Not Tested'],
      cpvm_c2_3_right_rotation: ['Not Tested'],
      cpvm_c2_3_left_rotation: ['Not Tested'],
      cpvm_c3_4: ['no'],
      cpvm_c3_4_forward_bending: ['Not Tested'],
      cpvm_c3_4_backward_bending: ['Not Tested'],
      cpvm_c3_4_right_side_bending: ['Not Tested'],
      cpvm_c3_4_left_side_bending: ['Not Tested'],
      cpvm_c3_4_right_rotation: ['Not Tested'],
      cpvm_c3_4_left_rotation: ['Not Tested'],
      cpvm_c4_5: ['no'],
      cpvm_c4_5_forward_bending: ['Not Tested'],
      cpvm_c4_5_backward_bending: ['Not Tested'],
      cpvm_c4_5_right_side_bending: ['Not Tested'],
      cpvm_c4_5_left_side_bending: ['Not Tested'],
      cpvm_c4_5_right_rotation: ['Not Tested'],
      cpvm_c4_5_left_rotation: ['Not Tested'],
      cpvm_c5_6: ['no'],
      cpvm_c5_6_forward_bending: ['Not Tested'],
      cpvm_c5_6_backward_bending: ['Not Tested'],
      cpvm_c5_6_right_side_bending: ['Not Tested'],
      cpvm_c5_6_left_side_bending: ['Not Tested'],
      cpvm_c5_6_right_rotation: ['Not Tested'],
      cpvm_c5_6_left_rotation: ['Not Tested'],
      cpvm_c6_7: ['no'],
      cpvm_c6_7_forward_bending: ['Not Tested'],
      cpvm_c6_7_backward_bending: ['Not Tested'],
      cpvm_c6_7_right_side_bending: ['Not Tested'],
      cpvm_c6_7_left_side_bending: ['Not Tested'],
      cpvm_c6_7_right_rotation: ['Not Tested'],
      cpvm_c6_7_left_rotation: ['Not Tested'],
      cpvm_c7_t1: ['no'],
      cpvm_c7_t1_forward_bending: ['Not Tested'],
      cpvm_c7_t1_backward_bending: ['Not Tested'],
      cpvm_c7_t1_right_side_bending: ['Not Tested'],
      cpvm_c7_t1_left_side_bending: ['Not Tested'],
      cpvm_c7_t1_right_rotation: ['Not Tested'],
      cpvm_c7_t1_left_rotation: ['Not Tested'],
      passive_vertebral_mobility_thoracic: ['no'],
      pvmt_t1_t2: ['no'],
      pvmt_t1_t2_forward_bending: ['Not Tested'],
      pvmt_t1_t2_backward_bending: ['Not Tested'],
      pvmt_t1_t2_right_side_bending: ['Not Tested'],
      pvmt_t1_t2_left_side_bending: ['Not Tested'],
      pvmt_t1_t2_right_rotation: ['Not Tested'],
      pvmt_t1_t2_left_rotation: ['Not Tested'],
      pvmt_t2_t3: ['no'],
      pvmt_t2_t3_forward_bending: ['Not Tested'],
      pvmt_t2_t3_backward_bending: ['Not Tested'],
      pvmt_t2_t3_right_side_bending: ['Not Tested'],
      pvmt_t2_t3_left_side_bending: ['Not Tested'],
      pvmt_t2_t3_right_rotation: ['Not Tested'],
      pvmt_t2_t3_left_rotation: ['Not Tested'],
      pvmt_t3_t4: ['no'],
      pvmt_t3_t4_forward_bending: ['Not Tested'],
      pvmt_t3_t4_backward_bending: ['Not Tested'],
      pvmt_t3_t4_right_side_bending: ['Not Tested'],
      pvmt_t3_t4_left_side_bending: ['Not Tested'],
      pvmt_t3_t4_right_rotation: ['Not Tested'],
      pvmt_t3_t4_left_rotation: ['Not Tested'],
      pvmt_t4_t5: ['no'],
      pvmt_t4_t5_forward_bending: ['Not Tested'],
      pvmt_t4_t5_backward_bending: ['Not Tested'],
      pvmt_t4_t5_right_side_bending: ['Not Tested'],
      pvmt_t4_t5_left_side_bending: ['Not Tested'],
      pvmt_t4_t5_right_rotation: ['Not Tested'],
      pvmt_t4_t5_left_rotation: ['Not Tested'],
      pvmt_t5_t6: ['no'],
      pvmt_t5_t6_forward_bending: ['Not Tested'],
      pvmt_t5_t6_backward_bending: ['Not Tested'],
      pvmt_t5_t6_right_side_bending: ['Not Tested'],
      pvmt_t5_t6_left_side_bending: ['Not Tested'],
      pvmt_t5_t6_right_rotation: ['Not Tested'],
      pvmt_t5_t6_left_rotation: ['Not Tested'],
      pvmt_t6_t7: ['no'],
      pvmt_t6_t7_forward_bending: ['Not Tested'],
      pvmt_t6_t7_backward_bending: ['Not Tested'],
      pvmt_t6_t7_right_side_bending: ['Not Tested'],
      pvmt_t6_t7_left_side_bending: ['Not Tested'],
      pvmt_t6_t7_right_rotation: ['Not Tested'],
      pvmt_t6_t7_left_rotation: ['Not Tested'],
      pvmt_t7_t8: ['no'],
      pvmt_t7_t8_forward_bending: ['Not Tested'],
      pvmt_t7_t8_backward_bending: ['Not Tested'],
      pvmt_t7_t8_right_side_bending: ['Not Tested'],
      pvmt_t7_t8_left_side_bending: ['Not Tested'],
      pvmt_t7_t8_right_rotation: ['Not Tested'],
      pvmt_t7_t8_left_rotation: ['Not Tested'],
      pvmt_t8_t9: ['no'],
      pvmt_t8_t9_forward_bending: ['Not Tested'],
      pvmt_t8_t9_backward_bending: ['Not Tested'],
      pvmt_t8_t9_right_side_bending: ['Not Tested'],
      pvmt_t8_t9_left_side_bending: ['Not Tested'],
      pvmt_t8_t9_right_rotation: ['Not Tested'],
      pvmt_t8_t9_left_rotation: ['Not Tested'],
      pvmt_t9_t10: ['no'],
      pvmt_t9_t10_forward_bending: ['Not Tested'],
      pvmt_t9_t10_backward_bending: ['Not Tested'],
      pvmt_t9_t10_right_side_bending: ['Not Tested'],
      pvmt_t9_t10_left_side_bending: ['Not Tested'],
      pvmt_t9_t10_right_rotation: ['Not Tested'],
      pvmt_t9_t10_left_rotation: ['Not Tested'],
      pvmt_t10_t11: ['no'],
      pvmt_t10_t11_forward_bending: ['Not Tested'],
      pvmt_t10_t11_backward_bending: ['Not Tested'],
      pvmt_t10_t11_right_side_bending: ['Not Tested'],
      pvmt_t10_t11_left_side_bending: ['Not Tested'],
      pvmt_t10_t11_right_rotation: ['Not Tested'],
      pvmt_t10_t11_left_rotation: ['Not Tested'],
      pvmt_t11_t12: ['no'],
      pvmt_t11_t12_forward_bending: ['Not Tested'],
      pvmt_t11_t12_backward_bending: ['Not Tested'],
      pvmt_t11_t12_right_side_bending: ['Not Tested'],
      pvmt_t11_t12_left_side_bending: ['Not Tested'],
      pvmt_t11_t12_right_rotation: ['Not Tested'],
      pvmt_t11_t12_left_rotation: ['Not Tested'],
      pvmt_t12_l1: ['no'],
      pvmt_t12_l1_forward_bending: ['Not Tested'],
      pvmt_t12_l1_backward_bending: ['Not Tested'],
      pvmt_t12_l1_right_side_bending: ['Not Tested'],
      pvmt_t12_l1_left_side_bending: ['Not Tested'],
      pvmt_t12_l1_right_rotation: ['Not Tested'],
      pvmt_t12_l1_left_rotation: ['Not Tested'],
      cervical_quadrant: ['no'],
      cervical_comp_dist: ['no'],
      cervical_comp_dist_compression: ['Not Tested'],
      cervical_comp_dist_distraction: ['Not Tested'],
      jaw_crepitus: ['no'],
      spurlings_maneuver: ['no'],
      alar_ligament_test_manual: ['no'],
      alar_ligament_stress_manual: ['no'],
      alar_ligament_stress_manual_comments_text: [''],
      subcranial_passive_vertebral_mobility: ['no'],
      spvm_oa: ['no'],
      spvm_oa_forward_bending: ['Not Tested'],
      spvm_oa_backward_bending: ['Not Tested'],
      spvm_oa_right_side_bending: ['Not Tested'],
      spvm_oa_left_side_bending: ['Not Tested'],
      spvm_aa: ['no'],
      spvm_aa_forward_bending: ['Not Tested'],
      spvm_aa_backward_bending: ['Not Tested'],
      spvm_aa_right_side_bending: ['Not Tested'],
      spvm_aa_left_side_bending: ['Not Tested'],
      passive_joint_mobility_shoulder: ['no'],
      sc_joint: ['no'],
      sc_joint_comments_text: [''],
      ac_joint: ['no'],
      ac_joint_comments_text: [''],
      impingement: ['no'],
      ghj_stability: ['no'],
      labrum: ['no'],
      rotator_cuff: ['no'],
      speeds_test: ['no'],
      speeds_test_comments_text: [''],
      ligament_integrity_elbow: ['no'],
      ulnar_nerve_subluxation: ['no'],
      kemps_test: ['no'],
      kemps_test_result: ['Negative'],
      si_compression: ['no'],
      si_distraction: ['no'],
      leg_length: ['no'],
      proprioception_balance: ['no'],
      proprioception_balance_comments_text: [''],
      pelvic_clock_introitus_clock: ['no'],
      pelvic_clock_introitus_clock_comments_text: [''],
      lasegues_slr: ['no'],

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
    this.specialTestForm.get('material_handling_bilateral_lifting')?.valueChanges.subscribe(value => {
      this.showWorkConditioningMaterialHandlingFields = value === 'yes';
    });
    this.specialTestForm.get('non_material_handling')?.valueChanges.subscribe(value => {
      this.showWorkConditioningNonMaterialHandlingFields = value === 'yes';
    });

    this.specialTestForm.get('tmr_fab_4_worksheet')?.valueChanges.subscribe(value => {
      this.showTmrFab4WorksheetFields = value === 'yes';
    });

    this.specialTestForm.get('cervical_passive_vertebral_mobility')?.valueChanges.subscribe(value => {
      this.showCervicalPassiveVertebralMobilityFields = value === 'yes';
    });
    this.specialTestForm.get('cpvm_c2_3')?.valueChanges.subscribe(value => {
      this.showCpvmC2_3Fields = value === 'yes';
    });
    this.specialTestForm.get('cpvm_c3_4')?.valueChanges.subscribe(value => {
      this.showCpvmC3_4Fields = value === 'yes';
    });
    this.specialTestForm.get('cpvm_c4_5')?.valueChanges.subscribe(value => {
      this.showCpvmC4_5Fields = value === 'yes';
    });
    this.specialTestForm.get('cpvm_c5_6')?.valueChanges.subscribe(value => {
      this.showCpvmC5_6Fields = value === 'yes';
    });
    this.specialTestForm.get('cpvm_c6_7')?.valueChanges.subscribe(value => {
      this.showCpvmC6_7Fields = value === 'yes';
    });
    this.specialTestForm.get('cpvm_c7_t1')?.valueChanges.subscribe(value => {
      this.showCpvmC7T1Fields = value === 'yes';
    });
    this.specialTestForm.get('passive_vertebral_mobility_thoracic')?.valueChanges.subscribe(value => {
      this.showPassiveVertebralMobilityThoracicFields = value === 'yes';
    });
    this.specialTestForm.get('pvmt_t1_t2')?.valueChanges.subscribe(value => {
      this.showPvmtT1T2Fields = value === 'yes';
    });
    this.specialTestForm.get('pvmt_t2_t3')?.valueChanges.subscribe(value => {
      this.showPvmtT2T3Fields = value === 'yes';
    });
    this.specialTestForm.get('pvmt_t3_t4')?.valueChanges.subscribe(value => {
      this.showPvmtT3T4Fields = value === 'yes';
    });
    this.specialTestForm.get('pvmt_t4_t5')?.valueChanges.subscribe(value => {
      this.showPvmtT4T5Fields = value === 'yes';
    });
    this.specialTestForm.get('pvmt_t5_t6')?.valueChanges.subscribe(value => {
      this.showPvmtT5T6Fields = value === 'yes';
    });
    this.specialTestForm.get('pvmt_t6_t7')?.valueChanges.subscribe(value => {
      this.showPvmtT6T7Fields = value === 'yes';
    });
    this.specialTestForm.get('pvmt_t7_t8')?.valueChanges.subscribe(value => {
      this.showPvmtT7T8Fields = value === 'yes';
    });
    this.specialTestForm.get('pvmt_t8_t9')?.valueChanges.subscribe(value => {
      this.showPvmtT8T9Fields = value === 'yes';
    });
    this.specialTestForm.get('pvmt_t9_t10')?.valueChanges.subscribe(value => {
      this.showPvmtT9T10Fields = value === 'yes';
    });
    this.specialTestForm.get('pvmt_t10_t11')?.valueChanges.subscribe(value => {
      this.showPvmtT10T11Fields = value === 'yes';
    });
    this.specialTestForm.get('pvmt_t11_t12')?.valueChanges.subscribe(value => {
      this.showPvmtT11T12Fields = value === 'yes';
    });
    this.specialTestForm.get('pvmt_t12_l1')?.valueChanges.subscribe(value => {
      this.showPvmtT12L1Fields = value === 'yes';
    });
    this.specialTestForm.get('cervical_quadrant')?.valueChanges.subscribe(value => {
      this.showCervicalQuadrantFields = value === 'yes';
    });
    this.specialTestForm.get('cervical_comp_dist')?.valueChanges.subscribe(value => {
      this.showCervicalCompDistFields = value === 'yes';
    });
    this.specialTestForm.get('jaw_crepitus')?.valueChanges.subscribe(value => {
      this.showJawCrepitusFields = value === 'yes';
    });
    this.specialTestForm.get('spurlings_maneuver')?.valueChanges.subscribe(value => {
      this.showSpurlingsManeuverFields = value === 'yes';
    });
    this.specialTestForm.get('alar_ligament_test_manual')?.valueChanges.subscribe(value => {
      this.showAlarLigamentTestManualFields = value === 'yes';
    });
    this.specialTestForm.get('alar_ligament_stress_manual')?.valueChanges.subscribe(value => {
      this.showAlarLigamentStressManualFields = value === 'yes';
    });
    this.specialTestForm.get('subcranial_passive_vertebral_mobility')?.valueChanges.subscribe(value => {
      this.showSubcranialPassiveVertebralMobilityFields = value === 'yes';
    });
    this.specialTestForm.get('spvm_oa')?.valueChanges.subscribe(value => {
      this.showSpvmOaFields = value === 'yes';
    });
    this.specialTestForm.get('spvm_aa')?.valueChanges.subscribe(value => {
      this.showSpvmAaFields = value === 'yes';
    });
    this.specialTestForm.get('passive_joint_mobility_shoulder')?.valueChanges.subscribe(value => {
      this.showPassiveJointMobilityShoulderFields = value === 'yes';
    });
    this.specialTestForm.get('sc_joint')?.valueChanges.subscribe(value => {
      this.showScJointFields = value === 'yes';
    });
    this.specialTestForm.get('ac_joint')?.valueChanges.subscribe(value => {
      this.showAcJointFields = value === 'yes';
    });
    this.specialTestForm.get('impingement')?.valueChanges.subscribe(value => {
      this.showImpingementFields = value === 'yes';
    });
    this.specialTestForm.get('ghj_stability')?.valueChanges.subscribe(value => {
      this.showGhjStabilityFields = value === 'yes';
    });
    this.specialTestForm.get('labrum')?.valueChanges.subscribe(value => {
      this.showLabrumFields = value === 'yes';
    });
    this.specialTestForm.get('rotator_cuff')?.valueChanges.subscribe(value => {
      this.showRotatorCuffFields = value === 'yes';
    });
    this.specialTestForm.get('speeds_test')?.valueChanges.subscribe(value => {
      this.showSpeedsTestFields = value === 'yes';
    });
    this.specialTestForm.get('ligament_integrity_elbow')?.valueChanges.subscribe(value => {
      this.showLigamentIntegrityElbowFields = value === 'yes';
    });
    this.specialTestForm.get('ulnar_nerve_subluxation')?.valueChanges.subscribe(value => {
      this.showUlnarNerveSubluxationFields = value === 'yes';
    });
    this.specialTestForm.get('kemps_test')?.valueChanges.subscribe(value => {
      this.showKempsTestFields = value === 'yes';
    });
    this.specialTestForm.get('si_compression')?.valueChanges.subscribe(value => {
      this.showSiCompressionFields = value === 'yes';
    });
    this.specialTestForm.get('si_distraction')?.valueChanges.subscribe(value => {
      this.showSiDistractionFields = value === 'yes';
    });
    this.specialTestForm.get('leg_length')?.valueChanges.subscribe(value => {
      this.showLegLengthFields = value === 'yes';
    });
    this.specialTestForm.get('proprioception_balance')?.valueChanges.subscribe(value => {
      this.showProprioceptionBalanceFields = value === 'yes';
    });
    this.specialTestForm.get('pelvic_clock_introitus_clock')?.valueChanges.subscribe(value => {
      this.showPelvicClockIntroitusClockFields = value === 'yes';
    });
    this.specialTestForm.get('lasegues_slr')?.valueChanges.subscribe(value => {
      this.showLaseguesSlrFields = value === 'yes';
    });

    this.specialTestForm.get('additional_comments')?.valueChanges.subscribe(value => {
      this.additionalCommentsFields = value === 'yes';
    });
  }

}
