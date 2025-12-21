import { DEFAULT_APPLY_TO_ALL_OPTIONS, RomSectionConfig } from "../../range-of-motion/config";
import { neuralTissueTensionUpper_OPTIONS } from "./neuro-vascular-options";

export interface NeuralTissueTensionUpper {
  enabled: boolean;
}

export class NeuralTissueTensionUpper {
  static readonly neuralTissueTensionUpper: RomSectionConfig = {
    labels: [
      'Median Nerve',
      'Radial Nerve',
      'Ulnar Nerve',
      'Musculocutaneous Nerve',
      'Axillary Nerve',
      'Suprascapular Nerve'
    ],
    options: neuralTissueTensionUpper_OPTIONS,
    applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
    fieldPrefix: 'neural_tissue_tension_upper_',
    applyToAllFieldName: '',
    commentsFieldName: '',
    showApplyToAll: false,
    showComments: false
  };
}

