import { RomSectionDropdownTextConfig } from "../../../range-of-motion/config";
import { positiveNegative_OPTIONS } from "../special-test-options";

export class ImpingementConfig {
  static readonly impingement: RomSectionDropdownTextConfig = {
    columns: ['Right', 'Left'],
    labels: ['Hawkins/Kennedy', 'Neer Test'],
    options: positiveNegative_OPTIONS,
    fieldPrefix: 'impingement_',
    commentsFieldName: 'impingement_comments',
    hasTextInput: false,
    showComments: false
  };
}
