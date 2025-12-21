import { DEFAULT_APPLY_TO_ALL_OPTIONS, RomSectionConfig } from "../../range-of-motion/config";
import { tinelsLower_OPTIONS } from "./neuro-vascular-options";

export interface TinelsLower {
  enabled: boolean;
}

export class TinelsLower {
  static readonly tinelsLower: RomSectionConfig = {
    labels: [
      'Tarsal Tunnel - Posterior Tibial Nerve',
      'Fibular Head - Common Peroneal Nerve'
    ],
    options: tinelsLower_OPTIONS,
    applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
    fieldPrefix: 'tinels_lower_',
    applyToAllFieldName: '',
    commentsFieldName: '',
    showApplyToAll: false,
    showComments: false
  };
  
}

