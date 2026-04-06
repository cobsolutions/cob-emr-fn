import { DEFAULT_APPLY_TO_ALL_OPTIONS, RomSectionConfig } from "../../range-of-motion/config";
import { slump_OPTIONS } from "./neuro-vascular-options";

export interface Slump {
  enabled: boolean;
}

export class Slump {
  static readonly slump: RomSectionConfig = {
    labels: [
      'Slump'
    ],
    options: slump_OPTIONS,
    applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
    fieldPrefix: 'slump_',
    applyToAllFieldName: '',
    commentsFieldName: '',
    showApplyToAll: false,
    showComments: false
  };
  
}

