import { DEFAULT_APPLY_TO_ALL_OPTIONS, RomSectionConfig } from "../../../range-of-motion/config";
import { anteriorDrawer_OPTIONS, jSign_OPTIONS } from "../special-test-options";
export interface JSign {
  enabled: boolean;
}

export class JSign {
  static readonly jSign: RomSectionConfig = {
    labels: [
      'J Sign'
    ],
    options: jSign_OPTIONS,
    applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
    fieldPrefix: 'j_sign_',
    applyToAllFieldName: '',
    commentsFieldName: '',
    showApplyToAll: true,
    showComments: true
  };
  
}

