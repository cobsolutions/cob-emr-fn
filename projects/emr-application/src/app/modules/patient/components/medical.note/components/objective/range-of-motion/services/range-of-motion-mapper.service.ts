import { Injectable } from '@angular/core';
import { RangeOfMotionModel, NoLimitationsNotedModel, PROMModel, CervicalAROMModel, CostovertebralExpansionModel, ShoulderAROMModel, ShoulderPROMModel, ElbowAROMModel, ElbowPROMModel } from '../models/range-of-motion.model';

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
      elbowProm: this.mapElbowProm(formValue)
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
      elbow_prom_flexion_right: dto.elbowProm?.flexionRight || 'not_tested',
      elbow_prom_flexion_left: dto.elbowProm?.flexionLeft || 'not_tested',
      elbow_prom_extension_right: dto.elbowProm?.extensionRight || 'not_tested',
      elbow_prom_extension_left: dto.elbowProm?.extensionLeft || 'not_tested',
      elbow_prom_pronation_right: dto.elbowProm?.pronationRight || 'not_tested',
      elbow_prom_pronation_left: dto.elbowProm?.pronationLeft || 'not_tested',
      elbow_prom_supination_right: dto.elbowProm?.supinationRight || 'not_tested',
      elbow_prom_supination_left: dto.elbowProm?.supinationLeft || 'not_tested'
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
      model.flexionRight = formValue.elbow_prom_flexion_right || 'not_tested';
      model.flexionLeft = formValue.elbow_prom_flexion_left || 'not_tested';
      model.extensionRight = formValue.elbow_prom_extension_right || 'not_tested';
      model.extensionLeft = formValue.elbow_prom_extension_left || 'not_tested';
      model.pronationRight = formValue.elbow_prom_pronation_right || 'not_tested';
      model.pronationLeft = formValue.elbow_prom_pronation_left || 'not_tested';
      model.supinationRight = formValue.elbow_prom_supination_right || 'not_tested';
      model.supinationLeft = formValue.elbow_prom_supination_left || 'not_tested';
    }

    return model;
  }
}
