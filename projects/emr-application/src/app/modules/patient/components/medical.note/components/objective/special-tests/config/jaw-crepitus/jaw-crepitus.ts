import { RomSectionDropdownTextConfig } from "../../../range-of-motion/config";
import { jawCrepitus_OPTIONS } from "../special-test-options";

export class JawCrepitusConfig {
  static readonly jawCrepitus: RomSectionDropdownTextConfig = {
    columns: ['Right', 'Left'],
    labels: ['Jaw Crepitus'],
    options: jawCrepitus_OPTIONS,
    fieldPrefix: 'jaw_crepitus_',
    commentsFieldName: 'jaw_crepitus_comments',
    hasTextInput: false,
    showComments: false
  };
}
