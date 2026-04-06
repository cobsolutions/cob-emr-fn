import { RomSectionDropdownTextConfig } from "../../../range-of-motion/config";
import { ober_OPTIONS } from "../special-test-options";



export class OberTest {
  static readonly oberTestNoLabels: RomSectionDropdownTextConfig = {
    columns: ['Right','Left'],
    labels: [],
    options: ober_OPTIONS,
    fieldPrefix: 'ober_',
    commentsFieldName: 'ober_comments',
    hasTextInput: false,
    showComments: false
  };
}

