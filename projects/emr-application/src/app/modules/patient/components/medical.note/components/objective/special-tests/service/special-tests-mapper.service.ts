import { Injectable } from '@angular/core';
import { SpecialTest } from '../model/SpecialTest';
import { Flexibility } from '../model/Flexibility';
import { Structural } from '../model/Structural';
import { LigamentIntegrityKnee } from '../model/LigamentIntegrityKnee';
import { StorkStandSIMobilityTest } from '../model/StorkStandSIMobilityTest';
import { Patellofemoral } from '../model/Patellofemoral';
import { Functional } from '../model/Functional';
import { AlarLigamentTest } from '../model/AlarLigamentTest';
import { AlarLigamentStress } from '../model/AlarLigamentStress';
import { WorkConditioning } from '../model/WorkConditioning';
import { TMRFAB4Worksheet } from '../model/TMRFAB4Worksheet';
import { AdditionalComments } from '../model/AdditionalComments';

@Injectable({
  providedIn: 'root'
})
export class SpecialTestsMapperService {

  constructor() { }

  toModel(formValue: any): SpecialTest {
    return {
      flexibility: this.mapFlexibility(formValue),
      structural: this.mapStructural(formValue),
      ligamentIntegrityKnee: this.mapLigamentIntegrityKnee(formValue),
      storkStandSIMobilityTest: this.mapStorkStandSIMobilityTest(formValue),
      patellofemoral: this.mapPatellofemoral(formValue),
      functional: this.mapFunctional(formValue),
      alarLigamentTest: this.mapAlarLigamentTest(formValue),
      alarLigamentStress: this.mapAlarLigamentStress(formValue),
      workConditioning: this.mapWorkConditioning(formValue),
      tMRFAB4Worksheet: this.mapTMRFAB4Worksheet(formValue),
      additionalComments: this.mapAdditionalComments(formValue)
    };
  }

  fromDto(dto: SpecialTest): any {
    return {
      // Flexibility
      flexibility: this.boolToYesNo(dto.flexibility?.flexibility),
      thomas_test: this.boolToYesNo(dto.flexibility?.thomasTest),
      ober: this.boolToYesNo(dto.flexibility?.ober),
      _90_90_hamstring_flexibility: this.boolToYesNo(dto.flexibility?._90_90HamstringFlexibility),
      gastrocnemius_length: this.boolToYesNo(dto.flexibility?.gastrocnemiusLength),
      soleus_muscle_length: this.boolToYesNo(dto.flexibility?.soleusMuscleLength),
      thomas_test_negative_right: dto.flexibility?.thomasTestNegativeRight || '',
      thomas_test_negative_left: dto.flexibility?.thomasTestNegativeLeft || '',
      thomas_test_positive_for_rectus_femoris_right: dto.flexibility?.thomasTestPositiveForRectusFemorisRight || '',
      thomas_test_positive_for_rectus_femoris_left: dto.flexibility?.thomasTestPositiveForRectusFemorisLeft || '',
      thomas_test_positive_for_iliopsoas_right: dto.flexibility?.thomasTestPositiveForIliopsoasRight || '',
      thomas_test_positive_for_iliopsoas_left: dto.flexibility?.thomasTestPositiveForIliopsoasLeft || '',
      thomas_test_positive_for_rectus_femoris_and_iliopsoas_right: dto.flexibility?.thomasTestPositiveForRectusFemorisAndIliopsoasRight || '',
      thomas_test_positive_for_rectus_femoris_and_iliopsoas_left: dto.flexibility?.thomasTestPositiveForRectusFemorisAndIliopsoasLeft || '',
      'thomas_test_positive_for_tfl/itb_right': dto.flexibility?.thomasTestPositiveForTflitbRight || '',
      'thomas_test_positive_for_tfl/itb_left': dto.flexibility?.thomasTestPositiveForTflitbLeft || '',
      ober_right: dto.flexibility?.oberRight || '',
      ober_left: dto.flexibility?.oberLeft || '',
      ninetynine_hamstring_flexibility_right: dto.flexibility?.ninetynineHamstringFlexibilityRight || '',
      ninetynine_hamstring_flexibility_left: dto.flexibility?.ninetynineHamstringFlexibilityLeft || '',
      ninetynine_hamstring_flexibility_right_custom: dto.flexibility?.ninetynineHamstringFlexibilityRightCustom || '',
      ninetynine_hamstring_flexibility_left_custom: dto.flexibility?.ninetynineHamstringFlexibilityLeftCustom || '',
      gastrocnemius_length_test_apply_to_all: dto.flexibility?.gastrocnemiusLengthTestApplyToAll || '',
      gastrocnemius_length_test_gastrocnemius_length_right: dto.flexibility?.gastrocnemiusLengthTestGastrocnemiusLengthRight || '',
      gastrocnemius_length_test_gastrocnemius_length_left: dto.flexibility?.gastrocnemiusLengthTestGastrocnemiusLengthLeft || '',
      soleus_muscle_length_test_apply_to_all: dto.flexibility?.soleusMuscleLengthTestApplyToAll || '',
      soleus_muscle_length_test_soleus_muscle_length_right: dto.flexibility?.soleusMuscleLengthTestSoleusMuscleLengthRight || '',
      soleus_muscle_length_test_soleus_muscle_length_left: dto.flexibility?.soleusMuscleLengthTestSoleusMuscleLengthLeft || '',

      // Structural
      structural: this.boolToYesNo(dto.structural?.structural),
      craigs_test: this.boolToYesNo(dto.structural?.craigsTest),
      tibial_torsion: this.boolToYesNo(dto.structural?.tibialTorsion),

      // Ligament Integrity Knee
      ligament_integrity_knee: this.boolToYesNo(dto.ligamentIntegrityKnee?.ligamentIntegrityKnee),
      valgus_stress_at_0_knee_flex: this.boolToYesNo(dto.ligamentIntegrityKnee?.valgusStressAt_0KneeFlex),
      valgus_stress_at_30_knee_flex: this.boolToYesNo(dto.ligamentIntegrityKnee?.valgusStressAt_30KneeFlex),
      varus_stress_at_0_knee_flex: this.boolToYesNo(dto.ligamentIntegrityKnee?.varusStressAt_0KneeFlex),
      varus_stress_at_30_knee_flex: this.boolToYesNo(dto.ligamentIntegrityKnee?.varusStressAt_30KneeFlex),
      anterior_drawer: this.boolToYesNo(dto.ligamentIntegrityKnee?.anteriorDrawer),
      posterior_drawer: this.boolToYesNo(dto.ligamentIntegrityKnee?.posteriorDrawer),
      lachmans: this.boolToYesNo(dto.ligamentIntegrityKnee?.lachmans),
      pivot_shift: this.boolToYesNo(dto.ligamentIntegrityKnee?.pivotShift),
      sag_sign: this.boolToYesNo(dto.ligamentIntegrityKnee?.sagSign),
      craigs_test_right: dto.ligamentIntegrityKnee?.craigsTestRight || '',
      craigs_test_left: dto.ligamentIntegrityKnee?.craigsTestLeft || '',
      tibial_torsion_right: dto.ligamentIntegrityKnee?.tibialTorsionRight || '',
      tibial_torsion_left: dto.ligamentIntegrityKnee?.tibialTorsionLeft || '',
      valgus_stress_at_0_knee_flex_valgus_stress_at_0_knee_flex_right: dto.ligamentIntegrityKnee?.valgusStressAt_0KneeFlexValgusStressAt_0KneeFlexRight || '',
      valgus_stress_at_0_knee_flex_valgus_stress_at_0_knee_flex_left: dto.ligamentIntegrityKnee?.valgusStressAt_0KneeFlexValgusStressAt_0KneeFlexLeft || '',
      valgus_stress_at_30_knee_flex_valgus_stress_at_30_knee_flex_right: dto.ligamentIntegrityKnee?.valgusStressAt_30KneeFlexValgusStressAt_30KneeFlexRight || '',
      valgus_stress_at_30_knee_flex_valgus_stress_at_30_knee_flex_left: dto.ligamentIntegrityKnee?.valgusStressAt_30KneeFlexValgusStressAt_30KneeFlexLeft || '',
      varus_stress_at_0_knee_flex_varus_stress_at_0_knee_flex_right: dto.ligamentIntegrityKnee?.varusStressAt_0KneeFlexVarusStressAt_0KneeFlexRight || '',
      varus_stress_at_0_knee_flex_varus_stress_at_0_knee_flex_left: dto.ligamentIntegrityKnee?.varusStressAt_0KneeFlexVarusStressAt_0KneeFlexLeft || '',
      varus_stress_at_30_knee_flex_varus_stress_at_30_knee_flex_right: dto.ligamentIntegrityKnee?.varusStressAt_30KneeFlexVarusStressAt_30KneeFlexRight || '',
      varus_stress_at_30_knee_flex_varus_stress_at_30_knee_flex_left: dto.ligamentIntegrityKnee?.varusStressAt_30KneeFlexVarusStressAt_30KneeFlexLeft || '',
      anterior_drawer_anterior_drawer_right: dto.ligamentIntegrityKnee?.anteriorDrawerAnteriorDrawerRight || '',
      anterior_drawer_anterior_drawer_left: dto.ligamentIntegrityKnee?.anteriorDrawerAnteriorDrawerLeft || '',
      posterior_drawer_posterior_drawer_right: dto.ligamentIntegrityKnee?.posteriorDrawerPosteriorDrawerRight || '',
      posterior_drawer_posterior_drawer_left: dto.ligamentIntegrityKnee?.posteriorDrawerPosteriorDrawerLeft || '',
      "lachmans_lachman's_right": dto.ligamentIntegrityKnee?.lachmansLachmansRight || '',
      "lachmans_lachman's_left": dto.ligamentIntegrityKnee?.lachmansLachmansLeft || '',
      pivot_shift_pivot_shift_right: dto.ligamentIntegrityKnee?.pivotShiftPivotShiftRight || '',
      pivot_shift_pivot_shift_left: dto.ligamentIntegrityKnee?.pivotShiftPivotShiftLeft || '',
      sag_sign_sag_sign_right: dto.ligamentIntegrityKnee?.sagSignSagSignRight || '',
      sag_sign_sag_sign_left: dto.ligamentIntegrityKnee?.sagSignSagSignLeft || '',

      // Stork Stand SI Mobility Test
      stork_stand_si_mobility_test: this.boolToYesNo(dto.storkStandSIMobilityTest?.storkStandSiMobilityTest),
      stork_stand_si_mobility_test_stork_stand_si_mobility_test_right: dto.storkStandSIMobilityTest?.storkStandSiMobilityTestStorkStandSiMobilityTestRight || '',
      stork_stand_si_mobility_test_stork_stand_si_mobility_test_left: dto.storkStandSIMobilityTest?.storkStandSiMobilityTestStorkStandSiMobilityTestLeft || '',

      // Patellofemoral
      patellofemoral: this.boolToYesNo(dto.patellofemoral?.patellofemoral),
      j_sign: this.boolToYesNo(dto.patellofemoral?.jSign),
      patellar_ballottement: this.boolToYesNo(dto.patellofemoral?.patellarBallottement),
      patellar_compression: this.boolToYesNo(dto.patellofemoral?.patellarCompression),
      patellar_passive_mobility: this.boolToYesNo(dto.patellofemoral?.patellarPassiveMobility),
      j_sign_j_sign_right: dto.patellofemoral?.jSignJSignRight || '',
      j_sign_j_sign_left: dto.patellofemoral?.jSignJSignLeft || '',
      patellar_ballottement_patellar_ballottement_right: dto.patellofemoral?.patellarBallottementPatellarBallottementRight || '',
      patellar_ballottement_patellar_ballottement_left: dto.patellofemoral?.patellarBallottementPatellarBallottementLeft || '',
      patellar_compression_right_normal: (dto.patellofemoral?.patellarCompressionPatellarCompressionRight || '').includes('Normal'),
      patellar_compression_right_crepitus: (dto.patellofemoral?.patellarCompressionPatellarCompressionRight || '').includes('Crepitus'),
      patellar_compression_right_painful: (dto.patellofemoral?.patellarCompressionPatellarCompressionRight || '').includes('Painful'),
      patellar_compression_left_normal: (dto.patellofemoral?.patellarCompressionPatellarCompressionLeft || '').includes('Normal'),
      patellar_compression_left_crepitus: (dto.patellofemoral?.patellarCompressionPatellarCompressionLeft || '').includes('Crepitus'),
      patellar_compression_left_painful: (dto.patellofemoral?.patellarCompressionPatellarCompressionLeft || '').includes('Painful'),
      patellar_passive_mobility_patellar_passive_mobility_right: dto.patellofemoral?.patellarPassiveMobilityPatellarPassiveMobilityRight || '',
      patellar_passive_mobility_patellar_passive_mobility_left: dto.patellofemoral?.patellarPassiveMobilityPatellarPassiveMobilityLeft || '',

      // Functional
      functional: this.boolToYesNo(dto.functional?.functional),
      core_stabilization: this.boolToYesNo(dto.functional?.coreStabilization),
      hold_duration_comments_text: dto.functional?.holdDurationCommentsText || '',
      selective_functional_movement_assessment: this.boolToYesNo(dto.functional?.selectiveFunctionalMovementAssessment),
      _30_second_chair_stand: this.boolToYesNo(dto.functional?._30SecondChairStand),
      number_of_stands_30_second_chair_stand: dto.functional?.numberOfStands_30SecondChairStand || '',
      comment_30_second_chair_stand: dto.functional?.comment_30SecondChairStand || '',
      side_bridge_plank: this.boolToYesNo(dto.functional?.sideBridgePlank),
      prone_plank: this.boolToYesNo(dto.functional?.pronePlank),
      single_leg_bridge_hold: this.boolToYesNo(dto.functional?.singleLegBridgeHold),
      single_leg_hop_test_for_distance: this.boolToYesNo(dto.functional?.singleLegHopTestForDistance),
      _2_leg_squat_with_overhead_reach: this.boolToYesNo(dto.functional?._2LegSquatWithOverheadReach),
      _1_leg_squat_with_overhead_reach: this.boolToYesNo(dto.functional?._1LegSquatWithOverheadReach),
      running_mechanics: this.boolToYesNo(dto.functional?.runningMechanics),
      running_mechanics_comments_text: dto.functional?.runningMechanicsCommentsText || '',
      back_extension: this.boolToYesNo(dto.functional?.backExtension),
      back_extension_comments_text: dto.functional?.backExtensionCommentsText || '',
      'selective_functional_movement_assessment_multi-segmental_extension_right': dto.functional?.selectiveFunctionalMovementAssessmentMultisegmentalExtensionRight || '',
      'selective_functional_movement_assessment_multi-segmental_extension_left': dto.functional?.selectiveFunctionalMovementAssessmentMultisegmentalExtensionLeft || '',
      'selective_functional_movement_assessment_multi-segmental_flexion_right': dto.functional?.selectiveFunctionalMovementAssessmentMultisegmentalFlexionRight || '',
      'selective_functional_movement_assessment_multi-segmental_flexion_left': dto.functional?.selectiveFunctionalMovementAssessmentMultisegmentalFlexionLeft || '',
      'selective_functional_movement_assessment_multi-segmental_rotation_right': dto.functional?.selectiveFunctionalMovementAssessmentMultisegmentalRotationRight || '',
      'selective_functional_movement_assessment_multi-segmental_rotation_left': dto.functional?.selectiveFunctionalMovementAssessmentMultisegmentalRotationLeft || '',
      selective_functional_movement_assessment_overhead_deep_squat_right: dto.functional?.selectiveFunctionalMovementAssessmentOverheadDeepSquatRight || '',
      selective_functional_movement_assessment_overhead_deep_squat_left: dto.functional?.selectiveFunctionalMovementAssessmentOverheadDeepSquatLeft || '',
      selective_functional_movement_assessment_single_leg_balance_right: dto.functional?.selectiveFunctionalMovementAssessmentSingleLegBalanceRight || '',
      selective_functional_movement_assessment_single_leg_balance_left: dto.functional?.selectiveFunctionalMovementAssessmentSingleLegBalanceLeft || '',
      side_bridge_plank_apply_to_all: dto.functional?.sideBridgePlankApplyToAll || '',
      side_bridge_plank_hold_duration_right: dto.functional?.sideBridgePlankHoldDurationRight || '',
      side_bridge_plank_hold_duration_left: dto.functional?.sideBridgePlankHoldDurationLeft || '',
      prone_plank_apply_to_all: dto.functional?.pronePlankApplyToAll || '',
      prone_plank_hold_duration_right: dto.functional?.pronePlankHoldDurationRight || '',
      prone_plank_hold_duration_left: dto.functional?.pronePlankHoldDurationLeft || '',
      single_leg_bridge_hold_single_leg_bridge_hold_right: dto.functional?.singleLegBridgeHoldSingleLegBridgeHoldRight || '',
      single_leg_bridge_hold_single_leg_bridge_hold_left: dto.functional?.singleLegBridgeHoldSingleLegBridgeHoldLeft || '',
      single_leg_hop_test_for_distance_apply_to_all: dto.functional?.singleLegHopTestForDistanceApplyToAll || '',
      single_leg_hop_test_for_distance_hold_duration_right: dto.functional?.singleLegHopTestForDistanceHoldDurationRight || '',
      single_leg_hop_test_for_distance_hold_duration_left: dto.functional?.singleLegHopTestForDistanceHoldDurationLeft || '',
      two_leg_squat_with_over_head_reach_normal_right: dto.functional?.twoLegSquatWithOverHeadReachNormalRight || '',
      two_leg_squat_with_over_head_reach_normal_left: dto.functional?.twoLegSquatWithOverHeadReachNormalLeft || '',
      two_leg_squat_with_over_head_reach_excessive_hip_ir_right: dto.functional?.twoLegSquatWithOverHeadReachExcessiveHipIrRight || '',
      two_leg_squat_with_over_head_reach_excessive_hip_ir_left: dto.functional?.twoLegSquatWithOverHeadReachExcessiveHipIrLeft || '',
      two_leg_squat_with_over_head_reach_excessive_hip_er_right: dto.functional?.twoLegSquatWithOverHeadReachExcessiveHipErRight || '',
      two_leg_squat_with_over_head_reach_excessive_hip_er_left: dto.functional?.twoLegSquatWithOverHeadReachExcessiveHipErLeft || '',
      two_leg_squat_with_over_head_reach_excessive_knee_adduction_right: dto.functional?.twoLegSquatWithOverHeadReachExcessiveKneeAdductionRight || '',
      two_leg_squat_with_over_head_reach_excessive_knee_adduction_left: dto.functional?.twoLegSquatWithOverHeadReachExcessiveKneeAdductionLeft || '',
      two_leg_squat_with_over_head_reach_excessive_knee_abduction_right: dto.functional?.twoLegSquatWithOverHeadReachExcessiveKneeAbductionRight || '',
      two_leg_squat_with_over_head_reach_excessive_knee_abduction_left: dto.functional?.twoLegSquatWithOverHeadReachExcessiveKneeAbductionLeft || '',
      two_leg_squat_with_over_head_reach_excessive_foot_pronation_right: dto.functional?.twoLegSquatWithOverHeadReachExcessiveFootPronationRight || '',
      two_leg_squat_with_over_head_reach_excessive_foot_pronation_left: dto.functional?.twoLegSquatWithOverHeadReachExcessiveFootPronationLeft || '',
      two_leg_squat_with_over_head_reach_decreased_ankle_dorsiflexion_right: dto.functional?.twoLegSquatWithOverHeadReachDecreasedAnkleDorsiflexionRight || '',
      two_leg_squat_with_over_head_reach_decreased_ankle_dorsiflexion_left: dto.functional?.twoLegSquatWithOverHeadReachDecreasedAnkleDorsiflexionLeft || '',
      two_leg_squat_with_over_head_reach_decreased_weight_bearing_right: dto.functional?.twoLegSquatWithOverHeadReachDecreasedWeightBearingRight || '',
      two_leg_squat_with_over_head_reach_decreased_weight_bearing_left: dto.functional?.twoLegSquatWithOverHeadReachDecreasedWeightBearingLeft || '',
      'two_leg_squat_with_over_head_reach_unable_to_complete_due_to_pain_and/or_weakness_right': dto.functional?.twoLegSquatWithOverHeadReachUnableToCompleteDueToPainAndorWeaknessRight || '',
      'two_leg_squat_with_over_head_reach_unable_to_complete_due_to_pain_and/or_weakness_left': dto.functional?.twoLegSquatWithOverHeadReachUnableToCompleteDueToPainAndorWeaknessLeft || '',
      one_leg_Squat_with_over_head_reach_normal_right: dto.functional?.oneLeg_SquatWithOverHeadReachNormalRight || '',
      one_leg_Squat_with_over_head_reach_normal_left: dto.functional?.oneLeg_SquatWithOverHeadReachNormalLeft || '',
      one_leg_Squat_with_over_head_reach_excessive_hip_ir_right: dto.functional?.oneLeg_SquatWithOverHeadReachExcessiveHipIrRight || '',
      one_leg_Squat_with_over_head_reach_excessive_hip_ir_left: dto.functional?.oneLeg_SquatWithOverHeadReachExcessiveHipIrLeft || '',
      one_leg_Squat_with_over_head_reach_excessive_hip_er_right: dto.functional?.oneLeg_SquatWithOverHeadReachExcessiveHipErRight || '',
      one_leg_Squat_with_over_head_reach_excessive_hip_er_left: dto.functional?.oneLeg_SquatWithOverHeadReachExcessiveHipErLeft || '',
      one_leg_Squat_with_over_head_reach_excessive_knee_adduction_right: dto.functional?.oneLeg_SquatWithOverHeadReachExcessiveKneeAdductionRight || '',
      one_leg_Squat_with_over_head_reach_excessive_knee_adduction_left: dto.functional?.oneLeg_SquatWithOverHeadReachExcessiveKneeAdductionLeft || '',
      one_leg_Squat_with_over_head_reach_excessive_knee_abduction_right: dto.functional?.oneLeg_SquatWithOverHeadReachExcessiveKneeAbductionRight || '',
      one_leg_Squat_with_over_head_reach_excessive_knee_abduction_left: dto.functional?.oneLeg_SquatWithOverHeadReachExcessiveKneeAbductionLeft || '',
      one_leg_Squat_with_over_head_reach_excessive_foot_pronation_right: dto.functional?.oneLeg_SquatWithOverHeadReachExcessiveFootPronationRight || '',
      one_leg_Squat_with_over_head_reach_excessive_foot_pronation_left: dto.functional?.oneLeg_SquatWithOverHeadReachExcessiveFootPronationLeft || '',
      one_leg_Squat_with_over_head_reach_decreased_ankle_dorsiflexion_right: dto.functional?.oneLeg_SquatWithOverHeadReachDecreasedAnkleDorsiflexionRight || '',
      one_leg_Squat_with_over_head_reach_decreased_ankle_dorsiflexion_left: dto.functional?.oneLeg_SquatWithOverHeadReachDecreasedAnkleDorsiflexionLeft || '',
      one_leg_Squat_with_over_head_reach_decreased_weight_bearing_right: dto.functional?.oneLeg_SquatWithOverHeadReachDecreasedWeightBearingRight || '',
      one_leg_Squat_with_over_head_reach_decreased_weight_bearing_left: dto.functional?.oneLeg_SquatWithOverHeadReachDecreasedWeightBearingLeft || '',
      'one_leg_Squat_with_over_head_reach_unable_to_complete_due_to_pain_and/or_weakness_right': dto.functional?.oneLeg_SquatWithOverHeadReachUnableToCompleteDueToPainAndorWeaknessRight || '',
      'one_leg_Squat_with_over_head_reach_unable_to_complete_due_to_pain_and/or_weakness_left': dto.functional?.oneLeg_SquatWithOverHeadReachUnableToCompleteDueToPainAndorWeaknessRight || '',

      // Alar Ligament Test
      alar_ligament_test: this.boolToYesNo(dto.alarLigamentTest?.alarLigamentTest),
      alar_ligament_test_alar_ligament_test_right: 'not_tested',
      alar_ligament_test_alar_ligament_test_left: 'not_tested',

      // Alar Ligament Stress
      alar_ligament_stress: this.boolToYesNo(dto.alarLigamentStress?.alarLigamentStress),
      alar_ligament_stress_comments_text: dto.alarLigamentStress?.alarLigamentStressCommentsText || '',

      // Work Conditioning
      work_conditioning: this.boolToYesNo(dto.workConditioning?.workConditioning),
      material_handling_bilateral_lifting: this.boolToYesNo(dto.workConditioning?.materialHandlingBilateralLifting),
      non_material_handling: this.boolToYesNo(dto.workConditioning?.nonMaterialHandling),
      material_handling_bilateral_lifting_apply_to_all: dto.workConditioning?.materialHandlingBilateralLiftingApplyToAll || '',
      material_handling_bilateral_lifting_floor_to_knuckle_occasional_lbs: dto.workConditioning?.materialHandlingBilateralLiftingFloorToKnuckleOccasionalLbs || '',
      material_handling_bilateral_lifting_floor_to_knuckle_frequent_lbs: dto.workConditioning?.materialHandlingBilateralLiftingFloorToKnuckleFrequentLbs || '',
      material_handling_bilateral_lifting_floor_to_knuckle_adequate_for_job: dto.workConditioning?.materialHandlingBilateralLiftingFloorToKnuckleAdequateForJob || '',
      material_handling_bilateral_lifting_knuckle_to_shoulder_occasional_lbs: dto.workConditioning?.materialHandlingBilateralLiftingKnuckleToShoulderOccasionalLbs || '',
      material_handling_bilateral_lifting_knuckle_to_shoulder_frequent_lbs: dto.workConditioning?.materialHandlingBilateralLiftingKnuckleToShoulderFrequentLbs || '',
      material_handling_bilateral_lifting_knuckle_to_shoulder_adequate_for_job: dto.workConditioning?.materialHandlingBilateralLiftingKnuckleToShoulderAdequateForJob || '',
      material_handling_bilateral_lifting_shoulder_to_overhead_occasional_lbs: dto.workConditioning?.materialHandlingBilateralLiftingShoulderToOverheadOccasionalLbs || '',
      material_handling_bilateral_lifting_shoulder_to_overhead_frequent_lbs: dto.workConditioning?.materialHandlingBilateralLiftingShoulderToOverheadFrequentLbs || '',
      material_handling_bilateral_lifting_shoulder_to_overhead_adequate_for_job: dto.workConditioning?.materialHandlingBilateralLiftingShoulderToOverheadAdequateForJob || '',
      material_handling_bilateral_lifting_100_ft_carry_and_pivot_occasional_lbs: dto.workConditioning?.materialHandlingBilateralLifting_100FtCarryAndPivotOccasionalLbs || '',
      material_handling_bilateral_lifting_100_ft_carry_and_pivot_frequent_lbs: dto.workConditioning?.materialHandlingBilateralLifting_100FtCarryAndPivotFrequentLbs || '',
      material_handling_bilateral_lifting_100_ft_carry_and_pivot_adequate_for_job: dto.workConditioning?.materialHandlingBilateralLifting_100FtCarryAndPivotAdequateForJob || '',
      material_handling_bilateral_lifting_comments: dto.workConditioning?.materialHandlingBilateralLiftingComments || '',
      non_naterial_handling_apply_to_all: dto.workConditioning?.nonNaterialHandlingApplyToAll || '',
      non_naterial_handling_sitting_occasional: this.boolToYesNo(dto.workConditioning?.nonNaterialHandlingSittingOccasional),
      non_naterial_handling_sitting_frequent: this.boolToYesNo(dto.workConditioning?.nonNaterialHandlingSittingFrequent),
      non_naterial_handling_sitting_constant: this.boolToYesNo(dto.workConditioning?.nonNaterialHandlingSittingConstant),
      non_naterial_handling_sitting_adequate_for_job: dto.workConditioning?.nonNaterialHandlingSittingAdequateForJob || '',
      non_naterial_handling_standing_occasional: this.boolToYesNo(dto.workConditioning?.nonNaterialHandlingStandingOccasional),
      non_naterial_handling_standing_frequent: this.boolToYesNo(dto.workConditioning?.nonNaterialHandlingStandingFrequent),
      non_naterial_handling_standing_constant: this.boolToYesNo(dto.workConditioning?.nonNaterialHandlingStandingConstant),
      non_naterial_handling_standing_adequate_for_job: dto.workConditioning?.nonNaterialHandlingStandingAdequateForJob || '',
      non_naterial_handling_walking_occasional: this.boolToYesNo(dto.workConditioning?.nonNaterialHandlingWalkingOccasional),
      non_naterial_handling_walking_frequent: this.boolToYesNo(dto.workConditioning?.nonNaterialHandlingWalkingFrequent),
      non_naterial_handling_walking_constant: this.boolToYesNo(dto.workConditioning?.nonNaterialHandlingWalkingConstant),
      non_naterial_handling_walking_adequate_for_job: dto.workConditioning?.nonNaterialHandlingWalkingAdequateForJob || '',
      non_naterial_handling_stair_climbing_occasional: this.boolToYesNo(dto.workConditioning?.nonNaterialHandlingStairClimbingOccasional),
      non_naterial_handling_stair_climbing_frequent: this.boolToYesNo(dto.workConditioning?.nonNaterialHandlingStairClimbingFrequent),
      non_naterial_handling_stair_climbing_constant: this.boolToYesNo(dto.workConditioning?.nonNaterialHandlingStairClimbingConstant),
      non_naterial_handling_stair_climbing_adequate_for_job: dto.workConditioning?.nonNaterialHandlingStairClimbingAdequateForJob || '',
      non_naterial_handling_trunk_bending_occasional: this.boolToYesNo(dto.workConditioning?.nonNaterialHandlingTrunkBendingOccasional),
      non_naterial_handling_trunk_bending_frequent: this.boolToYesNo(dto.workConditioning?.nonNaterialHandlingTrunkBendingFrequent),
      non_naterial_handling_trunk_bending_constant: this.boolToYesNo(dto.workConditioning?.nonNaterialHandlingTrunkBendingConstant),
      non_naterial_handling_trunk_bending_adequate_for_job: dto.workConditioning?.nonNaterialHandlingTrunkBendingAdequateForJob || '',
      non_naterial_handling_overhead_reach_occasional: this.boolToYesNo(dto.workConditioning?.nonNaterialHandlingOverheadReachOccasional),
      non_naterial_handling_overhead_reach_frequent: this.boolToYesNo(dto.workConditioning?.nonNaterialHandlingOverheadReachFrequent),
      non_naterial_handling_overhead_reach_constant: this.boolToYesNo(dto.workConditioning?.nonNaterialHandlingOverheadReachConstant),
      non_naterial_handling_overhead_reach_adequate_for_job: dto.workConditioning?.nonNaterialHandlingOverheadReachAdequateForJob || '',
      non_naterial_handling_crawl_occasional: this.boolToYesNo(dto.workConditioning?.nonNaterialHandlingCrawlOccasional),
      non_naterial_handling_crawl_frequent: this.boolToYesNo(dto.workConditioning?.nonNaterialHandlingCrawlFrequent),
      non_naterial_handling_crawl_constant: this.boolToYesNo(dto.workConditioning?.nonNaterialHandlingCrawlConstant),
      non_naterial_handling_crawl_adequate_for_job: dto.workConditioning?.nonNaterialHandlingCrawlAdequateForJob || '',
      non_naterial_handling_squatting_occasional: this.boolToYesNo(dto.workConditioning?.nonNaterialHandlingSquattingOccasional),
      non_naterial_handling_squatting_frequent: this.boolToYesNo(dto.workConditioning?.nonNaterialHandlingSquattingFrequent),
      non_naterial_handling_squatting_constant: this.boolToYesNo(dto.workConditioning?.nonNaterialHandlingSquattingConstant),
      non_naterial_handling_squatting_adequate_for_job: dto.workConditioning?.nonNaterialHandlingSquattingAdequateForJob || '',
      non_naterial_handling_kneeling_occasional: this.boolToYesNo(dto.workConditioning?.nonNaterialHandlingKneelingOccasional),
      non_naterial_handling_kneeling_frequent: this.boolToYesNo(dto.workConditioning?.nonNaterialHandlingKneelingFrequent),
      non_naterial_handling_kneeling_constant: this.boolToYesNo(dto.workConditioning?.nonNaterialHandlingKneelingConstant),
      non_naterial_handling_kneeling_adequate_for_job: dto.workConditioning?.nonNaterialHandlingKneelingAdequateForJob || '',
      non_naterial_handling_stooping_occasional: this.boolToYesNo(dto.workConditioning?.nonNaterialHandlingStoopingOccasional),
      non_naterial_handling_stooping_frequent: this.boolToYesNo(dto.workConditioning?.nonNaterialHandlingStoopingFrequent),
      non_naterial_handling_stooping_constant: this.boolToYesNo(dto.workConditioning?.nonNaterialHandlingStoopingConstant),
      non_naterial_handling_stooping_adequate_for_job: dto.workConditioning?.nonNaterialHandlingStoopingAdequateForJob || '',
      non_naterial_handling_crouching_occasional: this.boolToYesNo(dto.workConditioning?.nonNaterialHandlingCrouchingOccasional),
      non_naterial_handling_crouching_frequent: this.boolToYesNo(dto.workConditioning?.nonNaterialHandlingCrouchingFrequent),
      non_naterial_handling_crouching_constant: this.boolToYesNo(dto.workConditioning?.nonNaterialHandlingCrouchingConstant),
      non_naterial_handling_crouching_adequate_for_job: dto.workConditioning?.nonNaterialHandlingCrouchingAdequateForJob || '',
      non_naterial_handling_ladder_climbing_occasional: this.boolToYesNo(dto.workConditioning?.nonNaterialHandlingLadderClimbingOccasional),
      non_naterial_handling_ladder_climbing_frequent: this.boolToYesNo(dto.workConditioning?.nonNaterialHandlingLadderClimbingFrequent),
      non_naterial_handling_ladder_climbing_constant: this.boolToYesNo(dto.workConditioning?.nonNaterialHandlingLadderClimbingConstant),
      non_naterial_handling_ladder_climbing_adequate_for_job: dto.workConditioning?.nonNaterialHandlingLadderClimbingAdequateForJob || '',
      non_naterial_handling_forward_reach_occasional: this.boolToYesNo(dto.workConditioning?.nonNaterialHandlingForwardReachOccasional),
      non_naterial_handling_forward_reach_frequent: this.boolToYesNo(dto.workConditioning?.nonNaterialHandlingForwardReachFrequent),
      non_naterial_handling_forward_reach_constant: this.boolToYesNo(dto.workConditioning?.nonNaterialHandlingForwardReachConstant),
      non_naterial_handling_forward_reach_adequate_for_job: dto.workConditioning?.nonNaterialHandlingForwardReachAdequateForJob || '',
      demonstrated_comments: '',

      // TMR FAB 4 Worksheet
      tmr_fab_4_worksheet: this.boolToYesNo(dto.tMRFAB4Worksheet?.tmrFab_4Worksheet),
      tmr_fab_4_worksheet_comments_text: dto.tMRFAB4Worksheet?.tmrFab_4WorksheetCommentsText || '',

      // Additional Comments
      additional_comments: this.boolToYesNo(dto.additionalComments?.additionalComments),
      additional_comments_text: dto.additionalComments?.additionalCommentsText || ''
    };
  }

  private mapFlexibility(formValue: any): Flexibility {
    return {
      flexibility: this.yesNoToBool(formValue.flexibility),
      thomasTest: this.yesNoToBool(formValue.thomas_test),
      ober: this.yesNoToBool(formValue.ober),
      _90_90HamstringFlexibility: this.yesNoToBool(formValue._90_90_hamstring_flexibility),
      gastrocnemiusLength: this.yesNoToBool(formValue.gastrocnemius_length),
      soleusMuscleLength: this.yesNoToBool(formValue.soleus_muscle_length),
      thomasTestNegativeRight: formValue.thomas_test_negative_right || '',
      thomasTestNegativeLeft: formValue.thomas_test_negative_left || '',
      thomasTestPositiveForRectusFemorisRight: formValue.thomas_test_positive_for_rectus_femoris_right || '',
      thomasTestPositiveForRectusFemorisLeft: formValue.thomas_test_positive_for_rectus_femoris_left || '',
      thomasTestPositiveForIliopsoasRight: formValue.thomas_test_positive_for_iliopsoas_right || '',
      thomasTestPositiveForIliopsoasLeft: formValue.thomas_test_positive_for_iliopsoas_left || '',
      thomasTestPositiveForRectusFemorisAndIliopsoasRight: formValue.thomas_test_positive_for_rectus_femoris_and_iliopsoas_right || '',
      thomasTestPositiveForRectusFemorisAndIliopsoasLeft: formValue.thomas_test_positive_for_rectus_femoris_and_iliopsoas_left || '',
      thomasTestPositiveForTflitbRight: formValue['thomas_test_positive_for_tfl/itb_right'] || '',
      thomasTestPositiveForTflitbLeft: formValue['thomas_test_positive_for_tfl/itb_left'] || '',
      oberRight: formValue.ober_right || '',
      oberLeft: formValue.ober_left || '',
      ninetynineHamstringFlexibilityRight: formValue.ninetynine_hamstring_flexibility_right || '',
      ninetynineHamstringFlexibilityLeft: formValue.ninetynine_hamstring_flexibility_left || '',
      ninetynineHamstringFlexibilityRightCustom: formValue.ninetynine_hamstring_flexibility_right_custom || '',
      ninetynineHamstringFlexibilityLeftCustom: formValue.ninetynine_hamstring_flexibility_left_custom || '',
      gastrocnemiusLengthTestApplyToAll: formValue.gastrocnemius_length_test_apply_to_all || '',
      gastrocnemiusLengthTestGastrocnemiusLengthRight: formValue.gastrocnemius_length_test_gastrocnemius_length_right || '',
      gastrocnemiusLengthTestGastrocnemiusLengthLeft: formValue.gastrocnemius_length_test_gastrocnemius_length_left || '',
      soleusMuscleLengthTestApplyToAll: formValue.soleus_muscle_length_test_apply_to_all || '',
      soleusMuscleLengthTestSoleusMuscleLengthRight: formValue.soleus_muscle_length_test_soleus_muscle_length_right || '',
      soleusMuscleLengthTestSoleusMuscleLengthLeft: formValue.soleus_muscle_length_test_soleus_muscle_length_left || ''
    };
  }

  private mapStructural(formValue: any): Structural {
    return {
      structural: this.yesNoToBool(formValue.structural),
      craigsTest: this.yesNoToBool(formValue.craigs_test),
      tibialTorsion: this.yesNoToBool(formValue.tibial_torsion)
    };
  }

  private mapLigamentIntegrityKnee(formValue: any): LigamentIntegrityKnee {
    return {
      ligamentIntegrityKnee: this.yesNoToBool(formValue.ligament_integrity_knee),
      valgusStressAt_0KneeFlex: this.yesNoToBool(formValue.valgus_stress_at_0_knee_flex),
      valgusStressAt_30KneeFlex: this.yesNoToBool(formValue.valgus_stress_at_30_knee_flex),
      varusStressAt_0KneeFlex: this.yesNoToBool(formValue.varus_stress_at_0_knee_flex),
      varusStressAt_30KneeFlex: this.yesNoToBool(formValue.varus_stress_at_30_knee_flex),
      anteriorDrawer: this.yesNoToBool(formValue.anterior_drawer),
      posteriorDrawer: this.yesNoToBool(formValue.posterior_drawer),
      lachmans: this.yesNoToBool(formValue.lachmans),
      pivotShift: this.yesNoToBool(formValue.pivot_shift),
      sagSign: this.yesNoToBool(formValue.sag_sign),
      craigsTestRight: formValue.craigs_test_right || '',
      craigsTestLeft: formValue.craigs_test_left || '',
      tibialTorsionRight: formValue.tibial_torsion_right || '',
      tibialTorsionLeft: formValue.tibial_torsion_left || '',
      valgusStressAt_0KneeFlexValgusStressAt_0KneeFlexRight: formValue.valgus_stress_at_0_knee_flex_valgus_stress_at_0_knee_flex_right || '',
      valgusStressAt_0KneeFlexValgusStressAt_0KneeFlexLeft: formValue.valgus_stress_at_0_knee_flex_valgus_stress_at_0_knee_flex_left || '',
      valgusStressAt_30KneeFlexValgusStressAt_30KneeFlexRight: formValue.valgus_stress_at_30_knee_flex_valgus_stress_at_30_knee_flex_right || '',
      valgusStressAt_30KneeFlexValgusStressAt_30KneeFlexLeft: formValue.valgus_stress_at_30_knee_flex_valgus_stress_at_30_knee_flex_left || '',
      varusStressAt_0KneeFlexVarusStressAt_0KneeFlexRight: formValue.varus_stress_at_0_knee_flex_varus_stress_at_0_knee_flex_right || '',
      varusStressAt_0KneeFlexVarusStressAt_0KneeFlexLeft: formValue.varus_stress_at_0_knee_flex_varus_stress_at_0_knee_flex_left || '',
      varusStressAt_30KneeFlexVarusStressAt_30KneeFlexRight: formValue.varus_stress_at_30_knee_flex_varus_stress_at_30_knee_flex_right || '',
      varusStressAt_30KneeFlexVarusStressAt_30KneeFlexLeft: formValue.varus_stress_at_30_knee_flex_varus_stress_at_30_knee_flex_left || '',
      anteriorDrawerAnteriorDrawerRight: formValue.anterior_drawer_anterior_drawer_right || '',
      anteriorDrawerAnteriorDrawerLeft: formValue.anterior_drawer_anterior_drawer_left || '',
      posteriorDrawerPosteriorDrawerRight: formValue.posterior_drawer_posterior_drawer_right || '',
      posteriorDrawerPosteriorDrawerLeft: formValue.posterior_drawer_posterior_drawer_left || '',
      lachmansLachmansRight: formValue["lachmans_lachman's_right"] || '',
      lachmansLachmansLeft: formValue["lachmans_lachman's_left"] || '',
      pivotShiftPivotShiftRight: formValue.pivot_shift_pivot_shift_right || '',
      pivotShiftPivotShiftLeft: formValue.pivot_shift_pivot_shift_left || '',
      sagSignSagSignRight: formValue.sag_sign_sag_sign_right || '',
      sagSignSagSignLeft: formValue.sag_sign_sag_sign_left || ''
    };
  }

  private mapStorkStandSIMobilityTest(formValue: any): StorkStandSIMobilityTest {
    return {
      storkStandSiMobilityTest: this.yesNoToBool(formValue.stork_stand_si_mobility_test),
      storkStandSiMobilityTestStorkStandSiMobilityTestRight: formValue.stork_stand_si_mobility_test_stork_stand_si_mobility_test_right || '',
      storkStandSiMobilityTestStorkStandSiMobilityTestLeft: formValue.stork_stand_si_mobility_test_stork_stand_si_mobility_test_left || ''
    };
  }

  private mapPatellofemoral(formValue: any): Patellofemoral {
    return {
      patellofemoral: this.yesNoToBool(formValue.patellofemoral),
      jSign: this.yesNoToBool(formValue.j_sign),
      patellarBallottement: this.yesNoToBool(formValue.patellar_ballottement),
      patellarCompression: this.yesNoToBool(formValue.patellar_compression),
      patellarPassiveMobility: this.yesNoToBool(formValue.patellar_passive_mobility),
      jSignJSignRight: formValue.j_sign_j_sign_right || '',
      jSignJSignLeft: formValue.j_sign_j_sign_left || '',
      patellarBallottementPatellarBallottementRight: formValue.patellar_ballottement_patellar_ballottement_right || '',
      patellarBallottementPatellarBallottementLeft: formValue.patellar_ballottement_patellar_ballottement_left || '',
      patellarCompressionPatellarCompressionRight: this.buildCheckboxString(formValue, 'patellar_compression_right'),
      patellarCompressionPatellarCompressionLeft: this.buildCheckboxString(formValue, 'patellar_compression_left'),
      patellarPassiveMobilityPatellarPassiveMobilityRight: formValue.patellar_passive_mobility_patellar_passive_mobility_right || '',
      patellarPassiveMobilityPatellarPassiveMobilityLeft: formValue.patellar_passive_mobility_patellar_passive_mobility_left || ''
    };
  }

  private mapFunctional(formValue: any): Functional {
    return {
      functional: this.yesNoToBool(formValue.functional),
      coreStabilization: this.yesNoToBool(formValue.core_stabilization),
      holdDurationCommentsText: formValue.hold_duration_comments_text || '',
      selectiveFunctionalMovementAssessment: this.yesNoToBool(formValue.selective_functional_movement_assessment),
      _30SecondChairStand: this.yesNoToBool(formValue._30_second_chair_stand),
      numberOfStands_30SecondChairStand: formValue.number_of_stands_30_second_chair_stand || '',
      comment_30SecondChairStand: formValue.comment_30_second_chair_stand || '',
      sideBridgePlank: this.yesNoToBool(formValue.side_bridge_plank),
      pronePlank: this.yesNoToBool(formValue.prone_plank),
      singleLegBridgeHold: this.yesNoToBool(formValue.single_leg_bridge_hold),
      singleLegHopTestForDistance: this.yesNoToBool(formValue.single_leg_hop_test_for_distance),
      _2LegSquatWithOverheadReach: this.yesNoToBool(formValue._2_leg_squat_with_overhead_reach),
      _1LegSquatWithOverheadReach: this.yesNoToBool(formValue._1_leg_squat_with_overhead_reach),
      runningMechanics: this.yesNoToBool(formValue.running_mechanics),
      runningMechanicsCommentsText: formValue.running_mechanics_comments_text || '',
      backExtension: this.yesNoToBool(formValue.back_extension),
      backExtensionCommentsText: formValue.back_extension_comments_text || '',
      selectiveFunctionalMovementAssessmentMultisegmentalExtensionRight: formValue['selective_functional_movement_assessment_multi-segmental_extension_right'] || '',
      selectiveFunctionalMovementAssessmentMultisegmentalExtensionLeft: formValue['selective_functional_movement_assessment_multi-segmental_extension_left'] || '',
      selectiveFunctionalMovementAssessmentMultisegmentalFlexionRight: formValue['selective_functional_movement_assessment_multi-segmental_flexion_right'] || '',
      selectiveFunctionalMovementAssessmentMultisegmentalFlexionLeft: formValue['selective_functional_movement_assessment_multi-segmental_flexion_left'] || '',
      selectiveFunctionalMovementAssessmentMultisegmentalRotationRight: formValue['selective_functional_movement_assessment_multi-segmental_rotation_right'] || '',
      selectiveFunctionalMovementAssessmentMultisegmentalRotationLeft: formValue['selective_functional_movement_assessment_multi-segmental_rotation_left'] || '',
      selectiveFunctionalMovementAssessmentOverheadDeepSquatRight: formValue.selective_functional_movement_assessment_overhead_deep_squat_right || '',
      selectiveFunctionalMovementAssessmentOverheadDeepSquatLeft: formValue.selective_functional_movement_assessment_overhead_deep_squat_left || '',
      selectiveFunctionalMovementAssessmentSingleLegBalanceRight: formValue.selective_functional_movement_assessment_single_leg_balance_right || '',
      selectiveFunctionalMovementAssessmentSingleLegBalanceLeft: formValue.selective_functional_movement_assessment_single_leg_balance_left || '',
      sideBridgePlankApplyToAll: formValue.side_bridge_plank_apply_to_all || '',
      sideBridgePlankHoldDurationRight: formValue.side_bridge_plank_hold_duration_right || '',
      sideBridgePlankHoldDurationLeft: formValue.side_bridge_plank_hold_duration_left || '',
      pronePlankApplyToAll: formValue.prone_plank_apply_to_all || '',
      pronePlankHoldDurationRight: formValue.prone_plank_hold_duration_right || '',
      pronePlankHoldDurationLeft: formValue.prone_plank_hold_duration_left || '',
      singleLegBridgeHoldSingleLegBridgeHoldRight: formValue.single_leg_bridge_hold_single_leg_bridge_hold_right || '',
      singleLegBridgeHoldSingleLegBridgeHoldLeft: formValue.single_leg_bridge_hold_single_leg_bridge_hold_left || '',
      singleLegHopTestForDistanceApplyToAll: formValue.single_leg_hop_test_for_distance_apply_to_all || '',
      singleLegHopTestForDistanceHoldDurationRight: formValue.single_leg_hop_test_for_distance_hold_duration_right || '',
      singleLegHopTestForDistanceHoldDurationLeft: formValue.single_leg_hop_test_for_distance_hold_duration_left || '',
      twoLegSquatWithOverHeadReachNormalRight: formValue.two_leg_squat_with_over_head_reach_normal_right || '',
      twoLegSquatWithOverHeadReachNormalLeft: formValue.two_leg_squat_with_over_head_reach_normal_left || '',
      twoLegSquatWithOverHeadReachExcessiveHipIrRight: formValue.two_leg_squat_with_over_head_reach_excessive_hip_ir_right || '',
      twoLegSquatWithOverHeadReachExcessiveHipIrLeft: formValue.two_leg_squat_with_over_head_reach_excessive_hip_ir_left || '',
      twoLegSquatWithOverHeadReachExcessiveHipErRight: formValue.two_leg_squat_with_over_head_reach_excessive_hip_er_right || '',
      twoLegSquatWithOverHeadReachExcessiveHipErLeft: formValue.two_leg_squat_with_over_head_reach_excessive_hip_er_left || '',
      twoLegSquatWithOverHeadReachExcessiveKneeAdductionRight: formValue.two_leg_squat_with_over_head_reach_excessive_knee_adduction_right || '',
      twoLegSquatWithOverHeadReachExcessiveKneeAdductionLeft: formValue.two_leg_squat_with_over_head_reach_excessive_knee_adduction_left || '',
      twoLegSquatWithOverHeadReachExcessiveKneeAbductionRight: formValue.two_leg_squat_with_over_head_reach_excessive_knee_abduction_right || '',
      twoLegSquatWithOverHeadReachExcessiveKneeAbductionLeft: formValue.two_leg_squat_with_over_head_reach_excessive_knee_abduction_left || '',
      twoLegSquatWithOverHeadReachExcessiveFootPronationRight: formValue.two_leg_squat_with_over_head_reach_excessive_foot_pronation_right || '',
      twoLegSquatWithOverHeadReachExcessiveFootPronationLeft: formValue.two_leg_squat_with_over_head_reach_excessive_foot_pronation_left || '',
      twoLegSquatWithOverHeadReachDecreasedAnkleDorsiflexionRight: formValue.two_leg_squat_with_over_head_reach_decreased_ankle_dorsiflexion_right || '',
      twoLegSquatWithOverHeadReachDecreasedAnkleDorsiflexionLeft: formValue.two_leg_squat_with_over_head_reach_decreased_ankle_dorsiflexion_left || '',
      twoLegSquatWithOverHeadReachDecreasedWeightBearingRight: formValue.two_leg_squat_with_over_head_reach_decreased_weight_bearing_right || '',
      twoLegSquatWithOverHeadReachDecreasedWeightBearingLeft: formValue.two_leg_squat_with_over_head_reach_decreased_weight_bearing_left || '',
      twoLegSquatWithOverHeadReachUnableToCompleteDueToPainAndorWeaknessRight: formValue['two_leg_squat_with_over_head_reach_unable_to_complete_due_to_pain_and/or_weakness_right'] || '',
      twoLegSquatWithOverHeadReachUnableToCompleteDueToPainAndorWeaknessLeft: formValue['two_leg_squat_with_over_head_reach_unable_to_complete_due_to_pain_and/or_weakness_left'] || '',
      oneLeg_SquatWithOverHeadReachNormalRight: formValue.one_leg_Squat_with_over_head_reach_normal_right || '',
      oneLeg_SquatWithOverHeadReachNormalLeft: formValue.one_leg_Squat_with_over_head_reach_normal_left || '',
      oneLeg_SquatWithOverHeadReachExcessiveHipIrRight: formValue.one_leg_Squat_with_over_head_reach_excessive_hip_ir_right || '',
      oneLeg_SquatWithOverHeadReachExcessiveHipIrLeft: formValue.one_leg_Squat_with_over_head_reach_excessive_hip_ir_left || '',
      oneLeg_SquatWithOverHeadReachExcessiveHipErRight: formValue.one_leg_Squat_with_over_head_reach_excessive_hip_er_right || '',
      oneLeg_SquatWithOverHeadReachExcessiveHipErLeft: formValue.one_leg_Squat_with_over_head_reach_excessive_hip_er_left || '',
      oneLeg_SquatWithOverHeadReachExcessiveKneeAdductionRight: formValue.one_leg_Squat_with_over_head_reach_excessive_knee_adduction_right || '',
      oneLeg_SquatWithOverHeadReachExcessiveKneeAdductionLeft: formValue.one_leg_Squat_with_over_head_reach_excessive_knee_adduction_left || '',
      oneLeg_SquatWithOverHeadReachExcessiveKneeAbductionRight: formValue.one_leg_Squat_with_over_head_reach_excessive_knee_abduction_right || '',
      oneLeg_SquatWithOverHeadReachExcessiveKneeAbductionLeft: formValue.one_leg_Squat_with_over_head_reach_excessive_knee_abduction_left || '',
      oneLeg_SquatWithOverHeadReachExcessiveFootPronationRight: formValue.one_leg_Squat_with_over_head_reach_excessive_foot_pronation_right || '',
      oneLeg_SquatWithOverHeadReachExcessiveFootPronationLeft: formValue.one_leg_Squat_with_over_head_reach_excessive_foot_pronation_left || '',
      oneLeg_SquatWithOverHeadReachDecreasedAnkleDorsiflexionRight: formValue.one_leg_Squat_with_over_head_reach_decreased_ankle_dorsiflexion_right || '',
      oneLeg_SquatWithOverHeadReachDecreasedAnkleDorsiflexionLeft: formValue.one_leg_Squat_with_over_head_reach_decreased_ankle_dorsiflexion_left || '',
      oneLeg_SquatWithOverHeadReachDecreasedWeightBearingRight: formValue.one_leg_Squat_with_over_head_reach_decreased_weight_bearing_right || '',
      oneLeg_SquatWithOverHeadReachDecreasedWeightBearingLeft: formValue.one_leg_Squat_with_over_head_reach_decreased_weight_bearing_left || '',
      oneLeg_SquatWithOverHeadReachUnableToCompleteDueToPainAndorWeaknessRight: formValue['one_leg_Squat_with_over_head_reach_unable_to_complete_due_to_pain_and/or_weakness_right'] || ''
    };
  }

  private mapAlarLigamentTest(formValue: any): AlarLigamentTest {
    return {
      alarLigamentTest: this.yesNoToBool(formValue.alar_ligament_test)
    };
  }

  private mapAlarLigamentStress(formValue: any): AlarLigamentStress {
    return {
      alarLigamentStress: this.yesNoToBool(formValue.alar_ligament_stress),
      alarLigamentStressCommentsText: formValue.alar_ligament_stress_comments_text || ''
    };
  }

  private mapWorkConditioning(formValue: any): WorkConditioning {
    return {
      workConditioning: this.yesNoToBool(formValue.work_conditioning),
      materialHandlingBilateralLifting: this.yesNoToBool(formValue.material_handling_bilateral_lifting),
      nonMaterialHandling: this.yesNoToBool(formValue.non_material_handling),
      materialHandlingBilateralLiftingApplyToAll: formValue.material_handling_bilateral_lifting_apply_to_all || '',
      materialHandlingBilateralLiftingFloorToKnuckleOccasionalLbs: formValue.material_handling_bilateral_lifting_floor_to_knuckle_occasional_lbs || '',
      materialHandlingBilateralLiftingFloorToKnuckleFrequentLbs: formValue.material_handling_bilateral_lifting_floor_to_knuckle_frequent_lbs || '',
      materialHandlingBilateralLiftingFloorToKnuckleAdequateForJob: formValue.material_handling_bilateral_lifting_floor_to_knuckle_adequate_for_job || '',
      materialHandlingBilateralLiftingKnuckleToShoulderOccasionalLbs: formValue.material_handling_bilateral_lifting_knuckle_to_shoulder_occasional_lbs || '',
      materialHandlingBilateralLiftingKnuckleToShoulderFrequentLbs: formValue.material_handling_bilateral_lifting_knuckle_to_shoulder_frequent_lbs || '',
      materialHandlingBilateralLiftingKnuckleToShoulderAdequateForJob: formValue.material_handling_bilateral_lifting_knuckle_to_shoulder_adequate_for_job || '',
      materialHandlingBilateralLiftingShoulderToOverheadOccasionalLbs: formValue.material_handling_bilateral_lifting_shoulder_to_overhead_occasional_lbs || '',
      materialHandlingBilateralLiftingShoulderToOverheadFrequentLbs: formValue.material_handling_bilateral_lifting_shoulder_to_overhead_frequent_lbs || '',
      materialHandlingBilateralLiftingShoulderToOverheadAdequateForJob: formValue.material_handling_bilateral_lifting_shoulder_to_overhead_adequate_for_job || '',
      materialHandlingBilateralLifting_100FtCarryAndPivotOccasionalLbs: formValue.material_handling_bilateral_lifting_100_ft_carry_and_pivot_occasional_lbs || '',
      materialHandlingBilateralLifting_100FtCarryAndPivotFrequentLbs: formValue.material_handling_bilateral_lifting_100_ft_carry_and_pivot_frequent_lbs || '',
      materialHandlingBilateralLifting_100FtCarryAndPivotAdequateForJob: formValue.material_handling_bilateral_lifting_100_ft_carry_and_pivot_adequate_for_job || '',
      materialHandlingBilateralLiftingComments: formValue.material_handling_bilateral_lifting_comments || '',
      nonNaterialHandlingApplyToAll: formValue.non_naterial_handling_apply_to_all || '',
      nonNaterialHandlingSittingOccasional: this.yesNoToBool(formValue.non_naterial_handling_sitting_occasional),
      nonNaterialHandlingSittingFrequent: this.yesNoToBool(formValue.non_naterial_handling_sitting_frequent),
      nonNaterialHandlingSittingConstant: this.yesNoToBool(formValue.non_naterial_handling_sitting_constant),
      nonNaterialHandlingSittingAdequateForJob: formValue.non_naterial_handling_sitting_adequate_for_job || '',
      nonNaterialHandlingStandingOccasional: this.yesNoToBool(formValue.non_naterial_handling_standing_occasional),
      nonNaterialHandlingStandingFrequent: this.yesNoToBool(formValue.non_naterial_handling_standing_frequent),
      nonNaterialHandlingStandingConstant: this.yesNoToBool(formValue.non_naterial_handling_standing_constant),
      nonNaterialHandlingStandingAdequateForJob: formValue.non_naterial_handling_standing_adequate_for_job || '',
      nonNaterialHandlingWalkingOccasional: this.yesNoToBool(formValue.non_naterial_handling_walking_occasional),
      nonNaterialHandlingWalkingFrequent: this.yesNoToBool(formValue.non_naterial_handling_walking_frequent),
      nonNaterialHandlingWalkingConstant: this.yesNoToBool(formValue.non_naterial_handling_walking_constant),
      nonNaterialHandlingWalkingAdequateForJob: formValue.non_naterial_handling_walking_adequate_for_job || '',
      nonNaterialHandlingStairClimbingOccasional: this.yesNoToBool(formValue.non_naterial_handling_stair_climbing_occasional),
      nonNaterialHandlingStairClimbingFrequent: this.yesNoToBool(formValue.non_naterial_handling_stair_climbing_frequent),
      nonNaterialHandlingStairClimbingConstant: this.yesNoToBool(formValue.non_naterial_handling_stair_climbing_constant),
      nonNaterialHandlingStairClimbingAdequateForJob: formValue.non_naterial_handling_stair_climbing_adequate_for_job || '',
      nonNaterialHandlingTrunkBendingOccasional: this.yesNoToBool(formValue.non_naterial_handling_trunk_bending_occasional),
      nonNaterialHandlingTrunkBendingFrequent: this.yesNoToBool(formValue.non_naterial_handling_trunk_bending_frequent),
      nonNaterialHandlingTrunkBendingConstant: this.yesNoToBool(formValue.non_naterial_handling_trunk_bending_constant),
      nonNaterialHandlingTrunkBendingAdequateForJob: formValue.non_naterial_handling_trunk_bending_adequate_for_job || '',
      nonNaterialHandlingOverheadReachOccasional: this.yesNoToBool(formValue.non_naterial_handling_overhead_reach_occasional),
      nonNaterialHandlingOverheadReachFrequent: this.yesNoToBool(formValue.non_naterial_handling_overhead_reach_frequent),
      nonNaterialHandlingOverheadReachConstant: this.yesNoToBool(formValue.non_naterial_handling_overhead_reach_constant),
      nonNaterialHandlingOverheadReachAdequateForJob: formValue.non_naterial_handling_overhead_reach_adequate_for_job || '',
      nonNaterialHandlingCrawlOccasional: this.yesNoToBool(formValue.non_naterial_handling_crawl_occasional),
      nonNaterialHandlingCrawlFrequent: this.yesNoToBool(formValue.non_naterial_handling_crawl_frequent),
      nonNaterialHandlingCrawlConstant: this.yesNoToBool(formValue.non_naterial_handling_crawl_constant),
      nonNaterialHandlingCrawlAdequateForJob: formValue.non_naterial_handling_crawl_adequate_for_job || '',
      nonNaterialHandlingSquattingOccasional: this.yesNoToBool(formValue.non_naterial_handling_squatting_occasional),
      nonNaterialHandlingSquattingFrequent: this.yesNoToBool(formValue.non_naterial_handling_squatting_frequent),
      nonNaterialHandlingSquattingConstant: this.yesNoToBool(formValue.non_naterial_handling_squatting_constant),
      nonNaterialHandlingSquattingAdequateForJob: formValue.non_naterial_handling_squatting_adequate_for_job || '',
      nonNaterialHandlingKneelingOccasional: this.yesNoToBool(formValue.non_naterial_handling_kneeling_occasional),
      nonNaterialHandlingKneelingFrequent: this.yesNoToBool(formValue.non_naterial_handling_kneeling_frequent),
      nonNaterialHandlingKneelingConstant: this.yesNoToBool(formValue.non_naterial_handling_kneeling_constant),
      nonNaterialHandlingKneelingAdequateForJob: formValue.non_naterial_handling_kneeling_adequate_for_job || '',
      nonNaterialHandlingStoopingOccasional: this.yesNoToBool(formValue.non_naterial_handling_stooping_occasional),
      nonNaterialHandlingStoopingFrequent: this.yesNoToBool(formValue.non_naterial_handling_stooping_frequent),
      nonNaterialHandlingStoopingConstant: this.yesNoToBool(formValue.non_naterial_handling_stooping_constant),
      nonNaterialHandlingStoopingAdequateForJob: formValue.non_naterial_handling_stooping_adequate_for_job || '',
      nonNaterialHandlingCrouchingOccasional: this.yesNoToBool(formValue.non_naterial_handling_crouching_occasional),
      nonNaterialHandlingCrouchingFrequent: this.yesNoToBool(formValue.non_naterial_handling_crouching_frequent),
      nonNaterialHandlingCrouchingConstant: this.yesNoToBool(formValue.non_naterial_handling_crouching_constant),
      nonNaterialHandlingCrouchingAdequateForJob: formValue.non_naterial_handling_crouching_adequate_for_job || '',
      nonNaterialHandlingLadderClimbingOccasional: this.yesNoToBool(formValue.non_naterial_handling_ladder_climbing_occasional),
      nonNaterialHandlingLadderClimbingFrequent: this.yesNoToBool(formValue.non_naterial_handling_ladder_climbing_frequent),
      nonNaterialHandlingLadderClimbingConstant: this.yesNoToBool(formValue.non_naterial_handling_ladder_climbing_constant),
      nonNaterialHandlingLadderClimbingAdequateForJob: formValue.non_naterial_handling_ladder_climbing_adequate_for_job || '',
      nonNaterialHandlingForwardReachOccasional: this.yesNoToBool(formValue.non_naterial_handling_forward_reach_occasional),
      nonNaterialHandlingForwardReachFrequent: this.yesNoToBool(formValue.non_naterial_handling_forward_reach_frequent),
      nonNaterialHandlingForwardReachConstant: this.yesNoToBool(formValue.non_naterial_handling_forward_reach_constant),
      nonNaterialHandlingForwardReachAdequateForJob: formValue.non_naterial_handling_forward_reach_adequate_for_job || ''
    };
  }

  private mapTMRFAB4Worksheet(formValue: any): TMRFAB4Worksheet {
    return {
      tmrFab_4Worksheet: this.yesNoToBool(formValue.tmr_fab_4_worksheet),
      tmrFab_4WorksheetCommentsText: formValue.tmr_fab_4_worksheet_comments_text || ''
    };
  }

  private mapAdditionalComments(formValue: any): AdditionalComments {
    return {
      additionalComments: this.yesNoToBool(formValue.additional_comments),
      additionalCommentsText: formValue.additional_comments_text || ''
    };
  }

  private yesNoToBool(value: string): boolean {
    return value === 'yes';
  }

  private boolToYesNo(value: boolean | undefined): string {
    return value ? 'yes' : 'no';
  }

  private buildCheckboxString(formValue: any, prefix: string): string {
    const options = [
      { key: `${prefix}_normal`, label: 'Normal' },
      { key: `${prefix}_crepitus`, label: 'Crepitus' },
      { key: `${prefix}_painful`, label: 'Painful' }
    ];
    return options
      .filter(opt => formValue[opt.key])
      .map(opt => opt.label)
      .join(', ');
  }
}
