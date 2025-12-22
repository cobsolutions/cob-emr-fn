import { RomSectionConfig } from "../../../range-of-motion/config";
import { DEFAULT_APPLY_TO_ALL_OPTIONS, selectiveFunctionalMovementAssessment_OPTIONS } from "../special-test-options";

export interface SelectiveFunctionalMovementAssessment {
  enabled: boolean;
}

export class SelectiveFunctionalMovementAssessment {
  static readonly selectiveFunctionalMovementAssessment: RomSectionConfig = {
    labels: [
      'Multi-segmental Extension',
      'Multi-segmental Flexion',
      'Multi-segmental Rotation',
      'Overhead Deep Squat',
      'Single Leg Balance'
    ],
    options: selectiveFunctionalMovementAssessment_OPTIONS,
    applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
    fieldPrefix: 'selective_functional_movement_assessment_',
    applyToAllFieldName: '',
    commentsFieldName: '',
    showApplyToAll: true,
    showComments: true
  };
  
}

