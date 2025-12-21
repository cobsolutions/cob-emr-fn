import { RomSectionConfig } from "../../range-of-motion/config";
import { DEFAULT_APPLY_TO_ALL_OPTIONS, vascular_OPTIONS } from "./neuro-vascular-options";

export interface Vascular {
  enabled: boolean;
}

export class Vascular {
  static readonly vascular: RomSectionConfig = {
    labels: [
      'Popliteal Artery',
      'Pedal Pulse',
      'Posterior Tibial Artery'
    ],
    options: vascular_OPTIONS,
    applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
    fieldPrefix: 'vascular_',
    applyToAllFieldName: '',
    commentsFieldName: '',
    showApplyToAll: false,
    showComments: false
  };
  
}

