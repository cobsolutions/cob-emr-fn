import { Injectable } from '@angular/core';
import { CervicalAROMModel, CostovertebralExpansionModel, ElbowAROMModel, ElbowPROMModel, HandAromPromModel, IndexFingerAromPromModel, MiddleFingerAromPromModel, NoLimitationsNotedModel, RangeOfMotionModel, RingFingerAromPromModel, ShoulderAROMModel, ShoulderPROMModel, SmallFingerAromPromModel, ThoracicAromSittingWithPassiveOverpressureModel, ThoracicAROMStandingModel, ThumbAromPromModel, WristAROMModel, WristPROMModel, LumbarAROMModel } from '../models/range-of-motion.model';

@Injectable({
  providedIn: 'root'
})
export class RangeOfMotionMapperService {

  constructor() { }

  /**
   * Convert form values to RangeOfMotionModel (for sending to backend)
   */
  toModel(formValue: any): RangeOfMotionModel {
    return {
      noLimitationsNoted: this.mapNoLimitationsNoted(formValue),
      cervicalArom: this.mapCervicalArom(formValue),
      costovertebralExpansion: this.mapCostovertebralExpansion(formValue),
      shoulderArom: this.mapShoulderArom(formValue),
      shoulderProm: this.mapShoulderProm(formValue),
      elbowArom: this.mapElbowArom(formValue),
      elbowProm: this.mapElbowProm(formValue),
      wristArom: this.mapWristArom(formValue),
      wristProm: this.mapWristProm(formValue),
      handAromProm: this.mapHandAromProm(formValue),
      thoracicAromSittingWithPassiveOverpressure: this.mapThoracicAromSittingWithPassiveOverpressure(formValue),
      thoracicAROMStandingModel: this.mapThoracicAROMStanding(formValue),
      lumbarAROMModel: this.mapLumbarAROM(formValue)
    };
  }

  /**
   * Convert RangeOfMotionModel to form values (for loading from backend)
   */
  fromDto(dto: RangeOfMotionModel): any {
    return {
      // No Limitations Noted
      no_limitations_noted: dto.noLimitationsNoted.enabled ? 'no' : 'yes',
      arom: dto.noLimitationsNoted.arom || false,
      prom: dto.noLimitationsNoted.prom?.enabled || false,
      prom_cervical: dto.noLimitationsNoted.prom?.cervical || false,
      prom_thoracic: dto.noLimitationsNoted.prom?.thoracic || false,
      prom_shoulder: dto.noLimitationsNoted.prom?.shoulder || false,
      prom_elbow: dto.noLimitationsNoted.prom?.elbow || false,
      prom_wrist: dto.noLimitationsNoted.prom?.wrist || false,
      prom_hand: dto.noLimitationsNoted.prom?.hand || false,
      prom_lumbar: dto.noLimitationsNoted.prom?.lumbar || false,
      prom_hip: dto.noLimitationsNoted.prom?.hip || false,
      prom_knee: dto.noLimitationsNoted.prom?.knee || false,
      prom_ankle: dto.noLimitationsNoted.prom?.ankle || false,
      prom_feet: dto.noLimitationsNoted.prom?.feet || false,
      prom_comments: dto.noLimitationsNoted.prom?.comments || '',

      // Cervical AROM
      cervical_arrom: dto.cervicalArom?.enabled ? 'yes' : 'no',
      cervical_forward_bending: dto.cervicalArom?.forwardBending || 'not_tested',
      cervical_backward_bending: dto.cervicalArom?.backwardBending || 'not_tested',
      cervical_right_rotation: dto.cervicalArom?.rightRotation || 'not_tested',
      cervical_left_rotation: dto.cervicalArom?.leftRotation || 'not_tested',
      cervical_right_side_bending: dto.cervicalArom?.rightSideBending || 'not_tested',
      cervical_left_side_bending: dto.cervicalArom?.leftSideBending || 'not_tested',
      cervical_comments: dto.cervicalArom?.comments || '',

      // Costovertebral Expansion
      costovertebral_expansion: dto.costovertebralExpansion?.enabled ? 'yes' : 'no',
      costovertebral_apply_to_all: '',
      costovertebral_t4: dto.costovertebralExpansion?.t4 || 'not_tested',
      costovertebral_t9: dto.costovertebralExpansion?.t9 || 'not_tested',
      costovertebral_umbilicus: dto.costovertebralExpansion?.umbilicus || 'not_tested',

      // Shoulder AROM
      shoulder_arrom: dto.shoulderArom?.enabled ? 'yes' : 'no',
      shoulder_apply_to_all: '',
      shoulder_flexion_right: dto.shoulderArom?.flexionRight || 'not_tested',
      shoulder_flexion_left: dto.shoulderArom?.flexionLeft || 'not_tested',
      shoulder_scaption_right: dto.shoulderArom?.scaptionRight || 'not_tested',
      shoulder_scaption_left: dto.shoulderArom?.scaptionLeft || 'not_tested',
      shoulder_abduction_right: dto.shoulderArom?.abductionRight || 'not_tested',
      shoulder_abduction_left: dto.shoulderArom?.abductionLeft || 'not_tested',
      shoulder_extension_right: dto.shoulderArom?.extensionRight || 'not_tested',
      shoulder_extension_left: dto.shoulderArom?.extensionLeft || 'not_tested',
      shoulder_functional_er_reach_right: dto.shoulderArom?.functionalExternalRotationReachRight || 'not_tested',
      shoulder_functional_er_reach_left: dto.shoulderArom?.functionalExternalRotationReachLeft || 'not_tested',
      shoulder_functional_ir_reach_right: dto.shoulderArom?.functionalInternalRotationReachRight || 'not_tested',
      shoulder_functional_ir_reach_left: dto.shoulderArom?.functionalInternalRotationReachLeft || 'not_tested',
      shoulder_er_neutral_right: dto.shoulderArom?.erNeutralPositionRight || 'not_tested',
      shoulder_er_neutral_left: dto.shoulderArom?.erNeutralPositionLeft || 'not_tested',
      shoulder_ir_neutral_right: dto.shoulderArom?.irNeutralPositionRight || 'not_tested',
      shoulder_ir_neutral_left: dto.shoulderArom?.irNeutralPositionLeft || 'not_tested',
      shoulder_horizontal_abduction_right: dto.shoulderArom?.horizontalAbductionRight || 'not_tested',
      shoulder_horizontal_abduction_left: dto.shoulderArom?.horizontalAbductionLeft || 'not_tested',
      shoulder_horizontal_adduction_right: dto.shoulderArom?.horizontalAdductionRight || 'not_tested',
      shoulder_horizontal_adduction_left: dto.shoulderArom?.horizontalAdductionLeft || 'not_tested',

      // Shoulder PROM
      shoulder_prom: dto.shoulderProm?.enabled ? 'yes' : 'no',
      shoulder_prom_apply_to_all: '',
      shoulder_prom_flexion_right: dto.shoulderProm?.flexionRight || 'not_tested',
      shoulder_prom_flexion_right_endfeel: dto.shoulderProm?.flexionRightEndfeel || 'not_tested',
      shoulder_prom_flexion_left: dto.shoulderProm?.flexionLeft || 'not_tested',
      shoulder_prom_flexion_left_endfeel: dto.shoulderProm?.flexionLeftEndfeel || 'not_tested',
      shoulder_prom_scaption_right: dto.shoulderProm?.scaptionRight || 'not_tested',
      shoulder_prom_scaption_right_endfeel: dto.shoulderProm?.scaptionRightEndfeel || 'not_tested',
      shoulder_prom_scaption_left: dto.shoulderProm?.scaptionLeft || 'not_tested',
      shoulder_prom_scaption_left_endfeel: dto.shoulderProm?.scaptionLeftEndfeel || 'not_tested',
      shoulder_prom_abduction_right: dto.shoulderProm?.abductionRight || 'not_tested',
      shoulder_prom_abduction_right_endfeel: dto.shoulderProm?.abductionRightEndfeel || 'not_tested',
      shoulder_prom_abduction_left: dto.shoulderProm?.abductionLeft || 'not_tested',
      shoulder_prom_abduction_left_endfeel: dto.shoulderProm?.abductionLeftEndfeel || 'not_tested',
      shoulder_prom_extension_right: dto.shoulderProm?.extensionRight || 'not_tested',
      shoulder_prom_extension_right_endfeel: dto.shoulderProm?.extensionRightEndfeel || 'not_tested',
      shoulder_prom_extension_left: dto.shoulderProm?.extensionLeft || 'not_tested',
      shoulder_prom_extension_left_endfeel: dto.shoulderProm?.extensionLeftEndfeel || 'not_tested',
      shoulder_prom_er_neutral_right: dto.shoulderProm?.erNeutralPositionRight || 'not_tested',
      shoulder_prom_er_neutral_right_endfeel: dto.shoulderProm?.erNeutralPositionRightEndfeel || 'not_tested',
      shoulder_prom_er_neutral_left: dto.shoulderProm?.erNeutralPositionLeft || 'not_tested',
      shoulder_prom_er_neutral_left_endfeel: dto.shoulderProm?.erNeutralPositionLeftEndfeel || 'not_tested',
      shoulder_prom_ir_neutral_right: dto.shoulderProm?.irNeutralPositionRight || 'not_tested',
      shoulder_prom_ir_neutral_right_endfeel: dto.shoulderProm?.irNeutralPositionRightEndfeel || 'not_tested',
      shoulder_prom_ir_neutral_left: dto.shoulderProm?.irNeutralPositionLeft || 'not_tested',
      shoulder_prom_ir_neutral_left_endfeel: dto.shoulderProm?.irNeutralPositionLeftEndfeel || 'not_tested',
      shoulder_prom_er_scapular_plane_right: dto.shoulderProm?.erScapularPlaneRight || 'not_tested',
      shoulder_prom_er_scapular_plane_right_endfeel: dto.shoulderProm?.erScapularPlaneRightEndfeel || 'not_tested',
      shoulder_prom_er_scapular_plane_left: dto.shoulderProm?.erScapularPlaneLeft || 'not_tested',
      shoulder_prom_er_scapular_plane_left_endfeel: dto.shoulderProm?.erScapularPlaneLeftEndfeel || 'not_tested',
      shoulder_prom_ir_scapular_plane_right: dto.shoulderProm?.irScapularPlaneRight || 'not_tested',
      shoulder_prom_ir_scapular_plane_right_endfeel: dto.shoulderProm?.irScapularPlaneRightEndfeel || 'not_tested',
      shoulder_prom_ir_scapular_plane_left: dto.shoulderProm?.irScapularPlaneLeft || 'not_tested',
      shoulder_prom_ir_scapular_plane_left_endfeel: dto.shoulderProm?.irScapularPlaneLeftEndfeel || 'not_tested',
      shoulder_prom_er_90_degrees_abduction_right: dto.shoulderProm?.er90DegreesAbductionRight || 'not_tested',
      shoulder_prom_er_90_degrees_abduction_right_endfeel: dto.shoulderProm?.er90DegreesAbductionRightEndfeel || 'not_tested',
      shoulder_prom_er_90_degrees_abduction_left: dto.shoulderProm?.er90DegreesAbductionLeft || 'not_tested',
      shoulder_prom_er_90_degrees_abduction_left_endfeel: dto.shoulderProm?.er90DegreesAbductionLeftEndfeel || 'not_tested',
      shoulder_prom_ir_90_degrees_abduction_right: dto.shoulderProm?.ir90DegreesAbductionRight || 'not_tested',
      shoulder_prom_ir_90_degrees_abduction_right_endfeel: dto.shoulderProm?.ir90DegreesAbductionRightEndfeel || 'not_tested',
      shoulder_prom_ir_90_degrees_abduction_left: dto.shoulderProm?.ir90DegreesAbductionLeft || 'not_tested',
      shoulder_prom_ir_90_degrees_abduction_left_endfeel: dto.shoulderProm?.ir90DegreesAbductionLeftEndfeel || 'not_tested',
      shoulder_prom_ir_sleeper_stretch_right: dto.shoulderProm?.irSleeperStretchRight || 'not_tested',
      shoulder_prom_ir_sleeper_stretch_right_endfeel: dto.shoulderProm?.irSleeperStretchRightEndfeel || 'not_tested',
      shoulder_prom_ir_sleeper_stretch_left: dto.shoulderProm?.irSleeperStretchLeft || 'not_tested',
      shoulder_prom_ir_sleeper_stretch_left_endfeel: dto.shoulderProm?.irSleeperStretchLeftEndfeel || 'not_tested',
      shoulder_prom_horizontal_abduction_right: dto.shoulderProm?.horizontalAbductionRight || 'not_tested',
      shoulder_prom_horizontal_abduction_right_endfeel: dto.shoulderProm?.horizontalAbductionRightEndfeel || 'not_tested',
      shoulder_prom_horizontal_abduction_left: dto.shoulderProm?.horizontalAbductionLeft || 'not_tested',
      shoulder_prom_horizontal_abduction_left_endfeel: dto.shoulderProm?.horizontalAbductionLeftEndfeel || 'not_tested',
      shoulder_prom_horizontal_adduction_right: dto.shoulderProm?.horizontalAdductionRight || 'not_tested',
      shoulder_prom_horizontal_adduction_right_endfeel: dto.shoulderProm?.horizontalAdductionRightEndfeel || 'not_tested',
      shoulder_prom_horizontal_adduction_left: dto.shoulderProm?.horizontalAdductionLeft || 'not_tested',
      shoulder_prom_horizontal_adduction_left_endfeel: dto.shoulderProm?.horizontalAdductionLeftEndfeel || 'not_tested',

      // Elbow AROM
      elbow_arrom: dto.elbowArom?.enabled ? 'yes' : 'no',
      elbow_arrom_apply_to_all: '',
      elbow_arrom_flexion_right: dto.elbowArom?.flexionRight || 'not_tested',
      elbow_arrom_flexion_left: dto.elbowArom?.flexionLeft || 'not_tested',
      elbow_arrom_extension_right: dto.elbowArom?.extensionRight || 'not_tested',
      elbow_arrom_extension_left: dto.elbowArom?.extensionLeft || 'not_tested',
      elbow_arrom_pronation_right: dto.elbowArom?.pronationRight || 'not_tested',
      elbow_arrom_pronation_left: dto.elbowArom?.pronationLeft || 'not_tested',
      elbow_arrom_supination_right: dto.elbowArom?.supinationRight || 'not_tested',
      elbow_arrom_supination_left: dto.elbowArom?.supinationLeft || 'not_tested',

      // Elbow PROM
      elbow_prom: dto.elbowProm?.enabled ? 'yes' : 'no',
      elbow_prom_apply_to_all: '',
      elbow_prom_extension_right: dto.elbowProm?.extensionRight || 'not_tested',
      elbow_prom_extension_right_endfeel: dto.elbowProm?.extensionRightEndfeel || 'not_tested',
      elbow_prom_extension_left: dto.elbowProm?.extensionLeft || 'not_tested',
      elbow_prom_extension_left_endfeel: dto.elbowProm?.extensionLeftEndfeel || 'not_tested',
      elbow_prom_flexion_right: dto.elbowProm?.flexionRight || 'not_tested',
      elbow_prom_flexion_right_endfeel: dto.elbowProm?.flexionRightEndfeel || 'not_tested',
      elbow_prom_flexion_left: dto.elbowProm?.flexionLeft || 'not_tested',
      elbow_prom_flexion_left_endfeel: dto.elbowProm?.flexionLeftEndfeel || 'not_tested',
      elbow_prom_supination_right: dto.elbowProm?.supinationRight || 'not_tested',
      elbow_prom_supination_right_endfeel: dto.elbowProm?.supinationRightEndfeel || 'not_tested',
      elbow_prom_supination_left: dto.elbowProm?.supinationLeft || 'not_tested',
      elbow_prom_supination_left_endfeel: dto.elbowProm?.supinationLeftEndfeel || 'not_tested',
      elbow_prom_pronation_right: dto.elbowProm?.pronationRight || 'not_tested',
      elbow_prom_pronation_right_endfeel: dto.elbowProm?.pronationRightEndfeel || 'not_tested',
      elbow_prom_pronation_left: dto.elbowProm?.pronationLeft || 'not_tested',
      elbow_prom_pronation_left_endfeel: dto.elbowProm?.pronationLeftEndfeel || 'not_tested',

      // Wrist AROM
      wrist_arrom: dto.wristArom?.enabled ? 'yes' : 'no',
      wrist_arrom_apply_to_all: '',
      extension_right: dto.wristArom?.extensionRight || 'not_tested',
      extension_left: dto.wristArom?.extensionLeft || 'not_tested',
      flexion_right: dto.wristArom?.flexionRight || 'not_tested',
      flexion_left: dto.wristArom?.flexionLeft || 'not_tested',
      radial_deviation_right: dto.wristArom?.radialDeviationRight || 'not_tested',
      radial_deviation_left: dto.wristArom?.radialDeviationLeft || 'not_tested',
      ulnar_deviation_right: dto.wristArom?.ulnarDeviationRight || 'not_tested',
      ulnar_deviation_left: dto.wristArom?.ulnarDeviationLeft || 'not_tested',

      // Wrist PROM
      wrist_prom: dto.wristProm?.enabled ? 'yes' : 'no',
      wrist_prom_apply_to_all: '',
      wrist_prom_extension_right: dto.wristProm?.extensionRight || 'not_tested',
      wrist_prom_extension_right_endfeel: dto.wristProm?.extensionRightEndfeel || 'not_tested',
      wrist_prom_extension_left: dto.wristProm?.extensionLeft || 'not_tested',
      wrist_prom_extension_left_endfeel: dto.wristProm?.extensionLeftEndfeel || 'not_tested',
      wrist_prom_flexion_right: dto.wristProm?.flexionRight || 'not_tested',
      wrist_prom_flexion_right_endfeel: dto.wristProm?.flexionRightEndfeel || 'not_tested',
      wrist_prom_flexion_left: dto.wristProm?.flexionLeft || 'not_tested',
      wrist_prom_flexion_left_endfeel: dto.wristProm?.flexionLeftEndfeel || 'not_tested',
      wrist_prom_radial_deviation_right: dto.wristProm?.radialDeviationRight || 'not_tested',
      wrist_prom_radial_deviation_right_endfeel: dto.wristProm?.radialDeviationRightEndfeel || 'not_tested',
      wrist_prom_radial_deviation_left: dto.wristProm?.radialDeviationLeft || 'not_tested',
      wrist_prom_radial_deviation_left_endfeel: dto.wristProm?.radialDeviationLeftEndfeel || 'not_tested',
      wrist_prom_ulnar_deviation_right: dto.wristProm?.ulnarDeviationRight || 'not_tested',
      wrist_prom_ulnar_deviation_right_endfeel: dto.wristProm?.ulnarDeviationRightEndfeel || 'not_tested',
      wrist_prom_ulnar_deviation_left: dto.wristProm?.ulnarDeviationLeft || 'not_tested',
      wrist_prom_ulnar_deviation_left_endfeel: dto.wristProm?.ulnarDeviationLeftEndfeel || 'not_tested',

      // Hand AROM-PROM
      hand_arrom_prom: dto.handAromProm?.enabled ? 'yes' : 'no',
      calculate_total_rom: dto.handAromProm?.calculateTotalRom || false,
      thumb_arrom_prom: dto.handAromProm?.thumbAromProm?.enabled || false,

      // Thumb AROM-PROM
      thumb_cmc_palmar_abduction_right_arom: dto.handAromProm?.thumbAromProm?.cmcPalmarAbductionRightArom || 'not_tested',
      thumb_cmc_palmar_abduction_right_prom: dto.handAromProm?.thumbAromProm?.cmcPalmarAbductionRightProm || 'not_tested',
      thumb_cmc_palmar_abduction_left_arom: dto.handAromProm?.thumbAromProm?.cmcPalmarAbductionLeftArom || 'not_tested',
      thumb_cmc_palmar_abduction_left_prom: dto.handAromProm?.thumbAromProm?.cmcPalmarAbductionLeftProm || 'not_tested',
      thumb_cmc_radial_abduction_right_arom: dto.handAromProm?.thumbAromProm?.cmcRadialAbductionRightArom || 'not_tested',
      thumb_cmc_radial_abduction_right_prom: dto.handAromProm?.thumbAromProm?.cmcRadialAbductionRightProm || 'not_tested',
      thumb_cmc_radial_abduction_left_arom: dto.handAromProm?.thumbAromProm?.cmcRadialAbductionLeftArom || 'not_tested',
      thumb_cmc_radial_abduction_left_prom: dto.handAromProm?.thumbAromProm?.cmcRadialAbductionLeftProm || 'not_tested',
      thumb_cmc_adduction_right_arom: dto.handAromProm?.thumbAromProm?.cmcAdductionRightArom || 'not_tested',
      thumb_cmc_adduction_right_prom: dto.handAromProm?.thumbAromProm?.cmcAdductionRightProm || 'not_tested',
      thumb_cmc_adduction_left_arom: dto.handAromProm?.thumbAromProm?.cmcAdductionLeftArom || 'not_tested',
      thumb_cmc_adduction_left_prom: dto.handAromProm?.thumbAromProm?.cmcAdductionLeftProm || 'not_tested',
      thumb_cmc_extension_right_arom: dto.handAromProm?.thumbAromProm?.cmcExtensionRightArom || 'not_tested',
      thumb_cmc_extension_right_prom: dto.handAromProm?.thumbAromProm?.cmcExtensionRightProm || 'not_tested',
      thumb_cmc_extension_left_arom: dto.handAromProm?.thumbAromProm?.cmcExtensionLeftArom || 'not_tested',
      thumb_cmc_extension_left_prom: dto.handAromProm?.thumbAromProm?.cmcExtensionLeftProm || 'not_tested',
      thumb_cmc_flexion_right_arom: dto.handAromProm?.thumbAromProm?.cmcFlexionRightArom || 'not_tested',
      thumb_cmc_flexion_right_prom: dto.handAromProm?.thumbAromProm?.cmcFlexionRightProm || 'not_tested',
      thumb_cmc_flexion_left_arom: dto.handAromProm?.thumbAromProm?.cmcFlexionLeftArom || 'not_tested',
      thumb_cmc_flexion_left_prom: dto.handAromProm?.thumbAromProm?.cmcFlexionLeftProm || 'not_tested',
      thumb_cmc_total_motion_right_arom: dto.handAromProm?.thumbAromProm?.cmcTotalMotionRightArom || '',
      thumb_cmc_total_motion_right_prom: dto.handAromProm?.thumbAromProm?.cmcTotalMotionRightProm || '',
      thumb_cmc_total_motion_left_arom: dto.handAromProm?.thumbAromProm?.cmcTotalMotionLeftArom || '',
      thumb_cmc_total_motion_left_prom: dto.handAromProm?.thumbAromProm?.cmcTotalMotionLeftProm || '',
      thumb_mp_extension_right_arom: dto.handAromProm?.thumbAromProm?.mpExtensionRightArom || 'not_tested',
      thumb_mp_extension_right_prom: dto.handAromProm?.thumbAromProm?.mpExtensionRightProm || 'not_tested',
      thumb_mp_extension_left_arom: dto.handAromProm?.thumbAromProm?.mpExtensionLeftArom || 'not_tested',
      thumb_mp_extension_left_prom: dto.handAromProm?.thumbAromProm?.mpExtensionLeftProm || 'not_tested',
      thumb_mp_flexion_right_arom: dto.handAromProm?.thumbAromProm?.mpFlexionRightArom || 'not_tested',
      thumb_mp_flexion_right_prom: dto.handAromProm?.thumbAromProm?.mpFlexionRightProm || 'not_tested',
      thumb_mp_flexion_left_arom: dto.handAromProm?.thumbAromProm?.mpFlexionLeftArom || 'not_tested',
      thumb_mp_flexion_left_prom: dto.handAromProm?.thumbAromProm?.mpFlexionLeftProm || 'not_tested',
      thumb_mp_total_motion_right_arom: dto.handAromProm?.thumbAromProm?.mpTotalMotionRightArom || '',
      thumb_mp_total_motion_right_prom: dto.handAromProm?.thumbAromProm?.mpTotalMotionRightProm || '',
      thumb_mp_total_motion_left_arom: dto.handAromProm?.thumbAromProm?.mpTotalMotionLeftArom || '',
      thumb_mp_total_motion_left_prom: dto.handAromProm?.thumbAromProm?.mpTotalMotionLeftProm || '',
      thumb_ip_extension_right_arom: dto.handAromProm?.thumbAromProm?.ipExtensionRightArom || 'not_tested',
      thumb_ip_extension_right_prom: dto.handAromProm?.thumbAromProm?.ipExtensionRightProm || 'not_tested',
      thumb_ip_extension_left_arom: dto.handAromProm?.thumbAromProm?.ipExtensionLeftArom || 'not_tested',
      thumb_ip_extension_left_prom: dto.handAromProm?.thumbAromProm?.ipExtensionLeftProm || 'not_tested',
      thumb_ip_flexion_right_arom: dto.handAromProm?.thumbAromProm?.ipFlexionRightArom || 'not_tested',
      thumb_ip_flexion_right_prom: dto.handAromProm?.thumbAromProm?.ipFlexionRightProm || 'not_tested',
      thumb_ip_flexion_left_arom: dto.handAromProm?.thumbAromProm?.ipFlexionLeftArom || 'not_tested',
      thumb_ip_flexion_left_prom: dto.handAromProm?.thumbAromProm?.ipFlexionLeftProm || 'not_tested',
      thumb_ip_total_motion_right_arom: dto.handAromProm?.thumbAromProm?.ipTotalMotionRightArom || '',
      thumb_ip_total_motion_right_prom: dto.handAromProm?.thumbAromProm?.ipTotalMotionRightProm || '',
      thumb_ip_total_motion_left_arom: dto.handAromProm?.thumbAromProm?.ipTotalMotionLeftArom || '',
      thumb_ip_total_motion_left_prom: dto.handAromProm?.thumbAromProm?.ipTotalMotionLeftProm || '',
      thumb_comments: dto.handAromProm?.thumbAromProm?.comments || '',

      // Index Finger AROM-PROM
      index_finger_arrom_prom: dto.handAromProm?.indexFingerAromProm?.enabled || false,
      index_mp_adduction_right_arom: dto.handAromProm?.indexFingerAromProm?.mpAdductionRightArom || 'not_tested',
      index_mp_adduction_right_prom: dto.handAromProm?.indexFingerAromProm?.mpAdductionRightProm || 'not_tested',
      index_mp_adduction_left_arom: dto.handAromProm?.indexFingerAromProm?.mpAdductionLeftArom || 'not_tested',
      index_mp_adduction_left_prom: dto.handAromProm?.indexFingerAromProm?.mpAdductionLeftProm || 'not_tested',
      index_mp_extension_right_arom: dto.handAromProm?.indexFingerAromProm?.mpExtensionRightArom || 'not_tested',
      index_mp_extension_right_prom: dto.handAromProm?.indexFingerAromProm?.mpExtensionRightProm || 'not_tested',
      index_mp_extension_left_arom: dto.handAromProm?.indexFingerAromProm?.mpExtensionLeftArom || 'not_tested',
      index_mp_extension_left_prom: dto.handAromProm?.indexFingerAromProm?.mpExtensionLeftProm || 'not_tested',
      index_mp_flexion_right_arom: dto.handAromProm?.indexFingerAromProm?.mpFlexionRightArom || 'not_tested',
      index_mp_flexion_right_prom: dto.handAromProm?.indexFingerAromProm?.mpFlexionRightProm || 'not_tested',
      index_mp_flexion_left_arom: dto.handAromProm?.indexFingerAromProm?.mpFlexionLeftArom || 'not_tested',
      index_mp_flexion_left_prom: dto.handAromProm?.indexFingerAromProm?.mpFlexionLeftProm || 'not_tested',
      index_mp_total_motion_right_arom: dto.handAromProm?.indexFingerAromProm?.mpTotalMotionRightArom || '',
      index_mp_total_motion_right_prom: dto.handAromProm?.indexFingerAromProm?.mpTotalMotionRightProm || '',
      index_mp_total_motion_left_arom: dto.handAromProm?.indexFingerAromProm?.mpTotalMotionLeftArom || '',
      index_mp_total_motion_left_prom: dto.handAromProm?.indexFingerAromProm?.mpTotalMotionLeftProm || '',
      index_pip_extension_right_arom: dto.handAromProm?.indexFingerAromProm?.pipExtensionRightArom || 'not_tested',
      index_pip_extension_right_prom: dto.handAromProm?.indexFingerAromProm?.pipExtensionRightProm || 'not_tested',
      index_pip_extension_left_arom: dto.handAromProm?.indexFingerAromProm?.pipExtensionLeftArom || 'not_tested',
      index_pip_extension_left_prom: dto.handAromProm?.indexFingerAromProm?.pipExtensionLeftProm || 'not_tested',
      index_pip_flexion_right_arom: dto.handAromProm?.indexFingerAromProm?.pipFlexionRightArom || 'not_tested',
      index_pip_flexion_right_prom: dto.handAromProm?.indexFingerAromProm?.pipFlexionRightProm || 'not_tested',
      index_pip_flexion_left_arom: dto.handAromProm?.indexFingerAromProm?.pipFlexionLeftArom || 'not_tested',
      index_pip_flexion_left_prom: dto.handAromProm?.indexFingerAromProm?.pipFlexionLeftProm || 'not_tested',
      index_pip_total_motion_right_arom: dto.handAromProm?.indexFingerAromProm?.pipTotalMotionRightArom || '',
      index_pip_total_motion_right_prom: dto.handAromProm?.indexFingerAromProm?.pipTotalMotionRightProm || '',
      index_pip_total_motion_left_arom: dto.handAromProm?.indexFingerAromProm?.pipTotalMotionLeftArom || '',
      index_pip_total_motion_left_prom: dto.handAromProm?.indexFingerAromProm?.pipTotalMotionLeftProm || '',
      index_dip_extension_right_arom: dto.handAromProm?.indexFingerAromProm?.dipExtensionRightArom || 'not_tested',
      index_dip_extension_right_prom: dto.handAromProm?.indexFingerAromProm?.dipExtensionRightProm || 'not_tested',
      index_dip_extension_left_arom: dto.handAromProm?.indexFingerAromProm?.dipExtensionLeftArom || 'not_tested',
      index_dip_extension_left_prom: dto.handAromProm?.indexFingerAromProm?.dipExtensionLeftProm || 'not_tested',
      index_dip_flexion_right_arom: dto.handAromProm?.indexFingerAromProm?.dipFlexionRightArom || 'not_tested',
      index_dip_flexion_right_prom: dto.handAromProm?.indexFingerAromProm?.dipFlexionRightProm || 'not_tested',
      index_dip_flexion_left_arom: dto.handAromProm?.indexFingerAromProm?.dipFlexionLeftArom || 'not_tested',
      index_dip_flexion_left_prom: dto.handAromProm?.indexFingerAromProm?.dipFlexionLeftProm || 'not_tested',
      index_dip_total_motion_right_arom: dto.handAromProm?.indexFingerAromProm?.dipTotalMotionRightArom || '',
      index_dip_total_motion_right_prom: dto.handAromProm?.indexFingerAromProm?.dipTotalMotionRightProm || '',
      index_dip_total_motion_left_arom: dto.handAromProm?.indexFingerAromProm?.dipTotalMotionLeftArom || '',
      index_dip_total_motion_left_prom: dto.handAromProm?.indexFingerAromProm?.dipTotalMotionLeftProm || '',
      index_comments: dto.handAromProm?.indexFingerAromProm?.comments || '',

      middle_finger_arrom_prom: dto.handAromProm?.middleFingerAromProm?.enabled || false,
      middle_mp_adduction_right_arom: dto.handAromProm?.middleFingerAromProm?.mpAdductionRightArom || 'not_tested',
      middle_mp_adduction_right_prom: dto.handAromProm?.middleFingerAromProm?.mpAdductionRightProm || 'not_tested',
      middle_mp_adduction_left_arom: dto.handAromProm?.middleFingerAromProm?.mpAdductionLeftArom || 'not_tested',
      middle_mp_adduction_left_prom: dto.handAromProm?.middleFingerAromProm?.mpAdductionLeftProm || 'not_tested',
      middle_mp_extension_right_arom: dto.handAromProm?.middleFingerAromProm?.mpExtensionRightArom || 'not_tested',
      middle_mp_extension_right_prom: dto.handAromProm?.middleFingerAromProm?.mpExtensionRightProm || 'not_tested',
      middle_mp_extension_left_arom: dto.handAromProm?.middleFingerAromProm?.mpExtensionLeftArom || 'not_tested',
      middle_mp_extension_left_prom: dto.handAromProm?.middleFingerAromProm?.mpExtensionLeftProm || 'not_tested',
      middle_mp_flexion_right_arom: dto.handAromProm?.middleFingerAromProm?.mpFlexionRightArom || 'not_tested',
      middle_mp_flexion_right_prom: dto.handAromProm?.middleFingerAromProm?.mpFlexionRightProm || 'not_tested',
      middle_mp_flexion_left_arom: dto.handAromProm?.middleFingerAromProm?.mpFlexionLeftArom || 'not_tested',
      middle_mp_flexion_left_prom: dto.handAromProm?.middleFingerAromProm?.mpFlexionLeftProm || 'not_tested',
      middle_mp_total_motion_right_arom: dto.handAromProm?.middleFingerAromProm?.mpTotalMotionRightArom || '',
      middle_mp_total_motion_right_prom: dto.handAromProm?.middleFingerAromProm?.mpTotalMotionRightProm || '',
      middle_mp_total_motion_left_arom: dto.handAromProm?.middleFingerAromProm?.mpTotalMotionLeftArom || '',
      middle_mp_total_motion_left_prom: dto.handAromProm?.middleFingerAromProm?.mpTotalMotionLeftProm || '',
      middle_pip_extension_right_arom: dto.handAromProm?.middleFingerAromProm?.pipExtensionRightArom || 'not_tested',
      middle_pip_extension_right_prom: dto.handAromProm?.middleFingerAromProm?.pipExtensionRightProm || 'not_tested',
      middle_pip_extension_left_arom: dto.handAromProm?.middleFingerAromProm?.pipExtensionLeftArom || 'not_tested',
      middle_pip_extension_left_prom: dto.handAromProm?.middleFingerAromProm?.pipExtensionLeftProm || 'not_tested',
      middle_pip_flexion_right_arom: dto.handAromProm?.middleFingerAromProm?.pipFlexionRightArom || 'not_tested',
      middle_pip_flexion_right_prom: dto.handAromProm?.middleFingerAromProm?.pipFlexionRightProm || 'not_tested',
      middle_pip_flexion_left_arom: dto.handAromProm?.middleFingerAromProm?.pipFlexionLeftArom || 'not_tested',
      middle_pip_flexion_left_prom: dto.handAromProm?.middleFingerAromProm?.pipFlexionLeftProm || 'not_tested',
      middle_pip_total_motion_right_arom: dto.handAromProm?.middleFingerAromProm?.pipTotalMotionRightArom || '',
      middle_pip_total_motion_right_prom: dto.handAromProm?.middleFingerAromProm?.pipTotalMotionRightProm || '',
      middle_pip_total_motion_left_arom: dto.handAromProm?.middleFingerAromProm?.pipTotalMotionLeftArom || '',
      middle_pip_total_motion_left_prom: dto.handAromProm?.middleFingerAromProm?.pipTotalMotionLeftProm || '',
      middle_dip_extension_right_arom: dto.handAromProm?.middleFingerAromProm?.dipExtensionRightArom || 'not_tested',
      middle_dip_extension_right_prom: dto.handAromProm?.middleFingerAromProm?.dipExtensionRightProm || 'not_tested',
      middle_dip_extension_left_arom: dto.handAromProm?.middleFingerAromProm?.dipExtensionLeftArom || 'not_tested',
      middle_dip_extension_left_prom: dto.handAromProm?.middleFingerAromProm?.dipExtensionLeftProm || 'not_tested',
      middle_dip_flexion_right_arom: dto.handAromProm?.middleFingerAromProm?.dipFlexionRightArom || 'not_tested',
      middle_dip_flexion_right_prom: dto.handAromProm?.middleFingerAromProm?.dipFlexionRightProm || 'not_tested',
      middle_dip_flexion_left_arom: dto.handAromProm?.middleFingerAromProm?.dipFlexionLeftArom || 'not_tested',
      middle_dip_flexion_left_prom: dto.handAromProm?.middleFingerAromProm?.dipFlexionLeftProm || 'not_tested',
      middle_dip_total_motion_right_arom: dto.handAromProm?.middleFingerAromProm?.dipTotalMotionRightArom || '',
      middle_dip_total_motion_right_prom: dto.handAromProm?.middleFingerAromProm?.dipTotalMotionRightProm || '',
      middle_dip_total_motion_left_arom: dto.handAromProm?.middleFingerAromProm?.dipTotalMotionLeftArom || '',
      middle_dip_total_motion_left_prom: dto.handAromProm?.middleFingerAromProm?.dipTotalMotionLeftProm || '',
      middle_comments: dto.handAromProm?.middleFingerAromProm?.comments || '',

      ring_finger_arrom_prom: dto.handAromProm?.ringFingerAromProm?.enabled || false,
      ring_mp_adduction_right_arom: dto.handAromProm?.ringFingerAromProm?.mpAdductionRightArom || 'not_tested',
      ring_mp_adduction_right_prom: dto.handAromProm?.ringFingerAromProm?.mpAdductionRightProm || 'not_tested',
      ring_mp_adduction_left_arom: dto.handAromProm?.ringFingerAromProm?.mpAdductionLeftArom || 'not_tested',
      ring_mp_adduction_left_prom: dto.handAromProm?.ringFingerAromProm?.mpAdductionLeftProm || 'not_tested',
      ring_mp_extension_right_arom: dto.handAromProm?.ringFingerAromProm?.mpExtensionRightArom || 'not_tested',
      ring_mp_extension_right_prom: dto.handAromProm?.ringFingerAromProm?.mpExtensionRightProm || 'not_tested',
      ring_mp_extension_left_arom: dto.handAromProm?.ringFingerAromProm?.mpExtensionLeftArom || 'not_tested',
      ring_mp_extension_left_prom: dto.handAromProm?.ringFingerAromProm?.mpExtensionLeftProm || 'not_tested',
      ring_mp_flexion_right_arom: dto.handAromProm?.ringFingerAromProm?.mpFlexionRightArom || 'not_tested',
      ring_mp_flexion_right_prom: dto.handAromProm?.ringFingerAromProm?.mpFlexionRightProm || 'not_tested',
      ring_mp_flexion_left_arom: dto.handAromProm?.ringFingerAromProm?.mpFlexionLeftArom || 'not_tested',
      ring_mp_flexion_left_prom: dto.handAromProm?.ringFingerAromProm?.mpFlexionLeftProm || 'not_tested',
      ring_mp_total_motion_right_arom: dto.handAromProm?.ringFingerAromProm?.mpTotalMotionRightArom || '',
      ring_mp_total_motion_right_prom: dto.handAromProm?.ringFingerAromProm?.mpTotalMotionRightProm || '',
      ring_mp_total_motion_left_arom: dto.handAromProm?.ringFingerAromProm?.mpTotalMotionLeftArom || '',
      ring_mp_total_motion_left_prom: dto.handAromProm?.ringFingerAromProm?.mpTotalMotionLeftProm || '',
      ring_pip_extension_right_arom: dto.handAromProm?.ringFingerAromProm?.pipExtensionRightArom || 'not_tested',
      ring_pip_extension_right_prom: dto.handAromProm?.ringFingerAromProm?.pipExtensionRightProm || 'not_tested',
      ring_pip_extension_left_arom: dto.handAromProm?.ringFingerAromProm?.pipExtensionLeftArom || 'not_tested',
      ring_pip_extension_left_prom: dto.handAromProm?.ringFingerAromProm?.pipExtensionLeftProm || 'not_tested',
      ring_pip_flexion_right_arom: dto.handAromProm?.ringFingerAromProm?.pipFlexionRightArom || 'not_tested',
      ring_pip_flexion_right_prom: dto.handAromProm?.ringFingerAromProm?.pipFlexionRightProm || 'not_tested',
      ring_pip_flexion_left_arom: dto.handAromProm?.ringFingerAromProm?.pipFlexionLeftArom || 'not_tested',
      ring_pip_flexion_left_prom: dto.handAromProm?.ringFingerAromProm?.pipFlexionLeftProm || 'not_tested',
      ring_pip_total_motion_right_arom: dto.handAromProm?.ringFingerAromProm?.pipTotalMotionRightArom || '',
      ring_pip_total_motion_right_prom: dto.handAromProm?.ringFingerAromProm?.pipTotalMotionRightProm || '',
      ring_pip_total_motion_left_arom: dto.handAromProm?.ringFingerAromProm?.pipTotalMotionLeftArom || '',
      ring_pip_total_motion_left_prom: dto.handAromProm?.ringFingerAromProm?.pipTotalMotionLeftProm || '',
      ring_dip_extension_right_arom: dto.handAromProm?.ringFingerAromProm?.dipExtensionRightArom || 'not_tested',
      ring_dip_extension_right_prom: dto.handAromProm?.ringFingerAromProm?.dipExtensionRightProm || 'not_tested',
      ring_dip_extension_left_arom: dto.handAromProm?.ringFingerAromProm?.dipExtensionLeftArom || 'not_tested',
      ring_dip_extension_left_prom: dto.handAromProm?.ringFingerAromProm?.dipExtensionLeftProm || 'not_tested',
      ring_dip_flexion_right_arom: dto.handAromProm?.ringFingerAromProm?.dipFlexionRightArom || 'not_tested',
      ring_dip_flexion_right_prom: dto.handAromProm?.ringFingerAromProm?.dipFlexionRightProm || 'not_tested',
      ring_dip_flexion_left_arom: dto.handAromProm?.ringFingerAromProm?.dipFlexionLeftArom || 'not_tested',
      ring_dip_flexion_left_prom: dto.handAromProm?.ringFingerAromProm?.dipFlexionLeftProm || 'not_tested',
      ring_dip_total_motion_right_arom: dto.handAromProm?.ringFingerAromProm?.dipTotalMotionRightArom || '',
      ring_dip_total_motion_right_prom: dto.handAromProm?.ringFingerAromProm?.dipTotalMotionRightProm || '',
      ring_dip_total_motion_left_arom: dto.handAromProm?.ringFingerAromProm?.dipTotalMotionLeftArom || '',
      ring_dip_total_motion_left_prom: dto.handAromProm?.ringFingerAromProm?.dipTotalMotionLeftProm || '',
      ring_comments: dto.handAromProm?.ringFingerAromProm?.comments || '',

      small_finger_arrom_prom: dto.handAromProm?.smallFingerAromProm?.enabled || false,
      small_mp_adduction_right_arom: dto.handAromProm?.smallFingerAromProm?.mpAdductionRightArom || 'not_tested',
      small_mp_adduction_right_prom: dto.handAromProm?.smallFingerAromProm?.mpAdductionRightProm || 'not_tested',
      small_mp_adduction_left_arom: dto.handAromProm?.smallFingerAromProm?.mpAdductionLeftArom || 'not_tested',
      small_mp_adduction_left_prom: dto.handAromProm?.smallFingerAromProm?.mpAdductionLeftProm || 'not_tested',
      small_mp_extension_right_arom: dto.handAromProm?.smallFingerAromProm?.mpExtensionRightArom || 'not_tested',
      small_mp_extension_right_prom: dto.handAromProm?.smallFingerAromProm?.mpExtensionRightProm || 'not_tested',
      small_mp_extension_left_arom: dto.handAromProm?.smallFingerAromProm?.mpExtensionLeftArom || 'not_tested',
      small_mp_extension_left_prom: dto.handAromProm?.smallFingerAromProm?.mpExtensionLeftProm || 'not_tested',
      small_mp_flexion_right_arom: dto.handAromProm?.smallFingerAromProm?.mpFlexionRightArom || 'not_tested',
      small_mp_flexion_right_prom: dto.handAromProm?.smallFingerAromProm?.mpFlexionRightProm || 'not_tested',
      small_mp_flexion_left_arom: dto.handAromProm?.smallFingerAromProm?.mpFlexionLeftArom || 'not_tested',
      small_mp_flexion_left_prom: dto.handAromProm?.smallFingerAromProm?.mpFlexionLeftProm || 'not_tested',
      small_mp_total_motion_right_arom: dto.handAromProm?.smallFingerAromProm?.mpTotalMotionRightArom || '',
      small_mp_total_motion_right_prom: dto.handAromProm?.smallFingerAromProm?.mpTotalMotionRightProm || '',
      small_mp_total_motion_left_arom: dto.handAromProm?.smallFingerAromProm?.mpTotalMotionLeftArom || '',
      small_mp_total_motion_left_prom: dto.handAromProm?.smallFingerAromProm?.mpTotalMotionLeftProm || '',
      small_pip_extension_right_arom: dto.handAromProm?.smallFingerAromProm?.pipExtensionRightArom || 'not_tested',
      small_pip_extension_right_prom: dto.handAromProm?.smallFingerAromProm?.pipExtensionRightProm || 'not_tested',
      small_pip_extension_left_arom: dto.handAromProm?.smallFingerAromProm?.pipExtensionLeftArom || 'not_tested',
      small_pip_extension_left_prom: dto.handAromProm?.smallFingerAromProm?.pipExtensionLeftProm || 'not_tested',
      small_pip_flexion_right_arom: dto.handAromProm?.smallFingerAromProm?.pipFlexionRightArom || 'not_tested',
      small_pip_flexion_right_prom: dto.handAromProm?.smallFingerAromProm?.pipFlexionRightProm || 'not_tested',
      small_pip_flexion_left_arom: dto.handAromProm?.smallFingerAromProm?.pipFlexionLeftArom || 'not_tested',
      small_pip_flexion_left_prom: dto.handAromProm?.smallFingerAromProm?.pipFlexionLeftProm || 'not_tested',
      small_pip_total_motion_right_arom: dto.handAromProm?.smallFingerAromProm?.pipTotalMotionRightArom || '',
      small_pip_total_motion_right_prom: dto.handAromProm?.smallFingerAromProm?.pipTotalMotionRightProm || '',
      small_pip_total_motion_left_arom: dto.handAromProm?.smallFingerAromProm?.pipTotalMotionLeftArom || '',
      small_pip_total_motion_left_prom: dto.handAromProm?.smallFingerAromProm?.pipTotalMotionLeftProm || '',
      small_dip_extension_right_arom: dto.handAromProm?.smallFingerAromProm?.dipExtensionRightArom || 'not_tested',
      small_dip_extension_right_prom: dto.handAromProm?.smallFingerAromProm?.dipExtensionRightProm || 'not_tested',
      small_dip_extension_left_arom: dto.handAromProm?.smallFingerAromProm?.dipExtensionLeftArom || 'not_tested',
      small_dip_extension_left_prom: dto.handAromProm?.smallFingerAromProm?.dipExtensionLeftProm || 'not_tested',
      small_dip_flexion_right_arom: dto.handAromProm?.smallFingerAromProm?.dipFlexionRightArom || 'not_tested',
      small_dip_flexion_right_prom: dto.handAromProm?.smallFingerAromProm?.dipFlexionRightProm || 'not_tested',
      small_dip_flexion_left_arom: dto.handAromProm?.smallFingerAromProm?.dipFlexionLeftArom || 'not_tested',
      small_dip_flexion_left_prom: dto.handAromProm?.smallFingerAromProm?.dipFlexionLeftProm || 'not_tested',
      small_dip_total_motion_right_arom: dto.handAromProm?.smallFingerAromProm?.dipTotalMotionRightArom || '',
      small_dip_total_motion_right_prom: dto.handAromProm?.smallFingerAromProm?.dipTotalMotionRightProm || '',
      small_dip_total_motion_left_arom: dto.handAromProm?.smallFingerAromProm?.dipTotalMotionLeftArom || '',
      small_dip_total_motion_left_prom: dto.handAromProm?.smallFingerAromProm?.dipTotalMotionLeftProm || '',
      small_comments: dto.handAromProm?.smallFingerAromProm?.comments || '',

      // Thoracic AROM Sitting with Passive Overpressure
      thoracic_arrom_sitting_with_passive_overpressure: dto.thoracicAromSittingWithPassiveOverpressure?.enabled ? 'yes' : 'no',
      thoracic_arrom_sitting_apply_to_all: '',
      thoracic_arrom_sitting_forward_bending: dto.thoracicAromSittingWithPassiveOverpressure?.forwardBending || 'not_tested',
      thoracic_arrom_sitting_backward_bending: dto.thoracicAromSittingWithPassiveOverpressure?.backwardBending || 'not_tested',
      thoracic_arrom_sitting_right_rotation: dto.thoracicAromSittingWithPassiveOverpressure?.rightRotation || 'not_tested',
      thoracic_arrom_sitting_left_rotation: dto.thoracicAromSittingWithPassiveOverpressure?.leftRotation || 'not_tested',
      thoracic_arrom_sitting_right_side_bending: dto.thoracicAromSittingWithPassiveOverpressure?.rightSideBending || 'not_tested',
      thoracic_arrom_sitting_left_side_bending: dto.thoracicAromSittingWithPassiveOverpressure?.leftSideBending || 'not_tested',

      //Thoracic AROM Standing
      thoracic_arrom_standing: dto.thoracicAROMStandingModel?.enabled ? 'yes' : 'no',
      thoracic_arrom_standing_forward_bending: dto.thoracicAROMStandingModel?.forwardBending || 'not_tested',
      thoracic_arrom_standing_backward_bending: dto.thoracicAROMStandingModel?.backwardBending || 'not_tested',
      thoracic_arrom_standing_right_rotation: dto.thoracicAROMStandingModel?.rightRotation || 'not_tested',
      thoracic_arrom_standing_left_rotation: dto.thoracicAROMStandingModel?.leftRotation || 'not_tested',
      thoracic_arrom_standing_right_side_bending: dto.thoracicAROMStandingModel?.rightSideBending || 'not_tested',
      thoracic_arrom_standing_left_side_bending: dto.thoracicAROMStandingModel?.leftSideBending || 'not_tested',

      //Lumbar AROM
      lumbar_arrom: dto.lumbarAROMModel?.enabled ? 'yes' : 'no',
      lumbar_arrom_forward_bending:
        dto.lumbarAROMModel?.lumbarArromForwardBending || 'not_tested',

      lumbar_arrom_backward_bending:
        dto.lumbarAROMModel?.lumbarArromBackwardBending || 'not_tested',

      lumbar_arrom_right_rotation:
        dto.lumbarAROMModel?.lumbarArromRightRotation || 'not_tested',

      lumbar_arrom_left_rotation:
        dto.lumbarAROMModel?.lumbarArromLeftRotation || 'not_tested',

      lumbar_arrom_right_side_bending:
        dto.lumbarAROMModel?.lumbarArromRightSideBending || 'not_tested',

      lumbar_arrom_left_side_bending:
        dto.lumbarAROMModel?.lumbarArromLeftSideBending || 'not_tested',
    };
  }

  private mapNoLimitationsNoted(formValue: any): NoLimitationsNotedModel {
    const enabled = formValue.no_limitations_noted === 'no';
    const model: NoLimitationsNotedModel = { enabled };

    if (enabled) {
      model.arom = formValue.arom || false;

      if (formValue.prom) {
        model.prom = {
          enabled: formValue.prom,
          cervical: formValue.prom_cervical || false,
          thoracic: formValue.prom_thoracic || false,
          shoulder: formValue.prom_shoulder || false,
          elbow: formValue.prom_elbow || false,
          wrist: formValue.prom_wrist || false,
          hand: formValue.prom_hand || false,
          lumbar: formValue.prom_lumbar || false,
          hip: formValue.prom_hip || false,
          knee: formValue.prom_knee || false,
          ankle: formValue.prom_ankle || false,
          feet: formValue.prom_feet || false,
          comments: formValue.prom_comments || ''
        };
      }
    }

    return model;
  }

  private mapCervicalArom(formValue: any): CervicalAROMModel {
    const enabled = formValue.cervical_arrom === 'yes';
    const model: CervicalAROMModel = { enabled };

    if (enabled) {
      model.forwardBending = formValue.cervical_forward_bending || 'not_tested';
      model.backwardBending = formValue.cervical_backward_bending || 'not_tested';
      model.rightRotation = formValue.cervical_right_rotation || 'not_tested';
      model.leftRotation = formValue.cervical_left_rotation || 'not_tested';
      model.rightSideBending = formValue.cervical_right_side_bending || 'not_tested';
      model.leftSideBending = formValue.cervical_left_side_bending || 'not_tested';
      model.comments = formValue.cervical_comments || '';
    }

    return model;
  }

  private mapCostovertebralExpansion(formValue: any): CostovertebralExpansionModel {
    const enabled = formValue.costovertebral_expansion === 'yes';
    const model: CostovertebralExpansionModel = { enabled };

    if (enabled) {
      model.t4 = formValue.costovertebral_t4 || 'not_tested';
      model.t9 = formValue.costovertebral_t9 || 'not_tested';
      model.umbilicus = formValue.costovertebral_umbilicus || 'not_tested';
    }

    return model;
  }

  private mapShoulderArom(formValue: any): ShoulderAROMModel {
    const enabled = formValue.shoulder_arrom === 'yes';
    const model: ShoulderAROMModel = { enabled };

    if (enabled) {
      model.flexionRight = formValue.shoulder_flexion_right || 'not_tested';
      model.flexionLeft = formValue.shoulder_flexion_left || 'not_tested';
      model.scaptionRight = formValue.shoulder_scaption_right || 'not_tested';
      model.scaptionLeft = formValue.shoulder_scaption_left || 'not_tested';
      model.abductionRight = formValue.shoulder_abduction_right || 'not_tested';
      model.abductionLeft = formValue.shoulder_abduction_left || 'not_tested';
      model.extensionRight = formValue.shoulder_extension_right || 'not_tested';
      model.extensionLeft = formValue.shoulder_extension_left || 'not_tested';
      model.functionalExternalRotationReachRight = formValue.shoulder_functional_er_reach_right || 'not_tested';
      model.functionalExternalRotationReachLeft = formValue.shoulder_functional_er_reach_left || 'not_tested';
      model.functionalInternalRotationReachRight = formValue.shoulder_functional_ir_reach_right || 'not_tested';
      model.functionalInternalRotationReachLeft = formValue.shoulder_functional_ir_reach_left || 'not_tested';
      model.erNeutralPositionRight = formValue.shoulder_er_neutral_right || 'not_tested';
      model.erNeutralPositionLeft = formValue.shoulder_er_neutral_left || 'not_tested';
      model.irNeutralPositionRight = formValue.shoulder_ir_neutral_right || 'not_tested';
      model.irNeutralPositionLeft = formValue.shoulder_ir_neutral_left || 'not_tested';
      model.horizontalAbductionRight = formValue.shoulder_horizontal_abduction_right || 'not_tested';
      model.horizontalAbductionLeft = formValue.shoulder_horizontal_abduction_left || 'not_tested';
      model.horizontalAdductionRight = formValue.shoulder_horizontal_adduction_right || 'not_tested';
      model.horizontalAdductionLeft = formValue.shoulder_horizontal_adduction_left || 'not_tested';
    }

    return model;
  }

  private mapShoulderProm(formValue: any): ShoulderPROMModel {
    const enabled = formValue.shoulder_prom === 'yes';
    const model: ShoulderPROMModel = { enabled };

    if (enabled) {
      model.flexionRight = formValue.shoulder_prom_flexion_right || 'not_tested';
      model.flexionRightEndfeel = formValue.shoulder_prom_flexion_right_endfeel || 'not_tested';
      model.flexionLeft = formValue.shoulder_prom_flexion_left || 'not_tested';
      model.flexionLeftEndfeel = formValue.shoulder_prom_flexion_left_endfeel || 'not_tested';
      model.scaptionRight = formValue.shoulder_prom_scaption_right || 'not_tested';
      model.scaptionRightEndfeel = formValue.shoulder_prom_scaption_right_endfeel || 'not_tested';
      model.scaptionLeft = formValue.shoulder_prom_scaption_left || 'not_tested';
      model.scaptionLeftEndfeel = formValue.shoulder_prom_scaption_left_endfeel || 'not_tested';
      model.abductionRight = formValue.shoulder_prom_abduction_right || 'not_tested';
      model.abductionRightEndfeel = formValue.shoulder_prom_abduction_right_endfeel || 'not_tested';
      model.abductionLeft = formValue.shoulder_prom_abduction_left || 'not_tested';
      model.abductionLeftEndfeel = formValue.shoulder_prom_abduction_left_endfeel || 'not_tested';
      model.extensionRight = formValue.shoulder_prom_extension_right || 'not_tested';
      model.extensionRightEndfeel = formValue.shoulder_prom_extension_right_endfeel || 'not_tested';
      model.extensionLeft = formValue.shoulder_prom_extension_left || 'not_tested';
      model.extensionLeftEndfeel = formValue.shoulder_prom_extension_left_endfeel || 'not_tested';
      model.erNeutralPositionRight = formValue.shoulder_prom_er_neutral_right || 'not_tested';
      model.erNeutralPositionRightEndfeel = formValue.shoulder_prom_er_neutral_right_endfeel || 'not_tested';
      model.erNeutralPositionLeft = formValue.shoulder_prom_er_neutral_left || 'not_tested';
      model.erNeutralPositionLeftEndfeel = formValue.shoulder_prom_er_neutral_left_endfeel || 'not_tested';
      model.irNeutralPositionRight = formValue.shoulder_prom_ir_neutral_right || 'not_tested';
      model.irNeutralPositionRightEndfeel = formValue.shoulder_prom_ir_neutral_right_endfeel || 'not_tested';
      model.irNeutralPositionLeft = formValue.shoulder_prom_ir_neutral_left || 'not_tested';
      model.irNeutralPositionLeftEndfeel = formValue.shoulder_prom_ir_neutral_left_endfeel || 'not_tested';
      model.erScapularPlaneRight = formValue.shoulder_prom_er_scapular_plane_right || 'not_tested';
      model.erScapularPlaneRightEndfeel = formValue.shoulder_prom_er_scapular_plane_right_endfeel || 'not_tested';
      model.erScapularPlaneLeft = formValue.shoulder_prom_er_scapular_plane_left || 'not_tested';
      model.erScapularPlaneLeftEndfeel = formValue.shoulder_prom_er_scapular_plane_left_endfeel || 'not_tested';
      model.irScapularPlaneRight = formValue.shoulder_prom_ir_scapular_plane_right || 'not_tested';
      model.irScapularPlaneRightEndfeel = formValue.shoulder_prom_ir_scapular_plane_right_endfeel || 'not_tested';
      model.irScapularPlaneLeft = formValue.shoulder_prom_ir_scapular_plane_left || 'not_tested';
      model.irScapularPlaneLeftEndfeel = formValue.shoulder_prom_ir_scapular_plane_left_endfeel || 'not_tested';
      model.er90DegreesAbductionRight = formValue.shoulder_prom_er_90_degrees_abduction_right || 'not_tested';
      model.er90DegreesAbductionRightEndfeel = formValue.shoulder_prom_er_90_degrees_abduction_right_endfeel || 'not_tested';
      model.er90DegreesAbductionLeft = formValue.shoulder_prom_er_90_degrees_abduction_left || 'not_tested';
      model.er90DegreesAbductionLeftEndfeel = formValue.shoulder_prom_er_90_degrees_abduction_left_endfeel || 'not_tested';
      model.ir90DegreesAbductionRight = formValue.shoulder_prom_ir_90_degrees_abduction_right || 'not_tested';
      model.ir90DegreesAbductionRightEndfeel = formValue.shoulder_prom_ir_90_degrees_abduction_right_endfeel || 'not_tested';
      model.ir90DegreesAbductionLeft = formValue.shoulder_prom_ir_90_degrees_abduction_left || 'not_tested';
      model.ir90DegreesAbductionLeftEndfeel = formValue.shoulder_prom_ir_90_degrees_abduction_left_endfeel || 'not_tested';
      model.irSleeperStretchRight = formValue.shoulder_prom_ir_sleeper_stretch_right || 'not_tested';
      model.irSleeperStretchRightEndfeel = formValue.shoulder_prom_ir_sleeper_stretch_right_endfeel || 'not_tested';
      model.irSleeperStretchLeft = formValue.shoulder_prom_ir_sleeper_stretch_left || 'not_tested';
      model.irSleeperStretchLeftEndfeel = formValue.shoulder_prom_ir_sleeper_stretch_left_endfeel || 'not_tested';
      model.horizontalAbductionRight = formValue.shoulder_prom_horizontal_abduction_right || 'not_tested';
      model.horizontalAbductionRightEndfeel = formValue.shoulder_prom_horizontal_abduction_right_endfeel || 'not_tested';
      model.horizontalAbductionLeft = formValue.shoulder_prom_horizontal_abduction_left || 'not_tested';
      model.horizontalAbductionLeftEndfeel = formValue.shoulder_prom_horizontal_abduction_left_endfeel || 'not_tested';
      model.horizontalAdductionRight = formValue.shoulder_prom_horizontal_adduction_right || 'not_tested';
      model.horizontalAdductionRightEndfeel = formValue.shoulder_prom_horizontal_adduction_right_endfeel || 'not_tested';
      model.horizontalAdductionLeft = formValue.shoulder_prom_horizontal_adduction_left || 'not_tested';
      model.horizontalAdductionLeftEndfeel = formValue.shoulder_prom_horizontal_adduction_left_endfeel || 'not_tested';
    }

    return model;
  }

  private mapElbowArom(formValue: any): ElbowAROMModel {
    const enabled = formValue.elbow_arrom === 'yes';
    const model: ElbowAROMModel = { enabled };

    if (enabled) {
      model.flexionRight = formValue.elbow_arrom_flexion_right || 'not_tested';
      model.flexionLeft = formValue.elbow_arrom_flexion_left || 'not_tested';
      model.extensionRight = formValue.elbow_arrom_extension_right || 'not_tested';
      model.extensionLeft = formValue.elbow_arrom_extension_left || 'not_tested';
      model.pronationRight = formValue.elbow_arrom_pronation_right || 'not_tested';
      model.pronationLeft = formValue.elbow_arrom_pronation_left || 'not_tested';
      model.supinationRight = formValue.elbow_arrom_supination_right || 'not_tested';
      model.supinationLeft = formValue.elbow_arrom_supination_left || 'not_tested';
    }

    return model;
  }

  private mapElbowProm(formValue: any): ElbowPROMModel {
    const enabled = formValue.elbow_prom === 'yes';
    const model: ElbowPROMModel = { enabled };

    if (enabled) {
      model.extensionRight = formValue.elbow_prom_extension_right || 'not_tested';
      model.extensionRightEndfeel = formValue.elbow_prom_extension_right_endfeel || 'not_tested';
      model.extensionLeft = formValue.elbow_prom_extension_left || 'not_tested';
      model.extensionLeftEndfeel = formValue.elbow_prom_extension_left_endfeel || 'not_tested';
      model.flexionRight = formValue.elbow_prom_flexion_right || 'not_tested';
      model.flexionRightEndfeel = formValue.elbow_prom_flexion_right_endfeel || 'not_tested';
      model.flexionLeft = formValue.elbow_prom_flexion_left || 'not_tested';
      model.flexionLeftEndfeel = formValue.elbow_prom_flexion_left_endfeel || 'not_tested';
      model.supinationRight = formValue.elbow_prom_supination_right || 'not_tested';
      model.supinationRightEndfeel = formValue.elbow_prom_supination_right_endfeel || 'not_tested';
      model.supinationLeft = formValue.elbow_prom_supination_left || 'not_tested';
      model.supinationLeftEndfeel = formValue.elbow_prom_supination_left_endfeel || 'not_tested';
      model.pronationRight = formValue.elbow_prom_pronation_right || 'not_tested';
      model.pronationRightEndfeel = formValue.elbow_prom_pronation_right_endfeel || 'not_tested';
      model.pronationLeft = formValue.elbow_prom_pronation_left || 'not_tested';
      model.pronationLeftEndfeel = formValue.elbow_prom_pronation_left_endfeel || 'not_tested';
    }

    return model;
  }

  private mapWristArom(formValue: any): WristAROMModel {
    const enabled = formValue.wrist_arrom === 'yes';
    const model: WristAROMModel = { enabled };

    if (enabled) {
      model.extensionRight = formValue.extension_right || 'not_tested';
      model.extensionLeft = formValue.extension_left || 'not_tested';
      model.flexionRight = formValue.flexion_right || 'not_tested';
      model.flexionLeft = formValue.flexion_left || 'not_tested';
      model.radialDeviationRight = formValue.radial_deviation_right || 'not_tested';
      model.radialDeviationLeft = formValue.radial_deviation_left || 'not_tested';
      model.ulnarDeviationRight = formValue.ulnar_deviation_right || 'not_tested';
      model.ulnarDeviationLeft = formValue.ulnar_deviation_left || 'not_tested';
    }

    return model;
  }

  private mapWristProm(formValue: any): WristPROMModel {
    const enabled = formValue.wrist_prom === 'yes';
    const model: WristPROMModel = { enabled };

    if (enabled) {
      model.extensionRight = formValue.wrist_prom_extension_right || 'not_tested';
      model.extensionRightEndfeel = formValue.wrist_prom_extension_right_endfeel || 'not_tested';
      model.extensionLeft = formValue.wrist_prom_extension_left || 'not_tested';
      model.extensionLeftEndfeel = formValue.wrist_prom_extension_left_endfeel || 'not_tested';
      model.flexionRight = formValue.wrist_prom_flexion_right || 'not_tested';
      model.flexionRightEndfeel = formValue.wrist_prom_flexion_right_endfeel || 'not_tested';
      model.flexionLeft = formValue.wrist_prom_flexion_left || 'not_tested';
      model.flexionLeftEndfeel = formValue.wrist_prom_flexion_left_endfeel || 'not_tested';
      model.radialDeviationRight = formValue.wrist_prom_radial_deviation_right || 'not_tested';
      model.radialDeviationRightEndfeel = formValue.wrist_prom_radial_deviation_right_endfeel || 'not_tested';
      model.radialDeviationLeft = formValue.wrist_prom_radial_deviation_left || 'not_tested';
      model.radialDeviationLeftEndfeel = formValue.wrist_prom_radial_deviation_left_endfeel || 'not_tested';
      model.ulnarDeviationRight = formValue.wrist_prom_ulnar_deviation_right || 'not_tested';
      model.ulnarDeviationRightEndfeel = formValue.wrist_prom_ulnar_deviation_right_endfeel || 'not_tested';
      model.ulnarDeviationLeft = formValue.wrist_prom_ulnar_deviation_left || 'not_tested';
      model.ulnarDeviationLeftEndfeel = formValue.wrist_prom_ulnar_deviation_left_endfeel || 'not_tested';
    }

    return model;
  }

  private mapHandAromProm(formValue: any): HandAromPromModel {
    const enabled = formValue.hand_arrom_prom === 'yes';
    const model: HandAromPromModel = { enabled };

    if (enabled) {
      model.calculateTotalRom = formValue.calculate_total_rom || false;
      model.thumbAromProm = this.mapThumbAromProm(formValue);
      model.indexFingerAromProm = this.mapIndexFingerAromProm(formValue);
      model.middleFingerAromProm = this.mapMiddleFingerAromProm(formValue);
      model.ringFingerAromProm = this.mapRingFingerAromProm(formValue);
      model.smallFingerAromProm = this.mapSmallFingerAromProm(formValue);
    }

    return model;
  }

  private mapThumbAromProm(formValue: any): ThumbAromPromModel {
    const enabled = formValue.thumb_arrom_prom === true;
    const model: ThumbAromPromModel = { enabled };

    if (enabled) {
      model.cmcPalmarAbductionRightArom = formValue.thumb_cmc_palmar_abduction_right_arom || 'not_tested';
      model.cmcPalmarAbductionRightProm = formValue.thumb_cmc_palmar_abduction_right_prom || 'not_tested';
      model.cmcPalmarAbductionLeftArom = formValue.thumb_cmc_palmar_abduction_left_arom || 'not_tested';
      model.cmcPalmarAbductionLeftProm = formValue.thumb_cmc_palmar_abduction_left_prom || 'not_tested';
      model.cmcRadialAbductionRightArom = formValue.thumb_cmc_radial_abduction_right_arom || 'not_tested';
      model.cmcRadialAbductionRightProm = formValue.thumb_cmc_radial_abduction_right_prom || 'not_tested';
      model.cmcRadialAbductionLeftArom = formValue.thumb_cmc_radial_abduction_left_arom || 'not_tested';
      model.cmcRadialAbductionLeftProm = formValue.thumb_cmc_radial_abduction_left_prom || 'not_tested';
      model.cmcAdductionRightArom = formValue.thumb_cmc_adduction_right_arom || 'not_tested';
      model.cmcAdductionRightProm = formValue.thumb_cmc_adduction_right_prom || 'not_tested';
      model.cmcAdductionLeftArom = formValue.thumb_cmc_adduction_left_arom || 'not_tested';
      model.cmcAdductionLeftProm = formValue.thumb_cmc_adduction_left_prom || 'not_tested';
      model.cmcExtensionRightArom = formValue.thumb_cmc_extension_right_arom || 'not_tested';
      model.cmcExtensionRightProm = formValue.thumb_cmc_extension_right_prom || 'not_tested';
      model.cmcExtensionLeftArom = formValue.thumb_cmc_extension_left_arom || 'not_tested';
      model.cmcExtensionLeftProm = formValue.thumb_cmc_extension_left_prom || 'not_tested';
      model.cmcFlexionRightArom = formValue.thumb_cmc_flexion_right_arom || 'not_tested';
      model.cmcFlexionRightProm = formValue.thumb_cmc_flexion_right_prom || 'not_tested';
      model.cmcFlexionLeftArom = formValue.thumb_cmc_flexion_left_arom || 'not_tested';
      model.cmcFlexionLeftProm = formValue.thumb_cmc_flexion_left_prom || 'not_tested';
      model.cmcTotalMotionRightArom = formValue.thumb_cmc_total_motion_right_arom || '';
      model.cmcTotalMotionRightProm = formValue.thumb_cmc_total_motion_right_prom || '';
      model.cmcTotalMotionLeftArom = formValue.thumb_cmc_total_motion_left_arom || '';
      model.cmcTotalMotionLeftProm = formValue.thumb_cmc_total_motion_left_prom || '';
      model.mpExtensionRightArom = formValue.thumb_mp_extension_right_arom || 'not_tested';
      model.mpExtensionRightProm = formValue.thumb_mp_extension_right_prom || 'not_tested';
      model.mpExtensionLeftArom = formValue.thumb_mp_extension_left_arom || 'not_tested';
      model.mpExtensionLeftProm = formValue.thumb_mp_extension_left_prom || 'not_tested';
      model.mpFlexionRightArom = formValue.thumb_mp_flexion_right_arom || 'not_tested';
      model.mpFlexionRightProm = formValue.thumb_mp_flexion_right_prom || 'not_tested';
      model.mpFlexionLeftArom = formValue.thumb_mp_flexion_left_arom || 'not_tested';
      model.mpFlexionLeftProm = formValue.thumb_mp_flexion_left_prom || 'not_tested';
      model.mpTotalMotionRightArom = formValue.thumb_mp_total_motion_right_arom || '';
      model.mpTotalMotionRightProm = formValue.thumb_mp_total_motion_right_prom || '';
      model.mpTotalMotionLeftArom = formValue.thumb_mp_total_motion_left_arom || '';
      model.mpTotalMotionLeftProm = formValue.thumb_mp_total_motion_left_prom || '';
      model.ipExtensionRightArom = formValue.thumb_ip_extension_right_arom || 'not_tested';
      model.ipExtensionRightProm = formValue.thumb_ip_extension_right_prom || 'not_tested';
      model.ipExtensionLeftArom = formValue.thumb_ip_extension_left_arom || 'not_tested';
      model.ipExtensionLeftProm = formValue.thumb_ip_extension_left_prom || 'not_tested';
      model.ipFlexionRightArom = formValue.thumb_ip_flexion_right_arom || 'not_tested';
      model.ipFlexionRightProm = formValue.thumb_ip_flexion_right_prom || 'not_tested';
      model.ipFlexionLeftArom = formValue.thumb_ip_flexion_left_arom || 'not_tested';
      model.ipFlexionLeftProm = formValue.thumb_ip_flexion_left_prom || 'not_tested';
      model.ipTotalMotionRightArom = formValue.thumb_ip_total_motion_right_arom || '';
      model.ipTotalMotionRightProm = formValue.thumb_ip_total_motion_right_prom || '';
      model.ipTotalMotionLeftArom = formValue.thumb_ip_total_motion_left_arom || '';
      model.ipTotalMotionLeftProm = formValue.thumb_ip_total_motion_left_prom || '';
      model.comments = formValue.thumb_comments || '';
    }

    return model;
  }

  private mapIndexFingerAromProm(formValue: any): IndexFingerAromPromModel {
    const enabled = formValue.index_finger_arrom_prom === true;
    const model: IndexFingerAromPromModel = { enabled };

    if (enabled) {
      model.mpAdductionRightArom = formValue.index_mp_adduction_right_arom || 'not_tested';
      model.mpAdductionRightProm = formValue.index_mp_adduction_right_prom || 'not_tested';
      model.mpAdductionLeftArom = formValue.index_mp_adduction_left_arom || 'not_tested';
      model.mpAdductionLeftProm = formValue.index_mp_adduction_left_prom || 'not_tested';
      model.mpExtensionRightArom = formValue.index_mp_extension_right_arom || 'not_tested';
      model.mpExtensionRightProm = formValue.index_mp_extension_right_prom || 'not_tested';
      model.mpExtensionLeftArom = formValue.index_mp_extension_left_arom || 'not_tested';
      model.mpExtensionLeftProm = formValue.index_mp_extension_left_prom || 'not_tested';
      model.mpFlexionRightArom = formValue.index_mp_flexion_right_arom || 'not_tested';
      model.mpFlexionRightProm = formValue.index_mp_flexion_right_prom || 'not_tested';
      model.mpFlexionLeftArom = formValue.index_mp_flexion_left_arom || 'not_tested';
      model.mpFlexionLeftProm = formValue.index_mp_flexion_left_prom || 'not_tested';
      model.mpTotalMotionRightArom = formValue.index_mp_total_motion_right_arom || '';
      model.mpTotalMotionRightProm = formValue.index_mp_total_motion_right_prom || '';
      model.mpTotalMotionLeftArom = formValue.index_mp_total_motion_left_arom || '';
      model.mpTotalMotionLeftProm = formValue.index_mp_total_motion_left_prom || '';
      model.pipExtensionRightArom = formValue.index_pip_extension_right_arom || 'not_tested';
      model.pipExtensionRightProm = formValue.index_pip_extension_right_prom || 'not_tested';
      model.pipExtensionLeftArom = formValue.index_pip_extension_left_arom || 'not_tested';
      model.pipExtensionLeftProm = formValue.index_pip_extension_left_prom || 'not_tested';
      model.pipFlexionRightArom = formValue.index_pip_flexion_right_arom || 'not_tested';
      model.pipFlexionRightProm = formValue.index_pip_flexion_right_prom || 'not_tested';
      model.pipFlexionLeftArom = formValue.index_pip_flexion_left_arom || 'not_tested';
      model.pipFlexionLeftProm = formValue.index_pip_flexion_left_prom || 'not_tested';
      model.pipTotalMotionRightArom = formValue.index_pip_total_motion_right_arom || '';
      model.pipTotalMotionRightProm = formValue.index_pip_total_motion_right_prom || '';
      model.pipTotalMotionLeftArom = formValue.index_pip_total_motion_left_arom || '';
      model.pipTotalMotionLeftProm = formValue.index_pip_total_motion_left_prom || '';
      model.dipExtensionRightArom = formValue.index_dip_extension_right_arom || 'not_tested';
      model.dipExtensionRightProm = formValue.index_dip_extension_right_prom || 'not_tested';
      model.dipExtensionLeftArom = formValue.index_dip_extension_left_arom || 'not_tested';
      model.dipExtensionLeftProm = formValue.index_dip_extension_left_prom || 'not_tested';
      model.dipFlexionRightArom = formValue.index_dip_flexion_right_arom || 'not_tested';
      model.dipFlexionRightProm = formValue.index_dip_flexion_right_prom || 'not_tested';
      model.dipFlexionLeftArom = formValue.index_dip_flexion_left_arom || 'not_tested';
      model.dipFlexionLeftProm = formValue.index_dip_flexion_left_prom || 'not_tested';
      model.dipTotalMotionRightArom = formValue.index_dip_total_motion_right_arom || '';
      model.dipTotalMotionRightProm = formValue.index_dip_total_motion_right_prom || '';
      model.dipTotalMotionLeftArom = formValue.index_dip_total_motion_left_arom || '';
      model.dipTotalMotionLeftProm = formValue.index_dip_total_motion_left_prom || '';
      model.comments = formValue.index_comments || '';
    }

    return model;
  }

  private mapMiddleFingerAromProm(formValue: any): MiddleFingerAromPromModel {
    const enabled = formValue.middle_finger_arrom_prom === true;
    const model: MiddleFingerAromPromModel = { enabled };

    if (enabled) {
      model.mpAdductionRightArom = formValue.middle_mp_adduction_right_arom || 'not_tested';
      model.mpAdductionRightProm = formValue.middle_mp_adduction_right_prom || 'not_tested';
      model.mpAdductionLeftArom = formValue.middle_mp_adduction_left_arom || 'not_tested';
      model.mpAdductionLeftProm = formValue.middle_mp_adduction_left_prom || 'not_tested';
      model.mpExtensionRightArom = formValue.middle_mp_extension_right_arom || 'not_tested';
      model.mpExtensionRightProm = formValue.middle_mp_extension_right_prom || 'not_tested';
      model.mpExtensionLeftArom = formValue.middle_mp_extension_left_arom || 'not_tested';
      model.mpExtensionLeftProm = formValue.middle_mp_extension_left_prom || 'not_tested';
      model.mpFlexionRightArom = formValue.middle_mp_flexion_right_arom || 'not_tested';
      model.mpFlexionRightProm = formValue.middle_mp_flexion_right_prom || 'not_tested';
      model.mpFlexionLeftArom = formValue.middle_mp_flexion_left_arom || 'not_tested';
      model.mpFlexionLeftProm = formValue.middle_mp_flexion_left_prom || 'not_tested';
      model.mpTotalMotionRightArom = formValue.middle_mp_total_motion_right_arom || '';
      model.mpTotalMotionRightProm = formValue.middle_mp_total_motion_right_prom || '';
      model.mpTotalMotionLeftArom = formValue.middle_mp_total_motion_left_arom || '';
      model.mpTotalMotionLeftProm = formValue.middle_mp_total_motion_left_prom || '';
      model.pipExtensionRightArom = formValue.middle_pip_extension_right_arom || 'not_tested';
      model.pipExtensionRightProm = formValue.middle_pip_extension_right_prom || 'not_tested';
      model.pipExtensionLeftArom = formValue.middle_pip_extension_left_arom || 'not_tested';
      model.pipExtensionLeftProm = formValue.middle_pip_extension_left_prom || 'not_tested';
      model.pipFlexionRightArom = formValue.middle_pip_flexion_right_arom || 'not_tested';
      model.pipFlexionRightProm = formValue.middle_pip_flexion_right_prom || 'not_tested';
      model.pipFlexionLeftArom = formValue.middle_pip_flexion_left_arom || 'not_tested';
      model.pipFlexionLeftProm = formValue.middle_pip_flexion_left_prom || 'not_tested';
      model.pipTotalMotionRightArom = formValue.middle_pip_total_motion_right_arom || '';
      model.pipTotalMotionRightProm = formValue.middle_pip_total_motion_right_prom || '';
      model.pipTotalMotionLeftArom = formValue.middle_pip_total_motion_left_arom || '';
      model.pipTotalMotionLeftProm = formValue.middle_pip_total_motion_left_prom || '';
      model.dipExtensionRightArom = formValue.middle_dip_extension_right_arom || 'not_tested';
      model.dipExtensionRightProm = formValue.middle_dip_extension_right_prom || 'not_tested';
      model.dipExtensionLeftArom = formValue.middle_dip_extension_left_arom || 'not_tested';
      model.dipExtensionLeftProm = formValue.middle_dip_extension_left_prom || 'not_tested';
      model.dipFlexionRightArom = formValue.middle_dip_flexion_right_arom || 'not_tested';
      model.dipFlexionRightProm = formValue.middle_dip_flexion_right_prom || 'not_tested';
      model.dipFlexionLeftArom = formValue.middle_dip_flexion_left_arom || 'not_tested';
      model.dipFlexionLeftProm = formValue.middle_dip_flexion_left_prom || 'not_tested';
      model.dipTotalMotionRightArom = formValue.middle_dip_total_motion_right_arom || '';
      model.dipTotalMotionRightProm = formValue.middle_dip_total_motion_right_prom || '';
      model.dipTotalMotionLeftArom = formValue.middle_dip_total_motion_left_arom || '';
      model.dipTotalMotionLeftProm = formValue.middle_dip_total_motion_left_prom || '';
      model.comments = formValue.middle_comments || '';
    }

    return model;
  }

  private mapRingFingerAromProm(formValue: any): RingFingerAromPromModel {
    const enabled = formValue.ring_finger_arrom_prom === true;
    const model: RingFingerAromPromModel = { enabled };

    if (enabled) {
      model.mpAdductionRightArom = formValue.ring_mp_adduction_right_arom || 'not_tested';
      model.mpAdductionRightProm = formValue.ring_mp_adduction_right_prom || 'not_tested';
      model.mpAdductionLeftArom = formValue.ring_mp_adduction_left_arom || 'not_tested';
      model.mpAdductionLeftProm = formValue.ring_mp_adduction_left_prom || 'not_tested';
      model.mpExtensionRightArom = formValue.ring_mp_extension_right_arom || 'not_tested';
      model.mpExtensionRightProm = formValue.ring_mp_extension_right_prom || 'not_tested';
      model.mpExtensionLeftArom = formValue.ring_mp_extension_left_arom || 'not_tested';
      model.mpExtensionLeftProm = formValue.ring_mp_extension_left_prom || 'not_tested';
      model.mpFlexionRightArom = formValue.ring_mp_flexion_right_arom || 'not_tested';
      model.mpFlexionRightProm = formValue.ring_mp_flexion_right_prom || 'not_tested';
      model.mpFlexionLeftArom = formValue.ring_mp_flexion_left_arom || 'not_tested';
      model.mpFlexionLeftProm = formValue.ring_mp_flexion_left_prom || 'not_tested';
      model.mpTotalMotionRightArom = formValue.ring_mp_total_motion_right_arom || '';
      model.mpTotalMotionRightProm = formValue.ring_mp_total_motion_right_prom || '';
      model.mpTotalMotionLeftArom = formValue.ring_mp_total_motion_left_arom || '';
      model.mpTotalMotionLeftProm = formValue.ring_mp_total_motion_left_prom || '';
      model.pipExtensionRightArom = formValue.ring_pip_extension_right_arom || 'not_tested';
      model.pipExtensionRightProm = formValue.ring_pip_extension_right_prom || 'not_tested';
      model.pipExtensionLeftArom = formValue.ring_pip_extension_left_arom || 'not_tested';
      model.pipExtensionLeftProm = formValue.ring_pip_extension_left_prom || 'not_tested';
      model.pipFlexionRightArom = formValue.ring_pip_flexion_right_arom || 'not_tested';
      model.pipFlexionRightProm = formValue.ring_pip_flexion_right_prom || 'not_tested';
      model.pipFlexionLeftArom = formValue.ring_pip_flexion_left_arom || 'not_tested';
      model.pipFlexionLeftProm = formValue.ring_pip_flexion_left_prom || 'not_tested';
      model.pipTotalMotionRightArom = formValue.ring_pip_total_motion_right_arom || '';
      model.pipTotalMotionRightProm = formValue.ring_pip_total_motion_right_prom || '';
      model.pipTotalMotionLeftArom = formValue.ring_pip_total_motion_left_arom || '';
      model.pipTotalMotionLeftProm = formValue.ring_pip_total_motion_left_prom || '';
      model.dipExtensionRightArom = formValue.ring_dip_extension_right_arom || 'not_tested';
      model.dipExtensionRightProm = formValue.ring_dip_extension_right_prom || 'not_tested';
      model.dipExtensionLeftArom = formValue.ring_dip_extension_left_arom || 'not_tested';
      model.dipExtensionLeftProm = formValue.ring_dip_extension_left_prom || 'not_tested';
      model.dipFlexionRightArom = formValue.ring_dip_flexion_right_arom || 'not_tested';
      model.dipFlexionRightProm = formValue.ring_dip_flexion_right_prom || 'not_tested';
      model.dipFlexionLeftArom = formValue.ring_dip_flexion_left_arom || 'not_tested';
      model.dipFlexionLeftProm = formValue.ring_dip_flexion_left_prom || 'not_tested';
      model.dipTotalMotionRightArom = formValue.ring_dip_total_motion_right_arom || '';
      model.dipTotalMotionRightProm = formValue.ring_dip_total_motion_right_prom || '';
      model.dipTotalMotionLeftArom = formValue.ring_dip_total_motion_left_arom || '';
      model.dipTotalMotionLeftProm = formValue.ring_dip_total_motion_left_prom || '';
      model.comments = formValue.ring_comments || '';
    }

    return model;
  }

  private mapSmallFingerAromProm(formValue: any): SmallFingerAromPromModel {
    const enabled = formValue.small_finger_arrom_prom === true;
    const model: SmallFingerAromPromModel = { enabled };

    if (enabled) {
      model.mpAdductionRightArom = formValue.small_mp_adduction_right_arom || 'not_tested';
      model.mpAdductionRightProm = formValue.small_mp_adduction_right_prom || 'not_tested';
      model.mpAdductionLeftArom = formValue.small_mp_adduction_left_arom || 'not_tested';
      model.mpAdductionLeftProm = formValue.small_mp_adduction_left_prom || 'not_tested';
      model.mpExtensionRightArom = formValue.small_mp_extension_right_arom || 'not_tested';
      model.mpExtensionRightProm = formValue.small_mp_extension_right_prom || 'not_tested';
      model.mpExtensionLeftArom = formValue.small_mp_extension_left_arom || 'not_tested';
      model.mpExtensionLeftProm = formValue.small_mp_extension_left_prom || 'not_tested';
      model.mpFlexionRightArom = formValue.small_mp_flexion_right_arom || 'not_tested';
      model.mpFlexionRightProm = formValue.small_mp_flexion_right_prom || 'not_tested';
      model.mpFlexionLeftArom = formValue.small_mp_flexion_left_arom || 'not_tested';
      model.mpFlexionLeftProm = formValue.small_mp_flexion_left_prom || 'not_tested';
      model.mpTotalMotionRightArom = formValue.small_mp_total_motion_right_arom || '';
      model.mpTotalMotionRightProm = formValue.small_mp_total_motion_right_prom || '';
      model.mpTotalMotionLeftArom = formValue.small_mp_total_motion_left_arom || '';
      model.mpTotalMotionLeftProm = formValue.small_mp_total_motion_left_prom || '';
      model.pipExtensionRightArom = formValue.small_pip_extension_right_arom || 'not_tested';
      model.pipExtensionRightProm = formValue.small_pip_extension_right_prom || 'not_tested';
      model.pipExtensionLeftArom = formValue.small_pip_extension_left_arom || 'not_tested';
      model.pipExtensionLeftProm = formValue.small_pip_extension_left_prom || 'not_tested';
      model.pipFlexionRightArom = formValue.small_pip_flexion_right_arom || 'not_tested';
      model.pipFlexionRightProm = formValue.small_pip_flexion_right_prom || 'not_tested';
      model.pipFlexionLeftArom = formValue.small_pip_flexion_left_arom || 'not_tested';
      model.pipFlexionLeftProm = formValue.small_pip_flexion_left_prom || 'not_tested';
      model.pipTotalMotionRightArom = formValue.small_pip_total_motion_right_arom || '';
      model.pipTotalMotionRightProm = formValue.small_pip_total_motion_right_prom || '';
      model.pipTotalMotionLeftArom = formValue.small_pip_total_motion_left_arom || '';
      model.pipTotalMotionLeftProm = formValue.small_pip_total_motion_left_prom || '';
      model.dipExtensionRightArom = formValue.small_dip_extension_right_arom || 'not_tested';
      model.dipExtensionRightProm = formValue.small_dip_extension_right_prom || 'not_tested';
      model.dipExtensionLeftArom = formValue.small_dip_extension_left_arom || 'not_tested';
      model.dipExtensionLeftProm = formValue.small_dip_extension_left_prom || 'not_tested';
      model.dipFlexionRightArom = formValue.small_dip_flexion_right_arom || 'not_tested';
      model.dipFlexionRightProm = formValue.small_dip_flexion_right_prom || 'not_tested';
      model.dipFlexionLeftArom = formValue.small_dip_flexion_left_arom || 'not_tested';
      model.dipFlexionLeftProm = formValue.small_dip_flexion_left_prom || 'not_tested';
      model.dipTotalMotionRightArom = formValue.small_dip_total_motion_right_arom || '';
      model.dipTotalMotionRightProm = formValue.small_dip_total_motion_right_prom || '';
      model.dipTotalMotionLeftArom = formValue.small_dip_total_motion_left_arom || '';
      model.dipTotalMotionLeftProm = formValue.small_dip_total_motion_left_prom || '';
      model.comments = formValue.small_comments || '';
    }

    return model;
  }

  private mapThoracicAromSittingWithPassiveOverpressure(formValue: any): ThoracicAromSittingWithPassiveOverpressureModel {
    const enabled = formValue.thoracic_arrom_sitting_with_passive_overpressure === 'yes';
    const model: ThoracicAromSittingWithPassiveOverpressureModel = { enabled };

    if (enabled) {
      model.forwardBending = formValue.thoracic_arrom_sitting_forward_bending || 'not_tested';
      model.backwardBending = formValue.thoracic_arrom_sitting_backward_bending || 'not_tested';
      model.rightRotation = formValue.thoracic_arrom_sitting_right_rotation || 'not_tested';
      model.leftRotation = formValue.thoracic_arrom_sitting_left_rotation || 'not_tested';
      model.rightSideBending = formValue.thoracic_arrom_sitting_right_side_bending || 'not_tested';
      model.leftSideBending = formValue.thoracic_arrom_sitting_left_side_bending || 'not_tested';
    }

    return model;
  }

  // map ThoracicAROMStanding
  private mapThoracicAROMStanding(formValue: any): ThoracicAROMStandingModel {
    const enabled = formValue.thoracic_arrom_standing === 'yes';

    const model: ThoracicAROMStandingModel = { enabled };

    if (enabled) {
      model.forwardBending =
        formValue.thoracic_arrom_standing_forward_bending || 'not_tested';

      model.backwardBending =
        formValue.thoracic_arrom_standing_backward_bending || 'not_tested';

      model.rightRotation =
        formValue.thoracic_arrom_standing_right_rotation || 'not_tested';

      model.leftRotation =
        formValue.thoracic_arrom_standing_left_rotation || 'not_tested';

      model.rightSideBending =
        formValue.thoracic_arrom_standing_right_side_bending || 'not_tested';

      model.leftSideBending =
        formValue.thoracic_arrom_standing_left_side_bending || 'not_tested';
    }
    return model;
  }

  //map Lumbar AROM
  private mapLumbarAROM(formValue: any): LumbarAROMModel {
    const enabled = formValue.lumbar_arrom === 'yes';

    const model: LumbarAROMModel = {
      enabled,
      lumbarArromApplyToAll: formValue.lumbar_arrom_apply_to_all || ''
    };

    if (enabled) {
      model.lumbarArromForwardBending =
        formValue.lumbar_arrom_forward_bending || 'not_tested';

      model.lumbarArromBackwardBending =
        formValue.lumbar_arrom_backward_bending || 'not_tested';

      model.lumbarArromRightRotation =
        formValue.lumbar_arrom_right_rotation || 'not_tested';

      model.lumbarArromLeftRotation =
        formValue.lumbar_arrom_left_rotation || 'not_tested';

      model.lumbarArromRightSideBending =
        formValue.lumbar_arrom_right_side_bending || 'not_tested';

      model.lumbarArromLeftSideBending =
        formValue.lumbar_arrom_left_side_bending || 'not_tested';
    }

    return model;
  }


}
