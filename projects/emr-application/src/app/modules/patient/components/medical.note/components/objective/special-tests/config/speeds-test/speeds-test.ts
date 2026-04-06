import { RomSectionDropdownTextConfig } from "../../../range-of-motion/config";
import { positiveNegative_OPTIONS } from "../special-test-options";

export class SpeedsTestConfig {
  static readonly speedsTest: RomSectionDropdownTextConfig = {
    columns: ['Right', 'Left'],
    labels: [],
    options: positiveNegative_OPTIONS,
    fieldPrefix: 'speeds_test_',
    commentsFieldName: 'speeds_test_comments',
    hasTextInput: false,
    showComments: false
  };
}
