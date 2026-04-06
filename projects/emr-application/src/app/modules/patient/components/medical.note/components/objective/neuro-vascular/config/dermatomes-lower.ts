import { DEFAULT_APPLY_TO_ALL_OPTIONS, RomSectionConfig } from "../../range-of-motion/config";
import { dermatomesLower_OPTIONS } from "./neuro-vascular-options";

export interface DermatomesLower {
  enabled: boolean;
}

export class DermatomesLower {
  static readonly dermatomesLower: RomSectionConfig = {
    labels: [
      'L1, 2 Mid Anterior Thigh',
      'L3 Distal Inner Thigh',
      'L4 Anterior Tibialis',
      'L5 EHL',
      'S1 Lateral Foot',
      'S2 Mid Gastoc/Hamstring'
    ],
    options: dermatomesLower_OPTIONS,
    applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
    fieldPrefix: 'dermatomes_lower_',
    applyToAllFieldName: 'dermatomes_lower_',
    commentsFieldName: 'dermatomes_lower___comments',
    showApplyToAll: false,
    showComments: true
  };
}

