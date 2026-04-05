import { RomSectionDropdownTextConfig } from "../../../range-of-motion/config";
import { legLength_OPTIONS } from "../special-test-options";

export class LegLengthConfig {
  static readonly legLength: RomSectionDropdownTextConfig = {
    columns: ['Right', 'Left'],
    labels: ['Shortage'],
    options: legLength_OPTIONS,
    fieldPrefix: 'leg_length_',
    commentsFieldName: 'leg_length_comments',
    hasTextInput: false,
    showComments: false
  };
}
