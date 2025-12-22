import { RomSectionConfig } from "../../../range-of-motion/config";
import { DEFAULT_APPLY_TO_ALL_OPTIONS, pivotShift_OPTIONS } from "../special-test-options";

export interface PivotShift {
  enabled: boolean;
}

export class PivotShift {
  static readonly pivotShift: RomSectionConfig = {
    labels: [
      'Pivot Shift'
    ],
    options: pivotShift_OPTIONS,
    applyToAllOptions: DEFAULT_APPLY_TO_ALL_OPTIONS,
    fieldPrefix: 'pivot_shift_',
    applyToAllFieldName: '',
    commentsFieldName: '',
    showApplyToAll: false,
    showComments: false
  };
  
}

