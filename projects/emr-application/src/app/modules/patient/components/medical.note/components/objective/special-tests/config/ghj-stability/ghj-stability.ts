import { RomSectionDropdownTextConfig } from "../../../range-of-motion/config";
import { positiveNegative_OPTIONS } from "../special-test-options";

export class GhjStabilityConfig {
  static readonly ghjStability: RomSectionDropdownTextConfig = {
    columns: ['Right', 'Left'],
    labels: ['Load and Shift', 'Apprehension', 'Relocation', 'Sulcus Sign'],
    options: positiveNegative_OPTIONS,
    fieldPrefix: 'ghj_stability_',
    commentsFieldName: 'ghj_stability_comments',
    hasTextInput: false,
    showComments: false
  };
}
