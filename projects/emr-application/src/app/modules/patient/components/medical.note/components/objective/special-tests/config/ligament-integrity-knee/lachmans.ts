import { RomSectionConfig } from "../../../range-of-motion/config";
import { DEFAULT_APPLY_TO_ALL_OPTIONS, lachmans_OPTIONS } from "../special-test-options";

export interface Lachmans {
  enabled: boolean;
}

export class Lachmans {
  static readonly lachmans: RomSectionConfig = {
    labels: [
      "Lachman's"
    ],
    options: lachmans_OPTIONS,
    applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
    fieldPrefix: 'lachmans_',
    applyToAllFieldName: '',
    commentsFieldName: '',
    showApplyToAll: false,
    showComments: false
  };
  
}

