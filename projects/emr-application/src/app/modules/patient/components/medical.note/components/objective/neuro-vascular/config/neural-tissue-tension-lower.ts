import { RomSectionConfig } from "../../range-of-motion/config";
import { DEFAULT_APPLY_TO_ALL_OPTIONS, neuralTissueTensionLower_OPTIONS } from "./neuro-vascular-options";

export interface NeuralTissueTensionLower {
  enabled: boolean;
}

export class NeuralTissueTensionLower {
  static readonly neuralTissueTensionLower: RomSectionConfig = {
    labels: [
      'Sciatic Nerve',
      'Common Peroneal Nerve',
      'Tibial Nerve'
    ],
    options: neuralTissueTensionLower_OPTIONS,
    applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
    fieldPrefix: 'neural_tissue_tension_lower_',
    applyToAllFieldName: '',
    commentsFieldName: '',
    showApplyToAll: false,
    showComments: false
  };
  
}

