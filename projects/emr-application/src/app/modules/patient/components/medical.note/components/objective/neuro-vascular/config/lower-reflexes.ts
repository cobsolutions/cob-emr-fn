import { DEFAULT_APPLY_TO_ALL_OPTIONS, RomSectionConfig } from "../../range-of-motion/config";
import { lowerReflexes_OPTIONS } from "./neuro-vascular-options";

export interface LowerReflexes {
  enabled: boolean;
}

export class LowerReflexes {
  static readonly lowerReflexes: RomSectionConfig = {
    labels: [
      'Knee Jerk (L4)',
      'Ankle Jerk (S1)'
    ],
    options: lowerReflexes_OPTIONS,
    applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
    fieldPrefix: 'lower_reflexes_',
    applyToAllFieldName: '',
    commentsFieldName: '',
    showApplyToAll: true,
    showComments: true
  };
  
}

