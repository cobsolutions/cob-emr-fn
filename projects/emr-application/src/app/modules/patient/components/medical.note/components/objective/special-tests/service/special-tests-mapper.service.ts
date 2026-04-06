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
import { CervicalPassiveVertebralMobility } from '../model/CervicalPassiveVertebralMobility';
import { PassiveVertebralMobilityThoracic } from '../model/PassiveVertebralMobilityThoracic';
import { CervicalQuadrant } from '../model/CervicalQuadrant';
import { CervicalCompDist } from '../model/CervicalCompDist';
import { JawCrepitus } from '../model/JawCrepitus';
import { SpurlingsManeuver } from '../model/SpurlingsManeuver';
import { SubcranialPassiveVertebralMobility } from '../model/SubcranialPassiveVertebralMobility';
import { PassiveJointMobilityShoulder } from '../model/PassiveJointMobilityShoulder';
import { ScJoint } from '../model/ScJoint';
import { AcJoint } from '../model/AcJoint';
import { Impingement } from '../model/Impingement';
import { GhjStability } from '../model/GhjStability';
import { Labrum } from '../model/Labrum';
import { RotatorCuff } from '../model/RotatorCuff';
import { SpeedsTest } from '../model/SpeedsTest';
import { LigamentIntegrityElbow } from '../model/LigamentIntegrityElbow';
import { UlnarNerveSubluxation } from '../model/UlnarNerveSubluxation';
import { KempsTest } from '../model/KempsTest';
import { SiCompression } from '../model/SiCompression';
import { SiDistraction } from '../model/SiDistraction';
import { LegLength } from '../model/LegLength';
import { ProprioceptionBalance } from '../model/ProprioceptionBalance';
import { PelvicClock } from '../model/PelvicClock';
import { IntroitusClock } from '../model/IntroitusClock';
import { LaseguesSlr } from '../model/LaseguesSlr';
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
      cervicalPassiveVertebralMobility: this.mapCervicalPassiveVertebralMobility(formValue),
      passiveVertebralMobilityThoracic: this.mapPassiveVertebralMobilityThoracic(formValue),
      cervicalQuadrant: this.mapCervicalQuadrant(formValue),
      cervicalCompDist: this.mapCervicalCompDist(formValue),
      jawCrepitus: this.mapJawCrepitus(formValue),
      spurlingsManeuver: this.mapSpurlingsManeuver(formValue),
      subcranialPassiveVertebralMobility: this.mapSubcranialPassiveVertebralMobility(formValue),
      passiveJointMobilityShoulder: this.mapPassiveJointMobilityShoulder(formValue),
      scJoint: this.mapScJoint(formValue),
      acJoint: this.mapAcJoint(formValue),
      impingement: this.mapImpingement(formValue),
      ghjStability: this.mapGhjStability(formValue),
      labrum: this.mapLabrum(formValue),
      rotatorCuff: this.mapRotatorCuff(formValue),
      speedsTest: this.mapSpeedsTest(formValue),
      ligamentIntegrityElbow: this.mapLigamentIntegrityElbow(formValue),
      ulnarNerveSubluxation: this.mapUlnarNerveSubluxation(formValue),
      kempsTest: this.mapKempsTest(formValue),
      siCompression: this.mapSiCompression(formValue),
      siDistraction: this.mapSiDistraction(formValue),
      legLength: this.mapLegLength(formValue),
      proprioceptionBalance: this.mapProprioceptionBalance(formValue),
      pelvicClock: this.mapPelvicClock(formValue),
      introitusClock: this.mapIntroitusClock(formValue),
      laseguesSlr: this.mapLaseguesSlr(formValue),
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
      patellar_passive_mobility_medial_right: dto.patellofemoral?.patellarPassiveMobilityMedialRight || 'not_tested',
      patellar_passive_mobility_medial_left: dto.patellofemoral?.patellarPassiveMobilityMedialLeft || 'not_tested',
      patellar_passive_mobility_lateral_right: dto.patellofemoral?.patellarPassiveMobilityLateralRight || 'not_tested',
      patellar_passive_mobility_lateral_left: dto.patellofemoral?.patellarPassiveMobilityLateralLeft || 'not_tested',
      patellar_passive_mobility_superior_right: dto.patellofemoral?.patellarPassiveMobilitySuperiorRight || 'not_tested',
      patellar_passive_mobility_superior_left: dto.patellofemoral?.patellarPassiveMobilitySuperiorLeft || 'not_tested',

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

      // Cervical Passive Vertebral Mobility
      cervical_passive_vertebral_mobility: this.boolToYesNo(dto.cervicalPassiveVertebralMobility?.cervicalPassiveVertebralMobility),
      cpvm_c2_3: this.boolToYesNo(dto.cervicalPassiveVertebralMobility?.cpvmC2_3),
      cpvm_c2_3_forward_bending: dto.cervicalPassiveVertebralMobility?.cpvmC2_3ForwardBending || 'Not Tested',
      cpvm_c2_3_backward_bending: dto.cervicalPassiveVertebralMobility?.cpvmC2_3BackwardBending || 'Not Tested',
      cpvm_c2_3_right_side_bending: dto.cervicalPassiveVertebralMobility?.cpvmC2_3RightSideBending || 'Not Tested',
      cpvm_c2_3_left_side_bending: dto.cervicalPassiveVertebralMobility?.cpvmC2_3LeftSideBending || 'Not Tested',
      cpvm_c2_3_right_rotation: dto.cervicalPassiveVertebralMobility?.cpvmC2_3RightRotation || 'Not Tested',
      cpvm_c2_3_left_rotation: dto.cervicalPassiveVertebralMobility?.cpvmC2_3LeftRotation || 'Not Tested',
      cpvm_c3_4: this.boolToYesNo(dto.cervicalPassiveVertebralMobility?.cpvmC3_4),
      cpvm_c3_4_forward_bending: dto.cervicalPassiveVertebralMobility?.cpvmC3_4ForwardBending || 'Not Tested',
      cpvm_c3_4_backward_bending: dto.cervicalPassiveVertebralMobility?.cpvmC3_4BackwardBending || 'Not Tested',
      cpvm_c3_4_right_side_bending: dto.cervicalPassiveVertebralMobility?.cpvmC3_4RightSideBending || 'Not Tested',
      cpvm_c3_4_left_side_bending: dto.cervicalPassiveVertebralMobility?.cpvmC3_4LeftSideBending || 'Not Tested',
      cpvm_c3_4_right_rotation: dto.cervicalPassiveVertebralMobility?.cpvmC3_4RightRotation || 'Not Tested',
      cpvm_c3_4_left_rotation: dto.cervicalPassiveVertebralMobility?.cpvmC3_4LeftRotation || 'Not Tested',
      cpvm_c4_5: this.boolToYesNo(dto.cervicalPassiveVertebralMobility?.cpvmC4_5),
      cpvm_c4_5_forward_bending: dto.cervicalPassiveVertebralMobility?.cpvmC4_5ForwardBending || 'Not Tested',
      cpvm_c4_5_backward_bending: dto.cervicalPassiveVertebralMobility?.cpvmC4_5BackwardBending || 'Not Tested',
      cpvm_c4_5_right_side_bending: dto.cervicalPassiveVertebralMobility?.cpvmC4_5RightSideBending || 'Not Tested',
      cpvm_c4_5_left_side_bending: dto.cervicalPassiveVertebralMobility?.cpvmC4_5LeftSideBending || 'Not Tested',
      cpvm_c4_5_right_rotation: dto.cervicalPassiveVertebralMobility?.cpvmC4_5RightRotation || 'Not Tested',
      cpvm_c4_5_left_rotation: dto.cervicalPassiveVertebralMobility?.cpvmC4_5LeftRotation || 'Not Tested',
      cpvm_c5_6: this.boolToYesNo(dto.cervicalPassiveVertebralMobility?.cpvmC5_6),
      cpvm_c5_6_forward_bending: dto.cervicalPassiveVertebralMobility?.cpvmC5_6ForwardBending || 'Not Tested',
      cpvm_c5_6_backward_bending: dto.cervicalPassiveVertebralMobility?.cpvmC5_6BackwardBending || 'Not Tested',
      cpvm_c5_6_right_side_bending: dto.cervicalPassiveVertebralMobility?.cpvmC5_6RightSideBending || 'Not Tested',
      cpvm_c5_6_left_side_bending: dto.cervicalPassiveVertebralMobility?.cpvmC5_6LeftSideBending || 'Not Tested',
      cpvm_c5_6_right_rotation: dto.cervicalPassiveVertebralMobility?.cpvmC5_6RightRotation || 'Not Tested',
      cpvm_c5_6_left_rotation: dto.cervicalPassiveVertebralMobility?.cpvmC5_6LeftRotation || 'Not Tested',
      cpvm_c6_7: this.boolToYesNo(dto.cervicalPassiveVertebralMobility?.cpvmC6_7),
      cpvm_c6_7_forward_bending: dto.cervicalPassiveVertebralMobility?.cpvmC6_7ForwardBending || 'Not Tested',
      cpvm_c6_7_backward_bending: dto.cervicalPassiveVertebralMobility?.cpvmC6_7BackwardBending || 'Not Tested',
      cpvm_c6_7_right_side_bending: dto.cervicalPassiveVertebralMobility?.cpvmC6_7RightSideBending || 'Not Tested',
      cpvm_c6_7_left_side_bending: dto.cervicalPassiveVertebralMobility?.cpvmC6_7LeftSideBending || 'Not Tested',
      cpvm_c6_7_right_rotation: dto.cervicalPassiveVertebralMobility?.cpvmC6_7RightRotation || 'Not Tested',
      cpvm_c6_7_left_rotation: dto.cervicalPassiveVertebralMobility?.cpvmC6_7LeftRotation || 'Not Tested',
      cpvm_c7_t1: this.boolToYesNo(dto.cervicalPassiveVertebralMobility?.cpvmC7T1),
      cpvm_c7_t1_forward_bending: dto.cervicalPassiveVertebralMobility?.cpvmC7T1ForwardBending || 'Not Tested',
      cpvm_c7_t1_backward_bending: dto.cervicalPassiveVertebralMobility?.cpvmC7T1BackwardBending || 'Not Tested',
      cpvm_c7_t1_right_side_bending: dto.cervicalPassiveVertebralMobility?.cpvmC7T1RightSideBending || 'Not Tested',
      cpvm_c7_t1_left_side_bending: dto.cervicalPassiveVertebralMobility?.cpvmC7T1LeftSideBending || 'Not Tested',
      cpvm_c7_t1_right_rotation: dto.cervicalPassiveVertebralMobility?.cpvmC7T1RightRotation || 'Not Tested',
      cpvm_c7_t1_left_rotation: dto.cervicalPassiveVertebralMobility?.cpvmC7T1LeftRotation || 'Not Tested',

      // Passive Vertebral Mobility Thoracic
      passive_vertebral_mobility_thoracic: this.boolToYesNo(dto.passiveVertebralMobilityThoracic?.passiveVertebralMobilityThoracic),
      pvmt_t1_t2: this.boolToYesNo(dto.passiveVertebralMobilityThoracic?.pvmtT1T2),
      pvmt_t1_t2_forward_bending: dto.passiveVertebralMobilityThoracic?.pvmtT1T2ForwardBending || 'Not Tested',
      pvmt_t1_t2_backward_bending: dto.passiveVertebralMobilityThoracic?.pvmtT1T2BackwardBending || 'Not Tested',
      pvmt_t1_t2_right_side_bending: dto.passiveVertebralMobilityThoracic?.pvmtT1T2RightSideBending || 'Not Tested',
      pvmt_t1_t2_left_side_bending: dto.passiveVertebralMobilityThoracic?.pvmtT1T2LeftSideBending || 'Not Tested',
      pvmt_t1_t2_right_rotation: dto.passiveVertebralMobilityThoracic?.pvmtT1T2RightRotation || 'Not Tested',
      pvmt_t1_t2_left_rotation: dto.passiveVertebralMobilityThoracic?.pvmtT1T2LeftRotation || 'Not Tested',
      pvmt_t2_t3: this.boolToYesNo(dto.passiveVertebralMobilityThoracic?.pvmtT2T3),
      pvmt_t2_t3_forward_bending: dto.passiveVertebralMobilityThoracic?.pvmtT2T3ForwardBending || 'Not Tested',
      pvmt_t2_t3_backward_bending: dto.passiveVertebralMobilityThoracic?.pvmtT2T3BackwardBending || 'Not Tested',
      pvmt_t2_t3_right_side_bending: dto.passiveVertebralMobilityThoracic?.pvmtT2T3RightSideBending || 'Not Tested',
      pvmt_t2_t3_left_side_bending: dto.passiveVertebralMobilityThoracic?.pvmtT2T3LeftSideBending || 'Not Tested',
      pvmt_t2_t3_right_rotation: dto.passiveVertebralMobilityThoracic?.pvmtT2T3RightRotation || 'Not Tested',
      pvmt_t2_t3_left_rotation: dto.passiveVertebralMobilityThoracic?.pvmtT2T3LeftRotation || 'Not Tested',
      pvmt_t3_t4: this.boolToYesNo(dto.passiveVertebralMobilityThoracic?.pvmtT3T4),
      pvmt_t3_t4_forward_bending: dto.passiveVertebralMobilityThoracic?.pvmtT3T4ForwardBending || 'Not Tested',
      pvmt_t3_t4_backward_bending: dto.passiveVertebralMobilityThoracic?.pvmtT3T4BackwardBending || 'Not Tested',
      pvmt_t3_t4_right_side_bending: dto.passiveVertebralMobilityThoracic?.pvmtT3T4RightSideBending || 'Not Tested',
      pvmt_t3_t4_left_side_bending: dto.passiveVertebralMobilityThoracic?.pvmtT3T4LeftSideBending || 'Not Tested',
      pvmt_t3_t4_right_rotation: dto.passiveVertebralMobilityThoracic?.pvmtT3T4RightRotation || 'Not Tested',
      pvmt_t3_t4_left_rotation: dto.passiveVertebralMobilityThoracic?.pvmtT3T4LeftRotation || 'Not Tested',
      pvmt_t4_t5: this.boolToYesNo(dto.passiveVertebralMobilityThoracic?.pvmtT4T5),
      pvmt_t4_t5_forward_bending: dto.passiveVertebralMobilityThoracic?.pvmtT4T5ForwardBending || 'Not Tested',
      pvmt_t4_t5_backward_bending: dto.passiveVertebralMobilityThoracic?.pvmtT4T5BackwardBending || 'Not Tested',
      pvmt_t4_t5_right_side_bending: dto.passiveVertebralMobilityThoracic?.pvmtT4T5RightSideBending || 'Not Tested',
      pvmt_t4_t5_left_side_bending: dto.passiveVertebralMobilityThoracic?.pvmtT4T5LeftSideBending || 'Not Tested',
      pvmt_t4_t5_right_rotation: dto.passiveVertebralMobilityThoracic?.pvmtT4T5RightRotation || 'Not Tested',
      pvmt_t4_t5_left_rotation: dto.passiveVertebralMobilityThoracic?.pvmtT4T5LeftRotation || 'Not Tested',
      pvmt_t5_t6: this.boolToYesNo(dto.passiveVertebralMobilityThoracic?.pvmtT5T6),
      pvmt_t5_t6_forward_bending: dto.passiveVertebralMobilityThoracic?.pvmtT5T6ForwardBending || 'Not Tested',
      pvmt_t5_t6_backward_bending: dto.passiveVertebralMobilityThoracic?.pvmtT5T6BackwardBending || 'Not Tested',
      pvmt_t5_t6_right_side_bending: dto.passiveVertebralMobilityThoracic?.pvmtT5T6RightSideBending || 'Not Tested',
      pvmt_t5_t6_left_side_bending: dto.passiveVertebralMobilityThoracic?.pvmtT5T6LeftSideBending || 'Not Tested',
      pvmt_t5_t6_right_rotation: dto.passiveVertebralMobilityThoracic?.pvmtT5T6RightRotation || 'Not Tested',
      pvmt_t5_t6_left_rotation: dto.passiveVertebralMobilityThoracic?.pvmtT5T6LeftRotation || 'Not Tested',
      pvmt_t6_t7: this.boolToYesNo(dto.passiveVertebralMobilityThoracic?.pvmtT6T7),
      pvmt_t6_t7_forward_bending: dto.passiveVertebralMobilityThoracic?.pvmtT6T7ForwardBending || 'Not Tested',
      pvmt_t6_t7_backward_bending: dto.passiveVertebralMobilityThoracic?.pvmtT6T7BackwardBending || 'Not Tested',
      pvmt_t6_t7_right_side_bending: dto.passiveVertebralMobilityThoracic?.pvmtT6T7RightSideBending || 'Not Tested',
      pvmt_t6_t7_left_side_bending: dto.passiveVertebralMobilityThoracic?.pvmtT6T7LeftSideBending || 'Not Tested',
      pvmt_t6_t7_right_rotation: dto.passiveVertebralMobilityThoracic?.pvmtT6T7RightRotation || 'Not Tested',
      pvmt_t6_t7_left_rotation: dto.passiveVertebralMobilityThoracic?.pvmtT6T7LeftRotation || 'Not Tested',
      pvmt_t7_t8: this.boolToYesNo(dto.passiveVertebralMobilityThoracic?.pvmtT7T8),
      pvmt_t7_t8_forward_bending: dto.passiveVertebralMobilityThoracic?.pvmtT7T8ForwardBending || 'Not Tested',
      pvmt_t7_t8_backward_bending: dto.passiveVertebralMobilityThoracic?.pvmtT7T8BackwardBending || 'Not Tested',
      pvmt_t7_t8_right_side_bending: dto.passiveVertebralMobilityThoracic?.pvmtT7T8RightSideBending || 'Not Tested',
      pvmt_t7_t8_left_side_bending: dto.passiveVertebralMobilityThoracic?.pvmtT7T8LeftSideBending || 'Not Tested',
      pvmt_t7_t8_right_rotation: dto.passiveVertebralMobilityThoracic?.pvmtT7T8RightRotation || 'Not Tested',
      pvmt_t7_t8_left_rotation: dto.passiveVertebralMobilityThoracic?.pvmtT7T8LeftRotation || 'Not Tested',
      pvmt_t8_t9: this.boolToYesNo(dto.passiveVertebralMobilityThoracic?.pvmtT8T9),
      pvmt_t8_t9_forward_bending: dto.passiveVertebralMobilityThoracic?.pvmtT8T9ForwardBending || 'Not Tested',
      pvmt_t8_t9_backward_bending: dto.passiveVertebralMobilityThoracic?.pvmtT8T9BackwardBending || 'Not Tested',
      pvmt_t8_t9_right_side_bending: dto.passiveVertebralMobilityThoracic?.pvmtT8T9RightSideBending || 'Not Tested',
      pvmt_t8_t9_left_side_bending: dto.passiveVertebralMobilityThoracic?.pvmtT8T9LeftSideBending || 'Not Tested',
      pvmt_t8_t9_right_rotation: dto.passiveVertebralMobilityThoracic?.pvmtT8T9RightRotation || 'Not Tested',
      pvmt_t8_t9_left_rotation: dto.passiveVertebralMobilityThoracic?.pvmtT8T9LeftRotation || 'Not Tested',
      pvmt_t9_t10: this.boolToYesNo(dto.passiveVertebralMobilityThoracic?.pvmtT9T10),
      pvmt_t9_t10_forward_bending: dto.passiveVertebralMobilityThoracic?.pvmtT9T10ForwardBending || 'Not Tested',
      pvmt_t9_t10_backward_bending: dto.passiveVertebralMobilityThoracic?.pvmtT9T10BackwardBending || 'Not Tested',
      pvmt_t9_t10_right_side_bending: dto.passiveVertebralMobilityThoracic?.pvmtT9T10RightSideBending || 'Not Tested',
      pvmt_t9_t10_left_side_bending: dto.passiveVertebralMobilityThoracic?.pvmtT9T10LeftSideBending || 'Not Tested',
      pvmt_t9_t10_right_rotation: dto.passiveVertebralMobilityThoracic?.pvmtT9T10RightRotation || 'Not Tested',
      pvmt_t9_t10_left_rotation: dto.passiveVertebralMobilityThoracic?.pvmtT9T10LeftRotation || 'Not Tested',
      pvmt_t10_t11: this.boolToYesNo(dto.passiveVertebralMobilityThoracic?.pvmtT10T11),
      pvmt_t10_t11_forward_bending: dto.passiveVertebralMobilityThoracic?.pvmtT10T11ForwardBending || 'Not Tested',
      pvmt_t10_t11_backward_bending: dto.passiveVertebralMobilityThoracic?.pvmtT10T11BackwardBending || 'Not Tested',
      pvmt_t10_t11_right_side_bending: dto.passiveVertebralMobilityThoracic?.pvmtT10T11RightSideBending || 'Not Tested',
      pvmt_t10_t11_left_side_bending: dto.passiveVertebralMobilityThoracic?.pvmtT10T11LeftSideBending || 'Not Tested',
      pvmt_t10_t11_right_rotation: dto.passiveVertebralMobilityThoracic?.pvmtT10T11RightRotation || 'Not Tested',
      pvmt_t10_t11_left_rotation: dto.passiveVertebralMobilityThoracic?.pvmtT10T11LeftRotation || 'Not Tested',
      pvmt_t11_t12: this.boolToYesNo(dto.passiveVertebralMobilityThoracic?.pvmtT11T12),
      pvmt_t11_t12_forward_bending: dto.passiveVertebralMobilityThoracic?.pvmtT11T12ForwardBending || 'Not Tested',
      pvmt_t11_t12_backward_bending: dto.passiveVertebralMobilityThoracic?.pvmtT11T12BackwardBending || 'Not Tested',
      pvmt_t11_t12_right_side_bending: dto.passiveVertebralMobilityThoracic?.pvmtT11T12RightSideBending || 'Not Tested',
      pvmt_t11_t12_left_side_bending: dto.passiveVertebralMobilityThoracic?.pvmtT11T12LeftSideBending || 'Not Tested',
      pvmt_t11_t12_right_rotation: dto.passiveVertebralMobilityThoracic?.pvmtT11T12RightRotation || 'Not Tested',
      pvmt_t11_t12_left_rotation: dto.passiveVertebralMobilityThoracic?.pvmtT11T12LeftRotation || 'Not Tested',
      pvmt_t12_l1: this.boolToYesNo(dto.passiveVertebralMobilityThoracic?.pvmtT12L1),
      pvmt_t12_l1_forward_bending: dto.passiveVertebralMobilityThoracic?.pvmtT12L1ForwardBending || 'Not Tested',
      pvmt_t12_l1_backward_bending: dto.passiveVertebralMobilityThoracic?.pvmtT12L1BackwardBending || 'Not Tested',
      pvmt_t12_l1_right_side_bending: dto.passiveVertebralMobilityThoracic?.pvmtT12L1RightSideBending || 'Not Tested',
      pvmt_t12_l1_left_side_bending: dto.passiveVertebralMobilityThoracic?.pvmtT12L1LeftSideBending || 'Not Tested',
      pvmt_t12_l1_right_rotation: dto.passiveVertebralMobilityThoracic?.pvmtT12L1RightRotation || 'Not Tested',
      pvmt_t12_l1_left_rotation: dto.passiveVertebralMobilityThoracic?.pvmtT12L1LeftRotation || 'Not Tested',
      // Cervical Quadrant
      cervical_quadrant: this.boolToYesNo(dto.cervicalQuadrant?.cervicalQuadrant),
      cervical_quadrant_cervical_quadrant_right: dto.cervicalQuadrant?.cervicalQuadrantCervicalQuadrantRight || 'not_tested',
      cervical_quadrant_cervical_quadrant_left: dto.cervicalQuadrant?.cervicalQuadrantCervicalQuadrantLeft || 'not_tested',
      // Cervical Comp/Dist
      cervical_comp_dist: this.boolToYesNo(dto.cervicalCompDist?.cervicalCompDist),
      cervical_comp_dist_compression: dto.cervicalCompDist?.cervicalCompDistCompression || 'Not Tested',
      cervical_comp_dist_distraction: dto.cervicalCompDist?.cervicalCompDistDistraction || 'Not Tested',
      // Jaw Crepitus
      jaw_crepitus: this.boolToYesNo(dto.jawCrepitus?.jawCrepitus),
      jaw_crepitus_jaw_crepitus_right: dto.jawCrepitus?.jawCrepitusJawCrepitusRight || 'not_tested',
      jaw_crepitus_jaw_crepitus_left: dto.jawCrepitus?.jawCrepitusJawCrepitusLeft || 'not_tested',
      // Spurling's Maneuver
      spurlings_maneuver: this.boolToYesNo(dto.spurlingsManeuver?.spurlingsManeuver),
      spurlings_maneuver_spurlings_maneuver_right: dto.spurlingsManeuver?.spurlingsManeuverSpurlingsManeuverRight || 'not_tested',
      spurlings_maneuver_spurlings_maneuver_left: dto.spurlingsManeuver?.spurlingsManeuverSpurlingsManeuverLeft || 'not_tested',
      // Subcranial Passive Vertebral Mobility
      subcranial_passive_vertebral_mobility: this.boolToYesNo(dto.subcranialPassiveVertebralMobility?.subcranialPassiveVertebralMobility),
      spvm_oa: this.boolToYesNo(dto.subcranialPassiveVertebralMobility?.spvmOa),
      spvm_oa_forward_bending: dto.subcranialPassiveVertebralMobility?.spvmOaForwardBending || 'Not Tested',
      spvm_oa_backward_bending: dto.subcranialPassiveVertebralMobility?.spvmOaBackwardBending || 'Not Tested',
      spvm_oa_right_side_bending: dto.subcranialPassiveVertebralMobility?.spvmOaRightSideBending || 'Not Tested',
      spvm_oa_left_side_bending: dto.subcranialPassiveVertebralMobility?.spvmOaLeftSideBending || 'Not Tested',
      spvm_aa: this.boolToYesNo(dto.subcranialPassiveVertebralMobility?.spvmAa),
      spvm_aa_forward_bending: dto.subcranialPassiveVertebralMobility?.spvmAaForwardBending || 'Not Tested',
      spvm_aa_backward_bending: dto.subcranialPassiveVertebralMobility?.spvmAaBackwardBending || 'Not Tested',
      spvm_aa_right_side_bending: dto.subcranialPassiveVertebralMobility?.spvmAaRightSideBending || 'Not Tested',
      spvm_aa_left_side_bending: dto.subcranialPassiveVertebralMobility?.spvmAaLeftSideBending || 'Not Tested',
      // Passive Joint Mobility Shoulder
      passive_joint_mobility_shoulder: this.boolToYesNo(dto.passiveJointMobilityShoulder?.passiveJointMobilityShoulder),
      passive_joint_mobility_shoulder_posterior_capsule_right: dto.passiveJointMobilityShoulder?.passiveJointMobilityShoulderPosteriorCapsuleRight || 'not_tested',
      passive_joint_mobility_shoulder_posterior_capsule_left: dto.passiveJointMobilityShoulder?.passiveJointMobilityShoulderPosteriorCapsuleLeft || 'not_tested',
      passive_joint_mobility_shoulder_anterior_capsule_right: dto.passiveJointMobilityShoulder?.passiveJointMobilityShoulderAnteriorCapsuleRight || 'not_tested',
      passive_joint_mobility_shoulder_anterior_capsule_left: dto.passiveJointMobilityShoulder?.passiveJointMobilityShoulderAnteriorCapsuleLeft || 'not_tested',
      passive_joint_mobility_shoulder_inferior_capsule_right: dto.passiveJointMobilityShoulder?.passiveJointMobilityShoulderInferiorCapsuleRight || 'not_tested',
      passive_joint_mobility_shoulder_inferior_capsule_left: dto.passiveJointMobilityShoulder?.passiveJointMobilityShoulderInferiorCapsuleLeft || 'not_tested',
      // SC Joint
      sc_joint: this.boolToYesNo(dto.scJoint?.scJoint),
      sc_joint_normal_right: !!dto.scJoint?.scJointNormalRight,
      sc_joint_normal_left: !!dto.scJoint?.scJointNormalLeft,
      sc_joint_hypermobile_right: !!dto.scJoint?.scJointHypermobileRight,
      sc_joint_hypermobile_left: !!dto.scJoint?.scJointHypermobileLeft,
      sc_joint_hypomobile_right: !!dto.scJoint?.scJointHypomobileRight,
      sc_joint_hypomobile_left: !!dto.scJoint?.scJointHypomobileLeft,
      sc_joint_capsular_right: !!dto.scJoint?.scJointCapsularRight,
      sc_joint_capsular_left: !!dto.scJoint?.scJointCapsularLeft,
      sc_joint_non_capsular_right: !!dto.scJoint?.scJointNonCapsularRight,
      sc_joint_non_capsular_left: !!dto.scJoint?.scJointNonCapsularLeft,
      sc_joint_painful_right: !!dto.scJoint?.scJointPainfulRight,
      sc_joint_painful_left: !!dto.scJoint?.scJointPainfulLeft,
      // AC Joint
      ac_joint: this.boolToYesNo(dto.acJoint?.acJoint),
      ac_joint_normal_right: !!dto.acJoint?.acJointNormalRight,
      ac_joint_normal_left: !!dto.acJoint?.acJointNormalLeft,
      ac_joint_hypermobile_right: !!dto.acJoint?.acJointHypermobileRight,
      ac_joint_hypermobile_left: !!dto.acJoint?.acJointHypermobileLeft,
      ac_joint_hypomobile_right: !!dto.acJoint?.acJointHypomobileRight,
      ac_joint_hypomobile_left: !!dto.acJoint?.acJointHypomobileLeft,
      ac_joint_capsular_right: !!dto.acJoint?.acJointCapsularRight,
      ac_joint_capsular_left: !!dto.acJoint?.acJointCapsularLeft,
      ac_joint_non_capsular_right: !!dto.acJoint?.acJointNonCapsularRight,
      ac_joint_non_capsular_left: !!dto.acJoint?.acJointNonCapsularLeft,
      ac_joint_painful_right: !!dto.acJoint?.acJointPainfulRight,
      ac_joint_painful_left: !!dto.acJoint?.acJointPainfulLeft,
      // Impingement
      impingement: this.boolToYesNo(dto.impingement?.impingement),
      'impingement_hawkins/kennedy_right': dto.impingement?.impingementHawkinsKennedyRight || 'not_tested',
      'impingement_hawkins/kennedy_left': dto.impingement?.impingementHawkinsKennedyLeft || 'not_tested',
      impingement_neer_test_right: dto.impingement?.impingementNeerTestRight || 'not_tested',
      impingement_neer_test_left: dto.impingement?.impingementNeerTestLeft || 'not_tested',
      // GHJ Stability
      ghj_stability: this.boolToYesNo(dto.ghjStability?.ghjStability),
      ghj_stability_load_and_shift_right: dto.ghjStability?.ghjStabilityLoadAndShiftRight || 'not_tested',
      ghj_stability_load_and_shift_left: dto.ghjStability?.ghjStabilityLoadAndShiftLeft || 'not_tested',
      ghj_stability_apprehension_right: dto.ghjStability?.ghjStabilityApprehensionRight || 'not_tested',
      ghj_stability_apprehension_left: dto.ghjStability?.ghjStabilityApprehensionLeft || 'not_tested',
      ghj_stability_relocation_right: dto.ghjStability?.ghjStabilityRelocationRight || 'not_tested',
      ghj_stability_relocation_left: dto.ghjStability?.ghjStabilityRelocationLeft || 'not_tested',
      ghj_stability_sulcus_sign_right: dto.ghjStability?.ghjStabilitySulcusSignRight || 'not_tested',
      ghj_stability_sulcus_sign_left: dto.ghjStability?.ghjStabilitySulcusSignLeft || 'not_tested',
      // Labrum
      labrum: this.boolToYesNo(dto.labrum?.labrum),
      labrum_grind_test_right: dto.labrum?.labrumGrindTestRight || 'not_tested',
      labrum_grind_test_left: dto.labrum?.labrumGrindTestLeft || 'not_tested',
      labrum_obriens_right: dto.labrum?.labrumObriensRight || 'not_tested',
      labrum_obriens_left: dto.labrum?.labrumObriensLeft || 'not_tested',
      labrum_clunk_test_right: dto.labrum?.labrumClunkTestRight || 'not_tested',
      labrum_clunk_test_left: dto.labrum?.labrumClunkTestLeft || 'not_tested',
      labrum_crank_test_right: dto.labrum?.labrumCrankTestRight || 'not_tested',
      labrum_crank_test_left: dto.labrum?.labrumCrankTestLeft || 'not_tested',
      // Rotator Cuff
      rotator_cuff: this.boolToYesNo(dto.rotatorCuff?.rotatorCuff),
      rotator_cuff_empty_can_right: dto.rotatorCuff?.rotatorCuffEmptyCanRight || 'not_tested',
      rotator_cuff_empty_can_left: dto.rotatorCuff?.rotatorCuffEmptyCanLeft || 'not_tested',
      rotator_cuff_subscapularis_lift_off_right: dto.rotatorCuff?.rotatorCuffSubscapularisLiftOffRight || 'not_tested',
      rotator_cuff_subscapularis_lift_off_left: dto.rotatorCuff?.rotatorCuffSubscapularisLiftOffLeft || 'not_tested',
      rotator_cuff_drop_arm_right: dto.rotatorCuff?.rotatorCuffDropArmRight || 'not_tested',
      rotator_cuff_drop_arm_left: dto.rotatorCuff?.rotatorCuffDropArmLeft || 'not_tested',
      // Speed's Test
      speeds_test: this.boolToYesNo(dto.speedsTest?.speedsTest),
      speeds_test_right: dto.speedsTest?.speedsTestRight || 'not_tested',
      speeds_test_left: dto.speedsTest?.speedsTestLeft || 'not_tested',
      // Ligament Integrity Elbow
      ligament_integrity_elbow: this.boolToYesNo(dto.ligamentIntegrityElbow?.ligamentIntegrityElbow),
      ligament_integrity_elbow_valgus_overload_right: dto.ligamentIntegrityElbow?.ligamentIntegrityElbowValgusOverloadRight || 'not_tested',
      ligament_integrity_elbow_valgus_overload_left: dto.ligamentIntegrityElbow?.ligamentIntegrityElbowValgusOverloadLeft || 'not_tested',
      ligament_integrity_elbow_valgus_stress_right: dto.ligamentIntegrityElbow?.ligamentIntegrityElbowValgusStressRight || 'not_tested',
      ligament_integrity_elbow_valgus_stress_left: dto.ligamentIntegrityElbow?.ligamentIntegrityElbowValgusStressLeft || 'not_tested',
      ligament_integrity_elbow_varus_stress_right: dto.ligamentIntegrityElbow?.ligamentIntegrityElbowVarusStressRight || 'not_tested',
      ligament_integrity_elbow_varus_stress_left: dto.ligamentIntegrityElbow?.ligamentIntegrityElbowVarusStressLeft || 'not_tested',
      // Ulnar Nerve Subluxation
      ulnar_nerve_subluxation: this.boolToYesNo(dto.ulnarNerveSubluxation?.ulnarNerveSubluxation),
      ulnar_nerve_subluxation_ulnar_nerve_subluxation_right: dto.ulnarNerveSubluxation?.ulnarNerveSubluxationUlnarNerveSubluxationRight || 'not_tested',
      ulnar_nerve_subluxation_ulnar_nerve_subluxation_left: dto.ulnarNerveSubluxation?.ulnarNerveSubluxationUlnarNerveSubluxationLeft || 'not_tested',
      // Kemp's Test
      kemps_test: this.boolToYesNo(dto.kempsTest?.kempsTest),
      kemps_test_result: dto.kempsTest?.kempsTestResult || 'Negative',
      // SI Compression
      si_compression: this.boolToYesNo(dto.siCompression?.siCompression),
      si_compression_si_compression_right: dto.siCompression?.siCompressionSiCompressionRight || 'not_tested',
      si_compression_si_compression_left: dto.siCompression?.siCompressionSiCompressionLeft || 'not_tested',
      // SI Distraction
      si_distraction: this.boolToYesNo(dto.siDistraction?.siDistraction),
      si_distraction_si_distraction_right: dto.siDistraction?.siDistractionSiDistractionRight || 'not_tested',
      si_distraction_si_distraction_left: dto.siDistraction?.siDistractionSiDistractionLeft || 'not_tested',
      // Leg Length
      leg_length: this.boolToYesNo(dto.legLength?.legLength),
      leg_length_shortage_right: dto.legLength?.legLengthShortageRight || 'None',
      leg_length_shortage_left: dto.legLength?.legLengthShortageLeft || 'None',
      // Proprioception/Balance
      proprioception_balance: this.boolToYesNo(dto.proprioceptionBalance?.proprioceptionBalance),
      pb_past_pointing: this.boolToYesNo(dto.proprioceptionBalance?.pbPastPointing),
      pb_past_pointing_result: dto.proprioceptionBalance?.pbPastPointingResult || 'Normal',
      pb_fukuda_stepping: this.boolToYesNo(dto.proprioceptionBalance?.pbFukudaStepping),
      pb_fukuda_stepping_result: dto.proprioceptionBalance?.pbFukudaSteppingResult || 'Normal',
      pb_sl_balance: this.boolToYesNo(dto.proprioceptionBalance?.pbSlBalance),
      pb_sl_balance_eyes_open_right: dto.proprioceptionBalance?.pbSlBalanceEyesOpenRight || 'not_tested',
      pb_sl_balance_eyes_open_left: dto.proprioceptionBalance?.pbSlBalanceEyesOpenLeft || 'not_tested',
      pb_sl_balance_eyes_closed_right: dto.proprioceptionBalance?.pbSlBalanceEyesClosedRight || 'not_tested',
      pb_sl_balance_eyes_closed_left: dto.proprioceptionBalance?.pbSlBalanceEyesClosedLeft || 'not_tested',
      pb_romberg: this.boolToYesNo(dto.proprioceptionBalance?.pbRomberg),
      pb_romberg_eyes_open: dto.proprioceptionBalance?.pbRombergEyesOpen || 'Not Tested',
      pb_romberg_eyes_closed: dto.proprioceptionBalance?.pbRombergEyesClosed || 'Not Tested',
      pb_romberg_comments_text: dto.proprioceptionBalance?.pbRombergCommentsText || '',
      pb_sharpened_romberg: this.boolToYesNo(dto.proprioceptionBalance?.pbSharpenedRomberg),
      pb_functional_reach_ue: this.boolToYesNo(dto.proprioceptionBalance?.pbFunctionalReachUe),
      pb_functional_reach_ue_anterior_right: dto.proprioceptionBalance?.pbFunctionalReachUeAnteriorRight || '',
      pb_functional_reach_ue_anterior_left: dto.proprioceptionBalance?.pbFunctionalReachUeAnteriorLeft || '',
      pb_functional_reach_ue_anterior_medial_right: dto.proprioceptionBalance?.pbFunctionalReachUeAnteriorMedialRight || '',
      pb_functional_reach_ue_anterior_medial_left: dto.proprioceptionBalance?.pbFunctionalReachUeAnteriorMedialLeft || '',
      pb_functional_reach_ue_anterior_lateral_right: dto.proprioceptionBalance?.pbFunctionalReachUeAnteriorLateralRight || '',
      pb_functional_reach_ue_anterior_lateral_left: dto.proprioceptionBalance?.pbFunctionalReachUeAnteriorLateralLeft || '',
      pb_functional_reach_ue_medial_right: dto.proprioceptionBalance?.pbFunctionalReachUeMedialRight || '',
      pb_functional_reach_ue_medial_left: dto.proprioceptionBalance?.pbFunctionalReachUeMedialLeft || '',
      pb_functional_reach_ue_lateral_right: dto.proprioceptionBalance?.pbFunctionalReachUeLateralRight || '',
      pb_functional_reach_ue_lateral_left: dto.proprioceptionBalance?.pbFunctionalReachUeLateralLeft || '',
      pb_functional_reach_ue_posterior_right: dto.proprioceptionBalance?.pbFunctionalReachUePosteriorRight || '',
      pb_functional_reach_ue_posterior_left: dto.proprioceptionBalance?.pbFunctionalReachUePosteriorLeft || '',
      pb_functional_reach_ue_posterior_medial_right: dto.proprioceptionBalance?.pbFunctionalReachUePosteriorMedialRight || '',
      pb_functional_reach_ue_posterior_medial_left: dto.proprioceptionBalance?.pbFunctionalReachUePosteriorMedialLeft || '',
      pb_functional_reach_ue_posterior_lateral_right: dto.proprioceptionBalance?.pbFunctionalReachUePosteriorLateralRight || '',
      pb_functional_reach_ue_posterior_lateral_left: dto.proprioceptionBalance?.pbFunctionalReachUePosteriorLateralLeft || '',
      pb_functional_reach_le: this.boolToYesNo(dto.proprioceptionBalance?.pbFunctionalReachLe),
      pb_functional_reach_le_anterior_right: dto.proprioceptionBalance?.pbFunctionalReachLeAnteriorRight || '',
      pb_functional_reach_le_anterior_left: dto.proprioceptionBalance?.pbFunctionalReachLeAnteriorLeft || '',
      pb_functional_reach_le_anterior_medial_right: dto.proprioceptionBalance?.pbFunctionalReachLeAnteriorMedialRight || '',
      pb_functional_reach_le_anterior_medial_left: dto.proprioceptionBalance?.pbFunctionalReachLeAnteriorMedialLeft || '',
      pb_functional_reach_le_anterior_lateral_right: dto.proprioceptionBalance?.pbFunctionalReachLeAnteriorLateralRight || '',
      pb_functional_reach_le_anterior_lateral_left: dto.proprioceptionBalance?.pbFunctionalReachLeAnteriorLateralLeft || '',
      pb_functional_reach_le_medial_right: dto.proprioceptionBalance?.pbFunctionalReachLeMedialRight || '',
      pb_functional_reach_le_medial_left: dto.proprioceptionBalance?.pbFunctionalReachLeMedialLeft || '',
      pb_functional_reach_le_lateral_right: dto.proprioceptionBalance?.pbFunctionalReachLeLateralRight || '',
      pb_functional_reach_le_lateral_left: dto.proprioceptionBalance?.pbFunctionalReachLeLateralLeft || '',
      pb_functional_reach_le_posterior_right: dto.proprioceptionBalance?.pbFunctionalReachLePosteriorRight || '',
      pb_functional_reach_le_posterior_left: dto.proprioceptionBalance?.pbFunctionalReachLePosteriorLeft || '',
      pb_functional_reach_le_posterior_medial_right: dto.proprioceptionBalance?.pbFunctionalReachLePosteriorMedialRight || '',
      pb_functional_reach_le_posterior_medial_left: dto.proprioceptionBalance?.pbFunctionalReachLePosteriorMedialLeft || '',
      pb_functional_reach_le_posterior_lateral_right: dto.proprioceptionBalance?.pbFunctionalReachLePosteriorLateralRight || '',
      pb_functional_reach_le_posterior_lateral_left: dto.proprioceptionBalance?.pbFunctionalReachLePosteriorLateralLeft || '',
      // Pelvic Clock/Introitus Clock
      // Pelvic Clock
      pelvic_clock: this.boolToYesNo(dto.pelvicClock?.pelvicClock),
      pelvic_clock_comments_text: dto.pelvicClock?.pelvicClockCommentsText || '',
      // Introitus Clock
      introitus_clock: this.boolToYesNo(dto.introitusClock?.introitusClock),
      introitus_clock_comments_text: dto.introitusClock?.introitusClockCommentsText || '',
      // Lasegue's SLR
      lasegues_slr: this.boolToYesNo(dto.laseguesSlr?.laseguesSlr),
      lasegues_slr_lasegues_slr_right: dto.laseguesSlr?.laseguesSlrLaseguesSlrRight || 'not_tested',
      lasegues_slr_lasegues_slr_left: dto.laseguesSlr?.laseguesSlrLaseguesSlrLeft || 'not_tested',

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
      patellarPassiveMobilityMedialRight: formValue.patellar_passive_mobility_medial_right || 'not_tested',
      patellarPassiveMobilityMedialLeft: formValue.patellar_passive_mobility_medial_left || 'not_tested',
      patellarPassiveMobilityLateralRight: formValue.patellar_passive_mobility_lateral_right || 'not_tested',
      patellarPassiveMobilityLateralLeft: formValue.patellar_passive_mobility_lateral_left || 'not_tested',
      patellarPassiveMobilitySuperiorRight: formValue.patellar_passive_mobility_superior_right || 'not_tested',
      patellarPassiveMobilitySuperiorLeft: formValue.patellar_passive_mobility_superior_left || 'not_tested'
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

  private mapCervicalPassiveVertebralMobility(formValue: any): CervicalPassiveVertebralMobility {
    return {
      cervicalPassiveVertebralMobility: this.yesNoToBool(formValue.cervical_passive_vertebral_mobility),
      cpvmC2_3: this.yesNoToBool(formValue.cpvm_c2_3),
      cpvmC2_3ForwardBending: formValue.cpvm_c2_3_forward_bending || 'Not Tested',
      cpvmC2_3BackwardBending: formValue.cpvm_c2_3_backward_bending || 'Not Tested',
      cpvmC2_3RightSideBending: formValue.cpvm_c2_3_right_side_bending || 'Not Tested',
      cpvmC2_3LeftSideBending: formValue.cpvm_c2_3_left_side_bending || 'Not Tested',
      cpvmC2_3RightRotation: formValue.cpvm_c2_3_right_rotation || 'Not Tested',
      cpvmC2_3LeftRotation: formValue.cpvm_c2_3_left_rotation || 'Not Tested',
      cpvmC3_4: this.yesNoToBool(formValue.cpvm_c3_4),
      cpvmC3_4ForwardBending: formValue.cpvm_c3_4_forward_bending || 'Not Tested',
      cpvmC3_4BackwardBending: formValue.cpvm_c3_4_backward_bending || 'Not Tested',
      cpvmC3_4RightSideBending: formValue.cpvm_c3_4_right_side_bending || 'Not Tested',
      cpvmC3_4LeftSideBending: formValue.cpvm_c3_4_left_side_bending || 'Not Tested',
      cpvmC3_4RightRotation: formValue.cpvm_c3_4_right_rotation || 'Not Tested',
      cpvmC3_4LeftRotation: formValue.cpvm_c3_4_left_rotation || 'Not Tested',
      cpvmC4_5: this.yesNoToBool(formValue.cpvm_c4_5),
      cpvmC4_5ForwardBending: formValue.cpvm_c4_5_forward_bending || 'Not Tested',
      cpvmC4_5BackwardBending: formValue.cpvm_c4_5_backward_bending || 'Not Tested',
      cpvmC4_5RightSideBending: formValue.cpvm_c4_5_right_side_bending || 'Not Tested',
      cpvmC4_5LeftSideBending: formValue.cpvm_c4_5_left_side_bending || 'Not Tested',
      cpvmC4_5RightRotation: formValue.cpvm_c4_5_right_rotation || 'Not Tested',
      cpvmC4_5LeftRotation: formValue.cpvm_c4_5_left_rotation || 'Not Tested',
      cpvmC5_6: this.yesNoToBool(formValue.cpvm_c5_6),
      cpvmC5_6ForwardBending: formValue.cpvm_c5_6_forward_bending || 'Not Tested',
      cpvmC5_6BackwardBending: formValue.cpvm_c5_6_backward_bending || 'Not Tested',
      cpvmC5_6RightSideBending: formValue.cpvm_c5_6_right_side_bending || 'Not Tested',
      cpvmC5_6LeftSideBending: formValue.cpvm_c5_6_left_side_bending || 'Not Tested',
      cpvmC5_6RightRotation: formValue.cpvm_c5_6_right_rotation || 'Not Tested',
      cpvmC5_6LeftRotation: formValue.cpvm_c5_6_left_rotation || 'Not Tested',
      cpvmC6_7: this.yesNoToBool(formValue.cpvm_c6_7),
      cpvmC6_7ForwardBending: formValue.cpvm_c6_7_forward_bending || 'Not Tested',
      cpvmC6_7BackwardBending: formValue.cpvm_c6_7_backward_bending || 'Not Tested',
      cpvmC6_7RightSideBending: formValue.cpvm_c6_7_right_side_bending || 'Not Tested',
      cpvmC6_7LeftSideBending: formValue.cpvm_c6_7_left_side_bending || 'Not Tested',
      cpvmC6_7RightRotation: formValue.cpvm_c6_7_right_rotation || 'Not Tested',
      cpvmC6_7LeftRotation: formValue.cpvm_c6_7_left_rotation || 'Not Tested',
      cpvmC7T1: this.yesNoToBool(formValue.cpvm_c7_t1),
      cpvmC7T1ForwardBending: formValue.cpvm_c7_t1_forward_bending || 'Not Tested',
      cpvmC7T1BackwardBending: formValue.cpvm_c7_t1_backward_bending || 'Not Tested',
      cpvmC7T1RightSideBending: formValue.cpvm_c7_t1_right_side_bending || 'Not Tested',
      cpvmC7T1LeftSideBending: formValue.cpvm_c7_t1_left_side_bending || 'Not Tested',
      cpvmC7T1RightRotation: formValue.cpvm_c7_t1_right_rotation || 'Not Tested',
      cpvmC7T1LeftRotation: formValue.cpvm_c7_t1_left_rotation || 'Not Tested'
    };
  }

  private mapPassiveVertebralMobilityThoracic(formValue: any): PassiveVertebralMobilityThoracic {
    return {
      passiveVertebralMobilityThoracic: this.yesNoToBool(formValue.passive_vertebral_mobility_thoracic),
      pvmtT1T2: this.yesNoToBool(formValue.pvmt_t1_t2),
      pvmtT1T2ForwardBending: formValue.pvmt_t1_t2_forward_bending || 'Not Tested',
      pvmtT1T2BackwardBending: formValue.pvmt_t1_t2_backward_bending || 'Not Tested',
      pvmtT1T2RightSideBending: formValue.pvmt_t1_t2_right_side_bending || 'Not Tested',
      pvmtT1T2LeftSideBending: formValue.pvmt_t1_t2_left_side_bending || 'Not Tested',
      pvmtT1T2RightRotation: formValue.pvmt_t1_t2_right_rotation || 'Not Tested',
      pvmtT1T2LeftRotation: formValue.pvmt_t1_t2_left_rotation || 'Not Tested',
      pvmtT2T3: this.yesNoToBool(formValue.pvmt_t2_t3),
      pvmtT2T3ForwardBending: formValue.pvmt_t2_t3_forward_bending || 'Not Tested',
      pvmtT2T3BackwardBending: formValue.pvmt_t2_t3_backward_bending || 'Not Tested',
      pvmtT2T3RightSideBending: formValue.pvmt_t2_t3_right_side_bending || 'Not Tested',
      pvmtT2T3LeftSideBending: formValue.pvmt_t2_t3_left_side_bending || 'Not Tested',
      pvmtT2T3RightRotation: formValue.pvmt_t2_t3_right_rotation || 'Not Tested',
      pvmtT2T3LeftRotation: formValue.pvmt_t2_t3_left_rotation || 'Not Tested',
      pvmtT3T4: this.yesNoToBool(formValue.pvmt_t3_t4),
      pvmtT3T4ForwardBending: formValue.pvmt_t3_t4_forward_bending || 'Not Tested',
      pvmtT3T4BackwardBending: formValue.pvmt_t3_t4_backward_bending || 'Not Tested',
      pvmtT3T4RightSideBending: formValue.pvmt_t3_t4_right_side_bending || 'Not Tested',
      pvmtT3T4LeftSideBending: formValue.pvmt_t3_t4_left_side_bending || 'Not Tested',
      pvmtT3T4RightRotation: formValue.pvmt_t3_t4_right_rotation || 'Not Tested',
      pvmtT3T4LeftRotation: formValue.pvmt_t3_t4_left_rotation || 'Not Tested',
      pvmtT4T5: this.yesNoToBool(formValue.pvmt_t4_t5),
      pvmtT4T5ForwardBending: formValue.pvmt_t4_t5_forward_bending || 'Not Tested',
      pvmtT4T5BackwardBending: formValue.pvmt_t4_t5_backward_bending || 'Not Tested',
      pvmtT4T5RightSideBending: formValue.pvmt_t4_t5_right_side_bending || 'Not Tested',
      pvmtT4T5LeftSideBending: formValue.pvmt_t4_t5_left_side_bending || 'Not Tested',
      pvmtT4T5RightRotation: formValue.pvmt_t4_t5_right_rotation || 'Not Tested',
      pvmtT4T5LeftRotation: formValue.pvmt_t4_t5_left_rotation || 'Not Tested',
      pvmtT5T6: this.yesNoToBool(formValue.pvmt_t5_t6),
      pvmtT5T6ForwardBending: formValue.pvmt_t5_t6_forward_bending || 'Not Tested',
      pvmtT5T6BackwardBending: formValue.pvmt_t5_t6_backward_bending || 'Not Tested',
      pvmtT5T6RightSideBending: formValue.pvmt_t5_t6_right_side_bending || 'Not Tested',
      pvmtT5T6LeftSideBending: formValue.pvmt_t5_t6_left_side_bending || 'Not Tested',
      pvmtT5T6RightRotation: formValue.pvmt_t5_t6_right_rotation || 'Not Tested',
      pvmtT5T6LeftRotation: formValue.pvmt_t5_t6_left_rotation || 'Not Tested',
      pvmtT6T7: this.yesNoToBool(formValue.pvmt_t6_t7),
      pvmtT6T7ForwardBending: formValue.pvmt_t6_t7_forward_bending || 'Not Tested',
      pvmtT6T7BackwardBending: formValue.pvmt_t6_t7_backward_bending || 'Not Tested',
      pvmtT6T7RightSideBending: formValue.pvmt_t6_t7_right_side_bending || 'Not Tested',
      pvmtT6T7LeftSideBending: formValue.pvmt_t6_t7_left_side_bending || 'Not Tested',
      pvmtT6T7RightRotation: formValue.pvmt_t6_t7_right_rotation || 'Not Tested',
      pvmtT6T7LeftRotation: formValue.pvmt_t6_t7_left_rotation || 'Not Tested',
      pvmtT7T8: this.yesNoToBool(formValue.pvmt_t7_t8),
      pvmtT7T8ForwardBending: formValue.pvmt_t7_t8_forward_bending || 'Not Tested',
      pvmtT7T8BackwardBending: formValue.pvmt_t7_t8_backward_bending || 'Not Tested',
      pvmtT7T8RightSideBending: formValue.pvmt_t7_t8_right_side_bending || 'Not Tested',
      pvmtT7T8LeftSideBending: formValue.pvmt_t7_t8_left_side_bending || 'Not Tested',
      pvmtT7T8RightRotation: formValue.pvmt_t7_t8_right_rotation || 'Not Tested',
      pvmtT7T8LeftRotation: formValue.pvmt_t7_t8_left_rotation || 'Not Tested',
      pvmtT8T9: this.yesNoToBool(formValue.pvmt_t8_t9),
      pvmtT8T9ForwardBending: formValue.pvmt_t8_t9_forward_bending || 'Not Tested',
      pvmtT8T9BackwardBending: formValue.pvmt_t8_t9_backward_bending || 'Not Tested',
      pvmtT8T9RightSideBending: formValue.pvmt_t8_t9_right_side_bending || 'Not Tested',
      pvmtT8T9LeftSideBending: formValue.pvmt_t8_t9_left_side_bending || 'Not Tested',
      pvmtT8T9RightRotation: formValue.pvmt_t8_t9_right_rotation || 'Not Tested',
      pvmtT8T9LeftRotation: formValue.pvmt_t8_t9_left_rotation || 'Not Tested',
      pvmtT9T10: this.yesNoToBool(formValue.pvmt_t9_t10),
      pvmtT9T10ForwardBending: formValue.pvmt_t9_t10_forward_bending || 'Not Tested',
      pvmtT9T10BackwardBending: formValue.pvmt_t9_t10_backward_bending || 'Not Tested',
      pvmtT9T10RightSideBending: formValue.pvmt_t9_t10_right_side_bending || 'Not Tested',
      pvmtT9T10LeftSideBending: formValue.pvmt_t9_t10_left_side_bending || 'Not Tested',
      pvmtT9T10RightRotation: formValue.pvmt_t9_t10_right_rotation || 'Not Tested',
      pvmtT9T10LeftRotation: formValue.pvmt_t9_t10_left_rotation || 'Not Tested',
      pvmtT10T11: this.yesNoToBool(formValue.pvmt_t10_t11),
      pvmtT10T11ForwardBending: formValue.pvmt_t10_t11_forward_bending || 'Not Tested',
      pvmtT10T11BackwardBending: formValue.pvmt_t10_t11_backward_bending || 'Not Tested',
      pvmtT10T11RightSideBending: formValue.pvmt_t10_t11_right_side_bending || 'Not Tested',
      pvmtT10T11LeftSideBending: formValue.pvmt_t10_t11_left_side_bending || 'Not Tested',
      pvmtT10T11RightRotation: formValue.pvmt_t10_t11_right_rotation || 'Not Tested',
      pvmtT10T11LeftRotation: formValue.pvmt_t10_t11_left_rotation || 'Not Tested',
      pvmtT11T12: this.yesNoToBool(formValue.pvmt_t11_t12),
      pvmtT11T12ForwardBending: formValue.pvmt_t11_t12_forward_bending || 'Not Tested',
      pvmtT11T12BackwardBending: formValue.pvmt_t11_t12_backward_bending || 'Not Tested',
      pvmtT11T12RightSideBending: formValue.pvmt_t11_t12_right_side_bending || 'Not Tested',
      pvmtT11T12LeftSideBending: formValue.pvmt_t11_t12_left_side_bending || 'Not Tested',
      pvmtT11T12RightRotation: formValue.pvmt_t11_t12_right_rotation || 'Not Tested',
      pvmtT11T12LeftRotation: formValue.pvmt_t11_t12_left_rotation || 'Not Tested',
      pvmtT12L1: this.yesNoToBool(formValue.pvmt_t12_l1),
      pvmtT12L1ForwardBending: formValue.pvmt_t12_l1_forward_bending || 'Not Tested',
      pvmtT12L1BackwardBending: formValue.pvmt_t12_l1_backward_bending || 'Not Tested',
      pvmtT12L1RightSideBending: formValue.pvmt_t12_l1_right_side_bending || 'Not Tested',
      pvmtT12L1LeftSideBending: formValue.pvmt_t12_l1_left_side_bending || 'Not Tested',
      pvmtT12L1RightRotation: formValue.pvmt_t12_l1_right_rotation || 'Not Tested',
      pvmtT12L1LeftRotation: formValue.pvmt_t12_l1_left_rotation || 'Not Tested'
    };
  }

  private mapCervicalQuadrant(formValue: any): CervicalQuadrant {
    return {
      cervicalQuadrant: this.yesNoToBool(formValue.cervical_quadrant),
      cervicalQuadrantCervicalQuadrantRight: formValue.cervical_quadrant_cervical_quadrant_right || 'not_tested',
      cervicalQuadrantCervicalQuadrantLeft: formValue.cervical_quadrant_cervical_quadrant_left || 'not_tested'
    };
  }

  private mapCervicalCompDist(formValue: any): CervicalCompDist {
    return {
      cervicalCompDist: this.yesNoToBool(formValue.cervical_comp_dist),
      cervicalCompDistCompression: formValue.cervical_comp_dist_compression || 'Not Tested',
      cervicalCompDistDistraction: formValue.cervical_comp_dist_distraction || 'Not Tested'
    };
  }

  private mapJawCrepitus(formValue: any): JawCrepitus {
    return {
      jawCrepitus: this.yesNoToBool(formValue.jaw_crepitus),
      jawCrepitusJawCrepitusRight: formValue.jaw_crepitus_jaw_crepitus_right || 'not_tested',
      jawCrepitusJawCrepitusLeft: formValue.jaw_crepitus_jaw_crepitus_left || 'not_tested'
    };
  }

  private mapSpurlingsManeuver(formValue: any): SpurlingsManeuver {
    return {
      spurlingsManeuver: this.yesNoToBool(formValue.spurlings_maneuver),
      spurlingsManeuverSpurlingsManeuverRight: formValue.spurlings_maneuver_spurlings_maneuver_right || 'not_tested',
      spurlingsManeuverSpurlingsManeuverLeft: formValue.spurlings_maneuver_spurlings_maneuver_left || 'not_tested'
    };
  }

  private mapSubcranialPassiveVertebralMobility(formValue: any): SubcranialPassiveVertebralMobility {
    return {
      subcranialPassiveVertebralMobility: this.yesNoToBool(formValue.subcranial_passive_vertebral_mobility),
      spvmOa: this.yesNoToBool(formValue.spvm_oa),
      spvmOaForwardBending: formValue.spvm_oa_forward_bending || 'Not Tested',
      spvmOaBackwardBending: formValue.spvm_oa_backward_bending || 'Not Tested',
      spvmOaRightSideBending: formValue.spvm_oa_right_side_bending || 'Not Tested',
      spvmOaLeftSideBending: formValue.spvm_oa_left_side_bending || 'Not Tested',
      spvmAa: this.yesNoToBool(formValue.spvm_aa),
      spvmAaForwardBending: formValue.spvm_aa_forward_bending || 'Not Tested',
      spvmAaBackwardBending: formValue.spvm_aa_backward_bending || 'Not Tested',
      spvmAaRightSideBending: formValue.spvm_aa_right_side_bending || 'Not Tested',
      spvmAaLeftSideBending: formValue.spvm_aa_left_side_bending || 'Not Tested'
    };
  }

  private mapPassiveJointMobilityShoulder(formValue: any): PassiveJointMobilityShoulder {
    return {
      passiveJointMobilityShoulder: this.yesNoToBool(formValue.passive_joint_mobility_shoulder),
      passiveJointMobilityShoulderPosteriorCapsuleRight: formValue.passive_joint_mobility_shoulder_posterior_capsule_right || 'not_tested',
      passiveJointMobilityShoulderPosteriorCapsuleLeft: formValue.passive_joint_mobility_shoulder_posterior_capsule_left || 'not_tested',
      passiveJointMobilityShoulderAnteriorCapsuleRight: formValue.passive_joint_mobility_shoulder_anterior_capsule_right || 'not_tested',
      passiveJointMobilityShoulderAnteriorCapsuleLeft: formValue.passive_joint_mobility_shoulder_anterior_capsule_left || 'not_tested',
      passiveJointMobilityShoulderInferiorCapsuleRight: formValue.passive_joint_mobility_shoulder_inferior_capsule_right || 'not_tested',
      passiveJointMobilityShoulderInferiorCapsuleLeft: formValue.passive_joint_mobility_shoulder_inferior_capsule_left || 'not_tested'
    };
  }

  private mapScJoint(formValue: any): ScJoint {
    return {
      scJoint: this.yesNoToBool(formValue.sc_joint),
      scJointNormalRight: !!formValue.sc_joint_normal_right,
      scJointNormalLeft: !!formValue.sc_joint_normal_left,
      scJointHypermobileRight: !!formValue.sc_joint_hypermobile_right,
      scJointHypermobileLeft: !!formValue.sc_joint_hypermobile_left,
      scJointHypomobileRight: !!formValue.sc_joint_hypomobile_right,
      scJointHypomobileLeft: !!formValue.sc_joint_hypomobile_left,
      scJointCapsularRight: !!formValue.sc_joint_capsular_right,
      scJointCapsularLeft: !!formValue.sc_joint_capsular_left,
      scJointNonCapsularRight: !!formValue.sc_joint_non_capsular_right,
      scJointNonCapsularLeft: !!formValue.sc_joint_non_capsular_left,
      scJointPainfulRight: !!formValue.sc_joint_painful_right,
      scJointPainfulLeft: !!formValue.sc_joint_painful_left
    };
  }

  private mapAcJoint(formValue: any): AcJoint {
    return {
      acJoint: this.yesNoToBool(formValue.ac_joint),
      acJointNormalRight: !!formValue.ac_joint_normal_right,
      acJointNormalLeft: !!formValue.ac_joint_normal_left,
      acJointHypermobileRight: !!formValue.ac_joint_hypermobile_right,
      acJointHypermobileLeft: !!formValue.ac_joint_hypermobile_left,
      acJointHypomobileRight: !!formValue.ac_joint_hypomobile_right,
      acJointHypomobileLeft: !!formValue.ac_joint_hypomobile_left,
      acJointCapsularRight: !!formValue.ac_joint_capsular_right,
      acJointCapsularLeft: !!formValue.ac_joint_capsular_left,
      acJointNonCapsularRight: !!formValue.ac_joint_non_capsular_right,
      acJointNonCapsularLeft: !!formValue.ac_joint_non_capsular_left,
      acJointPainfulRight: !!formValue.ac_joint_painful_right,
      acJointPainfulLeft: !!formValue.ac_joint_painful_left
    };
  }

  private mapImpingement(formValue: any): Impingement {
    return {
      impingement: this.yesNoToBool(formValue.impingement),
      impingementHawkinsKennedyRight: formValue['impingement_hawkins/kennedy_right'] || 'not_tested',
      impingementHawkinsKennedyLeft: formValue['impingement_hawkins/kennedy_left'] || 'not_tested',
      impingementNeerTestRight: formValue.impingement_neer_test_right || 'not_tested',
      impingementNeerTestLeft: formValue.impingement_neer_test_left || 'not_tested'
    };
  }

  private mapGhjStability(formValue: any): GhjStability {
    return {
      ghjStability: this.yesNoToBool(formValue.ghj_stability),
      ghjStabilityLoadAndShiftRight: formValue.ghj_stability_load_and_shift_right || 'not_tested',
      ghjStabilityLoadAndShiftLeft: formValue.ghj_stability_load_and_shift_left || 'not_tested',
      ghjStabilityApprehensionRight: formValue.ghj_stability_apprehension_right || 'not_tested',
      ghjStabilityApprehensionLeft: formValue.ghj_stability_apprehension_left || 'not_tested',
      ghjStabilityRelocationRight: formValue.ghj_stability_relocation_right || 'not_tested',
      ghjStabilityRelocationLeft: formValue.ghj_stability_relocation_left || 'not_tested',
      ghjStabilitySulcusSignRight: formValue.ghj_stability_sulcus_sign_right || 'not_tested',
      ghjStabilitySulcusSignLeft: formValue.ghj_stability_sulcus_sign_left || 'not_tested'
    };
  }

  private mapLabrum(formValue: any): Labrum {
    return {
      labrum: this.yesNoToBool(formValue.labrum),
      labrumGrindTestRight: formValue.labrum_grind_test_right || 'not_tested',
      labrumGrindTestLeft: formValue.labrum_grind_test_left || 'not_tested',
      labrumObriensRight: formValue.labrum_obriens_right || 'not_tested',
      labrumObriensLeft: formValue.labrum_obriens_left || 'not_tested',
      labrumClunkTestRight: formValue.labrum_clunk_test_right || 'not_tested',
      labrumClunkTestLeft: formValue.labrum_clunk_test_left || 'not_tested',
      labrumCrankTestRight: formValue.labrum_crank_test_right || 'not_tested',
      labrumCrankTestLeft: formValue.labrum_crank_test_left || 'not_tested'
    };
  }

  private mapRotatorCuff(formValue: any): RotatorCuff {
    return {
      rotatorCuff: this.yesNoToBool(formValue.rotator_cuff),
      rotatorCuffEmptyCanRight: formValue.rotator_cuff_empty_can_right || 'not_tested',
      rotatorCuffEmptyCanLeft: formValue.rotator_cuff_empty_can_left || 'not_tested',
      rotatorCuffSubscapularisLiftOffRight: formValue.rotator_cuff_subscapularis_lift_off_right || 'not_tested',
      rotatorCuffSubscapularisLiftOffLeft: formValue.rotator_cuff_subscapularis_lift_off_left || 'not_tested',
      rotatorCuffDropArmRight: formValue.rotator_cuff_drop_arm_right || 'not_tested',
      rotatorCuffDropArmLeft: formValue.rotator_cuff_drop_arm_left || 'not_tested'
    };
  }

  private mapSpeedsTest(formValue: any): SpeedsTest {
    return {
      speedsTest: this.yesNoToBool(formValue.speeds_test),
      speedsTestRight: formValue.speeds_test_right || 'not_tested',
      speedsTestLeft: formValue.speeds_test_left || 'not_tested'
    };
  }

  private mapLigamentIntegrityElbow(formValue: any): LigamentIntegrityElbow {
    return {
      ligamentIntegrityElbow: this.yesNoToBool(formValue.ligament_integrity_elbow),
      ligamentIntegrityElbowValgusOverloadRight: formValue.ligament_integrity_elbow_valgus_overload_right || 'not_tested',
      ligamentIntegrityElbowValgusOverloadLeft: formValue.ligament_integrity_elbow_valgus_overload_left || 'not_tested',
      ligamentIntegrityElbowValgusStressRight: formValue.ligament_integrity_elbow_valgus_stress_right || 'not_tested',
      ligamentIntegrityElbowValgusStressLeft: formValue.ligament_integrity_elbow_valgus_stress_left || 'not_tested',
      ligamentIntegrityElbowVarusStressRight: formValue.ligament_integrity_elbow_varus_stress_right || 'not_tested',
      ligamentIntegrityElbowVarusStressLeft: formValue.ligament_integrity_elbow_varus_stress_left || 'not_tested'
    };
  }

  private mapUlnarNerveSubluxation(formValue: any): UlnarNerveSubluxation {
    return {
      ulnarNerveSubluxation: this.yesNoToBool(formValue.ulnar_nerve_subluxation),
      ulnarNerveSubluxationUlnarNerveSubluxationRight: formValue.ulnar_nerve_subluxation_ulnar_nerve_subluxation_right || 'not_tested',
      ulnarNerveSubluxationUlnarNerveSubluxationLeft: formValue.ulnar_nerve_subluxation_ulnar_nerve_subluxation_left || 'not_tested'
    };
  }

  private mapKempsTest(formValue: any): KempsTest {
    return {
      kempsTest: this.yesNoToBool(formValue.kemps_test),
      kempsTestResult: formValue.kemps_test_result || 'Negative'
    };
  }

  private mapSiCompression(formValue: any): SiCompression {
    return {
      siCompression: this.yesNoToBool(formValue.si_compression),
      siCompressionSiCompressionRight: formValue.si_compression_si_compression_right || 'not_tested',
      siCompressionSiCompressionLeft: formValue.si_compression_si_compression_left || 'not_tested'
    };
  }

  private mapSiDistraction(formValue: any): SiDistraction {
    return {
      siDistraction: this.yesNoToBool(formValue.si_distraction),
      siDistractionSiDistractionRight: formValue.si_distraction_si_distraction_right || 'not_tested',
      siDistractionSiDistractionLeft: formValue.si_distraction_si_distraction_left || 'not_tested'
    };
  }

  private mapLegLength(formValue: any): LegLength {
    return {
      legLength: this.yesNoToBool(formValue.leg_length),
      legLengthShortageRight: formValue.leg_length_shortage_right || 'None',
      legLengthShortageLeft: formValue.leg_length_shortage_left || 'None'
    };
  }

  private mapProprioceptionBalance(formValue: any): ProprioceptionBalance {
    return {
      proprioceptionBalance: this.yesNoToBool(formValue.proprioception_balance),
      pbPastPointing: this.yesNoToBool(formValue.pb_past_pointing),
      pbPastPointingResult: formValue.pb_past_pointing_result || 'Normal',
      pbFukudaStepping: this.yesNoToBool(formValue.pb_fukuda_stepping),
      pbFukudaSteppingResult: formValue.pb_fukuda_stepping_result || 'Normal',
      pbSlBalance: this.yesNoToBool(formValue.pb_sl_balance),
      pbSlBalanceEyesOpenRight: formValue.pb_sl_balance_eyes_open_right || 'not_tested',
      pbSlBalanceEyesOpenLeft: formValue.pb_sl_balance_eyes_open_left || 'not_tested',
      pbSlBalanceEyesClosedRight: formValue.pb_sl_balance_eyes_closed_right || 'not_tested',
      pbSlBalanceEyesClosedLeft: formValue.pb_sl_balance_eyes_closed_left || 'not_tested',
      pbRomberg: this.yesNoToBool(formValue.pb_romberg),
      pbRombergEyesOpen: formValue.pb_romberg_eyes_open || 'Not Tested',
      pbRombergEyesClosed: formValue.pb_romberg_eyes_closed || 'Not Tested',
      pbRombergCommentsText: formValue.pb_romberg_comments_text || '',
      pbSharpenedRomberg: this.yesNoToBool(formValue.pb_sharpened_romberg),
      pbFunctionalReachUe: this.yesNoToBool(formValue.pb_functional_reach_ue),
      pbFunctionalReachUeAnteriorRight: formValue.pb_functional_reach_ue_anterior_right || '',
      pbFunctionalReachUeAnteriorLeft: formValue.pb_functional_reach_ue_anterior_left || '',
      pbFunctionalReachUeAnteriorMedialRight: formValue.pb_functional_reach_ue_anterior_medial_right || '',
      pbFunctionalReachUeAnteriorMedialLeft: formValue.pb_functional_reach_ue_anterior_medial_left || '',
      pbFunctionalReachUeAnteriorLateralRight: formValue.pb_functional_reach_ue_anterior_lateral_right || '',
      pbFunctionalReachUeAnteriorLateralLeft: formValue.pb_functional_reach_ue_anterior_lateral_left || '',
      pbFunctionalReachUeMedialRight: formValue.pb_functional_reach_ue_medial_right || '',
      pbFunctionalReachUeMedialLeft: formValue.pb_functional_reach_ue_medial_left || '',
      pbFunctionalReachUeLateralRight: formValue.pb_functional_reach_ue_lateral_right || '',
      pbFunctionalReachUeLateralLeft: formValue.pb_functional_reach_ue_lateral_left || '',
      pbFunctionalReachUePosteriorRight: formValue.pb_functional_reach_ue_posterior_right || '',
      pbFunctionalReachUePosteriorLeft: formValue.pb_functional_reach_ue_posterior_left || '',
      pbFunctionalReachUePosteriorMedialRight: formValue.pb_functional_reach_ue_posterior_medial_right || '',
      pbFunctionalReachUePosteriorMedialLeft: formValue.pb_functional_reach_ue_posterior_medial_left || '',
      pbFunctionalReachUePosteriorLateralRight: formValue.pb_functional_reach_ue_posterior_lateral_right || '',
      pbFunctionalReachUePosteriorLateralLeft: formValue.pb_functional_reach_ue_posterior_lateral_left || '',
      pbFunctionalReachLe: this.yesNoToBool(formValue.pb_functional_reach_le),
      pbFunctionalReachLeAnteriorRight: formValue.pb_functional_reach_le_anterior_right || '',
      pbFunctionalReachLeAnteriorLeft: formValue.pb_functional_reach_le_anterior_left || '',
      pbFunctionalReachLeAnteriorMedialRight: formValue.pb_functional_reach_le_anterior_medial_right || '',
      pbFunctionalReachLeAnteriorMedialLeft: formValue.pb_functional_reach_le_anterior_medial_left || '',
      pbFunctionalReachLeAnteriorLateralRight: formValue.pb_functional_reach_le_anterior_lateral_right || '',
      pbFunctionalReachLeAnteriorLateralLeft: formValue.pb_functional_reach_le_anterior_lateral_left || '',
      pbFunctionalReachLeMedialRight: formValue.pb_functional_reach_le_medial_right || '',
      pbFunctionalReachLeMedialLeft: formValue.pb_functional_reach_le_medial_left || '',
      pbFunctionalReachLeLateralRight: formValue.pb_functional_reach_le_lateral_right || '',
      pbFunctionalReachLeLateralLeft: formValue.pb_functional_reach_le_lateral_left || '',
      pbFunctionalReachLePosteriorRight: formValue.pb_functional_reach_le_posterior_right || '',
      pbFunctionalReachLePosteriorLeft: formValue.pb_functional_reach_le_posterior_left || '',
      pbFunctionalReachLePosteriorMedialRight: formValue.pb_functional_reach_le_posterior_medial_right || '',
      pbFunctionalReachLePosteriorMedialLeft: formValue.pb_functional_reach_le_posterior_medial_left || '',
      pbFunctionalReachLePosteriorLateralRight: formValue.pb_functional_reach_le_posterior_lateral_right || '',
      pbFunctionalReachLePosteriorLateralLeft: formValue.pb_functional_reach_le_posterior_lateral_left || ''
    };
  }

  private mapPelvicClock(formValue: any): PelvicClock {
    return {
      pelvicClock: this.yesNoToBool(formValue.pelvic_clock),
      pelvicClockCommentsText: formValue.pelvic_clock_comments_text || ''
    };
  }

  private mapIntroitusClock(formValue: any): IntroitusClock {
    return {
      introitusClock: this.yesNoToBool(formValue.introitus_clock),
      introitusClockCommentsText: formValue.introitus_clock_comments_text || ''
    };
  }

  private mapLaseguesSlr(formValue: any): LaseguesSlr {
    return {
      laseguesSlr: this.yesNoToBool(formValue.lasegues_slr),
      laseguesSlrLaseguesSlrRight: formValue.lasegues_slr_lasegues_slr_right || 'not_tested',
      laseguesSlrLaseguesSlrLeft: formValue.lasegues_slr_lasegues_slr_left || 'not_tested'
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
