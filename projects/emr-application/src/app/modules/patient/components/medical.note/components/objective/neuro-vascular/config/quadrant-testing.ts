import { RomSectionConfig } from "../../range-of-motion/config";
import { DEFAULT_APPLY_TO_ALL_OPTIONS, quadrantTesting_OPTIONS } from "./neuro-vascular-options";

export interface QuadrantTesting {
  enabled: boolean;
}

export class QuadrantTesting {
  static readonly quadrantTesting: RomSectionConfig = {
    labels: [
      'Quadrant Testing'
    ],
    options: quadrantTesting_OPTIONS,
    applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
    fieldPrefix: 'quadrant_testing_',
    applyToAllFieldName: '',
    commentsFieldName: '',
    showApplyToAll: false,
    showComments: false
  };
  
}

