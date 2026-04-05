import { RomSectionDropdownTextConfig } from "../../../range-of-motion/config";
import { positiveNegative_OPTIONS } from "../special-test-options";

export class SiDistractionConfig {
  static readonly siDistraction: RomSectionDropdownTextConfig = {
    columns: ['Right', 'Left'],
    labels: ['SI Distraction'],
    options: positiveNegative_OPTIONS,
    fieldPrefix: 'si_distraction_',
    commentsFieldName: 'si_distraction_comments',
    hasTextInput: false,
    showComments: false
  };
}
