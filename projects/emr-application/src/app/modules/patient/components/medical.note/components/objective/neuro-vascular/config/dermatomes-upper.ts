import { RomSectionConfig } from "../../range-of-motion/config";
import { DEFAULT_APPLY_TO_ALL_OPTIONS, dermatomesUpper_OPTIONS } from "./neuro-vascular-options";

export interface DermatomesUpper {
  enabled: boolean;
}

export class DermatomesUpper {
  static readonly dermatomesUpperSelect: RomSectionConfig = {
    labels: [
      'C4',
      'C5',
      'C6',
      'C7',
      'C8',
      'T1'
    ],
    options: dermatomesUpper_OPTIONS,
    applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
    fieldPrefix: 'dermatomes_upper_',
    applyToAllFieldName: '',
    commentsFieldName: '',
    showApplyToAll: true,
    showComments: true
  };
  
}

