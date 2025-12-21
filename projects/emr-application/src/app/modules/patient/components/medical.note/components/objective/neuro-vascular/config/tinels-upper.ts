import { DEFAULT_APPLY_TO_ALL_OPTIONS, RomSectionConfig } from "../../range-of-motion/config";
import { tinelsUpper_OPTIONS } from "./neuro-vascular-options";

export interface TinelsUpper {
  enabled: boolean;
}

export class TinelsUpper {
  static readonly tinelsUpper: RomSectionConfig = {
    labels: [
      'Volar Carpals- Median Nerve',
      'Cubital Tunnel-Ulnar nerve',
      "Guyon's Canal- Ulnar nerve"
    ],
    options: tinelsUpper_OPTIONS,
    applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
    fieldPrefix: 'tinels_upper_',
    applyToAllFieldName: '',
    commentsFieldName: '',
    showApplyToAll: false,
    showComments: false
  };
  
}

