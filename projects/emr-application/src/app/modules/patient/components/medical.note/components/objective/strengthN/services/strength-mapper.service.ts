import { Injectable } from '@angular/core';
import { Strength } from '../models/Strength';
import { NoLimitationsNoted } from '../models/NoLimitationsNoted';
import { SelectiveTissueTensionUpper } from '../models/SelectiveTissueTensionUpper';
import { SelectiveTissueTensionLower } from '../models/SelectiveTissueTensionLower';
import { GripPinch } from '../models/GripPinch';
import { GrossMuscleTestsUpper } from '../models/GrossMuscleTestsUpper';
import { RedcordNeuracStabilityTests } from '../models/RedcordNeuracStabilityTests';
import { GrossMuscleTestsTrunk } from '../models/GrossMuscleTestsTrunk';
import { GrossMuscleTestsLower } from '../models/GrossMuscleTestsLower';
import { CoreStrength } from '../models/CoreStrength';
import { ManualMuscleTests } from '../models/ManualMuscleTests';
import { AdditionalComments } from '../models/AdditionalComments';

@Injectable({
  providedIn: 'root'
})
export class StrengthMapperService {

  constructor() { }

  /**
   * Converts DTO to form values
   * @param dto Strength DTO
   * @returns Form values object
   */
  fromDto(dto: Strength): any {
    return {
      // No Limitations Noted
      no_limitations_noted: dto.noLimitationsNoted?.noLimitationsNoted ? 'yes' : 'no',
      uper_extremity: dto.noLimitationsNoted?.uperExtremity || false,
      lower_extremity: dto.noLimitationsNoted?.lowerExtremity || false,

      // Selective Tissue Tension Upper
      selective_tissue_tension_upper: dto.selectiveTissueTensionUpper?.selectiveTissueTensionUpper ? 'yes' : 'no',
      cervical: dto.selectiveTissueTensionUpper?.cervical ? 'yes' : 'no',
      trunk: dto.selectiveTissueTensionUpper?.trunk ? 'yes' : 'no',
      back_ribs: dto.selectiveTissueTensionUpper?.backRibs ? 'yes' : 'no',
      shoulder: dto.selectiveTissueTensionUpper?.shoulder ? 'yes' : 'no',
      elbow: dto.selectiveTissueTensionUpper?.elbow ? 'yes' : 'no',
      wrist: dto.selectiveTissueTensionUpper?.wrist ? 'yes' : 'no',
      hand: dto.selectiveTissueTensionUpper?.hand ? 'yes' : 'no',

      // Selective Tissue Tension Lower
      selective_tissue_tension_lower: dto.selectiveTissueTensionLower?.selectiveTissueTensionLower ? 'yes' : 'no',
      hip: dto.selectiveTissueTensionLower?.hip ? 'yes' : 'no',
      knee: dto.selectiveTissueTensionLower?.knee ? 'yes' : 'no',
      ankle: dto.selectiveTissueTensionLower?.ankle ? 'yes' : 'no',
      foot: dto.selectiveTissueTensionLower?.foot ? 'yes' : 'no',

      // Grip Pinch
      grip_pinch: dto.gripPinch?.gripPinch ? 'yes' : 'no',
      grip_pinch_power_grip_right: dto.gripPinch?.gripPinchPowerGripRight || '',
      grip_pinch_power_grip_right_text: dto.gripPinch?.gripPinchPowerGripRightText || '',
      grip_pinch_power_grip_left: dto.gripPinch?.gripPinchPowerGripLeft || '',
      grip_pinch_power_grip_left_text: dto.gripPinch?.gripPinchPowerGripLeftText || '',
      grip_pinch_lateral_pinch_right: dto.gripPinch?.gripPinchLateralPinchRight || '',
      grip_pinch_lateral_pinch_right_text: dto.gripPinch?.gripPinchLateralPinchRightText || '',
      grip_pinch_lateral_pinch_left: dto.gripPinch?.gripPinchLateralPinchLeft || '',
      grip_pinch_lateral_pinch_left_text: dto.gripPinch?.gripPinchLateralPinchLeftText || '',
      'grip_pinch_tip_pinch/pincer_right': dto.gripPinch?.gripPinchTipPinchpincerRight || '',
      'grip_pinch_tip_pinch/pincer_right_text': dto.gripPinch?.gripPinchTipPinchpincerRightText || '',
      'grip_pinch_tip_pinch/pincer_left': dto.gripPinch?.gripPinchTipPinchpincerLeft || '',
      'grip_pinch_tip_pinch/pincer_left_text': dto.gripPinch?.gripPinchTipPinchpincerLeftText || '',
      grip_pinch_tripod_pinch_right: dto.gripPinch?.gripPinchTripodPinchRight || '',
      grip_pinch_tripod_pinch_right_text: dto.gripPinch?.gripPinchTripodPinchRightText || '',
      grip_pinch_tripod_pinch_left: dto.gripPinch?.gripPinchTripodPinchLeft || '',
      grip_pinch_tripod_pinch_left_text: dto.gripPinch?.gripPinchTripodPinchLeftText || '',
      grip_pinch_comments: dto.gripPinch?.gripPinchComments || '',
      rapid_exchange: dto.gripPinch?.rapidExchange ? 'yes' : 'no',
      repeated_grip: dto.gripPinch?.repeatedGrip ? 'yes' : 'no',
      five_level_grip: dto.gripPinch?.fiveLevelGrip ? 'yes' : 'no',

      // Gross Muscle Tests Upper
      gross_muscle_tests_upper: dto.grossMuscleTestsUpper?.grossMuscleTestsUpper ? 'yes' : 'no',
      cervical_gross_muscle_tests_upper: dto.grossMuscleTestsUpper?.cervicalGrossMuscleTestsUpper ? 'yes' : 'no',
      shoulder_gross_muscle_tests_upper: dto.grossMuscleTestsUpper?.shoulderGrossMuscleTestsUpper ? 'yes' : 'no',
      elbow_gross_muscle_tests_upper: dto.grossMuscleTestsUpper?.elbowGrossMuscleTestsUpper ? 'yes' : 'no',
      wrist_gross_muscle_tests_upper: dto.grossMuscleTestsUpper?.wristGrossMuscleTestsUpper ? 'yes' : 'no',

      // Redcord Neurac Stability Tests
      redcord_neurac_stability_tests: dto.redcordNeuracStabilityTests?.redcordNeuracStabilityTests ? 'yes' : 'no',
      upper_body_myofascial_tests: dto.redcordNeuracStabilityTests?.upperBodyMyofascialTests ? 'yes' : 'no',
      lower_body_myofascial_tests: dto.redcordNeuracStabilityTests?.lowerBodyMyofascialTests ? 'yes' : 'no',
      cervical_movements: dto.redcordNeuracStabilityTests?.cervicalMovements ? 'yes' : 'no',
      cervical_motor_control_tests: dto.redcordNeuracStabilityTests?.cervicalMotorControlTests ? 'yes' : 'no',
      lumbar_motor_control_tests: dto.redcordNeuracStabilityTests?.lumbarMotorControlTests ? 'yes' : 'no',

      // Gross Muscle Tests Trunk
      gross_muscle_tests_trunk: dto.grossMuscleTestsTrunk?.grossMuscleTestsTrunk ? 'yes' : 'no',
      gross_muscle_tests_stabilization: dto.grossMuscleTestsTrunk?.grossMuscleTestsStabilization || '',
      gross_muscle_tests_quality: dto.grossMuscleTestsTrunk?.grossMuscleTestsQuality || '',
      gross_muscle_tests_obliques_right: dto.grossMuscleTestsTrunk?.grossMuscleTestsObliquesRight || '',
      gross_muscle_tests_obliques_left: dto.grossMuscleTestsTrunk?.grossMuscleTestsObliquesLeft || '',
      gross_muscle_tests_trunk_extensors_right: dto.grossMuscleTestsTrunk?.grossMuscleTestsTrunkExtensorsRight || '',
      gross_muscle_tests_trunk_extensors_left: dto.grossMuscleTestsTrunk?.grossMuscleTestsTrunkExtensorsLeft || '',

      // Gross Muscle Tests Lower
      gross_muscle_tests_lower: dto.grossMuscleTestsLower?.grossMuscleTestsLower ? 'yes' : 'no',
      hip_gross_muscle_tests_lower: dto.grossMuscleTestsLower?.hipGrossMuscleTestsLower ? 'yes' : 'no',
      knee_gross_muscle_tests_lower: dto.grossMuscleTestsLower?.kneeGrossMuscleTestsLower ? 'yes' : 'no',
      ankle_gross_muscle_tests_lower: dto.grossMuscleTestsLower?.ankleGrossMuscleTestsLower ? 'yes' : 'no',

      // Core Strength
      core_strength: dto.coreStrength?.coreStrength ? 'yes' : 'no',
      prone_extensioncore_strength: dto.coreStrength?.proneExtensioncoreStrength ? 'yes' : 'no',
      supine_flexion_core_strength: dto.coreStrength?.supineFlexionCoreStrength ? 'yes' : 'no',
      situps_core_strength: dto.coreStrength?.situpsCoreStrength ? 'yes' : 'no',
      pushup_core_strength: dto.coreStrength?.pushupCoreStrength ? 'yes' : 'no',

      // Manual Muscle Tests
      manual_muscle_tests: dto.manualMuscleTests?.manualMuscleTests ? 'yes' : 'no',
      manual_muscle_tests_deep_neck_flexors: dto.manualMuscleTests?.manualMuscleTestsDeepNeckFlexors || '',
      manual_muscle_testsanterior_deltoid_right: dto.manualMuscleTests?.manualMuscleTestsanteriorDeltoidRight || '',
      manual_muscle_testsanterior_deltoid_left: dto.manualMuscleTests?.manualMuscleTestsanteriorDeltoidLeft || '',
      manual_muscle_testsmiddle_deltoid_right: dto.manualMuscleTests?.manualMuscleTestsmiddleDeltoidRight || '',
      manual_muscle_testsmiddle_deltoid_left: dto.manualMuscleTests?.manualMuscleTestsmiddleDeltoidLeft || '',
      manual_muscle_testsposterior_deltoid_right: dto.manualMuscleTests?.manualMuscleTestsposteriorDeltoidRight || '',
      manual_muscle_testsposterior_deltoid_left: dto.manualMuscleTests?.manualMuscleTestsposteriorDeltoidLeft || '',
      manual_muscle_testsupper_trapezius_right: dto.manualMuscleTests?.manualMuscleTestsupperTrapeziusRight || '',
      manual_muscle_testsupper_trapezius_left: dto.manualMuscleTests?.manualMuscleTestsupperTrapeziusLeft || '',
      manual_muscle_testsmiddle_trapezius_right: dto.manualMuscleTests?.manualMuscleTestsmiddleTrapeziusRight || '',
      manual_muscle_testsmiddle_trapezius_left: dto.manualMuscleTests?.manualMuscleTestsmiddleTrapeziusLeft || '',
      manual_muscle_testslower_trapezius_right: dto.manualMuscleTests?.manualMuscleTestslowerTrapeziusRight || '',
      manual_muscle_testslower_trapezius_left: dto.manualMuscleTests?.manualMuscleTestslowerTrapeziusLeft || '',
      manual_muscle_testspectorals_right: dto.manualMuscleTests?.manualMuscleTestspectoralsRight || '',
      manual_muscle_testspectorals_left: dto.manualMuscleTests?.manualMuscleTestspectoralsLeft || '',
      manual_muscle_testslatissimus_dorsi_right: dto.manualMuscleTests?.manualMuscleTestslatissimusDorsiRight || '',
      manual_muscle_testslatissimus_dorsi_left: dto.manualMuscleTests?.manualMuscleTestslatissimusDorsiLeft || '',
      manual_muscle_testssupraspinatus_right: dto.manualMuscleTests?.manualMuscleTestssupraspinatusRight || '',
      manual_muscle_testssupraspinatus_left: dto.manualMuscleTests?.manualMuscleTestssupraspinatusLeft || '',
      'manual_muscle_testsinfraspinatus/teres_minor_right': dto.manualMuscleTests?.manualMuscleTestsinfraspinatusteresMinorRight || '',
      'manual_muscle_testsinfraspinatus/teres_minor_left': dto.manualMuscleTests?.manualMuscleTestsinfraspinatusteresMinorLeft || '',
      manual_muscle_testsinfraspinatus_right: dto.manualMuscleTests?.manualMuscleTestsinfraspinatusRight || '',
      manual_muscle_testsinfraspinatus_left: dto.manualMuscleTests?.manualMuscleTestsinfraspinatusLeft || '',
      manual_muscle_teststeres_minor_right: dto.manualMuscleTests?.manualMuscleTeststeresMinorRight || '',
      manual_muscle_teststeres_minor_left: dto.manualMuscleTests?.manualMuscleTeststeresMinorLeft || '',
      manual_muscle_testssubscapularis_right: dto.manualMuscleTests?.manualMuscleTestssubscapularisRight || '',
      manual_muscle_testssubscapularis_left: dto.manualMuscleTests?.manualMuscleTestssubscapularisLeft || '',
      manual_muscle_testsserratus_anterior_right: dto.manualMuscleTests?.manualMuscleTestsserratusAnteriorRight || '',
      manual_muscle_testsserratus_anterior_left: dto.manualMuscleTests?.manualMuscleTestsserratusAnteriorLeft || '',
      manual_muscle_testsrhomboids_right: dto.manualMuscleTests?.manualMuscleTestsrhomboidsRight || '',
      manual_muscle_testsrhomboids_left: dto.manualMuscleTests?.manualMuscleTestsrhomboidsLeft || '',
      manual_muscle_testsbiceps_right: dto.manualMuscleTests?.manualMuscleTestsbicepsRight || '',
      manual_muscle_testsbiceps_left: dto.manualMuscleTests?.manualMuscleTestsbicepsLeft || '',
      manual_muscle_teststriceps_right: dto.manualMuscleTests?.manualMuscleTeststricepsRight || '',
      manual_muscle_teststriceps_left: dto.manualMuscleTests?.manualMuscleTeststricepsLeft || '',
      manual_muscle_testsbrachioradialis_right: dto.manualMuscleTests?.manualMuscleTestsbrachioradialisRight || '',
      manual_muscle_testsbrachioradialis_left: dto.manualMuscleTests?.manualMuscleTestsbrachioradialisLeft || '',
      manual_muscle_testspronator_teres_right: dto.manualMuscleTests?.manualMuscleTestspronatorTeresRight || '',
      manual_muscle_testspronator_teres_left: dto.manualMuscleTests?.manualMuscleTestspronatorTeresLeft || '',
      manual_muscle_testswrist_extensors_right: dto.manualMuscleTests?.manualMuscleTestswristExtensorsRight || '',
      manual_muscle_testswrist_extensors_left: dto.manualMuscleTests?.manualMuscleTestswristExtensorsLeft || '',
      manual_muscle_testswrist_flexors_right: dto.manualMuscleTests?.manualMuscleTestswristFlexorsRight || '',
      manual_muscle_testswrist_flexors_left: dto.manualMuscleTests?.manualMuscleTestswristFlexorsLeft || '',
      manual_muscle_testssupinator_right: dto.manualMuscleTests?.manualMuscleTestssupinatorRight || '',
      manual_muscle_testssupinator_left: dto.manualMuscleTests?.manualMuscleTestssupinatorLeft || '',
      manual_muscle_testsextensor_digitorum_communis_right: dto.manualMuscleTests?.manualMuscleTestsextensorDigitorumCommunisRight || '',
      manual_muscle_testsextensor_digitorum_communis_left: dto.manualMuscleTests?.manualMuscleTestsextensorDigitorumCommunisLeft || '',
      manual_muscle_testsiliopsoas_right: dto.manualMuscleTests?.manualMuscleTestsiliopsoasRight || '',
      manual_muscle_testsiliopsoas_left: dto.manualMuscleTests?.manualMuscleTestsiliopsoasLeft || '',
      manual_muscle_testsgluteus_maximus_right: dto.manualMuscleTests?.manualMuscleTestsgluteusMaximusRight || '',
      manual_muscle_testsgluteus_maximus_left: dto.manualMuscleTests?.manualMuscleTestsgluteusMaximusLeft || '',
      manual_muscle_testsgluteus_medius_right: dto.manualMuscleTests?.manualMuscleTestsgluteusMediusRight || '',
      manual_muscle_testsgluteus_medius_left: dto.manualMuscleTests?.manualMuscleTestsgluteusMediusLeft || '',
      manual_muscle_testsquadriceps_right: dto.manualMuscleTests?.manualMuscleTestsquadricepsRight || '',
      manual_muscle_testsquadriceps_left: dto.manualMuscleTests?.manualMuscleTestsquadricepsLeft || '',
      manual_muscle_testshamstrings_right: dto.manualMuscleTests?.manualMuscleTestshamstringsRight || '',
      manual_muscle_testshamstrings_left: dto.manualMuscleTests?.manualMuscleTestshamstringsLeft || '',
      manual_muscle_testsadductors_right: dto.manualMuscleTests?.manualMuscleTestsadductorsRight || '',
      manual_muscle_testsadductors_left: dto.manualMuscleTests?.manualMuscleTestsadductorsLeft || '',
      manual_muscle_testsanterior_tibialis_right: dto.manualMuscleTests?.manualMuscleTestsanteriorTibialisRight || '',
      manual_muscle_testsanterior_tibialis_left: dto.manualMuscleTests?.manualMuscleTestsanteriorTibialisLeft || '',
      manual_muscle_testsposterior_tibialis_right: dto.manualMuscleTests?.manualMuscleTestsposteriorTibialisRight || '',
      manual_muscle_testsposterior_tibialis_left: dto.manualMuscleTests?.manualMuscleTestsposteriorTibialisLeft || '',
      manual_muscle_testsgastrocnemius_right: dto.manualMuscleTests?.manualMuscleTestsgastrocnemiusRight || '',
      manual_muscle_testsgastrocnemius_left: dto.manualMuscleTests?.manualMuscleTestsgastrocnemiusLeft || '',
      manual_muscle_testssoleus_right: dto.manualMuscleTests?.manualMuscleTestssoleusRight || '',
      manual_muscle_testssoleus_left: dto.manualMuscleTests?.manualMuscleTestssoleusLeft || '',
      manual_muscle_testsperoneals_right: dto.manualMuscleTests?.manualMuscleTestsperonealsRight || '',
      manual_muscle_testsperoneals_left: dto.manualMuscleTests?.manualMuscleTestsperonealsLeft || '',
      manual_muscle_testsextensor_hallucis_right: dto.manualMuscleTests?.manualMuscleTestsextensorHallucisRight || '',
      manual_muscle_testsextensor_hallucis_left: dto.manualMuscleTests?.manualMuscleTestsextensorHallucisLeft || '',
      manual_muscle_testsflexor_hallucis_right: dto.manualMuscleTests?.manualMuscleTestsflexorHallucisRight || '',
      manual_muscle_testsflexor_hallucis_left: dto.manualMuscleTests?.manualMuscleTestsflexorHallucisLeft || '',
      manual_muscle_testsflexor_digitorum_longus_right: dto.manualMuscleTests?.manualMuscleTestsflexorDigitorumLongusRight || '',
      manual_muscle_testsflexor_digitorum_longus_left: dto.manualMuscleTests?.manualMuscleTestsflexorDigitorumLongusLeft || '',

      // Additional Comments
      additional_comments: dto.additionalComments?.additionalComments ? 'yes' : 'no',
      additional_comments_text: dto.additionalComments?.additionalCommentsText || ''
    };
  }

  /**
   * Converts form values to DTO model
   * @param formValue Form values object
   * @returns Strength DTO
   */
  toModel(formValue: any): Strength {
    const noLimitationsNoted: NoLimitationsNoted = {
      noLimitationsNoted: formValue.no_limitations_noted === 'yes',
      uperExtremity: formValue.uper_extremity || false,
      lowerExtremity: formValue.lower_extremity || false
    };

    const selectiveTissueTensionUpper: SelectiveTissueTensionUpper = {
      selectiveTissueTensionUpper: formValue.selective_tissue_tension_upper === 'yes',
      cervical: formValue.cervical === 'yes',
      trunk: formValue.trunk === 'yes',
      backRibs: formValue.back_ribs === 'yes',
      shoulder: formValue.shoulder === 'yes',
      elbow: formValue.elbow === 'yes',
      wrist: formValue.wrist === 'yes',
      hand: formValue.hand === 'yes'
    };

    const selectiveTissueTensionLower: SelectiveTissueTensionLower = {
      selectiveTissueTensionLower: formValue.selective_tissue_tension_lower === 'yes',
      hip: formValue.hip === 'yes',
      knee: formValue.knee === 'yes',
      ankle: formValue.ankle === 'yes',
      foot: formValue.foot === 'yes'
    };

    const gripPinch: GripPinch = {
      gripPinch: formValue.grip_pinch === 'yes',
      gripPinchPowerGripRight: formValue.grip_pinch_power_grip_right || '',
      gripPinchPowerGripRightText: formValue.grip_pinch_power_grip_right_text || '',
      gripPinchPowerGripLeft: formValue.grip_pinch_power_grip_left || '',
      gripPinchPowerGripLeftText: formValue.grip_pinch_power_grip_left_text || '',
      gripPinchLateralPinchRight: formValue.grip_pinch_lateral_pinch_right || '',
      gripPinchLateralPinchRightText: formValue.grip_pinch_lateral_pinch_right_text || '',
      gripPinchLateralPinchLeft: formValue.grip_pinch_lateral_pinch_left || '',
      gripPinchLateralPinchLeftText: formValue.grip_pinch_lateral_pinch_left_text || '',
      gripPinchTipPinchpincerRight: formValue['grip_pinch_tip_pinch/pincer_right'] || '',
      gripPinchTipPinchpincerRightText: formValue['grip_pinch_tip_pinch/pincer_right_text'] || '',
      gripPinchTipPinchpincerLeft: formValue['grip_pinch_tip_pinch/pincer_left'] || '',
      gripPinchTipPinchpincerLeftText: formValue['grip_pinch_tip_pinch/pincer_left_text'] || '',
      gripPinchTripodPinchRight: formValue.grip_pinch_tripod_pinch_right || '',
      gripPinchTripodPinchRightText: formValue.grip_pinch_tripod_pinch_right_text || '',
      gripPinchTripodPinchLeft: formValue.grip_pinch_tripod_pinch_left || '',
      gripPinchTripodPinchLeftText: formValue.grip_pinch_tripod_pinch_left_text || '',
      gripPinchComments: formValue.grip_pinch_comments || '',
      rapidExchange: formValue.rapid_exchange === 'yes',
      repeatedGrip: formValue.repeated_grip === 'yes',
      fiveLevelGrip: formValue.five_level_grip === 'yes'
    };

    const grossMuscleTestsUpper: GrossMuscleTestsUpper = {
      grossMuscleTestsUpper: formValue.gross_muscle_tests_upper === 'yes',
      cervicalGrossMuscleTestsUpper: formValue.cervical_gross_muscle_tests_upper === 'yes',
      shoulderGrossMuscleTestsUpper: formValue.shoulder_gross_muscle_tests_upper === 'yes',
      elbowGrossMuscleTestsUpper: formValue.elbow_gross_muscle_tests_upper === 'yes',
      wristGrossMuscleTestsUpper: formValue.wrist_gross_muscle_tests_upper === 'yes'
    };

    const redcordNeuracStabilityTests: RedcordNeuracStabilityTests = {
      redcordNeuracStabilityTests: formValue.redcord_neurac_stability_tests === 'yes',
      upperBodyMyofascialTests: formValue.upper_body_myofascial_tests === 'yes',
      lowerBodyMyofascialTests: formValue.lower_body_myofascial_tests === 'yes',
      cervicalMovements: formValue.cervical_movements === 'yes',
      cervicalMotorControlTests: formValue.cervical_motor_control_tests === 'yes',
      lumbarMotorControlTests: formValue.lumbar_motor_control_tests === 'yes'
    };

    const grossMuscleTestsTrunk: GrossMuscleTestsTrunk = {
      grossMuscleTestsTrunk: formValue.gross_muscle_tests_trunk === 'yes',
      grossMuscleTestsStabilization: formValue.gross_muscle_tests_stabilization || '',
      grossMuscleTestsQuality: formValue.gross_muscle_tests_quality || '',
      grossMuscleTestsObliquesRight: formValue.gross_muscle_tests_obliques_right || '',
      grossMuscleTestsObliquesLeft: formValue.gross_muscle_tests_obliques_left || '',
      grossMuscleTestsTrunkExtensorsRight: formValue.gross_muscle_tests_trunk_extensors_right || '',
      grossMuscleTestsTrunkExtensorsLeft: formValue.gross_muscle_tests_trunk_extensors_left || ''
    };

    const grossMuscleTestsLower: GrossMuscleTestsLower = {
      grossMuscleTestsLower: formValue.gross_muscle_tests_lower === 'yes',
      hipGrossMuscleTestsLower: formValue.hip_gross_muscle_tests_lower === 'yes',
      kneeGrossMuscleTestsLower: formValue.knee_gross_muscle_tests_lower === 'yes',
      ankleGrossMuscleTestsLower: formValue.ankle_gross_muscle_tests_lower === 'yes'
    };

    const coreStrength: CoreStrength = {
      coreStrength: formValue.core_strength === 'yes',
      proneExtensioncoreStrength: formValue.prone_extensioncore_strength === 'yes',
      supineFlexionCoreStrength: formValue.supine_flexion_core_strength === 'yes',
      situpsCoreStrength: formValue.situps_core_strength === 'yes',
      pushupCoreStrength: formValue.pushup_core_strength === 'yes'
    };

    const manualMuscleTests: ManualMuscleTests = {
      manualMuscleTests: formValue.manual_muscle_tests === 'yes',
      manualMuscleTestsDeepNeckFlexors: formValue.manual_muscle_tests_deep_neck_flexors || '',
      manualMuscleTestsanteriorDeltoidRight: formValue.manual_muscle_testsanterior_deltoid_right || '',
      manualMuscleTestsanteriorDeltoidLeft: formValue.manual_muscle_testsanterior_deltoid_left || '',
      manualMuscleTestsmiddleDeltoidRight: formValue.manual_muscle_testsmiddle_deltoid_right || '',
      manualMuscleTestsmiddleDeltoidLeft: formValue.manual_muscle_testsmiddle_deltoid_left || '',
      manualMuscleTestsposteriorDeltoidRight: formValue.manual_muscle_testsposterior_deltoid_right || '',
      manualMuscleTestsposteriorDeltoidLeft: formValue.manual_muscle_testsposterior_deltoid_left || '',
      manualMuscleTestsupperTrapeziusRight: formValue.manual_muscle_testsupper_trapezius_right || '',
      manualMuscleTestsupperTrapeziusLeft: formValue.manual_muscle_testsupper_trapezius_left || '',
      manualMuscleTestsmiddleTrapeziusRight: formValue.manual_muscle_testsmiddle_trapezius_right || '',
      manualMuscleTestsmiddleTrapeziusLeft: formValue.manual_muscle_testsmiddle_trapezius_left || '',
      manualMuscleTestslowerTrapeziusRight: formValue.manual_muscle_testslower_trapezius_right || '',
      manualMuscleTestslowerTrapeziusLeft: formValue.manual_muscle_testslower_trapezius_left || '',
      manualMuscleTestspectoralsRight: formValue.manual_muscle_testspectorals_right || '',
      manualMuscleTestspectoralsLeft: formValue.manual_muscle_testspectorals_left || '',
      manualMuscleTestslatissimusDorsiRight: formValue.manual_muscle_testslatissimus_dorsi_right || '',
      manualMuscleTestslatissimusDorsiLeft: formValue.manual_muscle_testslatissimus_dorsi_left || '',
      manualMuscleTestssupraspinatusRight: formValue.manual_muscle_testssupraspinatus_right || '',
      manualMuscleTestssupraspinatusLeft: formValue.manual_muscle_testssupraspinatus_left || '',
      manualMuscleTestsinfraspinatusteresMinorRight: formValue['manual_muscle_testsinfraspinatus/teres_minor_right'] || '',
      manualMuscleTestsinfraspinatusteresMinorLeft: formValue['manual_muscle_testsinfraspinatus/teres_minor_left'] || '',
      manualMuscleTestsinfraspinatusRight: formValue.manual_muscle_testsinfraspinatus_right || '',
      manualMuscleTestsinfraspinatusLeft: formValue.manual_muscle_testsinfraspinatus_left || '',
      manualMuscleTeststeresMinorRight: formValue.manual_muscle_teststeres_minor_right || '',
      manualMuscleTeststeresMinorLeft: formValue.manual_muscle_teststeres_minor_left || '',
      manualMuscleTestssubscapularisRight: formValue.manual_muscle_testssubscapularis_right || '',
      manualMuscleTestssubscapularisLeft: formValue.manual_muscle_testssubscapularis_left || '',
      manualMuscleTestsserratusAnteriorRight: formValue.manual_muscle_testsserratus_anterior_right || '',
      manualMuscleTestsserratusAnteriorLeft: formValue.manual_muscle_testsserratus_anterior_left || '',
      manualMuscleTestsrhomboidsRight: formValue.manual_muscle_testsrhomboids_right || '',
      manualMuscleTestsrhomboidsLeft: formValue.manual_muscle_testsrhomboids_left || '',
      manualMuscleTestsbicepsRight: formValue.manual_muscle_testsbiceps_right || '',
      manualMuscleTestsbicepsLeft: formValue.manual_muscle_testsbiceps_left || '',
      manualMuscleTeststricepsRight: formValue.manual_muscle_teststriceps_right || '',
      manualMuscleTeststricepsLeft: formValue.manual_muscle_teststriceps_left || '',
      manualMuscleTestsbrachioradialisRight: formValue.manual_muscle_testsbrachioradialis_right || '',
      manualMuscleTestsbrachioradialisLeft: formValue.manual_muscle_testsbrachioradialis_left || '',
      manualMuscleTestspronatorTeresRight: formValue.manual_muscle_testspronator_teres_right || '',
      manualMuscleTestspronatorTeresLeft: formValue.manual_muscle_testspronator_teres_left || '',
      manualMuscleTestswristExtensorsRight: formValue.manual_muscle_testswrist_extensors_right || '',
      manualMuscleTestswristExtensorsLeft: formValue.manual_muscle_testswrist_extensors_left || '',
      manualMuscleTestswristFlexorsRight: formValue.manual_muscle_testswrist_flexors_right || '',
      manualMuscleTestswristFlexorsLeft: formValue.manual_muscle_testswrist_flexors_left || '',
      manualMuscleTestssupinatorRight: formValue.manual_muscle_testssupinator_right || '',
      manualMuscleTestssupinatorLeft: formValue.manual_muscle_testssupinator_left || '',
      manualMuscleTestsextensorDigitorumCommunisRight: formValue.manual_muscle_testsextensor_digitorum_communis_right || '',
      manualMuscleTestsextensorDigitorumCommunisLeft: formValue.manual_muscle_testsextensor_digitorum_communis_left || '',
      manualMuscleTestsiliopsoasRight: formValue.manual_muscle_testsiliopsoas_right || '',
      manualMuscleTestsiliopsoasLeft: formValue.manual_muscle_testsiliopsoas_left || '',
      manualMuscleTestsgluteusMaximusRight: formValue.manual_muscle_testsgluteus_maximus_right || '',
      manualMuscleTestsgluteusMaximusLeft: formValue.manual_muscle_testsgluteus_maximus_left || '',
      manualMuscleTestsgluteusMediusRight: formValue.manual_muscle_testsgluteus_medius_right || '',
      manualMuscleTestsgluteusMediusLeft: formValue.manual_muscle_testsgluteus_medius_left || '',
      manualMuscleTestsquadricepsRight: formValue.manual_muscle_testsquadriceps_right || '',
      manualMuscleTestsquadricepsLeft: formValue.manual_muscle_testsquadriceps_left || '',
      manualMuscleTestshamstringsRight: formValue.manual_muscle_testshamstrings_right || '',
      manualMuscleTestshamstringsLeft: formValue.manual_muscle_testshamstrings_left || '',
      manualMuscleTestsadductorsRight: formValue.manual_muscle_testsadductors_right || '',
      manualMuscleTestsadductorsLeft: formValue.manual_muscle_testsadductors_left || '',
      manualMuscleTestsanteriorTibialisRight: formValue.manual_muscle_testsanterior_tibialis_right || '',
      manualMuscleTestsanteriorTibialisLeft: formValue.manual_muscle_testsanterior_tibialis_left || '',
      manualMuscleTestsposteriorTibialisRight: formValue.manual_muscle_testsposterior_tibialis_right || '',
      manualMuscleTestsposteriorTibialisLeft: formValue.manual_muscle_testsposterior_tibialis_left || '',
      manualMuscleTestsgastrocnemiusRight: formValue.manual_muscle_testsgastrocnemius_right || '',
      manualMuscleTestsgastrocnemiusLeft: formValue.manual_muscle_testsgastrocnemius_left || '',
      manualMuscleTestssoleusRight: formValue.manual_muscle_testssoleus_right || '',
      manualMuscleTestssoleusLeft: formValue.manual_muscle_testssoleus_left || '',
      manualMuscleTestsperonealsRight: formValue.manual_muscle_testsperoneals_right || '',
      manualMuscleTestsperonealsLeft: formValue.manual_muscle_testsperoneals_left || '',
      manualMuscleTestsextensorHallucisRight: formValue.manual_muscle_testsextensor_hallucis_right || '',
      manualMuscleTestsextensorHallucisLeft: formValue.manual_muscle_testsextensor_hallucis_left || '',
      manualMuscleTestsflexorHallucisRight: formValue.manual_muscle_testsflexor_hallucis_right || '',
      manualMuscleTestsflexorHallucisLeft: formValue.manual_muscle_testsflexor_hallucis_left || '',
      manualMuscleTestsflexorDigitorumLongusRight: formValue.manual_muscle_testsflexor_digitorum_longus_right || '',
      manualMuscleTestsflexorDigitorumLongusLeft: formValue.manual_muscle_testsflexor_digitorum_longus_left || ''
    };

    const additionalComments: AdditionalComments = {
      additionalComments: formValue.additional_comments === 'yes',
      additionalCommentsText: formValue.additional_comments_text || ''
    };

    return {
      noLimitationsNoted,
      selectiveTissueTensionUpper,
      selectiveTissueTensionLower,
      gripPinch,
      grossMuscleTestsUpper,
      redcordNeuracStabilityTests,
      grossMuscleTestsTrunk,
      grossMuscleTestsLower,
      coreStrength,
      manualMuscleTests,
      additionalComments
    };
  }
}
