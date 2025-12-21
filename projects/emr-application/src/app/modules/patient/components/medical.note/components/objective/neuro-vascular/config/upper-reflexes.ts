import { DEFAULT_APPLY_TO_ALL_OPTIONS, RomSectionConfig } from "../../range-of-motion/config";
import { upperReflexes_OPTIONS } from "./neuro-vascular-options";

export interface UpperReflexes {
  enabled: boolean;
}

export class UpperReflexes {
  static readonly upperReflexes: RomSectionConfig = {
    labels: [
      'Biceps C5,6',
      'Triceps C7',
      'Brachial Radialis C5,6'
    ],
    options: upperReflexes_OPTIONS,
    applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
    fieldPrefix: 'upper_reflexes_',
    applyToAllFieldName: '',
    commentsFieldName: '',
    showApplyToAll: false,
    showComments: false
  };
}

