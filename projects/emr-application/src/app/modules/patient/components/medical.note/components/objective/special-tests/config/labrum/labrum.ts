import { RomSectionDropdownTextConfig } from "../../../range-of-motion/config";
import { positiveNegative_OPTIONS } from "../special-test-options";

export class LabrumConfig {
  static readonly labrum: RomSectionDropdownTextConfig = {
    columns: ['Right', 'Left'],
    labels: ['Grind Test', 'OBriens', 'Clunk Test', 'Crank Test'],
    options: positiveNegative_OPTIONS,
    fieldPrefix: 'labrum_',
    commentsFieldName: 'labrum_comments',
    hasTextInput: false,
    showComments: false
  };
}
