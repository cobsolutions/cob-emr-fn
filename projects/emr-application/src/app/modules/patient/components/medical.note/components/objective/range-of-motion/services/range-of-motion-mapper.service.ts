import { Injectable } from '@angular/core';
import { RangeOfMotion } from '../models/RangeOfMotion';
import { ShoulderAROMMapper } from './shoulder/shoulderAROMMapper';
import { withCustomFields, spreadCustomFieldsFromDto } from '../../common/form-field-utils';

@Injectable({
  providedIn: 'root'
})
export class RangeOfMotionMapperService {

  constructor() { }

  /**
   * Convert form values to RangeOfMotion DTO (for sending to backend)
   */
  toModel(formValue: any): RangeOfMotion {
    return {
      costovertebralExpansion: formValue.costovertebral_expansion === 'yes',

      noLimitationsNoted: {
        noLimitationsNoted: formValue.no_limitations_noted === 'yes',
        arom: formValue.arom || false,
        prom: formValue.prom || false,
        promCervical: formValue.prom_cervical || false,
        promThoracic: formValue.prom_thoracic || false,
        promShoulder: formValue.prom_shoulder || false,
        promElbow: formValue.prom_elbow || false,
        promWrist: formValue.prom_wrist || false,
        promHand: formValue.prom_hand || false,
        promLumbar: formValue.prom_lumbar || false,
        promHip: formValue.prom_hip || false,
        promKnee: formValue.prom_knee || false,
        promAnkle: formValue.prom_ankle || false,
        promFeet: formValue.prom_feet || false,
        promComments: formValue.prom_comments || ''
      },

      cervicalAROM: {
        cervicalArrom: formValue.cervical_arrom === 'yes'
      },

      shoulderAROM: withCustomFields(ShoulderAROMMapper.toModel(formValue), formValue, 'shoulder_', ['shoulder_prom_']),

      shoulderPROM: withCustomFields(this.mapShoulderPROM(formValue), formValue, 'shoulder_prom_'),

      elbowAROM: withCustomFields(this.mapElbowAROM(formValue), formValue, 'elbow_arrom_'),

      elbowPROM: withCustomFields(this.mapElbowPROM(formValue), formValue, 'elbow_prom_'),

      wristAROM: this.mapWristAROM(formValue),

      wristPROM: withCustomFields(this.mapWristPROM(formValue), formValue, 'wrist_prom_'),

      handAROMPROM: this.mapHandAROMPROM(formValue),

      thoracicAROMSittingwithPassiveOverpressure: {
        thoracicArromSittingWithPassiveOverpressure: formValue.thoracic_arrom_sitting_with_passive_overpressure === 'yes'
      },

      thoracicAROMStanding: {
        thoracicArromStanding: formValue.thoracic_arrom_standing === 'yes'
      },

      lumbarAROM: {
        lumbarArrom: formValue.lumbar_arrom === 'yes'
      },

      hipAROM: withCustomFields(this.mapHipAROM(formValue), formValue, 'hip_', ['hip_prom_']),

      hipPROM: withCustomFields(this.mapHipPROM(formValue), formValue, 'hip_prom_'),

      kneeAROM: withCustomFields(this.mapKneeAROM(formValue), formValue, 'knee_', ['knee_prom_']),

      kneePROM: {
        kneeProm: formValue.knee_prom === 'yes'
      },

      ankleAROM: withCustomFields(this.mapAnkleAROM(formValue), formValue, 'ankle_', ['ankle_prom_']),

      anklePROM: withCustomFields(this.mapAnklePROM(formValue), formValue, 'ankle_prom_'),

      fstMTPAROM: withCustomFields(this.mapFstMTPAROM(formValue), formValue, 'fst_mtp_', ['fst_mtp_prom_']),

      fstMTPPROM: {
        fstMtpArrom: formValue.fst_mtp_prom === 'yes',
        fstMtpAromApplyToAll: '',
        fstMtpApplyToAll: '',
        fstMtpFlexionRight: '',
        fstMtpFlexionLeft: '',
        fstMtpExtensionRight: '',
        fstMtpExtensionLeft: '',
        fstMtpArromComments: ''
      },

      fstIPAROM: withCustomFields(this.mapFstIPAROM(formValue), formValue, 'fst_ip_', ['fst_ip_prom_']),

      fstIPPROM: {
        fstIpArrom: formValue.fst_ip_prom === 'yes',
        fstIpAromApplyToAll: '',
        fstIpApplyToAll: '',
        fstIpFlexionRight: '',
        fstIpFlexionLeft: '',
        fstIpExtensionRight: '',
        fstIpExtensionLeft: '',
        fstIpArromComments: '',
        fstIpComments: ''
      },

      toeAROM: withCustomFields(this.mapToeAROM(formValue), formValue, 'toe_arom_'),

      toePROM: withCustomFields(this.mapToePROM(formValue), formValue, 'toe_', ['toe_arom_']),

      additionalComments: {
        additionalComments: formValue.additional_comments === 'yes',
        additionalCommentsText: formValue.additional_comments_text || ''
      }
    };
  }

  /**
   * Convert RangeOfMotion DTO to form values (for loading from backend)
   */
  fromDto(dto: RangeOfMotion): any {
    
    return {
      costovertebral_expansion: dto.costovertebralExpansion ? 'yes' : 'no',

      no_limitations_noted: dto.noLimitationsNoted.noLimitationsNoted ? 'yes' : 'no',
      arom: dto.noLimitationsNoted.arom,
      prom: dto.noLimitationsNoted.prom,
      prom_cervical: dto.noLimitationsNoted.promCervical,
      prom_thoracic: dto.noLimitationsNoted.promThoracic,
      prom_shoulder: dto.noLimitationsNoted.promShoulder,
      prom_elbow: dto.noLimitationsNoted.promElbow,
      prom_wrist: dto.noLimitationsNoted.promWrist,
      prom_hand: dto.noLimitationsNoted.promHand,
      prom_lumbar: dto.noLimitationsNoted.promLumbar,
      prom_hip: dto.noLimitationsNoted.promHip,
      prom_knee: dto.noLimitationsNoted.promKnee,
      prom_ankle: dto.noLimitationsNoted.promAnkle,
      prom_feet: dto.noLimitationsNoted.promFeet,
      prom_comments: dto.noLimitationsNoted.promComments,

      cervical_arrom: dto.cervicalAROM.cervicalArrom ? 'yes' : 'no',

      ...ShoulderAROMMapper.fromDto(dto.shoulderAROM),
      ...spreadCustomFieldsFromDto(dto.shoulderAROM),
      ...this.unmapShoulderPROM(dto.shoulderPROM),
      ...spreadCustomFieldsFromDto(dto.shoulderPROM),
      ...this.unmapElbowAROM(dto.elbowAROM),
      ...spreadCustomFieldsFromDto(dto.elbowAROM),
      ...this.unmapElbowPROM(dto.elbowPROM),
      ...spreadCustomFieldsFromDto(dto.elbowPROM),
      ...this.unmapWristAROM(dto.wristAROM),
      ...spreadCustomFieldsFromDto(dto.wristAROM),
      ...this.unmapWristPROM(dto.wristPROM),
      ...spreadCustomFieldsFromDto(dto.wristPROM),
      ...this.unmapHandAROMPROM(dto.handAROMPROM),

      thoracic_arrom_sitting_with_passive_overpressure: dto.thoracicAROMSittingwithPassiveOverpressure.thoracicArromSittingWithPassiveOverpressure ? 'yes' : 'no',

      thoracic_arrom_standing: dto.thoracicAROMStanding.thoracicArromStanding ? 'yes' : 'no',

      lumbar_arrom: dto.lumbarAROM.lumbarArrom ? 'yes' : 'no',

      ...this.unmapHipAROM(dto.hipAROM),
      ...spreadCustomFieldsFromDto(dto.hipAROM),
      ...this.unmapHipPROM(dto.hipPROM),
      ...spreadCustomFieldsFromDto(dto.hipPROM),
      ...this.unmapKneeAROM(dto.kneeAROM),
      ...spreadCustomFieldsFromDto(dto.kneeAROM),

      knee_prom: dto.kneePROM.kneeProm ? 'yes' : 'no',

      ...this.unmapAnkleAROM(dto.ankleAROM),
      ...spreadCustomFieldsFromDto(dto.ankleAROM),
      ...this.unmapAnklePROM(dto.anklePROM),
      ...spreadCustomFieldsFromDto(dto.anklePROM),
      ...this.unmapFstMTPAROM(dto.fstMTPAROM),
      ...spreadCustomFieldsFromDto(dto.fstMTPAROM),

      fst_mtp_prom: dto.fstMTPPROM.fstMtpArrom ? 'yes' : 'no',

      ...this.unmapFstIPAROM(dto.fstIPAROM),
      ...spreadCustomFieldsFromDto(dto.fstIPAROM),

      fst_ip_prom: dto.fstIPPROM.fstIpArrom ? 'yes' : 'no',

      ...this.unmapToeAROM(dto.toeAROM),
      ...spreadCustomFieldsFromDto(dto.toeAROM),
      ...this.unmapToePROM(dto.toePROM),
      ...spreadCustomFieldsFromDto(dto.toePROM),

      additional_comments: dto.additionalComments.additionalComments ? 'yes' : 'no',
      additional_comments_text: dto.additionalComments.additionalCommentsText || ''
    };
  }

  private mapShoulderPROM(formValue: any) {
    return {
      shoulderProm: formValue.shoulder_prom === 'yes',
      shoulderPromApplyToAll: formValue.shoulder_prom_apply_to_all || '',
      shoulderPromFlexionRight: formValue.shoulder_prom_flexion_right || '',
      shoulderPromFlexionRightEndfeel: formValue.shoulder_prom_flexion_right_endfeel || '',
      shoulderPromFlexionLeft: formValue.shoulder_prom_flexion_left || '',
      shoulderPromFlexionLeftEndfeel: formValue.shoulder_prom_flexion_left_endfeel || '',
      shoulderPromScaptionRight: formValue.shoulder_prom_scaption_right || '',
      shoulderPromScaptionRightEndfeel: formValue.shoulder_prom_scaption_right_endfeel || '',
      shoulderPromScaptionLeft: formValue.shoulder_prom_scaption_left || '',
      shoulderPromScaptionLeftEndfeel: formValue.shoulder_prom_scaption_left_endfeel || '',
      shoulderPromAbductionRight: formValue.shoulder_prom_abduction_right || '',
      shoulderPromAbductionRightEndfeel: formValue.shoulder_prom_abduction_right_endfeel || '',
      shoulderPromAbductionLeft: formValue.shoulder_prom_abduction_left || '',
      shoulderPromAbductionLeftEndfeel: formValue.shoulder_prom_abduction_left_endfeel || '',
      shoulderPromExtensionRight: formValue.shoulder_prom_extension_right || '',
      shoulderPromExtensionRightEndfeel: formValue.shoulder_prom_extension_right_endfeel || '',
      shoulderPromExtensionLeft: formValue.shoulder_prom_extension_left || '',
      shoulderPromExtensionLeftEndfeel: formValue.shoulder_prom_extension_left_endfeel || '',
      shoulderPromErNeutralRight: formValue.shoulder_prom_er_neutral_right || '',
      shoulderPromErNeutralRightEndfeel: formValue.shoulder_prom_er_neutral_right_endfeel || '',
      shoulderPromErNeutralLeft: formValue.shoulder_prom_er_neutral_left || '',
      shoulderPromErNeutralLeftEndfeel: formValue.shoulder_prom_er_neutral_left_endfeel || '',
      shoulderPromIrNeutralRight: formValue.shoulder_prom_ir_neutral_right || '',
      shoulderPromIrNeutralRightEndfeel: formValue.shoulder_prom_ir_neutral_right_endfeel || '',
      shoulderPromIrNeutralLeft: formValue.shoulder_prom_ir_neutral_left || '',
      shoulderPromIrNeutralLeftEndfeel: formValue.shoulder_prom_ir_neutral_left_endfeel || '',
      shoulderPromErScapularPlaneRight: formValue.shoulder_prom_er_scapular_plane_right || '',
      shoulderPromErScapularPlaneRightEndfeel: formValue.shoulder_prom_er_scapular_plane_right_endfeel || '',
      shoulderPromErScapularPlaneLeft: formValue.shoulder_prom_er_scapular_plane_left || '',
      shoulderPromErScapularPlaneLeftEndfeel: formValue.shoulder_prom_er_scapular_plane_left_endfeel || '',
      shoulderPromIrScapularPlaneRight: formValue.shoulder_prom_ir_scapular_plane_right || '',
      shoulderPromIrScapularPlaneRightEndfeel: formValue.shoulder_prom_ir_scapular_plane_right_endfeel || '',
      shoulderPromIrScapularPlaneLeft: formValue.shoulder_prom_ir_scapular_plane_left || '',
      shoulderPromIrScapularPlaneLeftEndfeel: formValue.shoulder_prom_ir_scapular_plane_left_endfeel || '',
      shoulderPromEr_90DegreesAbductionRight: formValue.shoulder_prom_er_90_degrees_abduction_right || '',
      shoulderPromEr_90DegreesAbductionRightEndfeel: formValue.shoulder_prom_er_90_degrees_abduction_right_endfeel || '',
      shoulderPromEr_90DegreesAbductionLeft: formValue.shoulder_prom_er_90_degrees_abduction_left || '',
      shoulderPromEr_90DegreesAbductionLeftEndfeel: formValue.shoulder_prom_er_90_degrees_abduction_left_endfeel || '',
      shoulderPromIr_90DegreesAbductionRight: formValue.shoulder_prom_ir_90_degrees_abduction_right || '',
      shoulderPromIr_90DegreesAbductionRightEndfeel: formValue.shoulder_prom_ir_90_degrees_abduction_right_endfeel || '',
      shoulderPromIr_90DegreesAbductionLeft: formValue.shoulder_prom_ir_90_degrees_abduction_left || '',
      shoulderPromIr_90DegreesAbductionLeftEndfeel: formValue.shoulder_prom_ir_90_degrees_abduction_left_endfeel || '',
      shoulderPromIrSleeperStretchRight: formValue.shoulder_prom_ir_sleeper_stretch_right || '',
      shoulderPromIrSleeperStretchRightEndfeel: formValue.shoulder_prom_ir_sleeper_stretch_right_endfeel || '',
      shoulderPromIrSleeperStretchLeft: formValue.shoulder_prom_ir_sleeper_stretch_left || '',
      shoulderPromIrSleeperStretchLeftEndfeel: formValue.shoulder_prom_ir_sleeper_stretch_left_endfeel || '',
      shoulderPromHorizontalAbductionRight: formValue.shoulder_prom_horizontal_abduction_right || '',
      shoulderPromHorizontalAbductionRightEndfeel: formValue.shoulder_prom_horizontal_abduction_right_endfeel || '',
      shoulderPromHorizontalAbductionLeft: formValue.shoulder_prom_horizontal_abduction_left || '',
      shoulderPromHorizontalAbductionLeftEndfeel: formValue.shoulder_prom_horizontal_abduction_left_endfeel || '',
      shoulderPromHorizontalAdductionRight: formValue.shoulder_prom_horizontal_adduction_right || '',
      shoulderPromHorizontalAdductionRightEndfeel: formValue.shoulder_prom_horizontal_adduction_right_endfeel || '',
      shoulderPromHorizontalAdductionLeft: formValue.shoulder_prom_horizontal_adduction_left || '',
      shoulderPromHorizontalAdductionLeftEndfeel: formValue.shoulder_prom_horizontal_adduction_left_endfeel || ''
    };
  }

  private mapElbowAROM(formValue: any) {
    return {
      elbowArrom: formValue.elbow_arrom === 'yes',
      elbowArromApplyToAll: formValue.elbow_arrom_apply_to_all || '',
      elbowArromFlexionRight: formValue.elbow_arrom_flexion_right || '',
      elbowArromFlexionLeft: formValue.elbow_arrom_flexion_left || '',
      elbowArromExtensionRight: formValue.elbow_arrom_extension_right || '',
      elbowArromExtensionLeft: formValue.elbow_arrom_extension_left || '',
      elbowArromPronationRight: formValue.elbow_arrom_pronation_right || '',
      elbowArromPronationLeft: formValue.elbow_arrom_pronation_left || '',
      elbowArromSupinationRight: formValue.elbow_arrom_supination_right || '',
      elbowArromSupinationLeft: formValue.elbow_arrom_supination_left || ''
    };
  }

  private mapElbowPROM(formValue: any) {
    return {
      elbowProm: formValue.elbow_prom === 'yes',
      elbowPromApplyToAll: formValue.elbow_prom_apply_to_all || '',
      elbowPromExtensionRight: formValue.elbow_prom_extension_right || '',
      elbowPromExtensionRightEndfeel: formValue.elbow_prom_extension_right_endfeel || '',
      elbowPromExtensionLeft: formValue.elbow_prom_extension_left || '',
      elbowPromExtensionLeftEndfeel: formValue.elbow_prom_extension_left_endfeel || '',
      elbowPromFlexionRight: formValue.elbow_prom_flexion_right || '',
      elbowPromFlexionRightEndfeel: formValue.elbow_prom_flexion_right_endfeel || '',
      elbowPromFlexionLeft: formValue.elbow_prom_flexion_left || '',
      elbowPromFlexionLeftEndfeel: formValue.elbow_prom_flexion_left_endfeel || '',
      elbowPromSupinationRight: formValue.elbow_prom_supination_right || '',
      elbowPromSupinationRightEndfeel: formValue.elbow_prom_supination_right_endfeel || '',
      elbowPromSupinationLeft: formValue.elbow_prom_supination_left || '',
      elbowPromSupinationLeftEndfeel: formValue.elbow_prom_supination_left_endfeel || '',
      elbowPromPronationRight: formValue.elbow_prom_pronation_right || '',
      elbowPromPronationRightEndfeel: formValue.elbow_prom_pronation_right_endfeel || '',
      elbowPromPronationLeft: formValue.elbow_prom_pronation_left || '',
      elbowPromPronationLeftEndfeel: formValue.elbow_prom_pronation_left_endfeel || ''
    };
  }

  private mapWristAROM(formValue: any) {
    return {
      wristArrom: formValue.wrist_arrom === 'yes',
      wristArromApplyToAll: formValue.wrist_arrom_apply_to_all || '',
      extensionRight: formValue.extension_right || '',
      extensionRightCustom: formValue.extension_right_custom || '',
      extensionLeft: formValue.extension_left || '',
      extensionLeftCustom: formValue.extension_left_custom || '',
      flexionRight: formValue.flexion_right || '',
      flexionRightCustom: formValue.flexion_right_custom || '',
      flexionLeft: formValue.flexion_left || '',
      flexionLeftCustom: formValue.flexion_left_custom || '',
      radialDeviationRight: formValue.radial_deviation_right || '',
      radialDeviationRightCustom: formValue.radial_deviation_right_custom || '',
      radialDeviationLeft: formValue.radial_deviation_left || '',
      radialDeviationLeftCustom: formValue.radial_deviation_left_custom || '',
      ulnarDeviationRight: formValue.ulnar_deviation_right || '',
      ulnarDeviationRightCustom: formValue.ulnar_deviation_right_custom || '',
      ulnarDeviationLeft: formValue.ulnar_deviation_left || '',
      ulnarDeviationLeftCustom: formValue.ulnar_deviation_left_custom || ''
    };
  }

  private mapWristPROM(formValue: any) {
    return {
      wristProm: formValue.wrist_prom === 'yes',
      wristPromApplyToAll: formValue.wrist_prom_apply_to_all || '',
      wristPromExtensionRight: formValue.wrist_prom_extension_right || '',
      wristPromExtensionRightEndfeel: formValue.wrist_prom_extension_right_endfeel || '',
      wristPromExtensionLeft: formValue.wrist_prom_extension_left || '',
      wristPromExtensionLeftEndfeel: formValue.wrist_prom_extension_left_endfeel || '',
      wristPromFlexionRight: formValue.wrist_prom_flexion_right || '',
      wristPromFlexionRightEndfeel: formValue.wrist_prom_flexion_right_endfeel || '',
      wristPromFlexionLeft: formValue.wrist_prom_flexion_left || '',
      wristPromFlexionLeftEndfeel: formValue.wrist_prom_flexion_left_endfeel || '',
      wristPromRadialDeviationRight: formValue.wrist_prom_radial_deviation_right || '',
      wristPromRadialDeviationRightEndfeel: formValue.wrist_prom_radial_deviation_right_endfeel || '',
      wristPromRadialDeviationLeft: formValue.wrist_prom_radial_deviation_left || '',
      wristPromRadialDeviationLeftEndfeel: formValue.wrist_prom_radial_deviation_left_endfeel || '',
      wristPromUlnarDeviationRight: formValue.wrist_prom_ulnar_deviation_right || '',
      wristPromUlnarDeviationRightEndfeel: formValue.wrist_prom_ulnar_deviation_right_endfeel || '',
      wristPromUlnarDeviationLeft: formValue.wrist_prom_ulnar_deviation_left || '',
      wristPromUlnarDeviationLeftEndfeel: formValue.wrist_prom_ulnar_deviation_left_endfeel || ''
    };
  }

  private mapHandAROMPROM(formValue: any) {
    return {
      handArromProm: formValue.hand_arrom_prom === 'yes',
      calculateTotalRom: formValue.calculate_total_rom || false,
      thumbAROMPROM: {
        thumbArromProm: formValue.thumb_arrom_prom || false,
        thumbCmcPalmarAbductionRightArom: formValue.thumb_cmc_palmar_abduction_right_arom || '',
        thumbCmcPalmarAbductionRightProm: formValue.thumb_cmc_palmar_abduction_right_prom || '',
        thumbCmcPalmarAbductionLeftArom: formValue.thumb_cmc_palmar_abduction_left_arom || '',
        thumbCmcPalmarAbductionLeftProm: formValue.thumb_cmc_palmar_abduction_left_prom || '',
        thumbCmcRadialAbductionRightArom: formValue.thumb_cmc_radial_abduction_right_arom || '',
        thumbCmcRadialAbductionRightProm: formValue.thumb_cmc_radial_abduction_right_prom || '',
        thumbCmcRadialAbductionLeftArom: formValue.thumb_cmc_radial_abduction_left_arom || '',
        thumbCmcRadialAbductionLeftProm: formValue.thumb_cmc_radial_abduction_left_prom || '',
        thumbCmcAdductionRightArom: formValue.thumb_cmc_adduction_right_arom || '',
        thumbCmcAdductionRightProm: formValue.thumb_cmc_adduction_right_prom || '',
        thumbCmcAdductionLeftArom: formValue.thumb_cmc_adduction_left_arom || '',
        thumbCmcAdductionLeftProm: formValue.thumb_cmc_adduction_left_prom || '',
        thumbCmcExtensionRightArom: formValue.thumb_cmc_extension_right_arom || '',
        thumbCmcExtensionRightProm: formValue.thumb_cmc_extension_right_prom || '',
        thumbCmcExtensionLeftArom: formValue.thumb_cmc_extension_left_arom || '',
        thumbCmcExtensionLeftProm: formValue.thumb_cmc_extension_left_prom || '',
        thumbCmcFlexionRightArom: formValue.thumb_cmc_flexion_right_arom || '',
        thumbCmcFlexionRightProm: formValue.thumb_cmc_flexion_right_prom || '',
        thumbCmcFlexionLeftArom: formValue.thumb_cmc_flexion_left_arom || '',
        thumbCmcFlexionLeftProm: formValue.thumb_cmc_flexion_left_prom || '',
        thumbCmcTotalMotionRightArom: formValue.thumb_cmc_total_motion_right_arom || '',
        thumbCmcTotalMotionRightProm: formValue.thumb_cmc_total_motion_right_prom || '',
        thumbCmcTotalMotionLeftArom: formValue.thumb_cmc_total_motion_left_arom || '',
        thumbCmcTotalMotionLeftProm: formValue.thumb_cmc_total_motion_left_prom || '',
        thumbMpExtensionRightArom: formValue.thumb_mp_extension_right_arom || '',
        thumbMpExtensionRightProm: formValue.thumb_mp_extension_right_prom || '',
        thumbMpExtensionLeftArom: formValue.thumb_mp_extension_left_arom || '',
        thumbMpExtensionLeftProm: formValue.thumb_mp_extension_left_prom || '',
        thumbMpFlexionRightArom: formValue.thumb_mp_flexion_right_arom || '',
        thumbMpFlexionRightProm: formValue.thumb_mp_flexion_right_prom || '',
        thumbMpFlexionLeftArom: formValue.thumb_mp_flexion_left_arom || '',
        thumbMpFlexionLeftProm: formValue.thumb_mp_flexion_left_prom || '',
        thumbMpTotalMotionRightArom: formValue.thumb_mp_total_motion_right_arom || '',
        thumbMpTotalMotionRightProm: formValue.thumb_mp_total_motion_right_prom || '',
        thumbMpTotalMotionLeftArom: formValue.thumb_mp_total_motion_left_arom || '',
        thumbMpTotalMotionLeftProm: formValue.thumb_mp_total_motion_left_prom || '',
        thumbIpExtensionRightArom: formValue.thumb_ip_extension_right_arom || '',
        thumbIpExtensionRightProm: formValue.thumb_ip_extension_right_prom || '',
        thumbIpExtensionLeftArom: formValue.thumb_ip_extension_left_arom || '',
        thumbIpExtensionLeftProm: formValue.thumb_ip_extension_left_prom || '',
        thumbIpFlexionRightArom: formValue.thumb_ip_flexion_right_arom || '',
        thumbIpFlexionRightProm: formValue.thumb_ip_flexion_right_prom || '',
        thumbIpFlexionLeftArom: formValue.thumb_ip_flexion_left_arom || '',
        thumbIpFlexionLeftProm: formValue.thumb_ip_flexion_left_prom || '',
        thumbIpTotalMotionRightArom: formValue.thumb_ip_total_motion_right_arom || '',
        thumbIpTotalMotionRightProm: formValue.thumb_ip_total_motion_right_prom || '',
        thumbIpTotalMotionLeftArom: formValue.thumb_ip_total_motion_left_arom || '',
        thumbIpTotalMotionLeftProm: formValue.thumb_ip_total_motion_left_prom || '',
        thumbComments: formValue.thumb_comments || ''
      },
      indexFingerAROMPROM: {
        indexFingerArromProm: formValue.index_finger_arrom_prom || false,
        indexMpAdductionRightArom: formValue.index_mp_adduction_right_arom || '',
        indexMpAdductionRightProm: formValue.index_mp_adduction_right_prom || '',
        indexMpAdductionLeftArom: formValue.index_mp_adduction_left_arom || '',
        indexMpAdductionLeftProm: formValue.index_mp_adduction_left_prom || '',
        indexMpExtensionRightArom: formValue.index_mp_extension_right_arom || '',
        indexMpExtensionRightProm: formValue.index_mp_extension_right_prom || '',
        indexMpExtensionLeftArom: formValue.index_mp_extension_left_arom || '',
        indexMpExtensionLeftProm: formValue.index_mp_extension_left_prom || '',
        indexMpFlexionRightArom: formValue.index_mp_flexion_right_arom || '',
        indexMpFlexionRightProm: formValue.index_mp_flexion_right_prom || '',
        indexMpFlexionLeftArom: formValue.index_mp_flexion_left_arom || '',
        indexMpFlexionLeftProm: formValue.index_mp_flexion_left_prom || '',
        indexMpTotalMotionRightArom: formValue.index_mp_total_motion_right_arom || '',
        indexMpTotalMotionRightProm: formValue.index_mp_total_motion_right_prom || '',
        indexMpTotalMotionLeftArom: formValue.index_mp_total_motion_left_arom || '',
        indexMpTotalMotionLeftProm: formValue.index_mp_total_motion_left_prom || '',
        indexPipExtensionRightArom: formValue.index_pip_extension_right_arom || '',
        indexPipExtensionRightProm: formValue.index_pip_extension_right_prom || '',
        indexPipExtensionLeftArom: formValue.index_pip_extension_left_arom || '',
        indexPipExtensionLeftProm: formValue.index_pip_extension_left_prom || '',
        indexPipFlexionRightArom: formValue.index_pip_flexion_right_arom || '',
        indexPipFlexionRightProm: formValue.index_pip_flexion_right_prom || '',
        indexPipFlexionLeftArom: formValue.index_pip_flexion_left_arom || '',
        indexPipFlexionLeftProm: formValue.index_pip_flexion_left_prom || '',
        indexPipTotalMotionRightArom: formValue.index_pip_total_motion_right_arom || '',
        indexPipTotalMotionRightProm: formValue.index_pip_total_motion_right_prom || '',
        indexPipTotalMotionLeftArom: formValue.index_pip_total_motion_left_arom || '',
        indexPipTotalMotionLeftProm: formValue.index_pip_total_motion_left_prom || '',
        indexDipExtensionRightArom: formValue.index_dip_extension_right_arom || '',
        indexDipExtensionRightProm: formValue.index_dip_extension_right_prom || '',
        indexDipExtensionLeftArom: formValue.index_dip_extension_left_arom || '',
        indexDipExtensionLeftProm: formValue.index_dip_extension_left_prom || '',
        indexDipFlexionRightArom: formValue.index_dip_flexion_right_arom || '',
        indexDipFlexionRightProm: formValue.index_dip_flexion_right_prom || '',
        indexDipFlexionLeftArom: formValue.index_dip_flexion_left_arom || '',
        indexDipFlexionLeftProm: formValue.index_dip_flexion_left_prom || '',
        indexDipTotalMotionRightArom: formValue.index_dip_total_motion_right_arom || '',
        indexDipTotalMotionRightProm: formValue.index_dip_total_motion_right_prom || '',
        indexDipTotalMotionLeftArom: formValue.index_dip_total_motion_left_arom || '',
        indexDipTotalMotionLeftProm: formValue.index_dip_total_motion_left_prom || '',
        indexComments: formValue.index_comments || ''
      },
      middleFingerAROMPROM: {
        middleFingerArromProm: formValue.middle_finger_arrom_prom || false,
        middleMpAdductionRightArom: formValue.middle_mp_adduction_right_arom || '',
        middleMpAdductionRightProm: formValue.middle_mp_adduction_right_prom || '',
        middleMpAdductionLeftArom: formValue.middle_mp_adduction_left_arom || '',
        middleMpAdductionLeftProm: formValue.middle_mp_adduction_left_prom || '',
        middleMpExtensionRightArom: formValue.middle_mp_extension_right_arom || '',
        middleMpExtensionRightProm: formValue.middle_mp_extension_right_prom || '',
        middleMpExtensionLeftArom: formValue.middle_mp_extension_left_arom || '',
        middleMpExtensionLeftProm: formValue.middle_mp_extension_left_prom || '',
        middleMpFlexionRightArom: formValue.middle_mp_flexion_right_arom || '',
        middleMpFlexionRightProm: formValue.middle_mp_flexion_right_prom || '',
        middleMpFlexionLeftArom: formValue.middle_mp_flexion_left_arom || '',
        middleMpFlexionLeftProm: formValue.middle_mp_flexion_left_prom || '',
        middleMpTotalMotionRightArom: formValue.middle_mp_total_motion_right_arom || '',
        middleMpTotalMotionRightProm: formValue.middle_mp_total_motion_right_prom || '',
        middleMpTotalMotionLeftArom: formValue.middle_mp_total_motion_left_arom || '',
        middleMpTotalMotionLeftProm: formValue.middle_mp_total_motion_left_prom || '',
        middlePipExtensionRightArom: formValue.middle_pip_extension_right_arom || '',
        middlePipExtensionRightProm: formValue.middle_pip_extension_right_prom || '',
        middlePipExtensionLeftArom: formValue.middle_pip_extension_left_arom || '',
        middlePipExtensionLeftProm: formValue.middle_pip_extension_left_prom || '',
        middlePipFlexionRightArom: formValue.middle_pip_flexion_right_arom || '',
        middlePipFlexionRightProm: formValue.middle_pip_flexion_right_prom || '',
        middlePipFlexionLeftArom: formValue.middle_pip_flexion_left_arom || '',
        middlePipFlexionLeftProm: formValue.middle_pip_flexion_left_prom || '',
        middlePipTotalMotionRightArom: formValue.middle_pip_total_motion_right_arom || '',
        middlePipTotalMotionRightProm: formValue.middle_pip_total_motion_right_prom || '',
        middlePipTotalMotionLeftArom: formValue.middle_pip_total_motion_left_arom || '',
        middlePipTotalMotionLeftProm: formValue.middle_pip_total_motion_left_prom || '',
        middleDipExtensionRightArom: formValue.middle_dip_extension_right_arom || '',
        middleDipExtensionRightProm: formValue.middle_dip_extension_right_prom || '',
        middleDipExtensionLeftArom: formValue.middle_dip_extension_left_arom || '',
        middleDipExtensionLeftProm: formValue.middle_dip_extension_left_prom || '',
        middleDipFlexionRightArom: formValue.middle_dip_flexion_right_arom || '',
        middleDipFlexionRightProm: formValue.middle_dip_flexion_right_prom || '',
        middleDipFlexionLeftArom: formValue.middle_dip_flexion_left_arom || '',
        middleDipFlexionLeftProm: formValue.middle_dip_flexion_left_prom || '',
        middleDipTotalMotionRightArom: formValue.middle_dip_total_motion_right_arom || '',
        middleDipTotalMotionRightProm: formValue.middle_dip_total_motion_right_prom || '',
        middleDipTotalMotionLeftArom: formValue.middle_dip_total_motion_left_arom || '',
        middleDipTotalMotionLeftProm: formValue.middle_dip_total_motion_left_prom || '',
        middleComments: formValue.middle_comments || ''
      },
      ringFingerAROMPROM: {
        ringFingerArromProm: formValue.ring_finger_arrom_prom || false,
        ringMpAdductionRightArom: formValue.ring_mp_adduction_right_arom || '',
        ringMpAdductionRightProm: formValue.ring_mp_adduction_right_prom || '',
        ringMpAdductionLeftArom: formValue.ring_mp_adduction_left_arom || '',
        ringMpAdductionLeftProm: formValue.ring_mp_adduction_left_prom || '',
        ringMpExtensionRightArom: formValue.ring_mp_extension_right_arom || '',
        ringMpExtensionRightProm: formValue.ring_mp_extension_right_prom || '',
        ringMpExtensionLeftArom: formValue.ring_mp_extension_left_arom || '',
        ringMpExtensionLeftProm: formValue.ring_mp_extension_left_prom || '',
        ringMpFlexionRightArom: formValue.ring_mp_flexion_right_arom || '',
        ringMpFlexionRightProm: formValue.ring_mp_flexion_right_prom || '',
        ringMpFlexionLeftArom: formValue.ring_mp_flexion_left_arom || '',
        ringMpFlexionLeftProm: formValue.ring_mp_flexion_left_prom || '',
        ringMpTotalMotionRightArom: formValue.ring_mp_total_motion_right_arom || '',
        ringMpTotalMotionRightProm: formValue.ring_mp_total_motion_right_prom || '',
        ringMpTotalMotionLeftArom: formValue.ring_mp_total_motion_left_arom || '',
        ringMpTotalMotionLeftProm: formValue.ring_mp_total_motion_left_prom || '',
        ringPipExtensionRightArom: formValue.ring_pip_extension_right_arom || '',
        ringPipExtensionRightProm: formValue.ring_pip_extension_right_prom || '',
        ringPipExtensionLeftArom: formValue.ring_pip_extension_left_arom || '',
        ringPipExtensionLeftProm: formValue.ring_pip_extension_left_prom || '',
        ringPipFlexionRightArom: formValue.ring_pip_flexion_right_arom || '',
        ringPipFlexionRightProm: formValue.ring_pip_flexion_right_prom || '',
        ringPipFlexionLeftArom: formValue.ring_pip_flexion_left_arom || '',
        ringPipFlexionLeftProm: formValue.ring_pip_flexion_left_prom || '',
        ringPipTotalMotionRightArom: formValue.ring_pip_total_motion_right_arom || '',
        ringPipTotalMotionRightProm: formValue.ring_pip_total_motion_right_prom || '',
        ringPipTotalMotionLeftArom: formValue.ring_pip_total_motion_left_arom || '',
        ringPipTotalMotionLeftProm: formValue.ring_pip_total_motion_left_prom || '',
        ringDipExtensionRightArom: formValue.ring_dip_extension_right_arom || '',
        ringDipExtensionRightProm: formValue.ring_dip_extension_right_prom || '',
        ringDipExtensionLeftArom: formValue.ring_dip_extension_left_arom || '',
        ringDipExtensionLeftProm: formValue.ring_dip_extension_left_prom || '',
        ringDipFlexionRightArom: formValue.ring_dip_flexion_right_arom || '',
        ringDipFlexionRightProm: formValue.ring_dip_flexion_right_prom || '',
        ringDipFlexionLeftArom: formValue.ring_dip_flexion_left_arom || '',
        ringDipFlexionLeftProm: formValue.ring_dip_flexion_left_prom || '',
        ringDipTotalMotionRightArom: formValue.ring_dip_total_motion_right_arom || '',
        ringDipTotalMotionRightProm: formValue.ring_dip_total_motion_right_prom || '',
        ringDipTotalMotionLeftArom: formValue.ring_dip_total_motion_left_arom || '',
        ringDipTotalMotionLeftProm: formValue.ring_dip_total_motion_left_prom || '',
        ringComments: formValue.ring_comments || ''
      },
      smallFingerAROMPROM: {
        smallFingerArromProm: formValue.small_finger_arrom_prom || false,
        smallMpAdductionRightArom: formValue.small_mp_adduction_right_arom || '',
        smallMpAdductionRightProm: formValue.small_mp_adduction_right_prom || '',
        smallMpAdductionLeftArom: formValue.small_mp_adduction_left_arom || '',
        smallMpAdductionLeftProm: formValue.small_mp_adduction_left_prom || '',
        smallMpExtensionRightArom: formValue.small_mp_extension_right_arom || '',
        smallMpExtensionRightProm: formValue.small_mp_extension_right_prom || '',
        smallMpExtensionLeftArom: formValue.small_mp_extension_left_arom || '',
        smallMpExtensionLeftProm: formValue.small_mp_extension_left_prom || '',
        smallMpFlexionRightArom: formValue.small_mp_flexion_right_arom || '',
        smallMpFlexionRightProm: formValue.small_mp_flexion_right_prom || '',
        smallMpFlexionLeftArom: formValue.small_mp_flexion_left_arom || '',
        smallMpFlexionLeftProm: formValue.small_mp_flexion_left_prom || '',
        smallMpTotalMotionRightArom: formValue.small_mp_total_motion_right_arom || '',
        smallMpTotalMotionRightProm: formValue.small_mp_total_motion_right_prom || '',
        smallMpTotalMotionLeftArom: formValue.small_mp_total_motion_left_arom || '',
        smallMpTotalMotionLeftProm: formValue.small_mp_total_motion_left_prom || '',
        smallPipExtensionRightArom: formValue.small_pip_extension_right_arom || '',
        smallPipExtensionRightProm: formValue.small_pip_extension_right_prom || '',
        smallPipExtensionLeftArom: formValue.small_pip_extension_left_arom || '',
        smallPipExtensionLeftProm: formValue.small_pip_extension_left_prom || '',
        smallPipFlexionRightArom: formValue.small_pip_flexion_right_arom || '',
        smallPipFlexionRightProm: formValue.small_pip_flexion_right_prom || '',
        smallPipFlexionLeftArom: formValue.small_pip_flexion_left_arom || '',
        smallPipFlexionLeftProm: formValue.small_pip_flexion_left_prom || '',
        smallPipTotalMotionRightArom: formValue.small_pip_total_motion_right_arom || '',
        smallPipTotalMotionRightProm: formValue.small_pip_total_motion_right_prom || '',
        smallPipTotalMotionLeftArom: formValue.small_pip_total_motion_left_arom || '',
        smallPipTotalMotionLeftProm: formValue.small_pip_total_motion_left_prom || '',
        smallDipExtensionRightArom: formValue.small_dip_extension_right_arom || '',
        smallDipExtensionRightProm: formValue.small_dip_extension_right_prom || '',
        smallDipExtensionLeftArom: formValue.small_dip_extension_left_arom || '',
        smallDipExtensionLeftProm: formValue.small_dip_extension_left_prom || '',
        smallDipFlexionRightArom: formValue.small_dip_flexion_right_arom || '',
        smallDipFlexionRightProm: formValue.small_dip_flexion_right_prom || '',
        smallDipFlexionLeftArom: formValue.small_dip_flexion_left_arom || '',
        smallDipFlexionLeftProm: formValue.small_dip_flexion_left_prom || '',
        smallDipTotalMotionRightArom: formValue.small_dip_total_motion_right_arom || '',
        smallDipTotalMotionRightProm: formValue.small_dip_total_motion_right_prom || '',
        smallDipTotalMotionLeftArom: formValue.small_dip_total_motion_left_arom || '',
        smallDipTotalMotionLeftProm: formValue.small_dip_total_motion_left_prom || '',
        smallComments: formValue.small_comments || ''
      }
    };
  }

  private mapHipAROM(formValue: any) {
    return {
      hipArrom: formValue.hip_arrom === 'yes',
      hipFlexionRight: formValue.hip_flexion_right || '',
      hipFlexionLeft: formValue.hip_flexion_left || '',
      hipExtensionRight: formValue.hip_extension_right || '',
      hipExtensionLeft: formValue.hip_extension_left || '',
      hipAbductionRight: formValue.hip_abduction_right || '',
      hipAbductionLeft: formValue.hip_abduction_left || '',
      hipAdductionRight: formValue.hip_adduction_right || '',
      hipAdductionLeft: formValue.hip_adduction_left || '',
      hipInternalRotationRight: formValue.hip_internal_rotation_right || '',
      hipInternalRotationLeft: formValue.hip_internal_rotation_left || '',
      hipExternalRotationRight: formValue.hip_external_rotation_right || '',
      hipExternalRotationLeft: formValue.hip_external_rotation_left || '',
      hipArromComments: formValue.hip_arrom_comments || ''
    };
  }

  private mapHipPROM(formValue: any) {
    return {
      hipProm: formValue.hip_prom === 'yes',
      hipPromApplyToAll: formValue.hip_prom_apply_to_all || '',
      hipPromFlexionRight: formValue.hip_prom_flexion_right || '',
      hipPromFlexionRightEndfeel: formValue.hip_prom_flexion_right_endfeel || '',
      hipPromFlexionLeft: formValue.hip_prom_flexion_left || '',
      hipPromFlexionLeftEndfeel: formValue.hip_prom_flexion_left_endfeel || '',
      hipPromExtensionRight: formValue.hip_prom_extension_right || '',
      hipPromExtensionRightEndfeel: formValue.hip_prom_extension_right_endfeel || '',
      hipPromExtensionLeft: formValue.hip_prom_extension_left || '',
      hipPromExtensionLeftEndfeel: formValue.hip_prom_extension_left_endfeel || '',
      hipPromAbductionRight: formValue.hip_prom_abduction_right || '',
      hipPromAbductionRightEndfeel: formValue.hip_prom_abduction_right_endfeel || '',
      hipPromAbductionLeft: formValue.hip_prom_abduction_left || '',
      hipPromAbductionLeftEndfeel: formValue.hip_prom_abduction_left_endfeel || '',
      hipPromAdductionRight: formValue.hip_prom_adduction_right || '',
      hipPromAdductionRightEndfeel: formValue.hip_prom_adduction_right_endfeel || '',
      hipPromAdductionLeft: formValue.hip_prom_adduction_left || '',
      hipPromAdductionLeftEndfeel: formValue.hip_prom_adduction_left_endfeel || '',
      hipPromInternalRotationRight: formValue.hip_prom_internal_rotation_right || '',
      hipPromInternalRotationRightEndfeel: formValue.hip_prom_internal_rotation_right_endfeel || '',
      hipPromInternalRotationLeft: formValue.hip_prom_internal_rotation_left || '',
      hipPromInternalRotationLeftEndfeel: formValue.hip_prom_internal_rotation_left_endfeel || '',
      hipPromExternalRotationRight: formValue.hip_prom_external_rotation_right || '',
      hipPromExternalRotationRightEndfeel: formValue.hip_prom_external_rotation_right_endfeel || '',
      hipPromExternalRotationLeft: formValue.hip_prom_external_rotation_left || '',
      hipPromExternalRotationLeftEndfeel: formValue.hip_prom_external_rotation_left_endfeel || '',
      hipPromComments: formValue.hip_prom_comments || ''
    };
  }

  private mapKneeAROM(formValue: any) {
    return {
      kneeArrom: formValue.knee_arrom === 'yes',
      kneeAromApplyToAll: formValue.knee_arom_apply_to_all || '',
      kneeApplyToAll: formValue.knee_apply_to_all || '',
      kneeFlexionRight: formValue.knee_flexion_right || '',
      kneeFlexionLeft: formValue.knee_flexion_left || '',
      kneeExtensionRight: formValue.knee_extension_right || '',
      kneeExtensionLeft: formValue.knee_extension_left || '',
      kneeArromComments: formValue.knee_arrom_comments || '',
      kneeComments: formValue.knee_comments || ''
    };
  }

  private mapAnkleAROM(formValue: any) {
    return {
      ankleArrom: formValue.ankle_arrom === 'yes',
      ankleAromApplyToAll: formValue.ankle_arom_apply_to_all || '',
      ankleApplyToAll: formValue.ankle_apply_to_all || '',
      ankleDorsiflexion_0KneeFlexionRight: formValue.ankle_dorsiflexion_0_knee_flexion_right || '',
      ankleDorsiflexion_0KneeFlexionLeft: formValue.ankle_dorsiflexion_0_knee_flexion_left || '',
      ankleDorsiflexion_90KneeFlexionRight: formValue.ankle_dorsiflexion_90_knee_flexion_right || '',
      ankleDorsiflexion_90KneeFlexionLeft: formValue.ankle_dorsiflexion_90_knee_flexion_left || '',
      anklePlantarflexionRight: formValue.ankle_plantarflexion_right || '',
      anklePlantarflexionLeft: formValue.ankle_plantarflexion_left || '',
      ankleInversionRight: formValue.ankle_inversion_right || '',
      ankleInversionLeft: formValue.ankle_inversion_left || '',
      ankleEversionRight: formValue.ankle_eversion_right || '',
      ankleEversionLeft: formValue.ankle_eversion_left || '',
      ankleArromComments: formValue.ankle_arrom_comments || '',
      ankleComments: formValue.ankle_comments || ''
    };
  }

  private mapAnklePROM(formValue: any) {
    return {
      ankleProm: formValue.ankle_prom === 'yes',
      anklePromApplyToAll: formValue.ankle_prom_apply_to_all || '',
      anklePromDorsiflexion_0KneeFlexionRight: formValue.ankle_prom_dorsiflexion_0_knee_flexion_right || '',
      anklePromDorsiflexion_0KneeFlexionRightEndfeel: formValue.ankle_prom_dorsiflexion_0_knee_flexion_right_endfeel || '',
      anklePromDorsiflexion_0KneeFlexionLeft: formValue.ankle_prom_dorsiflexion_0_knee_flexion_left || '',
      anklePromDorsiflexion_0KneeFlexionLeftEndfeel: formValue.ankle_prom_dorsiflexion_0_knee_flexion_left_endfeel || '',
      anklePromDorsiflexion_90KneeFlexionRight: formValue.ankle_prom_dorsiflexion_90_knee_flexion_right || '',
      anklePromDorsiflexion_90KneeFlexionRightEndfeel: formValue.ankle_prom_dorsiflexion_90_knee_flexion_right_endfeel || '',
      anklePromDorsiflexion_90KneeFlexionLeft: formValue.ankle_prom_dorsiflexion_90_knee_flexion_left || '',
      anklePromDorsiflexion_90KneeFlexionLeftEndfeel: formValue.ankle_prom_dorsiflexion_90_knee_flexion_left_endfeel || '',
      anklePromPlantarflexionRight: formValue.ankle_prom_plantarflexion_right || '',
      anklePromPlantarflexionRightEndfeel: formValue.ankle_prom_plantarflexion_right_endfeel || '',
      anklePromPlantarflexionLeft: formValue.ankle_prom_plantarflexion_left || '',
      anklePromPlantarflexionLeftEndfeel: formValue.ankle_prom_plantarflexion_left_endfeel || '',
      anklePromInversionRight: formValue.ankle_prom_inversion_right || '',
      anklePromInversionRightEndfeel: formValue.ankle_prom_inversion_right_endfeel || '',
      anklePromInversionLeft: formValue.ankle_prom_inversion_left || '',
      anklePromInversionLeftEndfeel: formValue.ankle_prom_inversion_left_endfeel || '',
      anklePromEversionRight: formValue.ankle_prom_eversion_right || '',
      anklePromEversionRightEndfeel: formValue.ankle_prom_eversion_right_endfeel || '',
      anklePromEversionLeft: formValue.ankle_prom_eversion_left || '',
      anklePromEversionLeftEndfeel: formValue.ankle_prom_eversion_left_endfeel || '',
      anklePromComments: formValue.ankle_prom_comments || ''
    };
  }

  private mapFstMTPAROM(formValue: any) {
    return {
      fstMtpArrom: formValue.fst_mtp_arrom === 'yes',
      fstMtpAromApplyToAll: formValue.fst_mtp_arom_apply_to_all || '',
      fstMtpApplyToAll: formValue.fst_mtp_apply_to_all || '',
      fstMtpFlexionRight: formValue.fst_mtp_flexion_right || '',
      fstMtpFlexionLeft: formValue.fst_mtp_flexion_left || '',
      fstMtpExtensionRight: formValue.fst_mtp_extension_right || '',
      fstMtpExtensionLeft: formValue.fst_mtp_extension_left || '',
      fstMtpArromComments: formValue.fst_mtp_arrom_comments || '',
      fstMtpComments: formValue.fst_mtp_comments || ''
    };
  }

  private mapFstIPAROM(formValue: any) {
    return {
      fstIpArrom: formValue.fst_ip_arrom === 'yes',
      fstIpAromApplyToAll: formValue.fst_ip_arom_apply_to_all || '',
      fstIpApplyToAll: formValue.fst_ip_apply_to_all || '',
      fstIpFlexionRight: formValue.fst_ip_flexion_right || '',
      fstIpFlexionLeft: formValue.fst_ip_flexion_left || '',
      fstIpExtensionRight: formValue.fst_ip_extension_right || '',
      fstIpExtensionLeft: formValue.fst_ip_extension_left || '',
      fstIpArromComments: formValue.fst_ip_arrom_comments || '',
      fstIpComments: formValue.fst_ip_comments || ''
    };
  }

  private mapToeAROM(formValue: any) {
    return {
      toeArrom: formValue.toe_arrom === 'yes',
      toeAromApplyToAll: formValue.toe_arom_apply_to_all || '',
      toeApplyToAll: formValue.toe_apply_to_all || '',
      toeArom_2ndMtpFlexionRight: formValue.toe_arom_2nd_mtp_flexion_right || '',
      toeArom_2ndMtpFlexionLeft: formValue.toe_arom_2nd_mtp_flexion_left || '',
      toeArom_2ndMtpExtensionRight: formValue.toe_arom_2nd_mtp_extension_right || '',
      toeArom_2ndMtpExtensionLeft: formValue.toe_arom_2nd_mtp_extension_left || '',
      toeArom_2ndIpFlexionRight: formValue.toe_arom_2nd_ip_flexion_right || '',
      toeArom_2ndIpFlexionLeft: formValue.toe_arom_2nd_ip_flexion_left || '',
      toeArom_2ndIpExtensionRight: formValue.toe_arom_2nd_ip_extension_right || '',
      toeArom_2ndIpExtensionLeft: formValue.toe_arom_2nd_ip_extension_left || '',
      toeArom_3rdMtpFlexionRight: formValue.toe_arom_3rd_mtp_flexion_right || '',
      toeArom_3rdMtpFlexionLeft: formValue.toe_arom_3rd_mtp_flexion_left || '',
      toeArom_3rdMtpExtensionRight: formValue.toe_arom_3rd_mtp_extension_right || '',
      toeArom_3rdMtpExtensionLeft: formValue.toe_arom_3rd_mtp_extension_left || '',
      toeArom_3rdIpFlexionRight: formValue.toe_arom_3rd_ip_flexion_right || '',
      toeArom_3rdIpFlexionLeft: formValue.toe_arom_3rd_ip_flexion_left || '',
      toeArom_3rdIpExtensionRight: formValue.toe_arom_3rd_ip_extension_right || '',
      toeArom_3rdIpExtensionLeft: formValue.toe_arom_3rd_ip_extension_left || '',
      toeArom_4thMtpFlexionRight: formValue.toe_arom_4th_mtp_flexion_right || '',
      toeArom_4thMtpFlexionLeft: formValue.toe_arom_4th_mtp_flexion_left || '',
      toeArom_4thMtpExtensionRight: formValue.toe_arom_4th_mtp_extension_right || '',
      toeArom_4thMtpExtensionLeft: formValue.toe_arom_4th_mtp_extension_left || '',
      toeArom_4thIpFlexionRight: formValue.toe_arom_4th_ip_flexion_right || '',
      toeArom_4thIpFlexionLeft: formValue.toe_arom_4th_ip_flexion_left || '',
      toeArom_4thIpExtensionRight: formValue.toe_arom_4th_ip_extension_right || '',
      toeArom_4thIpExtensionLeft: formValue.toe_arom_4th_ip_extension_left || '',
      toeArom_5thMtpFlexionRight: formValue.toe_arom_5th_mtp_flexion_right || '',
      toeArom_5thMtpFlexionLeft: formValue.toe_arom_5th_mtp_flexion_left || '',
      toeArom_5thMtpExtensionRight: formValue.toe_arom_5th_mtp_extension_right || '',
      toeArom_5thMtpExtensionLeft: formValue.toe_arom_5th_mtp_extension_left || '',
      toeArom_5thIpFlexionRight: formValue.toe_arom_5th_ip_flexion_right || '',
      toeArom_5thIpFlexionLeft: formValue.toe_arom_5th_ip_flexion_left || '',
      toeArom_5thIpExtensionRight: formValue.toe_arom_5th_ip_extension_right || '',
      toeArom_5thIpExtensionLeft: formValue.toe_arom_5th_ip_extension_left || '',
      toeArromComments: formValue.toe_arrom_comments || '',
      toeComments: formValue.toe_comments || ''
    };
  }

  private mapToePROM(formValue: any) {
    return {
      toeProm: formValue.toe_prom === 'yes',
      toePromApplyToAll: formValue.toe_prom_apply_to_all || '',
      toe_2ndMtpFlexionRight: formValue.toe_2nd_mtp_flexion_right || '',
      toe_2ndMtpFlexionRightEndfeel: formValue.toe_2nd_mtp_flexion_right_endfeel || '',
      toe_2ndMtpFlexionLeft: formValue.toe_2nd_mtp_flexion_left || '',
      toe_2ndMtpFlexionLeftEndfeel: formValue.toe_2nd_mtp_flexion_left_endfeel || '',
      toe_2ndMtpExtensionRight: formValue.toe_2nd_mtp_extension_right || '',
      toe_2ndMtpExtensionRightEndfeel: formValue.toe_2nd_mtp_extension_right_endfeel || '',
      toe_2ndMtpExtensionLeft: formValue.toe_2nd_mtp_extension_left || '',
      toe_2ndMtpExtensionLeftEndfeel: formValue.toe_2nd_mtp_extension_left_endfeel || '',
      toe_2ndIpFlexionRight: formValue.toe_2nd_ip_flexion_right || '',
      toe_2ndIpFlexionRightEndfeel: formValue.toe_2nd_ip_flexion_right_endfeel || '',
      toe_2ndIpFlexionLeft: formValue.toe_2nd_ip_flexion_left || '',
      toe_2ndIpFlexionLeftEndfeel: formValue.toe_2nd_ip_flexion_left_endfeel || '',
      toe_2ndIpExtensionRight: formValue.toe_2nd_ip_extension_right || '',
      toe_2ndIpExtensionRightEndfeel: formValue.toe_2nd_ip_extension_right_endfeel || '',
      toe_2ndIpExtensionLeft: formValue.toe_2nd_ip_extension_left || '',
      toe_2ndIpExtensionLeftEndfeel: formValue.toe_2nd_ip_extension_left_endfeel || '',
      toe_3rdMtpFlexionRight: formValue.toe_3rd_mtp_flexion_right || '',
      toe_3rdMtpFlexionRightEndfeel: formValue.toe_3rd_mtp_flexion_right_endfeel || '',
      toe_3rdMtpFlexionLeft: formValue.toe_3rd_mtp_flexion_left || '',
      toe_3rdMtpFlexionLeftEndfeel: formValue.toe_3rd_mtp_flexion_left_endfeel || '',
      toe_3rdMtpExtensionRight: formValue.toe_3rd_mtp_extension_right || '',
      toe_3rdMtpExtensionRightEndfeel: formValue.toe_3rd_mtp_extension_right_endfeel || '',
      toe_3rdMtpExtensionLeft: formValue.toe_3rd_mtp_extension_left || '',
      toe_3rdMtpExtensionLeftEndfeel: formValue.toe_3rd_mtp_extension_left_endfeel || '',
      toe_3rdIpFlexionRight: formValue.toe_3rd_ip_flexion_right || '',
      toe_3rdIpFlexionRightEndfeel: formValue.toe_3rd_ip_flexion_right_endfeel || '',
      toe_3rdIpFlexionLeft: formValue.toe_3rd_ip_flexion_left || '',
      toe_3rdIpFlexionLeftEndfeel: formValue.toe_3rd_ip_flexion_left_endfeel || '',
      toe_3rdIpExtensionRight: formValue.toe_3rd_ip_extension_right || '',
      toe_3rdIpExtensionRightEndfeel: formValue.toe_3rd_ip_extension_right_endfeel || '',
      toe_3rdIpExtensionLeft: formValue.toe_3rd_ip_extension_left || '',
      toe_3rdIpExtensionLeftEndfeel: formValue.toe_3rd_ip_extension_left_endfeel || '',
      toe_4thMtpFlexionRight: formValue.toe_4th_mtp_flexion_right || '',
      toe_4thMtpFlexionRightEndfeel: formValue.toe_4th_mtp_flexion_right_endfeel || '',
      toe_4thMtpFlexionLeft: formValue.toe_4th_mtp_flexion_left || '',
      toe_4thMtpFlexionLeftEndfeel: formValue.toe_4th_mtp_flexion_left_endfeel || '',
      toe_4thMtpExtensionRight: formValue.toe_4th_mtp_extension_right || '',
      toe_4thMtpExtensionRightEndfeel: formValue.toe_4th_mtp_extension_right_endfeel || '',
      toe_4thMtpExtensionLeft: formValue.toe_4th_mtp_extension_left || '',
      toe_4thMtpExtensionLeftEndfeel: formValue.toe_4th_mtp_extension_left_endfeel || '',
      toe_4thIpFlexionRight: formValue.toe_4th_ip_flexion_right || '',
      toe_4thIpFlexionRightEndfeel: formValue.toe_4th_ip_flexion_right_endfeel || '',
      toe_4thIpFlexionLeft: formValue.toe_4th_ip_flexion_left || '',
      toe_4thIpFlexionLeftEndfeel: formValue.toe_4th_ip_flexion_left_endfeel || '',
      toe_4thIpExtensionRight: formValue.toe_4th_ip_extension_right || '',
      toe_4thIpExtensionRightEndfeel: formValue.toe_4th_ip_extension_right_endfeel || '',
      toe_4thIpExtensionLeft: formValue.toe_4th_ip_extension_left || '',
      toe_4thIpExtensionLeftEndfeel: formValue.toe_4th_ip_extension_left_endfeel || '',
      toe_5thMtpFlexionRight: formValue.toe_5th_mtp_flexion_right || '',
      toe_5thMtpFlexionRightEndfeel: formValue.toe_5th_mtp_flexion_right_endfeel || '',
      toe_5thMtpFlexionLeft: formValue.toe_5th_mtp_flexion_left || '',
      toe_5thMtpFlexionLeftEndfeel: formValue.toe_5th_mtp_flexion_left_endfeel || '',
      toe_5thMtpExtensionRight: formValue.toe_5th_mtp_extension_right || '',
      toe_5thMtpExtensionRightEndfeel: formValue.toe_5th_mtp_extension_right_endfeel || '',
      toe_5thMtpExtensionLeft: formValue.toe_5th_mtp_extension_left || '',
      toe_5thMtpExtensionLeftEndfeel: formValue.toe_5th_mtp_extension_left_endfeel || '',
      toe_5thIpFlexionRight: formValue.toe_5th_ip_flexion_right || '',
      toe_5thIpFlexionRightEndfeel: formValue.toe_5th_ip_flexion_right_endfeel || '',
      toe_5thIpFlexionLeft: formValue.toe_5th_ip_flexion_left || '',
      toe_5thIpFlexionLeftEndfeel: formValue.toe_5th_ip_flexion_left_endfeel || '',
      toe_5thIpExtensionRight: formValue.toe_5th_ip_extension_right || '',
      toe_5thIpExtensionRightEndfeel: formValue.toe_5th_ip_extension_right_endfeel || '',
      toe_5thIpExtensionLeft: formValue.toe_5th_ip_extension_left || '',
      toe_5thIpExtensionLeftEndfeel: formValue.toe_5th_ip_extension_left_endfeel || '',
      toePromComments: formValue.toe_prom_comments || ''
    };
  }

  // Unmap methods for fromDto
  private unmapShoulderAROM(shoulderAROM: any) {
    return {
      shoulder_arrom: shoulderAROM.shoulderArrom ? 'yes' : 'no',
      shoulder_apply_to_all: shoulderAROM.shoulderApplyToAll,
      shoulder_flexion_right: shoulderAROM.shoulderFlexionRight,
      shoulder_flexion_left: shoulderAROM.shoulderFlexionLeft,
      shoulder_scaption_right: shoulderAROM.shoulderScaptionRight,
      shoulder_scaption_left: shoulderAROM.shoulderScaptionLeft,
      shoulder_abduction_right: shoulderAROM.shoulderAbductionRight,
      shoulder_abduction_left: shoulderAROM.shoulderAbductionLeft,
      shoulder_extension_right: shoulderAROM.shoulderExtensionRight,
      shoulder_extension_left: shoulderAROM.shoulderExtensionLeft,
      shoulder_functional_er_reach_right: shoulderAROM.shoulderFunctionalErReachRight,
      shoulder_functional_er_reach_left: shoulderAROM.shoulderFunctionalErReachLeft,
      shoulder_functional_ir_reach_right: shoulderAROM.shoulderFunctionalIrReachRight,
      shoulder_functional_ir_reach_left: shoulderAROM.shoulderFunctionalIrReachLeft,
      shoulder_er_neutral_right: shoulderAROM.shoulderErNeutralRight,
      shoulder_er_neutral_left: shoulderAROM.shoulderErNeutralLeft,
      shoulder_ir_neutral_right: shoulderAROM.shoulderIrNeutralRight,
      shoulder_ir_neutral_left: shoulderAROM.shoulderIrNeutralLeft,
      shoulder_horizontal_abduction_right: shoulderAROM.shoulderHorizontalAbductionRight,
      shoulder_horizontal_abduction_left: shoulderAROM.shoulderHorizontalAbductionLeft,
      shoulder_horizontal_adduction_right: shoulderAROM.shoulderHorizontalAdductionRight,
      shoulder_horizontal_adduction_left: shoulderAROM.shoulderHorizontalAdductionLeft
    };
  }

  private unmapShoulderPROM(shoulderPROM: any) {
    return {
      shoulder_prom: shoulderPROM.shoulderProm ? 'yes' : 'no',
      shoulder_prom_apply_to_all: shoulderPROM.shoulderPromApplyToAll,
      shoulder_prom_flexion_right: shoulderPROM.shoulderPromFlexionRight,
      shoulder_prom_flexion_right_endfeel: shoulderPROM.shoulderPromFlexionRightEndfeel,
      shoulder_prom_flexion_left: shoulderPROM.shoulderPromFlexionLeft,
      shoulder_prom_flexion_left_endfeel: shoulderPROM.shoulderPromFlexionLeftEndfeel,
      shoulder_prom_scaption_right: shoulderPROM.shoulderPromScaptionRight,
      shoulder_prom_scaption_right_endfeel: shoulderPROM.shoulderPromScaptionRightEndfeel,
      shoulder_prom_scaption_left: shoulderPROM.shoulderPromScaptionLeft,
      shoulder_prom_scaption_left_endfeel: shoulderPROM.shoulderPromScaptionLeftEndfeel,
      shoulder_prom_abduction_right: shoulderPROM.shoulderPromAbductionRight,
      shoulder_prom_abduction_right_endfeel: shoulderPROM.shoulderPromAbductionRightEndfeel,
      shoulder_prom_abduction_left: shoulderPROM.shoulderPromAbductionLeft,
      shoulder_prom_abduction_left_endfeel: shoulderPROM.shoulderPromAbductionLeftEndfeel,
      shoulder_prom_extension_right: shoulderPROM.shoulderPromExtensionRight,
      shoulder_prom_extension_right_endfeel: shoulderPROM.shoulderPromExtensionRightEndfeel,
      shoulder_prom_extension_left: shoulderPROM.shoulderPromExtensionLeft,
      shoulder_prom_extension_left_endfeel: shoulderPROM.shoulderPromExtensionLeftEndfeel,
      shoulder_prom_er_neutral_right: shoulderPROM.shoulderPromErNeutralRight,
      shoulder_prom_er_neutral_right_endfeel: shoulderPROM.shoulderPromErNeutralRightEndfeel,
      shoulder_prom_er_neutral_left: shoulderPROM.shoulderPromErNeutralLeft,
      shoulder_prom_er_neutral_left_endfeel: shoulderPROM.shoulderPromErNeutralLeftEndfeel,
      shoulder_prom_ir_neutral_right: shoulderPROM.shoulderPromIrNeutralRight,
      shoulder_prom_ir_neutral_right_endfeel: shoulderPROM.shoulderPromIrNeutralRightEndfeel,
      shoulder_prom_ir_neutral_left: shoulderPROM.shoulderPromIrNeutralLeft,
      shoulder_prom_ir_neutral_left_endfeel: shoulderPROM.shoulderPromIrNeutralLeftEndfeel,
      shoulder_prom_er_scapular_plane_right: shoulderPROM.shoulderPromErScapularPlaneRight,
      shoulder_prom_er_scapular_plane_right_endfeel: shoulderPROM.shoulderPromErScapularPlaneRightEndfeel,
      shoulder_prom_er_scapular_plane_left: shoulderPROM.shoulderPromErScapularPlaneLeft,
      shoulder_prom_er_scapular_plane_left_endfeel: shoulderPROM.shoulderPromErScapularPlaneLeftEndfeel,
      shoulder_prom_ir_scapular_plane_right: shoulderPROM.shoulderPromIrScapularPlaneRight,
      shoulder_prom_ir_scapular_plane_right_endfeel: shoulderPROM.shoulderPromIrScapularPlaneRightEndfeel,
      shoulder_prom_ir_scapular_plane_left: shoulderPROM.shoulderPromIrScapularPlaneLeft,
      shoulder_prom_ir_scapular_plane_left_endfeel: shoulderPROM.shoulderPromIrScapularPlaneLeftEndfeel,
      shoulder_prom_er_90_degrees_abduction_right: shoulderPROM.shoulderPromEr_90DegreesAbductionRight,
      shoulder_prom_er_90_degrees_abduction_right_endfeel: shoulderPROM.shoulderPromEr_90DegreesAbductionRightEndfeel,
      shoulder_prom_er_90_degrees_abduction_left: shoulderPROM.shoulderPromEr_90DegreesAbductionLeft,
      shoulder_prom_er_90_degrees_abduction_left_endfeel: shoulderPROM.shoulderPromEr_90DegreesAbductionLeftEndfeel,
      shoulder_prom_ir_90_degrees_abduction_right: shoulderPROM.shoulderPromIr_90DegreesAbductionRight,
      shoulder_prom_ir_90_degrees_abduction_right_endfeel: shoulderPROM.shoulderPromIr_90DegreesAbductionRightEndfeel,
      shoulder_prom_ir_90_degrees_abduction_left: shoulderPROM.shoulderPromIr_90DegreesAbductionLeft,
      shoulder_prom_ir_90_degrees_abduction_left_endfeel: shoulderPROM.shoulderPromIr_90DegreesAbductionLeftEndfeel,
      shoulder_prom_ir_sleeper_stretch_right: shoulderPROM.shoulderPromIrSleeperStretchRight,
      shoulder_prom_ir_sleeper_stretch_right_endfeel: shoulderPROM.shoulderPromIrSleeperStretchRightEndfeel,
      shoulder_prom_ir_sleeper_stretch_left: shoulderPROM.shoulderPromIrSleeperStretchLeft,
      shoulder_prom_ir_sleeper_stretch_left_endfeel: shoulderPROM.shoulderPromIrSleeperStretchLeftEndfeel,
      shoulder_prom_horizontal_abduction_right: shoulderPROM.shoulderPromHorizontalAbductionRight,
      shoulder_prom_horizontal_abduction_right_endfeel: shoulderPROM.shoulderPromHorizontalAbductionRightEndfeel,
      shoulder_prom_horizontal_abduction_left: shoulderPROM.shoulderPromHorizontalAbductionLeft,
      shoulder_prom_horizontal_abduction_left_endfeel: shoulderPROM.shoulderPromHorizontalAbductionLeftEndfeel,
      shoulder_prom_horizontal_adduction_right: shoulderPROM.shoulderPromHorizontalAdductionRight,
      shoulder_prom_horizontal_adduction_right_endfeel: shoulderPROM.shoulderPromHorizontalAdductionRightEndfeel,
      shoulder_prom_horizontal_adduction_left: shoulderPROM.shoulderPromHorizontalAdductionLeft,
      shoulder_prom_horizontal_adduction_left_endfeel: shoulderPROM.shoulderPromHorizontalAdductionLeftEndfeel
    };
  }

  private unmapElbowAROM(elbowAROM: any) {
    return {
      elbow_arrom: elbowAROM.elbowArrom ? 'yes' : 'no',
      elbow_arrom_apply_to_all: elbowAROM.elbowArromApplyToAll,
      elbow_arrom_flexion_right: elbowAROM.elbowArromFlexionRight,
      elbow_arrom_flexion_left: elbowAROM.elbowArromFlexionLeft,
      elbow_arrom_extension_right: elbowAROM.elbowArromExtensionRight,
      elbow_arrom_extension_left: elbowAROM.elbowArromExtensionLeft,
      elbow_arrom_pronation_right: elbowAROM.elbowArromPronationRight,
      elbow_arrom_pronation_left: elbowAROM.elbowArromPronationLeft,
      elbow_arrom_supination_right: elbowAROM.elbowArromSupinationRight,
      elbow_arrom_supination_left: elbowAROM.elbowArromSupinationLeft
    };
  }

  private unmapElbowPROM(elbowPROM: any) {
    return {
      elbow_prom: elbowPROM.elbowProm ? 'yes' : 'no',
      elbow_prom_apply_to_all: elbowPROM.elbowPromApplyToAll,
      elbow_prom_extension_right: elbowPROM.elbowPromExtensionRight,
      elbow_prom_extension_right_endfeel: elbowPROM.elbowPromExtensionRightEndfeel,
      elbow_prom_extension_left: elbowPROM.elbowPromExtensionLeft,
      elbow_prom_extension_left_endfeel: elbowPROM.elbowPromExtensionLeftEndfeel,
      elbow_prom_flexion_right: elbowPROM.elbowPromFlexionRight,
      elbow_prom_flexion_right_endfeel: elbowPROM.elbowPromFlexionRightEndfeel,
      elbow_prom_flexion_left: elbowPROM.elbowPromFlexionLeft,
      elbow_prom_flexion_left_endfeel: elbowPROM.elbowPromFlexionLeftEndfeel,
      elbow_prom_supination_right: elbowPROM.elbowPromSupinationRight,
      elbow_prom_supination_right_endfeel: elbowPROM.elbowPromSupinationRightEndfeel,
      elbow_prom_supination_left: elbowPROM.elbowPromSupinationLeft,
      elbow_prom_supination_left_endfeel: elbowPROM.elbowPromSupinationLeftEndfeel,
      elbow_prom_pronation_right: elbowPROM.elbowPromPronationRight,
      elbow_prom_pronation_right_endfeel: elbowPROM.elbowPromPronationRightEndfeel,
      elbow_prom_pronation_left: elbowPROM.elbowPromPronationLeft,
      elbow_prom_pronation_left_endfeel: elbowPROM.elbowPromPronationLeftEndfeel
    };
  }

  private unmapWristAROM(wristAROM: any) {
    return {
      wrist_arrom: wristAROM.wristArrom ? 'yes' : 'no',
      wrist_arrom_apply_to_all: wristAROM.wristArromApplyToAll,
      extension_right: wristAROM.extensionRight,
      extension_left: wristAROM.extensionLeft,
      flexion_right: wristAROM.flexionRight,
      flexion_left: wristAROM.flexionLeft,
      radial_deviation_right: wristAROM.radialDeviationRight,
      radial_deviation_left: wristAROM.radialDeviationLeft,
      ulnar_deviation_right: wristAROM.ulnarDeviationRight,
      ulnar_deviation_left: wristAROM.ulnarDeviationLeft
    };
  }

  private unmapWristPROM(wristPROM: any) {
    return {
      wrist_prom: wristPROM.wristProm ? 'yes' : 'no',
      wrist_prom_apply_to_all: wristPROM.wristPromApplyToAll,
      wrist_prom_extension_right: wristPROM.wristPromExtensionRight,
      wrist_prom_extension_right_endfeel: wristPROM.wristPromExtensionRightEndfeel,
      wrist_prom_extension_left: wristPROM.wristPromExtensionLeft,
      wrist_prom_extension_left_endfeel: wristPROM.wristPromExtensionLeftEndfeel,
      wrist_prom_flexion_right: wristPROM.wristPromFlexionRight,
      wrist_prom_flexion_right_endfeel: wristPROM.wristPromFlexionRightEndfeel,
      wrist_prom_flexion_left: wristPROM.wristPromFlexionLeft,
      wrist_prom_flexion_left_endfeel: wristPROM.wristPromFlexionLeftEndfeel,
      wrist_prom_radial_deviation_right: wristPROM.wristPromRadialDeviationRight,
      wrist_prom_radial_deviation_right_endfeel: wristPROM.wristPromRadialDeviationRightEndfeel,
      wrist_prom_radial_deviation_left: wristPROM.wristPromRadialDeviationLeft,
      wrist_prom_radial_deviation_left_endfeel: wristPROM.wristPromRadialDeviationLeftEndfeel,
      wrist_prom_ulnar_deviation_right: wristPROM.wristPromUlnarDeviationRight,
      wrist_prom_ulnar_deviation_right_endfeel: wristPROM.wristPromUlnarDeviationRightEndfeel,
      wrist_prom_ulnar_deviation_left: wristPROM.wristPromUlnarDeviationLeft,
      wrist_prom_ulnar_deviation_left_endfeel: wristPROM.wristPromUlnarDeviationLeftEndfeel
    };
  }

  private unmapHandAROMPROM(handAROMPROM: any) {
    const thumb = handAROMPROM.thumbAROMPROM || {};
    const index = handAROMPROM.indexFingerAROMPROM || {};
    const middle = handAROMPROM.middleFingerAROMPROM || {};
    const ring = handAROMPROM.ringFingerAROMPROM || {};
    const small = handAROMPROM.smallFingerAROMPROM || {};

    return {
      hand_arrom_prom: handAROMPROM.handArromProm ? 'yes' : 'no',
      calculate_total_rom: handAROMPROM.calculateTotalRom,
      thumb_arrom_prom: thumb.thumbArromProm,
      thumb_cmc_palmar_abduction_right_arom: thumb.thumbCmcPalmarAbductionRightArom,
      thumb_cmc_palmar_abduction_right_prom: thumb.thumbCmcPalmarAbductionRightProm,
      thumb_cmc_palmar_abduction_left_arom: thumb.thumbCmcPalmarAbductionLeftArom,
      thumb_cmc_palmar_abduction_left_prom: thumb.thumbCmcPalmarAbductionLeftProm,
      thumb_cmc_radial_abduction_right_arom: thumb.thumbCmcRadialAbductionRightArom,
      thumb_cmc_radial_abduction_right_prom: thumb.thumbCmcRadialAbductionRightProm,
      thumb_cmc_radial_abduction_left_arom: thumb.thumbCmcRadialAbductionLeftArom,
      thumb_cmc_radial_abduction_left_prom: thumb.thumbCmcRadialAbductionLeftProm,
      thumb_cmc_adduction_right_arom: thumb.thumbCmcAdductionRightArom,
      thumb_cmc_adduction_right_prom: thumb.thumbCmcAdductionRightProm,
      thumb_cmc_adduction_left_arom: thumb.thumbCmcAdductionLeftArom,
      thumb_cmc_adduction_left_prom: thumb.thumbCmcAdductionLeftProm,
      thumb_cmc_extension_right_arom: thumb.thumbCmcExtensionRightArom,
      thumb_cmc_extension_right_prom: thumb.thumbCmcExtensionRightProm,
      thumb_cmc_extension_left_arom: thumb.thumbCmcExtensionLeftArom,
      thumb_cmc_extension_left_prom: thumb.thumbCmcExtensionLeftProm,
      thumb_cmc_flexion_right_arom: thumb.thumbCmcFlexionRightArom,
      thumb_cmc_flexion_right_prom: thumb.thumbCmcFlexionRightProm,
      thumb_cmc_flexion_left_arom: thumb.thumbCmcFlexionLeftArom,
      thumb_cmc_flexion_left_prom: thumb.thumbCmcFlexionLeftProm,
      thumb_cmc_total_motion_right_arom: thumb.thumbCmcTotalMotionRightArom,
      thumb_cmc_total_motion_right_prom: thumb.thumbCmcTotalMotionRightProm,
      thumb_cmc_total_motion_left_arom: thumb.thumbCmcTotalMotionLeftArom,
      thumb_cmc_total_motion_left_prom: thumb.thumbCmcTotalMotionLeftProm,
      thumb_mp_extension_right_arom: thumb.thumbMpExtensionRightArom,
      thumb_mp_extension_right_prom: thumb.thumbMpExtensionRightProm,
      thumb_mp_extension_left_arom: thumb.thumbMpExtensionLeftArom,
      thumb_mp_extension_left_prom: thumb.thumbMpExtensionLeftProm,
      thumb_mp_flexion_right_arom: thumb.thumbMpFlexionRightArom,
      thumb_mp_flexion_right_prom: thumb.thumbMpFlexionRightProm,
      thumb_mp_flexion_left_arom: thumb.thumbMpFlexionLeftArom,
      thumb_mp_flexion_left_prom: thumb.thumbMpFlexionLeftProm,
      thumb_mp_total_motion_right_arom: thumb.thumbMpTotalMotionRightArom,
      thumb_mp_total_motion_right_prom: thumb.thumbMpTotalMotionRightProm,
      thumb_mp_total_motion_left_arom: thumb.thumbMpTotalMotionLeftArom,
      thumb_mp_total_motion_left_prom: thumb.thumbMpTotalMotionLeftProm,
      thumb_ip_extension_right_arom: thumb.thumbIpExtensionRightArom,
      thumb_ip_extension_right_prom: thumb.thumbIpExtensionRightProm,
      thumb_ip_extension_left_arom: thumb.thumbIpExtensionLeftArom,
      thumb_ip_extension_left_prom: thumb.thumbIpExtensionLeftProm,
      thumb_ip_flexion_right_arom: thumb.thumbIpFlexionRightArom,
      thumb_ip_flexion_right_prom: thumb.thumbIpFlexionRightProm,
      thumb_ip_flexion_left_arom: thumb.thumbIpFlexionLeftArom,
      thumb_ip_flexion_left_prom: thumb.thumbIpFlexionLeftProm,
      thumb_ip_total_motion_right_arom: thumb.thumbIpTotalMotionRightArom,
      thumb_ip_total_motion_right_prom: thumb.thumbIpTotalMotionRightProm,
      thumb_ip_total_motion_left_arom: thumb.thumbIpTotalMotionLeftArom,
      thumb_ip_total_motion_left_prom: thumb.thumbIpTotalMotionLeftProm,
      thumb_comments: thumb.thumbComments,

      ...this.unmapFingerAROMPROM(index, 'index'),
      ...this.unmapFingerAROMPROM(middle, 'middle'),
      ...this.unmapFingerAROMPROM(ring, 'ring'),
      ...this.unmapFingerAROMPROM(small, 'small')
    };
  }

  private unmapFingerAROMPROM(finger: any, fingerPrefix: string) {
    const prefix = fingerPrefix.charAt(0).toUpperCase() + fingerPrefix.slice(1);
    return {
      [`${fingerPrefix}_finger_arrom_prom`]: finger[`${fingerPrefix}FingerArromProm`],
      [`${fingerPrefix}_mp_adduction_right_arom`]: finger[`${fingerPrefix}MpAdductionRightArom`],
      [`${fingerPrefix}_mp_adduction_right_prom`]: finger[`${fingerPrefix}MpAdductionRightProm`],
      [`${fingerPrefix}_mp_adduction_left_arom`]: finger[`${fingerPrefix}MpAdductionLeftArom`],
      [`${fingerPrefix}_mp_adduction_left_prom`]: finger[`${fingerPrefix}MpAdductionLeftProm`],
      [`${fingerPrefix}_mp_extension_right_arom`]: finger[`${fingerPrefix}MpExtensionRightArom`],
      [`${fingerPrefix}_mp_extension_right_prom`]: finger[`${fingerPrefix}MpExtensionRightProm`],
      [`${fingerPrefix}_mp_extension_left_arom`]: finger[`${fingerPrefix}MpExtensionLeftArom`],
      [`${fingerPrefix}_mp_extension_left_prom`]: finger[`${fingerPrefix}MpExtensionLeftProm`],
      [`${fingerPrefix}_mp_flexion_right_arom`]: finger[`${fingerPrefix}MpFlexionRightArom`],
      [`${fingerPrefix}_mp_flexion_right_prom`]: finger[`${fingerPrefix}MpFlexionRightProm`],
      [`${fingerPrefix}_mp_flexion_left_arom`]: finger[`${fingerPrefix}MpFlexionLeftArom`],
      [`${fingerPrefix}_mp_flexion_left_prom`]: finger[`${fingerPrefix}MpFlexionLeftProm`],
      [`${fingerPrefix}_mp_total_motion_right_arom`]: finger[`${fingerPrefix}MpTotalMotionRightArom`],
      [`${fingerPrefix}_mp_total_motion_right_prom`]: finger[`${fingerPrefix}MpTotalMotionRightProm`],
      [`${fingerPrefix}_mp_total_motion_left_arom`]: finger[`${fingerPrefix}MpTotalMotionLeftArom`],
      [`${fingerPrefix}_mp_total_motion_left_prom`]: finger[`${fingerPrefix}MpTotalMotionLeftProm`],
      [`${fingerPrefix}_pip_extension_right_arom`]: finger[`${fingerPrefix}PipExtensionRightArom`],
      [`${fingerPrefix}_pip_extension_right_prom`]: finger[`${fingerPrefix}PipExtensionRightProm`],
      [`${fingerPrefix}_pip_extension_left_arom`]: finger[`${fingerPrefix}PipExtensionLeftArom`],
      [`${fingerPrefix}_pip_extension_left_prom`]: finger[`${fingerPrefix}PipExtensionLeftProm`],
      [`${fingerPrefix}_pip_flexion_right_arom`]: finger[`${fingerPrefix}PipFlexionRightArom`],
      [`${fingerPrefix}_pip_flexion_right_prom`]: finger[`${fingerPrefix}PipFlexionRightProm`],
      [`${fingerPrefix}_pip_flexion_left_arom`]: finger[`${fingerPrefix}PipFlexionLeftArom`],
      [`${fingerPrefix}_pip_flexion_left_prom`]: finger[`${fingerPrefix}PipFlexionLeftProm`],
      [`${fingerPrefix}_pip_total_motion_right_arom`]: finger[`${fingerPrefix}PipTotalMotionRightArom`],
      [`${fingerPrefix}_pip_total_motion_right_prom`]: finger[`${fingerPrefix}PipTotalMotionRightProm`],
      [`${fingerPrefix}_pip_total_motion_left_arom`]: finger[`${fingerPrefix}PipTotalMotionLeftArom`],
      [`${fingerPrefix}_pip_total_motion_left_prom`]: finger[`${fingerPrefix}PipTotalMotionLeftProm`],
      [`${fingerPrefix}_dip_extension_right_arom`]: finger[`${fingerPrefix}DipExtensionRightArom`],
      [`${fingerPrefix}_dip_extension_right_prom`]: finger[`${fingerPrefix}DipExtensionRightProm`],
      [`${fingerPrefix}_dip_extension_left_arom`]: finger[`${fingerPrefix}DipExtensionLeftArom`],
      [`${fingerPrefix}_dip_extension_left_prom`]: finger[`${fingerPrefix}DipExtensionLeftProm`],
      [`${fingerPrefix}_dip_flexion_right_arom`]: finger[`${fingerPrefix}DipFlexionRightArom`],
      [`${fingerPrefix}_dip_flexion_right_prom`]: finger[`${fingerPrefix}DipFlexionRightProm`],
      [`${fingerPrefix}_dip_flexion_left_arom`]: finger[`${fingerPrefix}DipFlexionLeftArom`],
      [`${fingerPrefix}_dip_flexion_left_prom`]: finger[`${fingerPrefix}DipFlexionLeftProm`],
      [`${fingerPrefix}_dip_total_motion_right_arom`]: finger[`${fingerPrefix}DipTotalMotionRightArom`],
      [`${fingerPrefix}_dip_total_motion_right_prom`]: finger[`${fingerPrefix}DipTotalMotionRightProm`],
      [`${fingerPrefix}_dip_total_motion_left_arom`]: finger[`${fingerPrefix}DipTotalMotionLeftArom`],
      [`${fingerPrefix}_dip_total_motion_left_prom`]: finger[`${fingerPrefix}DipTotalMotionLeftProm`],
      [`${fingerPrefix}_comments`]: finger[`${fingerPrefix}Comments`]
    };
  }

  private unmapHipAROM(hipAROM: any) {
    return {
      hip_arrom: hipAROM.hipArrom ? 'yes' : 'no',
      hip_flexion_right: hipAROM.hipFlexionRight,
      hip_flexion_left: hipAROM.hipFlexionLeft,
      hip_extension_right: hipAROM.hipExtensionRight,
      hip_extension_left: hipAROM.hipExtensionLeft,
      hip_abduction_right: hipAROM.hipAbductionRight,
      hip_abduction_left: hipAROM.hipAbductionLeft,
      hip_adduction_right: hipAROM.hipAdductionRight,
      hip_adduction_left: hipAROM.hipAdductionLeft,
      hip_internal_rotation_right: hipAROM.hipInternalRotationRight,
      hip_internal_rotation_left: hipAROM.hipInternalRotationLeft,
      hip_external_rotation_right: hipAROM.hipExternalRotationRight,
      hip_external_rotation_left: hipAROM.hipExternalRotationLeft,
      hip_arrom_comments: hipAROM.hipArromComments
    };
  }

  private unmapHipPROM(hipPROM: any) {
    return {
      hip_prom: hipPROM.hipProm ? 'yes' : 'no',
      hip_prom_apply_to_all: hipPROM.hipPromApplyToAll,
      hip_prom_flexion_right: hipPROM.hipPromFlexionRight,
      hip_prom_flexion_right_endfeel: hipPROM.hipPromFlexionRightEndfeel,
      hip_prom_flexion_left: hipPROM.hipPromFlexionLeft,
      hip_prom_flexion_left_endfeel: hipPROM.hipPromFlexionLeftEndfeel,
      hip_prom_extension_right: hipPROM.hipPromExtensionRight,
      hip_prom_extension_right_endfeel: hipPROM.hipPromExtensionRightEndfeel,
      hip_prom_extension_left: hipPROM.hipPromExtensionLeft,
      hip_prom_extension_left_endfeel: hipPROM.hipPromExtensionLeftEndfeel,
      hip_prom_abduction_right: hipPROM.hipPromAbductionRight,
      hip_prom_abduction_right_endfeel: hipPROM.hipPromAbductionRightEndfeel,
      hip_prom_abduction_left: hipPROM.hipPromAbductionLeft,
      hip_prom_abduction_left_endfeel: hipPROM.hipPromAbductionLeftEndfeel,
      hip_prom_adduction_right: hipPROM.hipPromAdductionRight,
      hip_prom_adduction_right_endfeel: hipPROM.hipPromAdductionRightEndfeel,
      hip_prom_adduction_left: hipPROM.hipPromAdductionLeft,
      hip_prom_adduction_left_endfeel: hipPROM.hipPromAdductionLeftEndfeel,
      hip_prom_internal_rotation_right: hipPROM.hipPromInternalRotationRight,
      hip_prom_internal_rotation_right_endfeel: hipPROM.hipPromInternalRotationRightEndfeel,
      hip_prom_internal_rotation_left: hipPROM.hipPromInternalRotationLeft,
      hip_prom_internal_rotation_left_endfeel: hipPROM.hipPromInternalRotationLeftEndfeel,
      hip_prom_external_rotation_right: hipPROM.hipPromExternalRotationRight,
      hip_prom_external_rotation_right_endfeel: hipPROM.hipPromExternalRotationRightEndfeel,
      hip_prom_external_rotation_left: hipPROM.hipPromExternalRotationLeft,
      hip_prom_external_rotation_left_endfeel: hipPROM.hipPromExternalRotationLeftEndfeel,
      hip_prom_comments: hipPROM.hipPromComments
    };
  }

  private unmapKneeAROM(kneeAROM: any) {
    return {
      knee_arrom: kneeAROM.kneeArrom ? 'yes' : 'no',
      knee_arom_apply_to_all: kneeAROM.kneeAromApplyToAll,
      knee_apply_to_all: kneeAROM.kneeApplyToAll,
      knee_flexion_right: kneeAROM.kneeFlexionRight,
      knee_flexion_left: kneeAROM.kneeFlexionLeft,
      knee_extension_right: kneeAROM.kneeExtensionRight,
      knee_extension_left: kneeAROM.kneeExtensionLeft,
      knee_arrom_comments: kneeAROM.kneeArromComments,
      knee_comments: kneeAROM.kneeComments
    };
  }

  private unmapAnkleAROM(ankleAROM: any) {
    return {
      ankle_arrom: ankleAROM.ankleArrom ? 'yes' : 'no',
      ankle_arom_apply_to_all: ankleAROM.ankleAromApplyToAll,
      ankle_apply_to_all: ankleAROM.ankleApplyToAll,
      ankle_dorsiflexion_0_knee_flexion_right: ankleAROM.ankleDorsiflexion_0KneeFlexionRight,
      ankle_dorsiflexion_0_knee_flexion_left: ankleAROM.ankleDorsiflexion_0KneeFlexionLeft,
      ankle_dorsiflexion_90_knee_flexion_right: ankleAROM.ankleDorsiflexion_90KneeFlexionRight,
      ankle_dorsiflexion_90_knee_flexion_left: ankleAROM.ankleDorsiflexion_90KneeFlexionLeft,
      ankle_plantarflexion_right: ankleAROM.anklePlantarflexionRight,
      ankle_plantarflexion_left: ankleAROM.anklePlantarflexionLeft,
      ankle_inversion_right: ankleAROM.ankleInversionRight,
      ankle_inversion_left: ankleAROM.ankleInversionLeft,
      ankle_eversion_right: ankleAROM.ankleEversionRight,
      ankle_eversion_left: ankleAROM.ankleEversionLeft,
      ankle_arrom_comments: ankleAROM.ankleArromComments,
      ankle_comments: ankleAROM.ankleComments
    };
  }

  private unmapAnklePROM(anklePROM: any) {
    return {
      ankle_prom: anklePROM.ankleProm ? 'yes' : 'no',
      ankle_prom_apply_to_all: anklePROM.anklePromApplyToAll,
      ankle_prom_dorsiflexion_0_knee_flexion_right: anklePROM.anklePromDorsiflexion_0KneeFlexionRight,
      ankle_prom_dorsiflexion_0_knee_flexion_right_endfeel: anklePROM.anklePromDorsiflexion_0KneeFlexionRightEndfeel,
      ankle_prom_dorsiflexion_0_knee_flexion_left: anklePROM.anklePromDorsiflexion_0KneeFlexionLeft,
      ankle_prom_dorsiflexion_0_knee_flexion_left_endfeel: anklePROM.anklePromDorsiflexion_0KneeFlexionLeftEndfeel,
      ankle_prom_dorsiflexion_90_knee_flexion_right: anklePROM.anklePromDorsiflexion_90KneeFlexionRight,
      ankle_prom_dorsiflexion_90_knee_flexion_right_endfeel: anklePROM.anklePromDorsiflexion_90KneeFlexionRightEndfeel,
      ankle_prom_dorsiflexion_90_knee_flexion_left: anklePROM.anklePromDorsiflexion_90KneeFlexionLeft,
      ankle_prom_dorsiflexion_90_knee_flexion_left_endfeel: anklePROM.anklePromDorsiflexion_90KneeFlexionLeftEndfeel,
      ankle_prom_plantarflexion_right: anklePROM.anklePromPlantarflexionRight,
      ankle_prom_plantarflexion_right_endfeel: anklePROM.anklePromPlantarflexionRightEndfeel,
      ankle_prom_plantarflexion_left: anklePROM.anklePromPlantarflexionLeft,
      ankle_prom_plantarflexion_left_endfeel: anklePROM.anklePromPlantarflexionLeftEndfeel,
      ankle_prom_inversion_right: anklePROM.anklePromInversionRight,
      ankle_prom_inversion_right_endfeel: anklePROM.anklePromInversionRightEndfeel,
      ankle_prom_inversion_left: anklePROM.anklePromInversionLeft,
      ankle_prom_inversion_left_endfeel: anklePROM.anklePromInversionLeftEndfeel,
      ankle_prom_eversion_right: anklePROM.anklePromEversionRight,
      ankle_prom_eversion_right_endfeel: anklePROM.anklePromEversionRightEndfeel,
      ankle_prom_eversion_left: anklePROM.anklePromEversionLeft,
      ankle_prom_eversion_left_endfeel: anklePROM.anklePromEversionLeftEndfeel,
      ankle_prom_comments: anklePROM.anklePromComments
    };
  }

  private unmapFstMTPAROM(fstMTPAROM: any) {
    return {
      fst_mtp_arrom: fstMTPAROM.fstMtpArrom ? 'yes' : 'no',
      fst_mtp_arom_apply_to_all: fstMTPAROM.fstMtpAromApplyToAll,
      fst_mtp_apply_to_all: fstMTPAROM.fstMtpApplyToAll,
      fst_mtp_flexion_right: fstMTPAROM.fstMtpFlexionRight,
      fst_mtp_flexion_left: fstMTPAROM.fstMtpFlexionLeft,
      fst_mtp_extension_right: fstMTPAROM.fstMtpExtensionRight,
      fst_mtp_extension_left: fstMTPAROM.fstMtpExtensionLeft,
      fst_mtp_arrom_comments: fstMTPAROM.fstMtpArromComments,
      fst_mtp_comments: fstMTPAROM.fstMtpComments
    };
  }

  private unmapFstIPAROM(fstIPAROM: any) {
    return {
      fst_ip_arrom: fstIPAROM.fstIpArrom ? 'yes' : 'no',
      fst_ip_arom_apply_to_all: fstIPAROM.fstIpAromApplyToAll,
      fst_ip_apply_to_all: fstIPAROM.fstIpApplyToAll,
      fst_ip_flexion_right: fstIPAROM.fstIpFlexionRight,
      fst_ip_flexion_left: fstIPAROM.fstIpFlexionLeft,
      fst_ip_extension_right: fstIPAROM.fstIpExtensionRight,
      fst_ip_extension_left: fstIPAROM.fstIpExtensionLeft,
      fst_ip_arrom_comments: fstIPAROM.fstIpArromComments,
      fst_ip_comments: fstIPAROM.fstIpComments
    };
  }

  private unmapToeAROM(toeAROM: any) {
    return {
      toe_arrom: toeAROM.toeArrom ? 'yes' : 'no',
      toe_arom_apply_to_all: toeAROM.toeAromApplyToAll,
      toe_apply_to_all: toeAROM.toeApplyToAll,
      toe_arom_2nd_mtp_flexion_right: toeAROM.toeArom_2ndMtpFlexionRight,
      toe_arom_2nd_mtp_flexion_left: toeAROM.toeArom_2ndMtpFlexionLeft,
      toe_arom_2nd_mtp_extension_right: toeAROM.toeArom_2ndMtpExtensionRight,
      toe_arom_2nd_mtp_extension_left: toeAROM.toeArom_2ndMtpExtensionLeft,
      toe_arom_2nd_ip_flexion_right: toeAROM.toeArom_2ndIpFlexionRight,
      toe_arom_2nd_ip_flexion_left: toeAROM.toeArom_2ndIpFlexionLeft,
      toe_arom_2nd_ip_extension_right: toeAROM.toeArom_2ndIpExtensionRight,
      toe_arom_2nd_ip_extension_left: toeAROM.toeArom_2ndIpExtensionLeft,
      toe_arom_3rd_mtp_flexion_right: toeAROM.toeArom_3rdMtpFlexionRight,
      toe_arom_3rd_mtp_flexion_left: toeAROM.toeArom_3rdMtpFlexionLeft,
      toe_arom_3rd_mtp_extension_right: toeAROM.toeArom_3rdMtpExtensionRight,
      toe_arom_3rd_mtp_extension_left: toeAROM.toeArom_3rdMtpExtensionLeft,
      toe_arom_3rd_ip_flexion_right: toeAROM.toeArom_3rdIpFlexionRight,
      toe_arom_3rd_ip_flexion_left: toeAROM.toeArom_3rdIpFlexionLeft,
      toe_arom_3rd_ip_extension_right: toeAROM.toeArom_3rdIpExtensionRight,
      toe_arom_3rd_ip_extension_left: toeAROM.toeArom_3rdIpExtensionLeft,
      toe_arom_4th_mtp_flexion_right: toeAROM.toeArom_4thMtpFlexionRight,
      toe_arom_4th_mtp_flexion_left: toeAROM.toeArom_4thMtpFlexionLeft,
      toe_arom_4th_mtp_extension_right: toeAROM.toeArom_4thMtpExtensionRight,
      toe_arom_4th_mtp_extension_left: toeAROM.toeArom_4thMtpExtensionLeft,
      toe_arom_4th_ip_flexion_right: toeAROM.toeArom_4thIpFlexionRight,
      toe_arom_4th_ip_flexion_left: toeAROM.toeArom_4thIpFlexionLeft,
      toe_arom_4th_ip_extension_right: toeAROM.toeArom_4thIpExtensionRight,
      toe_arom_4th_ip_extension_left: toeAROM.toeArom_4thIpExtensionLeft,
      toe_arom_5th_mtp_flexion_right: toeAROM.toeArom_5thMtpFlexionRight,
      toe_arom_5th_mtp_flexion_left: toeAROM.toeArom_5thMtpFlexionLeft,
      toe_arom_5th_mtp_extension_right: toeAROM.toeArom_5thMtpExtensionRight,
      toe_arom_5th_mtp_extension_left: toeAROM.toeArom_5thMtpExtensionLeft,
      toe_arom_5th_ip_flexion_right: toeAROM.toeArom_5thIpFlexionRight,
      toe_arom_5th_ip_flexion_left: toeAROM.toeArom_5thIpFlexionLeft,
      toe_arom_5th_ip_extension_right: toeAROM.toeArom_5thIpExtensionRight,
      toe_arom_5th_ip_extension_left: toeAROM.toeArom_5thIpExtensionLeft,
      toe_arrom_comments: toeAROM.toeArromComments,
      toe_comments: toeAROM.toeComments
    };
  }

  private unmapToePROM(toePROM: any) {
    return {
      toe_prom: toePROM.toeProm ? 'yes' : 'no',
      toe_prom_apply_to_all: toePROM.toePromApplyToAll,
      toe_2nd_mtp_flexion_right: toePROM.toe_2ndMtpFlexionRight,
      toe_2nd_mtp_flexion_right_endfeel: toePROM.toe_2ndMtpFlexionRightEndfeel,
      toe_2nd_mtp_flexion_left: toePROM.toe_2ndMtpFlexionLeft,
      toe_2nd_mtp_flexion_left_endfeel: toePROM.toe_2ndMtpFlexionLeftEndfeel,
      toe_2nd_mtp_extension_right: toePROM.toe_2ndMtpExtensionRight,
      toe_2nd_mtp_extension_right_endfeel: toePROM.toe_2ndMtpExtensionRightEndfeel,
      toe_2nd_mtp_extension_left: toePROM.toe_2ndMtpExtensionLeft,
      toe_2nd_mtp_extension_left_endfeel: toePROM.toe_2ndMtpExtensionLeftEndfeel,
      toe_2nd_ip_flexion_right: toePROM.toe_2ndIpFlexionRight,
      toe_2nd_ip_flexion_right_endfeel: toePROM.toe_2ndIpFlexionRightEndfeel,
      toe_2nd_ip_flexion_left: toePROM.toe_2ndIpFlexionLeft,
      toe_2nd_ip_flexion_left_endfeel: toePROM.toe_2ndIpFlexionLeftEndfeel,
      toe_2nd_ip_extension_right: toePROM.toe_2ndIpExtensionRight,
      toe_2nd_ip_extension_right_endfeel: toePROM.toe_2ndIpExtensionRightEndfeel,
      toe_2nd_ip_extension_left: toePROM.toe_2ndIpExtensionLeft,
      toe_2nd_ip_extension_left_endfeel: toePROM.toe_2ndIpExtensionLeftEndfeel,
      toe_3rd_mtp_flexion_right: toePROM.toe_3rdMtpFlexionRight,
      toe_3rd_mtp_flexion_right_endfeel: toePROM.toe_3rdMtpFlexionRightEndfeel,
      toe_3rd_mtp_flexion_left: toePROM.toe_3rdMtpFlexionLeft,
      toe_3rd_mtp_flexion_left_endfeel: toePROM.toe_3rdMtpFlexionLeftEndfeel,
      toe_3rd_mtp_extension_right: toePROM.toe_3rdMtpExtensionRight,
      toe_3rd_mtp_extension_right_endfeel: toePROM.toe_3rdMtpExtensionRightEndfeel,
      toe_3rd_mtp_extension_left: toePROM.toe_3rdMtpExtensionLeft,
      toe_3rd_mtp_extension_left_endfeel: toePROM.toe_3rdMtpExtensionLeftEndfeel,
      toe_3rd_ip_flexion_right: toePROM.toe_3rdIpFlexionRight,
      toe_3rd_ip_flexion_right_endfeel: toePROM.toe_3rdIpFlexionRightEndfeel,
      toe_3rd_ip_flexion_left: toePROM.toe_3rdIpFlexionLeft,
      toe_3rd_ip_flexion_left_endfeel: toePROM.toe_3rdIpFlexionLeftEndfeel,
      toe_3rd_ip_extension_right: toePROM.toe_3rdIpExtensionRight,
      toe_3rd_ip_extension_right_endfeel: toePROM.toe_3rdIpExtensionRightEndfeel,
      toe_3rd_ip_extension_left: toePROM.toe_3rdIpExtensionLeft,
      toe_3rd_ip_extension_left_endfeel: toePROM.toe_3rdIpExtensionLeftEndfeel,
      toe_4th_mtp_flexion_right: toePROM.toe_4thMtpFlexionRight,
      toe_4th_mtp_flexion_right_endfeel: toePROM.toe_4thMtpFlexionRightEndfeel,
      toe_4th_mtp_flexion_left: toePROM.toe_4thMtpFlexionLeft,
      toe_4th_mtp_flexion_left_endfeel: toePROM.toe_4thMtpFlexionLeftEndfeel,
      toe_4th_mtp_extension_right: toePROM.toe_4thMtpExtensionRight,
      toe_4th_mtp_extension_right_endfeel: toePROM.toe_4thMtpExtensionRightEndfeel,
      toe_4th_mtp_extension_left: toePROM.toe_4thMtpExtensionLeft,
      toe_4th_mtp_extension_left_endfeel: toePROM.toe_4thMtpExtensionLeftEndfeel,
      toe_4th_ip_flexion_right: toePROM.toe_4thIpFlexionRight,
      toe_4th_ip_flexion_right_endfeel: toePROM.toe_4thIpFlexionRightEndfeel,
      toe_4th_ip_flexion_left: toePROM.toe_4thIpFlexionLeft,
      toe_4th_ip_flexion_left_endfeel: toePROM.toe_4thIpFlexionLeftEndfeel,
      toe_4th_ip_extension_right: toePROM.toe_4thIpExtensionRight,
      toe_4th_ip_extension_right_endfeel: toePROM.toe_4thIpExtensionRightEndfeel,
      toe_4th_ip_extension_left: toePROM.toe_4thIpExtensionLeft,
      toe_4th_ip_extension_left_endfeel: toePROM.toe_4thIpExtensionLeftEndfeel,
      toe_5th_mtp_flexion_right: toePROM.toe_5thMtpFlexionRight,
      toe_5th_mtp_flexion_right_endfeel: toePROM.toe_5thMtpFlexionRightEndfeel,
      toe_5th_mtp_flexion_left: toePROM.toe_5thMtpFlexionLeft,
      toe_5th_mtp_flexion_left_endfeel: toePROM.toe_5thMtpFlexionLeftEndfeel,
      toe_5th_mtp_extension_right: toePROM.toe_5thMtpExtensionRight,
      toe_5th_mtp_extension_right_endfeel: toePROM.toe_5thMtpExtensionRightEndfeel,
      toe_5th_mtp_extension_left: toePROM.toe_5thMtpExtensionLeft,
      toe_5th_mtp_extension_left_endfeel: toePROM.toe_5thMtpExtensionLeftEndfeel,
      toe_5th_ip_flexion_right: toePROM.toe_5thIpFlexionRight,
      toe_5th_ip_flexion_right_endfeel: toePROM.toe_5thIpFlexionRightEndfeel,
      toe_5th_ip_flexion_left: toePROM.toe_5thIpFlexionLeft,
      toe_5th_ip_flexion_left_endfeel: toePROM.toe_5thIpFlexionLeftEndfeel,
      toe_5th_ip_extension_right: toePROM.toe_5thIpExtensionRight,
      toe_5th_ip_extension_right_endfeel: toePROM.toe_5thIpExtensionRightEndfeel,
      toe_5th_ip_extension_left: toePROM.toe_5thIpExtensionLeft,
      toe_5th_ip_extension_left_endfeel: toePROM.toe_5thIpExtensionLeftEndfeel,
      toe_prom_comments: toePROM.toePromComments
    };
  }
}
