import { RomSectionDropdownTextConfig } from "../../../range-of-motion/config";
import { positiveNegative_OPTIONS } from "../special-test-options";

export class RotatorCuffConfig {
  static readonly rotatorCuff: RomSectionDropdownTextConfig = {
    columns: ['Right', 'Left'],
    labels: ['Empty Can', 'Subscapularis Lift Off', 'Drop Arm'],
    options: positiveNegative_OPTIONS,
    fieldPrefix: 'rotator_cuff_',
    commentsFieldName: 'rotator_cuff_comments',
    hasTextInput: false,
    showComments: false
  };
}
