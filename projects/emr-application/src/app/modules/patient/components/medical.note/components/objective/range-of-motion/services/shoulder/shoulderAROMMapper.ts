import { ShoulderAROM } from "../../models/ShoulderAROM";

export class ShoulderAROMMapper {
    public static toModel(formValue: any): ShoulderAROM {
        return {
            shoulderArrom: formValue.shoulder_arrom === 'yes',
            shoulderApplyToAll: formValue.shoulder_apply_to_all || '',
            shoulderFlexionRight: formValue.shoulder_flexion_right || '',
            shoulderFlexionLeft: formValue.shoulder_flexion_left || '',
            shoulderScaptionRight: formValue.shoulder_scaption_right || '',
            shoulderScaptionLeft: formValue.shoulder_scaption_left || '',
            shoulderAbductionRight: formValue.shoulder_abduction_right || '',
            shoulderAbductionLeft: formValue.shoulder_abduction_left || '',
            shoulderExtensionRight: formValue.shoulder_extension_right || '',
            shoulderExtensionLeft: formValue.shoulder_extension_left || '',
            shoulderFunctionalErReachRight: formValue.shoulder_functional_er_reach_right || '',
            shoulderFunctionalErReachLeft: formValue.shoulder_functional_er_reach_left || '',
            shoulderFunctionalIrReachRight: formValue.shoulder_functional_ir_reach_right || '',
            shoulderFunctionalIrReachLeft: formValue.shoulder_functional_ir_reach_left || '',
            shoulderErNeutralRight: formValue.shoulder_er_neutral_right || '',
            shoulderErNeutralLeft: formValue.shoulder_er_neutral_left || '',
            shoulderIrNeutralRight: formValue.shoulder_ir_neutral_right || '',
            shoulderIrNeutralLeft: formValue.shoulder_ir_neutral_left || '',
            shoulderHorizontalAbductionRight: formValue.shoulder_horizontal_abduction_right || '',
            shoulderHorizontalAbductionLeft: formValue.shoulder_horizontal_abduction_left || '',
            shoulderHorizontalAdductionRight: formValue.shoulder_horizontal_adduction_right || '',
            shoulderHorizontalAdductionLeft: formValue.shoulder_horizontal_adduction_left || '',
            shoulderFunctionalExternalRotationReachRight: formValue.shoulder_functional_external_rotation_reach_right,
            shoulderFunctionalExternalRotationReachLeft: formValue.shoulder_functional_external_rotation_reach_left,
            shoulderFunctionalInternalRotationReachRight: formValue.shoulder_functional_internal_rotation_reach_right,
            shoulderFunctionalInternalRotationReachLeft: formValue.shoulder_functional_internal_rotation_reach_left
        }
    }

    public static fromDto(dto: ShoulderAROM): any {
        return {
            shoulder_arrom: dto.shoulderArrom ? 'yes' : 'no',
            shoulder_apply_to_all: dto.shoulderApplyToAll || '',
            shoulder_flexion_right: dto.shoulderFlexionRight || '',
            shoulder_flexion_left: dto.shoulderFlexionLeft || '',
            shoulder_scaption_right: dto.shoulderScaptionRight || '',
            shoulder_scaption_left: dto.shoulderScaptionLeft || '',
            shoulder_abduction_right: dto.shoulderAbductionRight || '',
            shoulder_abduction_left: dto.shoulderAbductionLeft || '',
            shoulder_extension_right: dto.shoulderExtensionRight || '',
            shoulder_extension_left: dto.shoulderExtensionLeft || '',
            shoulder_functional_er_reach_right: dto.shoulderFunctionalErReachRight || '',
            shoulder_functional_er_reach_left: dto.shoulderFunctionalErReachLeft || '',
            shoulder_functional_ir_reach_right: dto.shoulderFunctionalIrReachRight || '',
            shoulder_functional_ir_reach_left: dto.shoulderFunctionalIrReachLeft || '',
            shoulder_er_neutral_right: dto.shoulderErNeutralRight || '',
            shoulder_er_neutral_left: dto.shoulderErNeutralLeft || '',
            shoulder_ir_neutral_right: dto.shoulderIrNeutralRight || '',
            shoulder_ir_neutral_left: dto.shoulderIrNeutralLeft || '',
            shoulder_horizontal_abduction_right: dto.shoulderHorizontalAbductionRight || '',
            shoulder_horizontal_abduction_left: dto.shoulderHorizontalAbductionLeft || '',
            shoulder_horizontal_adduction_right: dto.shoulderHorizontalAdductionRight || '',
            shoulder_horizontal_adduction_left: dto.shoulderHorizontalAdductionLeft || '',
            shoulder_functional_external_rotation_reach_right: dto.shoulderFunctionalExternalRotationReachRight || '',
            shoulder_functional_external_rotation_reach_left: dto.shoulderFunctionalExternalRotationReachLeft || '',
            shoulder_functional_internal_rotation_reach_right: dto.shoulderFunctionalInternalRotationReachRight || '',
            shoulder_functional_internal_rotation_reach_left: dto.shoulderFunctionalInternalRotationReachLeft || ''

        }
    }
}