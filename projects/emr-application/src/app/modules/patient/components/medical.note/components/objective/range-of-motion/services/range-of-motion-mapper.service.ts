import { Injectable } from '@angular/core';
import { RangeOfMotionModel, NoLimitationsNotedModel, PROMModel, CervicalAROMModel, CostovertebralExpansionModel, ShoulderAROMModel } from '../models/range-of-motion.model';

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
      shoulderArom: this.mapShoulderArom(formValue)
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
      shoulder_horizontal_adduction_left: dto.shoulderArom?.horizontalAdductionLeft || 'not_tested'
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
}
