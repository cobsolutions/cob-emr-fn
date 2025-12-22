import { RomSectionConfig } from "../../../range-of-motion/config";
import { DEFAULT_APPLY_TO_ALL_OPTIONS ,sagSign_OPTIONS} from "../special-test-options";
export interface SagSign {
  enabled: boolean;
}

export class SagSign {
  static readonly sagSign: RomSectionConfig = {
    labels: [
      'Sag Sign'
    ],
    options: sagSign_OPTIONS,
    applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
    fieldPrefix: 'sag_sign_',
    applyToAllFieldName: '',
    commentsFieldName: '',
    showApplyToAll: false,
    showComments: false
  };
  
}

